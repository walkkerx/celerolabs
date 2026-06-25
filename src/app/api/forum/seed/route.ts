import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminAuth, checkRateLimit, getClientIp, isValidInput } from '@/lib/auth'

// POST /api/forum/seed - Seed the forum with sample data (admin only)
export async function POST(req: NextRequest) {
  // Protect seed endpoint: require admin auth
  const isAuthed = await verifyAdminAuth(req)
  if (!isAuthed) {
    return NextResponse.json(
      { error: 'Unauthorized. Seed endpoint requires admin authentication.' },
      { status: 401 }
    )
  }

  // Rate limit even for admin
  const ip = getClientIp(req)
  const rateCheck = checkRateLimit(ip, 3, 60 * 1000) // 3 per minute
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: 'Too many seed requests.' },
      { status: 429 }
    )
  }

  try {
    // Seed members data
    const seedMembers = [
      {
        name: 'Dr. Amina Osei',
        email: 'amina.osei@dxrwanda.com',
        bio: 'Building point-of-care diagnostics for East Africa. Rwanda FDA pathway pioneer.',
        role: 'Founder',
        location: 'Kigali, Rwanda',
        communities: 'Life Sciences',
        avatarColor: '#FF4D00',
        company: 'DxRwanda',
        title: 'CEO & Co-Founder',
      },
      {
        name: 'Yusuf Hassan',
        email: 'yusuf.hassan@powergrid.com',
        bio: 'Running mini-grid operations across Northern Nigeria. Cohort 7 alumni.',
        role: 'Operator',
        location: 'Kano, Nigeria',
        communities: 'Energy & Infrastructure',
        avatarColor: '#111111',
        company: 'PowerGrid North',
        title: 'Head of Operations',
      },
      {
        name: 'Fatima Al-Rashid',
        email: 'fatima@railpay.com',
        bio: 'Cross-border payments infrastructure across West and East Africa.',
        role: 'Founder',
        location: 'Lagos, Nigeria',
        communities: 'Digital Finance',
        avatarColor: '#FF4D00',
        company: 'RailPay',
        title: 'CTO',
      },
      {
        name: 'Chioma Adekunle',
        email: 'chioma@xcelerolabs.com',
        bio: 'Managing XEmbassy Lagos hub. Data-driven community building.',
        role: 'Operator',
        location: 'Lagos, Nigeria',
        communities: 'Route Operations',
        avatarColor: '#111111',
        company: 'xCelero Labs',
        title: 'Hub Manager, Lagos',
      },
      {
        name: 'Amara Diallo',
        email: 'amara@hansacapital.com',
        bio: 'Deploying SPVs across life sciences and energy. 34% aggregate IRR.',
        role: 'Investor',
        location: 'Dakar, Senegal',
        communities: 'Capital & Deals',
        avatarColor: '#059669',
        company: 'Hansa Capital',
        title: 'Managing Partner',
      },
      {
        name: 'Liya Tadesse',
        email: 'liya@addistech.com',
        bio: 'Hiring locally and investing in onboarding. 100% retention after 12 months.',
        role: 'Founder',
        location: 'Addis Ababa, Ethiopia',
        communities: 'Founders Corner',
        avatarColor: '#FF4D00',
        company: 'AddisTech',
        title: 'CEO',
      },
      {
        name: 'Kofi Mensah',
        email: 'kofi@healthpath.com',
        bio: 'Regulatory strategy for health tech across West Africa. Former Kenya Medical Board advisor.',
        role: 'Mentor',
        location: 'Accra, Ghana',
        communities: 'Life Sciences, Founders Corner',
        avatarColor: '#7c3aed',
        company: 'HealthPath Advisory',
        title: 'Principal Consultant',
      },
      {
        name: 'Samuel Mengistu',
        email: 'samuel@railpay.com',
        bio: 'M-Pesa integration specialist. Settlement infrastructure engineer.',
        role: 'Operator',
        location: 'Nairobi, Kenya',
        communities: 'Digital Finance',
        avatarColor: '#111111',
        company: 'RailPay',
        title: 'Payments Engineer',
      },
      {
        name: 'Ngozi Eze',
        email: 'ngozi@verdantventures.com',
        bio: 'Early-stage venture capital. Focus on life sciences and diagnostics.',
        role: 'Investor',
        location: 'Lagos, Nigeria',
        communities: 'Capital & Deals, Life Sciences',
        avatarColor: '#059669',
        company: 'Verdant Ventures',
        title: 'Partner',
      },
      {
        name: 'Thabo Moyo',
        email: 'thabo@solarvault.com',
        bio: 'Building solar-as-a-service for commercial tenants. Series A raised.',
        role: 'Founder',
        location: 'Johannesburg, South Africa',
        communities: 'Energy & Infrastructure',
        avatarColor: '#FF4D00',
        company: 'SolarVault',
        title: 'Co-Founder',
      },
      {
        name: 'Aisha Bello',
        email: 'aisha.bello@independent.com',
        bio: 'Former VP at GTBank. Now advising fintech founders on regulatory navigation.',
        role: 'Mentor',
        location: 'Abuja, Nigeria',
        communities: 'Digital Finance, Founders Corner',
        avatarColor: '#7c3aed',
        company: 'Independent',
        title: 'Fintech Advisor',
      },
      {
        name: 'Emmanuel Owusu',
        email: 'emmanuel@xcelerolabs.com',
        bio: 'Route hub operations. Community events and programming.',
        role: 'Operator',
        location: 'Kumasi, Ghana',
        communities: 'Route Operations, Founders Corner',
        avatarColor: '#111111',
        company: 'xCelero Labs',
        title: 'Hub Lead, Kumasi',
      },
    ]

    // Upsert all users
    const userMap = new Map<string, string>()
    for (const member of seedMembers) {
      const user = await db.forumUser.upsert({
        where: { email: member.email },
        update: {
          name: member.name,
          bio: member.bio,
          role: member.role,
          location: member.location,
          communities: member.communities,
          avatarColor: member.avatarColor,
          company: member.company,
          title: member.title,
          lastActiveAt: new Date(),
        },
        create: {
          name: member.name,
          email: member.email,
          bio: member.bio,
          role: member.role,
          location: member.location,
          communities: member.communities,
          avatarColor: member.avatarColor,
          company: member.company,
          title: member.title,
          lastActiveAt: new Date(),
        },
      })
      userMap.set(member.name, user.id)
    }

    // Seed posts data
    const seedPosts = [
      {
        authorName: 'Dr. Amina Osei',
        community: 'Life Sciences',
        title: 'Regulatory pathways for diagnostics in East Africa: lessons from our Rwanda pilot',
        content:
          'We just completed a 6-month pilot for our point-of-care diagnostic in Kigali. The regulatory landscape is fragmented but navigable. Key takeaway: start with the Rwanda FDA pathway, then use mutual recognition to expand to Kenya and Uganda. Happy to share our full compliance timeline if anyone is interested.',
        upvotes: 87,
        hearts: 14,
        imageUrl: null,
      },
      {
        authorName: 'Yusuf Hassan',
        community: 'Energy & Infrastructure',
        title: 'Mini-grid economics in Northern Nigeria: unit economics from Cohort 7',
        content:
          'Sharing our updated unit economics after 18 months of operations. Revenue per connection up 40% from initial projections. The key variable turns out to be productive-use appliances: once you bundle in refrigeration and welding, the revenue per user completely changes. Full breakdown in the thread.',
        upvotes: 142,
        hearts: 23,
        imageUrl:
          'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      },
      {
        authorName: 'Fatima Al-Rashid',
        community: 'Digital Finance',
        title: 'Cross-border payments infrastructure: what we learned building across 3 corridors',
        content:
          'After 14 months of live operations across the Lagos-Accra-Nairobi corridor, here\'s what we wish we knew before starting. The biggest surprise wasn\'t regulatory, it was settlement timing. Mobile money settlement in East Africa is fundamentally different from West African bank-based rails. Thread below.',
        upvotes: 204,
        hearts: 31,
        imageUrl: null,
      },
      {
        authorName: 'Chioma Adekunle',
        community: 'Route Operations',
        title: 'Hub utilization data: what 12 months of XEmbassy Lagos tells us',
        content:
          "We've been tracking desk utilization, meeting room bookings, and event attendance across XEmbassy Lagos for the past year. The data is clear: weekday co-working is nice, but the real flywheel is Friday masterclasses + weekend hack sessions. Sharing the full dashboard with anyone who DMs me.",
        upvotes: 56,
        hearts: 9,
        imageUrl: null,
      },
      {
        authorName: 'Amara Diallo',
        community: 'Capital & Deals',
        title: 'SPV deployment update: Q1 2026 portfolio construction',
        content:
          "Quick update on the four SPVs we deployed through last year. Aggregate IRR is tracking at 34% on a time-weighted basis. The life sciences allocation is the outperformer. Full LP memo going out next week. Happy to answer high-level questions here.",
        upvotes: 312,
        hearts: 44,
        imageUrl: null,
      },
      {
        authorName: 'Liya Tadesse',
        community: 'Founders Corner',
        title: 'Hiring your first 5 engineers in Addis: what worked and what didn\'t',
        content:
          "We went from 0 to 5 engineers in 4 months. The conventional wisdom is to hire from the diaspora. We did the opposite, hired locally, invested heavily in onboarding, and it paid off. Retention is 100% after 12 months. Here's the playbook.",
        upvotes: 98,
        hearts: 19,
        imageUrl: null,
      },
    ]

    // Check if posts already exist before creating
    const existingPostCount = await db.forumPost.count()
    let createdPostIds: string[] = []

    if (existingPostCount === 0) {
      for (const postData of seedPosts) {
        const authorId = userMap.get(postData.authorName)
        if (!authorId) continue

        const post = await db.forumPost.create({
          data: {
            authorId,
            community: postData.community,
            title: postData.title,
            content: postData.content,
            upvotes: postData.upvotes,
            hearts: postData.hearts,
            imageUrl: postData.imageUrl,
          },
        })
        createdPostIds.push(post.id)
      }
    } else {
      const existingPosts = await db.forumPost.findMany({
        select: { id: true },
        orderBy: { createdAt: 'asc' },
        take: 6,
      })
      createdPostIds = existingPosts.map((p) => p.id)
    }

    // Seed comments
    const existingCommentCount = await db.forumComment.count()

    if (existingCommentCount === 0 && createdPostIds.length >= 6) {
      await db.forumComment.create({
        data: {
          postId: createdPostIds[0],
          authorId: userMap.get('Kofi Mensah')!,
          content:
            "This is incredibly useful. We've been spinning our wheels on the Kenya Medical Board side. Would love to see that timeline.",
          likes: 12,
        },
      })

      await db.forumComment.create({
        data: {
          postId: createdPostIds[2],
          authorId: userMap.get('Samuel Mengistu')!,
          content:
            'The settlement timing issue is real. We lost 3 weeks on our first M-Pesa integration because we didn\'t account for the batch processing window.',
          likes: 8,
        },
      })

      const ngoziComment = await db.forumComment.create({
        data: {
          postId: createdPostIds[4],
          authorId: userMap.get('Ngozi Eze')!,
          content:
            'Is the life sciences outperformance driven by the Allele acquisition, or is it broader?',
          likes: 6,
        },
      })

      await db.forumComment.create({
        data: {
          postId: createdPostIds[4],
          authorId: userMap.get('Amara Diallo')!,
          parentId: ngoziComment.id,
          content:
            "Broader. Allele is the headline, but the diagnostics sub-basket is also performing well above baseline.",
          likes: 4,
        },
      })
    }

    // Return counts
    const userCount = await db.forumUser.count()
    const postCount = await db.forumPost.count()
    const commentCount = await db.forumComment.count()

    return NextResponse.json({
      seeded: true,
      counts: {
        users: userCount,
        posts: postCount,
        comments: commentCount,
      },
    })
  } catch (error) {
    console.error('Error seeding forum:', error)
    return NextResponse.json(
      { error: 'Failed to seed forum data' },
      { status: 500 }
    )
  }
}
