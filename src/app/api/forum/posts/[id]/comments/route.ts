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
