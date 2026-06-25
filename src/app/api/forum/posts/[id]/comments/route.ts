import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { isValidInput } from '@/lib/auth'

// POST /api/forum/posts/[id]/comments - Add a comment or reply
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { authorId, content, parentId } = body

    if (!authorId || !content) {
      return NextResponse.json(
        { error: 'authorId and content are required' },
        { status: 400 }
      )
    }

    // Input validation
    if (!isValidInput(id, 100)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }
    if (!isValidInput(authorId, 100)) {
      return NextResponse.json({ error: 'Invalid authorId' }, { status: 400 })
    }
    if (!isValidInput(content, 5000, 1)) {
      return NextResponse.json({ error: 'Comment must be 1-5,000 characters' }, { status: 400 })
    }
    if (parentId && !isValidInput(parentId, 100)) {
      return NextResponse.json({ error: 'Invalid parentId' }, { status: 400 })
    }

    // Verify the author exists
    const author = await db.forumUser.findUnique({ where: { id: authorId } })
    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }

    // Verify post exists
    const post = await db.forumPost.findUnique({ where: { id } })
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // If parentId is provided, verify parent comment exists and belongs to same post
    if (parentId) {
      const parentComment = await db.forumComment.findUnique({
        where: { id: parentId },
      })
      if (!parentComment || parentComment.postId !== id) {
        return NextResponse.json(
          { error: 'Parent comment not found or does not belong to this post' },
          { status: 400 }
        )
      }
    }

    const comment = await db.forumComment.create({
      data: {
        postId: id,
        authorId,
        parentId: parentId || null,
        content,
      },
      include: {
        author: {
          select: { id: true, name: true, avatarColor: true, role: true },
        },
      },
    })

    // Update the post's updatedAt timestamp
    await db.forumPost.update({
      where: { id },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

// PATCH /api/forum/posts/[id]/comments - Vote on a comment
// Body: { action: "vote", userId, commentId, direction: "up"|"down" }
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action, userId, commentId, direction } = body

    if (action !== 'vote') {
      return NextResponse.json(
        { error: 'Invalid action. Must be "vote"' },
        { status: 400 }
      )
    }
    if (!userId || !commentId) {
      return NextResponse.json(
        { error: 'userId and commentId are required' },
        { status: 400 }
      )
    }
    if (!direction || (direction !== 'up' && direction !== 'down')) {
      return NextResponse.json(
        { error: 'direction must be "up" or "down"' },
        { status: 400 }
      )
    }
    if (!isValidInput(id, 100) || !isValidInput(userId, 100) || !isValidInput(commentId, 100)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    // Verify user + comment exist
    const actingUser = await db.forumUser.findUnique({ where: { id: userId } })
    if (!actingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const comment = await db.forumComment.findUnique({ where: { id: commentId } })
    if (!comment || comment.postId !== id) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    // Transaction: vote toggle + likes counter update
    const result = await db.$transaction(async (tx) => {
      const existingVote = await tx.forumVote.findUnique({
        where: { userId_commentId: { userId, commentId } },
      })

      let userVote: string | null = direction

      if (existingVote) {
        if (existingVote.direction === direction) {
          // Same direction: remove vote
          await tx.forumVote.delete({ where: { id: existingVote.id } })
          await tx.forumComment.update({
            where: { id: commentId },
            data: { likes: { increment: direction === 'up' ? -1 : 1 } },
          })
          userVote = null
        } else {
          // Opposite: flip
          await tx.forumVote.update({
            where: { id: existingVote.id },
            data: { direction },
          })
          await tx.forumComment.update({
            where: { id: commentId },
            data: { likes: { increment: direction === 'up' ? 2 : -2 } },
          })
          userVote = direction
        }
      } else {
        await tx.forumVote.create({
          data: { userId, commentId, direction },
        })
        await tx.forumComment.update({
          where: { id: commentId },
          data: { likes: { increment: direction === 'up' ? 1 : -1 } },
        })
        userVote = direction
      }

      const updated = await tx.forumComment.findUnique({
        where: { id: commentId },
        select: { likes: true },
      })
      return { likes: updated?.likes ?? 0, userVote }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error voting on comment:', error)
    return NextResponse.json(
      { error: 'Failed to vote on comment' },
      { status: 500 }
    )
  }
}
