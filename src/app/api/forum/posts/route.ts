import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { isValidInput } from '@/lib/auth'

// GET /api/forum/posts - List posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const community = searchParams.get('community') || ''
    const category = searchParams.get('category') || 'home'
    const userId = searchParams.get('userId') || ''
    const page = Math.min(Math.max(parseInt(searchParams.get('page') || '1', 10), 1), 100)
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20', 10), 1), 50)

    const where = community ? { community } : {}

    const total = await db.forumPost.count({ where })
    const totalPages = Math.ceil(total / limit)

    // Determine sort order based on category
    let orderBy: Record<string, string> = { createdAt: 'desc' }
    if (category === 'popular') {
      orderBy = { upvotes: 'desc' }
    } else if (category === 'news') {
      orderBy = { createdAt: 'desc' }
    }

    // For "explore" category, sort by comment count desc
    if (category === 'explore') {
      const allPosts = await db.forumPost.findMany({
        where,
        include: {
          author: true,
          _count: { select: { comments: true } },
          votes: userId ? { where: { userId } } : false,
          heartUsers: userId ? { where: { userId } } : false,
        },
      })

      allPosts.sort((a, b) => b._count.comments - a._count.comments)

      const skip = (page - 1) * limit
      const paginatedPosts = allPosts.slice(skip, skip + limit)

      const posts = paginatedPosts.map((post) => ({
        ...post,
        commentCount: post._count.comments,
        userVote: post.votes?.[0]?.direction || null,
        userHearted: (post.heartUsers?.length ?? 0) > 0,
        _count: undefined,
        votes: undefined,
        heartUsers: undefined,
      }))

      return NextResponse.json({ posts, total, page, totalPages })
    }

    const skip = (page - 1) * limit

    const dbPosts = await db.forumPost.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        author: true,
        _count: { select: { comments: true } },
        votes: userId ? { where: { userId } } : false,
        heartUsers: userId ? { where: { userId } } : false,
      },
    })

    const posts = dbPosts.map((post) => ({
      ...post,
      commentCount: post._count.comments,
      userVote: post.votes?.[0]?.direction || null,
      userHearted: (post.heartUsers?.length ?? 0) > 0,
      _count: undefined,
      votes: undefined,
      heartUsers: undefined,
    }))

    return NextResponse.json({ posts, total, page, totalPages })
  } catch (error) {
    console.error('Error fetching forum posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/forum/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { authorId, community, title, content, imageUrl } = body

    if (!authorId || !community || !title) {
      return NextResponse.json(
        { error: 'authorId, community, and title are required' },
        { status: 400 }
      )
    }

    // Input length validation
    if (!isValidInput(authorId, 100)) {
      return NextResponse.json({ error: 'Invalid authorId' }, { status: 400 })
    }
    if (!isValidInput(community, 100)) {
      return NextResponse.json({ error: 'Invalid community' }, { status: 400 })
    }
    if (!isValidInput(title, 300)) {
      return NextResponse.json({ error: 'Title must be 1-300 characters' }, { status: 400 })
    }
    if (content && !isValidInput(content, 10000)) {
      return NextResponse.json({ error: 'Content must be under 10,000 characters' }, { status: 400 })
    }
    if (imageUrl && !isValidInput(imageUrl, 2000)) {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 })
    }

    // Verify the author exists
    const author = await db.forumUser.findUnique({ where: { id: authorId } })
    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }

    const post = await db.forumPost.create({
      data: {
        authorId,
        community,
        title,
        content: content || null,
        imageUrl: imageUrl || null,
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating forum post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
