import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { isValidInput } from '@/lib/auth'

// GET /api/forum/users/[id] - Get a single user with their posts and comment count
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!isValidInput(id, 100)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const user = await db.forumUser.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        _count: {
          select: { comments: true },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      ...user,
      commentCount: user._count.comments,
      _count: undefined,
    })
  } catch (error) {
    console.error('Error fetching forum user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PATCH /api/forum/users/[id] - Update user profile fields
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!isValidInput(id, 100)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const body = await request.json()
    const { name, bio, location, communities, company, title, avatarUrl } = body

    // Input length validation
    if (name !== undefined && !isValidInput(name, 200)) {
      return NextResponse.json({ error: 'Name must be 1-200 characters' }, { status: 400 })
    }
    if (bio !== undefined && !isValidInput(bio, 2000)) {
      return NextResponse.json({ error: 'Bio must be under 2,000 characters' }, { status: 400 })
    }
    if (location !== undefined && !isValidInput(location, 200)) {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 })
    }
    if (company !== undefined && !isValidInput(company, 200)) {
      return NextResponse.json({ error: 'Invalid company name' }, { status: 400 })
    }
    if (title !== undefined && !isValidInput(title, 200)) {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {
      lastActiveAt: new Date(),
    }

    if (name !== undefined) updateData.name = name
    if (bio !== undefined) updateData.bio = bio
    if (location !== undefined) updateData.location = location
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl || null
    if (communities !== undefined) {
      updateData.communities = Array.isArray(communities)
        ? communities.join(', ')
        : communities
    }
    if (company !== undefined) updateData.company = company
    if (title !== undefined) updateData.title = title

    const user = await db.forumUser.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating forum user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
