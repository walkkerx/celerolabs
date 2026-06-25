import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { isValidInput } from '@/lib/auth'

interface CommentWithAuthor {
  id: string
  postId: string
  authorId: string
  parentId: string | null
  content: string
  likes: number
  createdAt: Date
  updatedAt: Date
  author: { id: string; name: string; avatarColor: string; role: string }
  votes: { direction: string }[]
}

function buildCommentTree(comments: CommentWithAuthor[]) {
  const map = new Map<string, CommentWithAuthor & { replies: CommentWithAuthor[] }>()

  for (const comment of comments) {
    map.set(comment.id, { ...comment, replies: [] })
  }

  const roots: (CommentWithAuthor & { replies: CommentWithAuthor[] })[] = []

  for (const comment of comments) {
    const node = map.get(comment.id)!
    if (comment.parentId && map.has(comment.parentId)) {
      map.get(comment.parentId)!.replies.push(node)
    } else {
      roots.push(node)
    }
  }

  return roots
}

// GET /api/forum/posts/[id] - Get a single post with author, nested comments, and user vote/heart status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || ''

    if (!isValidInput(id, 100)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    const post = await db.forumPost.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          orderBy: { createdAt: 'asc' },
          include: {
            author: {
              select: { id: true, name: true, avatarColor: true, role: true },
            },
            votes: userId ? { where: { userId } } : false,
          },
        },
        votes: userId ? { where: { userId } } : false,
        heartUsers: userId ? { where: { userId } } : false,
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const commentsTree = buildCommentTree(post.comments as CommentWithAuthor[])

    const enrichComments = (
      comments: (CommentWithAuthor & { replies: CommentWithAuthor[] })[]
    ) =>
      comments.map((c) => ({
        id: c.id,
        postId: c.postId,
        authorId: c.authorId,
        parentId: c.parentId,
        content: c.content,
        likes: c.likes,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        author: c.author,
        userVote: c.votes?.[0]?.direction || null,
        replies: enrichComments(c.replies),
      }))

    return NextResponse.json({
      ...post,
      comments: enrichComments(commentsTree),
      userVote: post.votes?.[0]?.direction || null,
      userHearted: (post.heartUsers?.length ?? 0) > 0,
      votes: undefined,
      heartUsers: undefined,
    })
  } catch (error) {
    console.error('Error fetching forum post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PATCH /api/forum/posts/[id] - Update post (vote/heart actions)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action, userId, direction } = body

    if (!isValidInput(id, 100)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    if (!isValidInput(userId, 100)) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 })
    }

    // Verify the user exists
    const actingUser = await db.forumUser.findUnique({ where: { id: userId } })
    if (!actingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const post = await db.forumPost.findUnique({ where: { id } })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (action === 'vote') {
      if (!direction || (direction !== 'up' && direction !== 'down')) {
        return NextResponse.json(
          { error: 'direction must be "up" or "down"' },
          { status: 400 }
        )
      }

      const existingVote = await db.forumVote.findUnique({
        where: { userId_postId: { userId, postId: id } },
      })

      if (existingVote) {
        if (existingVote.direction === direction) {
          await db.forumVote.delete({
            where: { id: existingVote.id },
          })
          await db.forumPost.update({
            where: { id },
            data: { upvotes: { increment: direction === 'up' ? -1 : 1 } },
          })
        } else {
          await db.forumVote.update({
            where: { id: existingVote.id },
            data: { direction },
          })
          await db.forumPost.update({
            where: { id },
            data: { upvotes: { increment: direction === 'up' ? 2 : -2 } },
          })
        }
      } else {
        await db.forumVote.create({
          data: { userId, postId: id, direction },
        })
        await db.forumPost.update({
          where: { id },
          data: { upvotes: { increment: direction === 'up' ? 1 : -1 } },
        })
      }

      const updatedPost = await db.forumPost.findUnique({
        where: { id },
        include: { author: true },
      })
      return NextResponse.json(updatedPost)
    }

    if (action === 'heart') {
      const existingHeart = await db.forumHeart.findUnique({
        where: { userId_postId: { userId, postId: id } },
      })

      if (existingHeart) {
        await db.forumHeart.delete({
          where: { id: existingHeart.id },
        })
        await db.forumPost.update({
          where: { id },
          data: { hearts: { decrement: 1 } },
        })
      } else {
        await db.forumHeart.create({
          data: { userId, postId: id },
        })
        await db.forumPost.update({
          where: { id },
          data: { hearts: { increment: 1 } },
        })
      }

      const updatedPost = await db.forumPost.findUnique({
        where: { id },
        include: { author: true },
      })
      return NextResponse.json(updatedPost)
    }

    return NextResponse.json(
      { error: 'Invalid action. Must be "vote" or "heart"' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating forum post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}
