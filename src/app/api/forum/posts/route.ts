import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { isValidInput } from '@/lib/auth'

// GET /api/forum/posts - List posts with pagination, filtering, and search
// Query params: community, category (home|popular|news|explore), userId, page, limit, search, cursor
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const communityRaw = searchParams.get('community') || ''
    const community = communityRaw === 'all' ? '' : communityRaw
    const category = searchParams.get('category') || 'home'
    const userId = searchParams.get('userId') || ''
    const search = searchParams.get('search') || ''
    const page = Math.min(Math.max(parseInt(searchParams.get('page') || '1', 10), 1), 200)
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '15', 10), 1), 50)

    // Build where clause
    const where: Record<string, unknown> = {}
    if (community) where.community = community
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ]
    }

    const total = await db.forumPost.count({ where })
    const totalPages = Math.ceil(total / limit)

    // Determine sort order based on category
    let orderBy: Record<string, string> = { createdAt: 'desc' }
    if (category === 'popular') {
      orderBy = { upvotes: 'desc' }
    }

    const skip = (page - 1) * limit

    // For "explore" category, sort by comment count using a groupBy + take approach
    // instead of loading ALL posts into memory.
    if (category === 'explore') {
      // Get post IDs ordered by comment count via groupBy (DB-side aggregation)
      const commentCounts = await db.forumComment.groupBy({
        by: ['postId'],
        _count: { postId: true },
        orderBy: { _count: { postId: 'desc' } },
        take: skip + limit,
      })
      const postIds = commentCounts.slice(skip, skip + limit).map((c) => c.postId)

      if (postIds.length === 0) {
        // Fallback: if no comments exist, show newest posts
        const fallback = await db.forumPost.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take: limit,
          include: {
            author: true,
            _count: { select: { comments: true } },
            votes: userId ? { where: { userId } } : false,
            heartUsers: userId ? { where: { userId } } : false,
          },
        })
        const posts = fallback.map((post) => ({
          ...post,
          commentCount: post._count.comments,
          userVote: post.votes?.[0]?.direction || null,
          userHearted: (post.heartUsers?.length ?? 0) > 0,
          _count: undefined,
          votes: undefined,
          heartUsers: undefined,
        }))
        return NextResponse.json({ posts, total, page, totalPages, hasMore: page < totalPages })
      }

      // Fetch the full posts for those IDs, preserving comment-count order
      const dbPosts = await db.forumPost.findMany({
        where: { id: { in: postIds } },
        include: {
          author: true,
          _count: { select: { comments: true } },
          votes: userId ? { where: { userId } } : false,
          heartUsers: userId ? { where: { userId } } : false,
        },
      })
      // Re-sort to match the groupBy order
      const orderMap = new Map(postIds.map((id, i) => [id, i]))
      dbPosts.sort((a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0))

      const posts = dbPosts.map((post) => ({
        ...post,
        commentCount: post._count.comments,
        userVote: post.votes?.[0]?.direction || null,
        userHearted: (post.heartUsers?.length ?? 0) > 0,
        _count: undefined,
        votes: undefined,
        heartUsers: undefined,
      }))
      return NextResponse.json({ posts, total, page, totalPages, hasMore: page < totalPages })
    }

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

    return NextResponse.json({ posts, total, page, totalPages, hasMore: page < totalPages })
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
        _count: { select: { comments: true } },
      },
    })

    return NextResponse.json({
      ...post,
      commentCount: post._count.comments,
      userVote: null,
      userHearted: false,
      _count: undefined,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating forum post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
