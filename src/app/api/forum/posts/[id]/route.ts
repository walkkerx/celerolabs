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
// Wrapped in transactions to prevent race conditions.
// Returns lightweight { upvotes, hearts, userVote, userHearted } so the frontend
// can do targeted state updates without refetching the full post list.
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

      // Transaction: read existing vote, mutate, update counter — atomically
      const result = await db.$transaction(async (tx) => {
        const existingVote = await tx.forumVote.findUnique({
          where: { userId_postId: { userId, postId: id } },
        })

        let userVote: string | null = direction

        if (existingVote) {
          if (existingVote.direction === direction) {
            // Same direction: remove vote
            await tx.forumVote.delete({ where: { id: existingVote.id } })
            await tx.forumPost.update({
              where: { id },
              data: { upvotes: { increment: direction === 'up' ? -1 : 1 } },
            })
            userVote = null
          } else {
            // Opposite direction: flip vote
            await tx.forumVote.update({
              where: { id: existingVote.id },
              data: { direction },
            })
            await tx.forumPost.update({
              where: { id },
              data: { upvotes: { increment: direction === 'up' ? 2 : -2 } },
            })
            userVote = direction
          }
        } else {
          // No existing vote: create
          await tx.forumVote.create({
            data: { userId, postId: id, direction },
          })
          await tx.forumPost.update({
            where: { id },
            data: { upvotes: { increment: direction === 'up' ? 1 : -1 } },
          })
          userVote = direction
        }

        const updated = await tx.forumPost.findUnique({
          where: { id },
          select: { upvotes: true, hearts: true },
        })
        return { upvotes: updated?.upvotes ?? 0, hearts: updated?.hearts ?? 0, userVote }
      })

      return NextResponse.json({
        upvotes: result.upvotes,
        hearts: result.hearts,
        userVote: result.userVote,
        userHearted: (await db.forumHeart.findUnique({
          where: { userId_postId: { userId, postId: id } },
        })) !== null,
      })
    }

    if (action === 'heart') {
      const result = await db.$transaction(async (tx) => {
        const existingHeart = await tx.forumHeart.findUnique({
          where: { userId_postId: { userId, postId: id } },
        })

        let userHearted: boolean
        if (existingHeart) {
          await tx.forumHeart.delete({ where: { id: existingHeart.id } })
          await tx.forumPost.update({
            where: { id },
            data: { hearts: { decrement: 1 } },
          })
          userHearted = false
        } else {
          await tx.forumHeart.create({ data: { userId, postId: id } })
          await tx.forumPost.update({
            where: { id },
            data: { hearts: { increment: 1 } },
          })
          userHearted = true
        }

        const updated = await tx.forumPost.findUnique({
          where: { id },
          select: { upvotes: true, hearts: true },
        })
        // Preserve existing vote
        const existingVote = await tx.forumVote.findUnique({
          where: { userId_postId: { userId, postId: id } },
        })
        return {
          upvotes: updated?.upvotes ?? 0,
          hearts: updated?.hearts ?? 0,
          userVote: existingVote?.direction ?? null,
          userHearted,
        }
      })

      return NextResponse.json(result)
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
