import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { isValidInput } from '@/lib/auth'

// GET /api/forum/users - List all forum users with optional search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    // Validate search input length
    if (search && !isValidInput(search, 200)) {
      return NextResponse.json(
        { error: 'Search query too long' },
        { status: 400 }
      )
    }

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { role: { contains: search } },
            { company: { contains: search } },
            { location: { contains: search } },
          ],
        }
      : {}

    const users = await db.forumUser.findMany({
      where,
      orderBy: { lastActiveAt: 'desc' },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching forum users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/forum/users - Create or update a forum user (upsert by email)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, bio, role, location, communities, avatarColor, avatarUrl, company, title } = body

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'name, email, and role are required' },
        { status: 400 }
      )
    }

    // Input length validation
    if (!isValidInput(name, 200)) {
      return NextResponse.json({ error: 'Name must be 1-200 characters' }, { status: 400 })
    }
    if (!isValidInput(email, 320)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    if (!isValidInput(role, 100)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }
    if (bio && !isValidInput(bio, 2000)) {
      return NextResponse.json({ error: 'Bio must be under 2,000 characters' }, { status: 400 })
    }
    if (location && !isValidInput(location, 200)) {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 })
    }
    if (company && !isValidInput(company, 200)) {
      return NextResponse.json({ error: 'Invalid company name' }, { status: 400 })
    }
    if (title && !isValidInput(title, 200)) {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
    }

    const communitiesStr = Array.isArray(communities)
      ? communities.join(', ')
      : communities || ''

    const user = await db.forumUser.upsert({
      where: { email },
      update: {
        name,
        bio: bio || null,
        role,
        location: location || null,
        communities: communitiesStr,
        avatarColor: avatarColor || '#6b7280',
        avatarUrl: avatarUrl || null,
        company: company || null,
        title: title || null,
        lastActiveAt: new Date(),
      },
      create: {
        name,
        email,
        bio: bio || null,
        role,
        location: location || null,
        communities: communitiesStr,
        avatarColor: avatarColor || '#6b7280',
        avatarUrl: avatarUrl || null,
        company: company || null,
        title: title || null,
        lastActiveAt: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating forum user:', error)
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    )
  }
}

// PUT /api/forum/users - Update a forum user by id
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, bio, role, location, avatarUrl, communities } = body

    if (!id) {
      return NextResponse.json(
        { error: 'User id is required' },
        { status: 400 }
      )
    }

    // Input length validation
    if (name !== undefined && !isValidInput(name, 200)) {
      return NextResponse.json({ error: 'Name must be 1-200 characters' }, { status: 400 })
    }
    if (bio !== undefined && !isValidInput(bio, 2000)) {
      return NextResponse.json({ error: 'Bio must be under 2,000 characters' }, { status: 400 })
    }
    if (role !== undefined && !isValidInput(role, 100)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }
    if (location !== undefined && !isValidInput(location, 200)) {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {
      lastActiveAt: new Date(),
    }

    if (name !== undefined) updateData.name = name
    if (bio !== undefined) updateData.bio = bio || null
    if (role !== undefined) updateData.role = role
    if (location !== undefined) updateData.location = location || null
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl || null
    if (communities !== undefined) {
      updateData.communities = Array.isArray(communities)
        ? communities.join(', ')
        : communities
    }

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
