import { Users, Globe, Zap, Target, Search, LucideIcon } from "lucide-react";

export interface ProgramDetail {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  longDesc?: string;
  details: { label: string; value: string }[];
  icon: LucideIcon;
  color: string;
  link: string;
  image: string;
  stats?: { label: string; value: string }[];
  process?: { title: string; desc: string; extended?: string }[];
  howWeHelpIntro?: string;
  features?: { title: string; desc: string; icon?: string }[];
  unfairAdvantageTitle?: string;
  unfairAdvantageImages?: { left: string; right: string };
  companies?: { name: string; desc: string; focus: string; field: string; funding: string; teamSize: string; categories: string; location: string }[];
  isForYouIf?: string[];
  faqs?: { q: string; a: string }[];
  trackRecord?: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string; image: string };
  ideas?: { partner: string; title: string; desc: string; image?: string; partnerImage?: string }[];
  applicationCycles?: { cycle: string; opens: string; closes: string; cohortStart: string; status: 'open' | 'upcoming' | 'closed' }[];
  whatYouGet?: { title: string; desc: string; icon?: string }[];
}

export const programsData: ProgramDetail[] = [
  {
    id: "xhansa-fellowship",
    title: "xHansa Fellowship",
    tagline: "The Pioneering Enterprises Engine.",
    desc: "Our flagship 24-month human capital deployment engine. We intake 1,000 Xcitizens per cohort, embedding them into ten-person 'Pods' (Stacks) to build ProtoCos across nine civilizational fields.",
    longDesc: "The xHansa Program is the human capital engine of the Hanseatic League. It is fundamentally a military-grade knowledge-deployment pipeline, not an educational initiative or accelerator. The program intakes 1,000 Xcitizens per cohort and deploys them as 100 ten-person Stacks against 100 commissioned ProtoCos operating across the Nine Civilizational Fields. Every element, from archetype typing to pod formation to the quarterly Gate system, is engineered for one outcome: operational ventures that survive the 24-month cliff and scale independently.",
    details: [
      { label: "Duration", value: "24 Months" },
      { label: "Deployment", value: "100 Pods" },
      { label: "Focus", value: "9 Civ Fields" },
      { label: "Cadence", value: "Quarterly Gates" }
    ],
    stats: [
      { label: "Xcitizens Per Cohort", value: "1,000" },
      { label: "Stipend", value: "$500-$1,200/mo" },
      { label: "Equity Cliff", value: "23 Months" },
      { label: "Capital Target", value: "5x Multiplication" }
    ],
    process: [
      {
        title: "The 8-Week Crucible",
        desc: "Neural reprogramming involving 'The Shock' and 'The Wall' to certify OS installation under cognitive exhaustion. Candidates are systematically stripped of compliance conditioning and rebuilt with execution-first cognitive architecture.",
        extended: "During the Crucible, candidates undergo the Civilizational Field Typing Assessment, where they are sorted into the six Xcitizen Archetypes: Pilot, Builder, Hustler, Operator, Tracker, and Comms. The typing is not based on stated preference but observed behavior under stress, who leads when the plan fails, who stabilizes the group, who identifies the exit. This behavioral ground-truth determines pod composition for the entire 24-month deployment."
      },
      {
        title: "Q1: 0-to-1 Pilot (Months 1-6)",
        desc: "Build the Minimal Version; secure Anchor Partner LOI; deploy physical/digital asset. The first six months are a race from concept to working prototype with real-world deployment.",
        extended: "The focus is on achieving a working version and securing legitimacy through anchor partnerships. Each Pod must deliver a Minimal Version, not a slide deck, not a business plan, but a functioning asset deployed in the field. Securing an Anchor Partner LOI is a non-negotiable Gate requirement; without it, the Pod does not advance. This phase separates operators from theoreticians."
      },
      {
        title: "Q2: First Revenue (Months 7-12)",
        desc: "Hit exact mathematical metrics; debug all technical and operational failures. Revenue is the sole proof of product-market fit, no substitutes accepted.",
        extended: "Months 7-12 are dedicated to proving unit economics at baseline. Every metric, CAC, LTV, churn, throughput, must hit precise mathematical thresholds. Technical failures are debugged in real-time. Operational gaps are patched. This quarter is where romantic visions die and operational reality takes hold. Pods that cannot demonstrate sustainable unit economics by Gate 2 face the Kill Switch."
      },
      {
        title: "Q3: Expansion (Months 13-18)",
        desc: "Replicate pilot in 3-5 new geographies; author the permanent Playbook. Scaling is not optional. It is the proof that the model transfers across contexts.",
        extended: "Months 13-18 focus on scaling nodes to 3-5 locations. The pilot must be replicated in diverse geographies with different constraints, different regulatory environments, different supply chains, different customer behaviors. Simultaneously, the Pod authors the permanent Playbook: a codified, step-by-step operational manual that any future operator can execute without the original team. The Playbook is a Gate 3 deliverable."
      },
      {
        title: "Q4: Institutionalization (Months 19-24)",
        desc: "Replace the temporary Xcitizen stack with local permanent operators. Ensure the venture is operationally efficient (>80%) and ready for spin-out. Month 24 is a hard cliff: the stipend stops instantly.",
        extended: "The final phase ensures the venture can survive without its original builders. Local permanent operators are recruited and trained. Operational efficiency must exceed 80% across all KPIs. Month 24 is a hard cliff: the stipend stops instantly and there is no grace period. The top 3% of Xcitizens: the 'Keepers', transition to permanent payrolls within the spun-out entity. The remaining 97%, 'The Cycled', are severed with performance equity grants carrying 36-month vesting schedules. This is by design: the League builds ventures, not lifetime employment."
      }
    ],
    howWeHelpIntro: "We deploy you into a ten-person Pod with five complementary archetypes and arm you with the League's full infrastructure, from XEmbassy workspaces to anchor partner networks. In 24 months you will...",
    features: [
      { title: "The Supremacy Clause", desc: "Mandates absolute supersederation of individual interests by the League. Breakthroughs are shared across the network, no Pod hoards an advantage. When one Stack discovers a solution, every Stack benefits. Individual IP claims are subordinate to the League Commons.", icon: "Shield" },
      { title: "The Kill Switch", desc: "Immediate termination for failure to meet quarterly Gate thresholds. Zero margin for error. A Pod that misses Gate metrics is dissolved within 48 hours, assets redistributed, Xcitizens reassigned. There is no appeals process and no extension.", icon: "Zap" },
      { title: "Six Archetypes", desc: "Pods matched using Pilot, Builder, Hustler, Operator, Tracker, and Comms archetypes. Each archetype fills a precise operational role: Pilots set direction, Builders construct, Hustlers close, Operators maintain, Trackers surveil, and Comms translate. No Pod is complete without all six.", icon: "Users" },
      { title: "Neural Link Protocol", desc: "Real-time biometric and cognitive monitoring for optimal pod performance. Heart rate variability, sleep patterns, stress indicators, and cognitive load are tracked continuously. The system flags performance degradation before the Pod is aware of it, enabling preemptive intervention.", icon: "Activity" },
      { title: "Gate System", desc: "Quarterly performance gates with binary pass/fail outcomes. Each Gate has precise mathematical thresholds, no subjective evaluation, no committee votes. Either your Pod hits the numbers or it doesn't. The clarity of the Gate system eliminates politics and focuses every Pod on measurable execution.", icon: "Target" },
      { title: "League Commons", desc: "Shared IP, infrastructure, and intelligence across the entire Hansa network. When one Pod cracks a supply chain problem in Lagos, every Pod in Accra, Nairobi, and Cairo benefits immediately. The Commons accelerates every venture by eliminating redundant problem-solving.", icon: "Globe" }
    ],
    unfairAdvantageTitle: "The xHansa Unfair Advantage",
    unfairAdvantageImages: {
      left: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
    },
    isForYouIf: [
      "You are an informal economy operator, grassroots worker, or self-taught engineer.",
      "You thrive under extreme resource constraint and cognitive exhaustion.",
      "You are willing to surrender individual IP for the League Commons.",
      "You want to build backbone infrastructure for the Global South.",
      "You can commit to a 24-month deployment with no exit option before the cliff.",
      "You believe in collective intelligence over individual heroism."
    ],
    faqs: [
      { q: "What is an Xcitizen?", a: "Xcitizens are neither employees nor students; they are deployed operators who receive a flat, needs-based stipend ($500-$1,200/mo). They do not clock in, they do not receive benefits, and they are not guaranteed employment after 24 months. They are mission-deployed personnel whose compensation is tied to operational outcomes, not time served." },
      { q: "What happens after 24 months?", a: "Month 24 is a hard cliff. The top 3% of Xcitizens: the 'Keepers', transition to permanent payrolls within the spun-out entity. The remaining 97%, 'The Cycled', are severed with performance equity grants carrying 36-month vesting schedules. This is not a failure; it is the design. The League builds ventures, not careers." },
      { q: "How are pods formed?", a: "Pods are formed via a deterministic algorithm that weighs Deployment Classification and Archetype compatibility. The Civilizational Field Typing Assessment observes behavior under stress, not stated preference, to assign one of six Archetypes: Pilot, Builder, Hustler, Operator, Tracker, or Comms. The algorithm then composes Pods to maximize complementary strengths within the assigned field." },
      { q: "What is the Crucible?", a: "The Crucible is an 8-week psychological demolition and reconstruction process that overwrites compliance conditioning with execution capability. It consists of 'The Shock' (systematic destabilization of habitual thought patterns) and 'The Wall' (sustained cognitive exhaustion that strips away social performance). Those who survive emerge with an operational architecture, a new cognitive OS, optimized for high-stakes deployment under uncertainty." },
      { q: "What are the Nine Civilizational Fields?", a: "The Nine Civilizational Fields are the operational domains the League has identified as essential infrastructure for the Global South: Water Systems, Energy Systems, Food & Agriculture, Health & Mobility, Built Environment, Data & Intelligence, Logistics & Trade, Governance & Identity, and Education & Human Capital. Every ProtoCo is commissioned against one of these fields." },
      { q: "Can I leave the program early?", a: "Technically yes, but the cost is total forfeiture of all equity and performance grants. The program is designed as a commitment device: the 24-month cliff exists precisely because infrastructure cannot be built by people who have an easy exit. Early departures are rare and economically punitive." }
    ],
    trackRecord: [
      { label: "Xcitizens Per Cohort", value: "1,000" },
      { label: "Strike Zones (XEmbassies)", value: "190" },
      { label: "Civilizational Fields", value: "09" },
      { label: "Success Rate", value: "75%" }
    ],
    ideas: [
      { partner: "Director Hansa", title: "WaterX", desc: "Decentralized atmospheric water generation for arid zones using modular thermal units. Deployed across the Sahel with 99.7% uptime. [Water Systems]", partnerImage: "https://i.pravatar.cc/100?img=10" },
      { partner: "Strategic Lead", title: "PowerGrid", desc: "Peer-to-peer energy sharing for micro-grids in sub-Saharan Africa. Enables surplus solar redistribution between adjacent settlements. [Energy Systems]", partnerImage: "https://i.pravatar.cc/100?img=11" },
      { partner: "Command Tech", title: "MediLink", desc: "Cold-chain infrastructure for last-mile pharmaceutical delivery via autonomous ground vehicles. Active in 12 rural districts. [Health/Mobility]", partnerImage: "https://i.pravatar.cc/100?img=12" },
      { partner: "Field Ops Lead", title: "AgriVault", desc: "Blockchain-verified seed bank and crop insurance for smallholder farmers. Micro-premiums auto-deducted at harvest. [Food & Agriculture]", partnerImage: "https://i.pravatar.cc/100?img=19" },
      { partner: "Infrastructure Dir.", title: "CivicMesh", desc: "Decentralized mesh networking for off-grid communication in disaster zones. Zero internet dependency. [Data & Intelligence]", partnerImage: "https://i.pravatar.cc/100?img=20" },
      { partner: "Ops Commander", title: "EduForge", desc: "Deployable maker-space containers with CNC, 3D printing, and electronics labs for rapid prototyping in underserved regions. 90-day deployment cycle. [Education & Human Capital]", partnerImage: "https://i.pravatar.cc/100?img=27" }
    ],
    testimonial: {
      quote: "The Hansa model is fundamentally a military-grade knowledge-deployment pipeline. It's the only way to build infrastructure at the scale required for 171 African nations.",
      author: "XHansa Director",
      role: "Strategic Command",
      image: "https://i.pravatar.cc/100?img=1"
    },
    companies: [
      { name: "Nebula", desc: "the decentralized protocol for planetary-scale logistics.", focus: "Logistics Protocol", field: "Mobility", funding: "$2M Pre-Seed", teamSize: "10-25", categories: "Logistics / Protocol", location: "Lagos" },
      { name: "TerraHash", desc: "the blockchain layer for managing independent land registries.", focus: "Land Registry", field: "Built Env", funding: "$3M Seed", teamSize: "15-30", categories: "Blockchain / GovTech", location: "Accra" }
    ],
    applicationCycles: [
      { cycle: "Cohort 3, 2025", opens: "Mar 1, 2025", closes: "May 15, 2025", cohortStart: "Jul 2025", status: "open" },
      { cycle: "Cohort 4, 2026", opens: "Mar 1, 2026", closes: "May 15, 2026", cohortStart: "Jul 2026", status: "upcoming" },
    ],
    whatYouGet: [
      { title: "Needs-Based Stipend", desc: "$500–$1,200/month operational stipend. No salary, no benefits. Mission-deployed compensation tied to outcomes, not time served.", icon: "Zap" },
      { title: "XEmbassy Workspace", desc: "Access to 190 strike zones across Africa and the Global South. Physical infrastructure for building and deploying.", icon: "Globe" },
      { title: "Anchor Partner Network", desc: "Pre-negotiated LOIs with institutional partners ready to pilot your solution from Day 1.", icon: "Users" },
      { title: "Performance Equity", desc: "Equity grants with 36-month vesting for top performers. The top 3% transition to permanent payroll.", icon: "Target" },
      { title: "League Commons Access", desc: "Shared IP, infrastructure, and intelligence across the entire Hansa network: every breakthrough benefits every Pod.", icon: "Shield" },
      { title: "Post-Deployment Support", desc: "Spun-out ventures receive continued access to the Playbook, network, and institutional backing.", icon: "Activity" },
    ],
    icon: Globe,
    color: "bg-[#111111]",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    link: "/programs/the-routes"
  },
  {
    id: "xcelero-accelerator",
    title: "xCelero Accelerator",
    tagline: "High-velocity launchpad.",
    desc: "A 4-month immersive experience for exceptional founders. We provide an elite mentorship syndicate and a funding package that breaks conventional boundaries.",
    longDesc: "xCelero Labs is a high-velocity launchpad for exceptional founders looking to redefine the future of innovation. Our program offers a unique blend of immersive experiences, top-tier mentorship from the Hanseatic Syndicate, and unparalleled funding opportunities. The accelerator is not a classroom. It is a crucible where ventures are stress-tested, refined, and launched with institutional-grade preparation and capital behind them.",
    details: [
      { label: "Funding", value: "$620k Package" },
      { label: "Equity", value: "3% Fixed" },
      { label: "Batch Size", value: "20 Companies" },
      { label: "Residency", value: "19 Cities" }
    ],
    stats: [
      { label: "Initial Capital", value: "$120,000" },
      { label: "Uncapped SAFE", value: "$500,000" },
      { label: "Funding Rate", value: "75% Success" },
      { label: "Mentor Ratio", value: "3:1" }
    ],
    process: [
      {
        title: "Deep Dive Audit",
        desc: "Initial 2-week technical and market analysis to identify leverage points. Every aspect of the venture, technology stack, competitive landscape, unit economics, team dynamics, go-to-market strategy, is dissected to surface high-multiplication leverage points.",
        extended: "We analyze every aspect of your venture to identify the high-multiplication leverage points. This is not a superficial review, partners embed with your team for two weeks, attending standups, reviewing code, interviewing customers, and stress-testing assumptions. The output is a leverage map that dictates the entire program strategy for your company."
      },
      {
        title: "Office Hours",
        desc: "Weekly one-on-one sessions with partners, akin to a doctoral journey. Each session targets a specific domain: product development, marketing, sales, financial planning, recruitment, or management.",
        extended: "We address product development, marketing, sales, financial planning, recruitment, and management dilemmas. These are not generic advisory sessions, partners prepare for each meeting as if defending a thesis. Founders leave every Office Hour with a specific, time-boxed action plan. The relationship is closer to a doctoral advisor than a consultant: partners are personally invested in your outcome."
      },
      {
        title: "Group Office Hours",
        desc: "Collaborative platform to exchange ideas with peers from similar industries. Knowledge sharing, feedback, and vibrant discussions across the entire cohort.",
        extended: "Find a community of confident founders who share your journey. Group Office Hours create a structured forum where founders from similar industries exchange hard-won insights, challenge each other's assumptions, and surface blind spots that individual sessions miss. The cohort becomes a peer review board, and often, the most valuable feedback comes not from partners but from other founders who are solving adjacent problems."
      },
      {
        title: "The Pitch Matrix",
        desc: "Intensive training in narrative construction for institutional capital. Founders learn to frame their venture as a high-conviction investment thesis, not a product demo.",
        extended: "Equip yourself with the skills and support necessary to soar when you face investors. The Pitch Matrix goes beyond slide design. It teaches the psychology of institutional capital allocation. Founders learn to anticipate objection patterns, structure information asymmetries, and construct narratives that survive hostile questioning. Every founder presents to a mock investment committee of former VC partners before Demo Day."
      },
      {
        title: "Demo Day",
        desc: "Presentations to thousands of VC firms, angel investors, and institutional directors. A launchpad for the future where you showcase your vision to the capital markets.",
        extended: "A launchpad for the future where you showcase your vision. Demo Day is not a rehearsed performance. It is a live-fire exercise. Founders present to a curated audience of thousands of VC firms, angel investors, and strategic partners who have been pre-briefed on each company. The format is designed to create competitive tension and accelerate due diligence timelines from months to weeks."
      }
    ],
    howWeHelpIntro: "We embed with your company for 4 months across 19 cities, pairing you with dedicated partners who treat your success like a doctoral thesis, and back it with $620k in institutional-grade capital. In 4 months you will...",
    features: [
      { title: "Hyper-Localized Global Immersion", desc: "Immersion takes startups through diverse innovation ecosystems in multiple global cities for unique market insights. Each city is selected to stress-test a different assumption about your business model, regulatory risk in one, customer behavior in another, supply chain resilience in a third. Across 19 cities, you build a global mental model that local-only founders cannot match.", icon: "Globe" },
      { title: "Elite Mentorship Syndicate", desc: "A curated group of serial entrepreneurs, tech titans, and industry disruptors committed to your success. Mentors are not figureheads, they commit to a minimum of 10 hours per month per company and are evaluated on founder outcomes, not attendance.", icon: "Users" },
      { title: "Elite Funding Package", desc: "$120,000 for 3% equity at $5M valuation cap + $500,000 uncapped SAFE. The structure is designed to align incentives: the fixed equity prevents dilution anxiety, while the uncapped SAFE provides follow-on capital without renegotiation.", icon: "Zap" },
      { title: "Alumni Economic Carry", desc: "Economic participation in the fund's carry equivalent to profit from $10,000 of 'money at work,' vesting after 1 year. Alumni are not just graduates, they become economic stakeholders in every future cohort's success.", icon: "Activity" },
      { title: "Pitch Matrix Training", desc: "Institutional-grade narrative construction that goes beyond slide design. Founders learn the psychology of capital allocation, anticipate objection patterns, and construct investment theses that survive hostile questioning. Every founder presents to a mock investment committee of former VC partners before Demo Day.", icon: "Target" },
      { title: "Cohort Peer Network", desc: "Structured forums where founders from similar industries exchange hard-won insights, challenge assumptions, and surface blind spots. The cohort becomes a peer review board, often the most valuable feedback comes not from partners but from other founders solving adjacent problems.", icon: "Workflow" }
    ],
    unfairAdvantageTitle: "The Accelerator Unfair Advantage",
    unfairAdvantageImages: {
      left: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
    },
    isForYouIf: [
      "You are an exceptional founder looking to redefine the future of innovation.",
      "You want to think bigger, execute faster, and 10x your odds.",
      "You value individualized support over one-size-fits-all playbooks.",
      "You are ready for a transformative 4-month journey.",
      "You want access to institutional capital networks that are otherwise closed.",
      "You are building in a domain that requires global market understanding from Day 1."
    ],
    faqs: [
      { q: "What is the investment deal?", a: "We offer $120,000 for 3% equity at a $5M post-money valuation cap, plus a $500,000 uncapped SAFE. The equity portion provides initial runway; the uncapped SAFE ensures follow-on capital is available without the friction of a new negotiation." },
      { q: "What is the success rate?", a: "We have a 75% success rate in securing follow-on funding within 6 months post-program. This is not aspirational. It is audited and verified across every cohort since inception." },
      { q: "Where does the program take place?", a: "Immersion takes startups through multiple global innovation ecosystems across 19 cities. Each city is selected to expose founders to different market dynamics, regulatory environments, and customer behaviors. The geographic diversity is not a perk. It is a core component of the program design." },
      { q: "How are mentors matched to companies?", a: "Mentors are matched based on domain expertise, stage experience, and complementary skill gaps identified during the Deep Dive Audit. Each company receives a minimum of three dedicated mentors, and the matching is reviewed bi-weekly to ensure relevance as the company evolves." },
      { q: "What happens after Demo Day?", a: "Demo Day is the beginning, not the end. Alumni receive ongoing access to the Syndicate network, quarterly check-ins with partners, and the Alumni Economic Carry, a financial stake in every future cohort's success. The average alumnus closes their next round within 6 weeks of Demo Day." }
    ],
    trackRecord: [
      { label: "Batch Size", value: "20" },
      { label: "Funding Package", value: "$620k" },
      { label: "Success Rate", value: "75%" },
      { label: "Total Mult", value: "10x" }
    ],
    ideas: [
      { partner: "Venture Partner", title: "FinFlow", desc: "Cross-border settlement layer for SMEs using liquidity pools and AI risk modeling. Reduces settlement time from 5 days to 4 hours.", partnerImage: "https://i.pravatar.cc/100?img=13" },
      { partner: "Investment Director", title: "HealthSync", desc: "Remote diagnostics platform connecting rural clinics to specialist hubs via satellite link. Active in 3 countries, 200+ clinics.", partnerImage: "https://i.pravatar.cc/100?img=14" },
      { partner: "Syndicate Lead", title: "EduBridge", desc: "Adaptive learning infrastructure for refugee and displaced populations. Offline-first with mesh sync capabilities.", partnerImage: "https://i.pravatar.cc/100?img=21" },
      { partner: "Portfolio Lead", title: "LogiChain", desc: "Predictive logistics orchestration for emerging market supply chains. AI-driven route optimization reducing spoilage by 40%.", partnerImage: "https://i.pravatar.cc/100?img=22" },
      { partner: "Capital Partner", title: "GreenLedger", desc: "Carbon credit verification platform using satellite imagery and IoT sensors for emerging market offset projects. Real-time MRV at 80% lower cost.", partnerImage: "https://i.pravatar.cc/100?img=28" }
    ],
    testimonial: {
      quote: "xCelero isn't just an accelerator; it's a partnership. They provided the capital and mentorship we needed to go from a prototype to a category leader in record time.",
      author: "Alumni Founder",
      role: "Class of '25",
      image: "https://i.pravatar.cc/100?img=2"
    },
    companies: [
      { name: "EkoHeat", desc: "the next-gen geothermal system for sustainable urban heating.", focus: "Geothermal", field: "Energy", funding: "$5M Series A", teamSize: "30-60", categories: "Energy / Infra", location: "Cairo" },
      { name: "AgriDrone", desc: "the automated drone solution for precision nutrient application.", focus: "AgriTech", field: "Food & Ag", funding: "$2M Seed", teamSize: "20-45", categories: "AgTech / Drones", location: "Nairobi" }
    ],
    applicationCycles: [
      { cycle: "Batch 7, Spring 2025", opens: "Jan 15, 2025", closes: "Mar 31, 2025", cohortStart: "May 2025", status: "open" },
      { cycle: "Batch 8, Fall 2025", opens: "Jul 1, 2025", closes: "Sep 15, 2025", cohortStart: "Oct 2025", status: "upcoming" },
      { cycle: "Batch 9, Spring 2026", opens: "Jan 15, 2026", closes: "Mar 31, 2026", cohortStart: "May 2026", status: "upcoming" },
    ],
    whatYouGet: [
      { title: "$120K for 3% Equity", desc: "Fixed equity deal at $5M valuation cap. No dilution anxiety, no renegotiation. Clean, founder-friendly terms from Day 1.", icon: "Zap" },
      { title: "$500K Uncapped SAFE", desc: "Follow-on capital available without friction. The uncapped SAFE ensures you can keep building when the program ends.", icon: "Target" },
      { title: "Dedicated Partner Support", desc: "3:1 mentor ratio with minimum 10 hours/month per company. Partners prepare for every session like defending a thesis.", icon: "Users" },
      { title: "19-City Global Immersion", desc: "Each city stress-tests a different business assumption: regulatory risk, customer behavior, supply chain resilience.", icon: "Globe" },
      { title: "Demo Day Access", desc: "Present to thousands of pre-briefed VC firms, angel investors, and strategic partners. Competitive tension accelerates due diligence.", icon: "Activity" },
      { title: "Alumni Economic Carry", desc: "Profit from $10,000 of 'money at work' in the fund's carry. You become an economic stakeholder in every future cohort's success.", icon: "Shield" },
    ],
    icon: Zap,
    color: "bg-[#FFD700]",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
    link: "/programs/xcelero-accelerator"
  },
  {
    id: "inception-studios",
    title: "The Inception Studios",
    tagline: "Co-creation with the world's giants.",
    desc: "At the intersection of entrepreneurship and governance. We partner with Fortune 500s, governments, and foundations to identify systemic bottlenecks and build market-defining companies from scratch.",
    longDesc: "Our Studio model, inspired by Thomas Edison's Menlo Park, encompasses labs where seasoned scientists and operational executives collaborate to fuel the creation of companies from scratch. The Studio Process begins with a strategic kickoff defining clear success criteria, followed by research that creates a technology blueprint. A cohort of vetted startup teams then addresses identified needs, and Pilot Partnerships validate technologies and assess investment potential. The result: high-velocity company creation that thrives on speed, agility, and institutional-grade resources.",
    details: [
      { label: "Model", value: "Venture Studio" },
      { label: "Partners", value: "Fortune 500 / GOV" },
      { label: "Outcome", value: "Market-Defining NewCos" },
      { label: "IP Ownership", value: "Studio Model" }
    ],
    process: [
      {
        title: "Ideation & Inception",
        desc: "Extensive market research to identify key challenges and disruptive potential. A team of scientists and industry experts brainstorm 'what if' hypotheses that target systemic bottlenecks, not incremental improvements.",
        extended: "The Studio Process begins with a strategic kickoff, defining clear success criteria and investment thesis parameters. Research creates a technology blueprint, a detailed map of the technical landscape, competitive dynamics, and regulatory environment. This is not whiteboard speculation; it is evidence-grounded hypothesis generation backed by interdisciplinary teams with deep domain expertise."
      },
      {
        title: "Prototype Companies (ProtoCos)",
        desc: "Embryonic versions of potential businesses with clear objectives and resources. ProtoCos undergo numerous iterations based on feedback, market signals, and operational learning, each cycle sharpening the value proposition.",
        extended: "A cohort of vetted startup teams addresses identified needs through ProtoCos, lightweight, resource-constrained experiments designed to validate or invalidate core assumptions rapidly. ProtoCos are not permanent; they are disposable vehicles for learning. Those that survive iteration graduate to the NewCo stage. Those that don't are cleanly wound down with lessons absorbed into the next cycle."
      },
      {
        title: "NewCo Stage",
        desc: "Substantial capital from xCelero Labs enables the development of platforms and teams. Building full teams, selecting board of directors and CEO, and working toward product development and market readiness.",
        extended: "Surviving ProtoCos receive substantial capital and transition into NewCos, formal venture entities with independent governance. This stage involves recruiting a full executive team, selecting a board of directors and CEO, and transitioning from experimental iteration to deliberate product development and go-to-market execution. The Studio provides operational infrastructure, legal, finance, HR, so the NewCo team can focus exclusively on building and selling."
      },
      {
        title: "Spinout & Scale-Up",
        desc: "NewCo spun out as an independent entity. Seeking external investment, forming strategic partnerships, and scaling operations beyond the Studio's initial framework.",
        extended: "Pilot Partnerships validate technologies and assess investment potential. Once validated, the NewCo is spun out as an independent entity with its own cap table, governance, and strategic direction. The Studio's involvement transitions from operator to shareholder. The NewCo seeks external investment, forms strategic partnerships, and scales operations using the Playbook and infrastructure built during the Studio phase."
      }
    ],
    howWeHelpIntro: "We co-create ventures with Fortune 500 partners and government agencies, providing the full Studio infrastructure, from technology blueprinting to IP powerhouses to first-customer contracts. From ideation to spinout you will...",
    features: [
      { title: "High-Velocity Creation", desc: "A journey designed to accelerate startups with unparalleled speed. The Studio compresses years of validation into months by eliminating the friction of independent company formation, shared infrastructure, parallel experimentation, and rapid kill decisions keep the velocity high.", icon: "Zap" },
      { title: "Technology Blueprinting", desc: "Research backed by interdisciplinary teams creating solid foundations. Before a single line of code is written or a single hire is made, the Studio produces a technology blueprint, a comprehensive analysis of the technical landscape, competitive dynamics, and feasibility thresholds that de-risk the entire venture creation process.", icon: "Workflow" },
      { title: "Fortune 500 Network", desc: "Direct access to industry giants and government agencies for co-creation. These are not advisory relationships, they are commercial partnerships with real procurement budgets, pilot programs, and distribution channels. Studio ventures get their first customers before they are formally incorporated.", icon: "Users" },
      { title: "IP Powerhouse", desc: "Shared resources and expertise that would otherwise be inaccessible. The Studio's IP portfolio, patents, trade secrets, proprietary datasets, is available to all ProtoCos and NewCos. This shared IP infrastructure gives Studio ventures an unfair advantage over independent startups starting from zero.", icon: "Shield" },
      { title: "ProtoCo Rapid Validation", desc: "Lightweight, resource-constrained experiments designed to validate or invalidate core assumptions rapidly. ProtoCos are disposable vehicles for learning, those that survive iteration graduate to NewCo; those that don't are cleanly wound down with lessons absorbed into the next cycle.", icon: "Activity" },
      { title: "Operational Infrastructure", desc: "The Studio provides legal, finance, HR, and governance infrastructure so the NewCo team can focus exclusively on building and selling. No distractions, no administrative overhead, just pure execution against the validated blueprint.", icon: "Globe" }
    ],
    unfairAdvantageTitle: "The Studio Unfair Advantage",
    unfairAdvantageImages: {
      left: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    isForYouIf: [
      "You are a seasoned scientist or operational executive looking to fuel growth.",
      "You want to tackle complex issues affecting cities and industries.",
      "You believe in the power of shared resources and expertise.",
      "You want to build a market-defining company from Day 0.",
      "You have deep domain expertise but need the infrastructure to commercialize it.",
      "You want to leverage Fortune 500 and government partnerships from the start."
    ],
    faqs: [
      { q: "What is a ProtoCo?", a: "ProtoCos are embryonic versions of potential businesses with clear objectives and resources for development. They are lightweight, resource-constrained experiments designed to validate or invalidate core assumptions rapidly. ProtoCos that survive iteration graduate to the NewCo stage; those that don't are cleanly wound down with lessons absorbed into the next cycle." },
      { q: "How are partners involved?", a: "We work with industry leaders, governments, and entrepreneurs to address complex challenges. Partners provide more than advice, they offer commercial relationships, pilot programs, procurement budgets, and distribution channels. Fortune 500 partners serve as first customers before the NewCo is formally incorporated." },
      { q: "What is the end goal?", a: "To establish a lightning-speed company creation machine that thrives on speed and agility. The end goal is a spun-out, independent NewCo with its own governance, external investment, and strategic partnerships, a market-defining company that originated from the Studio but no longer depends on it." },
      { q: "How does the Studio Process work end-to-end?", a: "The Studio Process begins with a strategic kickoff defining clear success criteria. Research creates a technology blueprint. A cohort of vetted startup teams addresses identified needs through ProtoCos. Pilot Partnerships validate technologies and assess investment potential. Surviving ProtoCos become NewCos with capital and teams. Finally, successful NewCos spin out as independent entities. The entire cycle is designed to compress years of validation into months." },
      { q: "Who owns the IP?", a: "Under the Studio model, IP is initially held by the Studio and shared across ProtoCos and NewCos. Upon spinout, the NewCo receives a perpetual license to relevant IP and ownership of IP generated during the NewCo stage. This shared IP infrastructure gives Studio ventures an unfair advantage over independent startups." }
    ],
    trackRecord: [
      { label: "Companies Globally", value: "100+" },
      { label: "Success Rate", value: "75%" },
      { label: "Total Investment", value: "$1Bn" },
      { label: "Jobs Created", value: "20k" }
    ],
    ideas: [
      { partner: "Studio Lead", title: "CivicID v2", desc: "Next-gen zero-knowledge identity protocol for independent governance. Enables privacy-preserving citizen verification at national scale.", partnerImage: "https://i.pravatar.cc/100?img=15" },
      { partner: "Gov Partner", title: "TaxStack", desc: "Automated VAT collection and reconciliation for digital-first emerging economies. Reduces leakage by 60% in pilot markets.", partnerImage: "https://i.pravatar.cc/100?img=16" },
      { partner: "Enterprise Lead", title: "GridOS", desc: "AI-powered grid management platform for national utilities. Predictive load balancing reducing outages by 35%.", partnerImage: "https://i.pravatar.cc/100?img=23" },
      { partner: "Research Dir.", title: "MedForge", desc: "Decentralized pharmaceutical manufacturing platform for essential medicines. Certified GMP micro-factories deployable in 90 days.", partnerImage: "https://i.pravatar.cc/100?img=24" },
      { partner: "Venture Architect", title: "TradeRoute", desc: "Digital trade corridor platform connecting African SMEs to EU procurement pipelines. Compliance-as-a-service for cross-border B2B transactions.", partnerImage: "https://i.pravatar.cc/100?img=29" }
    ],
    testimonial: {
      quote: "The Studio model effectively mitigates early-stage risks. It's about becoming a high-velocity company creation machine.",
      author: "Hansa Scientist",
      role: "Lead Researcher",
      image: "https://i.pravatar.cc/100?img=3"
    },
    companies: [
      { name: "CivicID", desc: "the biometric framework for secure digital identity in emerging markets.", focus: "Identity", field: "Data & Int", funding: "$3M Seed", teamSize: "15-40", categories: "GovTech / Identity", location: "Cape Town" }
    ],
    applicationCycles: [
      { cycle: "Studio Cycle 5, 2025", opens: "Feb 1, 2025", closes: "Apr 30, 2025", cohortStart: "Jun 2025", status: "open" },
      { cycle: "Studio Cycle 6, 2026", opens: "Feb 1, 2026", closes: "Apr 30, 2026", cohortStart: "Jun 2026", status: "upcoming" },
    ],
    whatYouGet: [
      { title: "Technology Blueprint", desc: "Comprehensive analysis of the technical landscape, competitive dynamics, and feasibility thresholds before a single line of code is written.", icon: "Workflow" },
      { title: "Fortune 500 First Customers", desc: "Commercial partnerships with real procurement budgets, pilot programs, and distribution channels. Your first customers are secured before incorporation.", icon: "Users" },
      { title: "Shared IP Portfolio", desc: "Access to the Studio's patents, trade secrets, and proprietary datasets. An unfair advantage over independent startups starting from zero.", icon: "Shield" },
      { title: "Full Operational Stack", desc: "Legal, finance, HR, and governance infrastructure provided so your team can focus exclusively on building and selling.", icon: "Globe" },
      { title: "Rapid ProtoCo Validation", desc: "Lightweight experiments designed to validate or invalidate core assumptions fast. Kill decisions keep velocity high.", icon: "Zap" },
      { title: "Spinout to Independence", desc: "Graduated NewCos receive their own cap table, governance, and strategic direction with Studio transitioning to shareholder.", icon: "Target" },
    ],
    icon: Target,
    color: "bg-[#00C3C3]",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    link: "/programs/inception-studios"
  },
  {
    id: "quest-fellowship",
    title: "Quest Fellowship",
    tagline: "From Ideas to Impact, Powered by Queen's University.",
    desc: "A semester-long initiative developed by AirDrop Labs in collaboration with the Dunin-Deshpande Queen's Innovation Centre (DDQIC) at Queen's University, equipping young minds with the tools to transform ideas, technologies, or passions into impactful ventures.",
    longDesc: "More than just a conventional entrepreneurship program, Quest Fellowship is a global movement tailored for unconventional thinkers and ecosystem amplifiers from around the world. It is designed for those who aspire to address challenges on both global and local scales through innovation-driven entrepreneurship, fostering a sense of purpose and impact (#Ikigai) while integrating into the worldwide workforce. Quest transcends traditional boundaries, offering a comprehensive blend of education, mentorship, and support: curated lectures by acclaimed faculty members from Queen's University and hands-on boot camps held in diverse locations, providing an immersive learning experience like no other. The program focuses on emerging markets because therein lies the greatest potential for impact: tackling real-world problems, generating employment opportunities, and driving sustainable growth through innovative solutions that uplift communities and leave a lasting legacy.",
    details: [
      { label: "Partner", value: "DDQIC / Queen's" },
      { label: "Format", value: "Semester-Long" },
      { label: "Focus", value: "Emerging Markets" },
      { label: "Curriculum", value: "Disciplined Entrepreneurship" }
    ],
    stats: [
      { label: "Program Stages", value: "3: Explore, Ignite, Launch" },
      { label: "Faculty", value: "Queen's University" },
      { label: "Methodology", value: "MIT 24-Step Framework" },
      { label: "Format", value: "Self-Paced + Live" }
    ],
    process: [
      {
        title: "Explore",
        desc: "The first stage of the Quest Fellowship. Fellows begin their entrepreneurial journey by completing assignments, attending lectures, engaging in quizzes, and actively participating in biweekly office hours. This stage is about discovery: identifying the problem you want to solve and the market you want to serve.",
        extended: "The Explore stage is designed to help you find your Ikigai: the intersection of what you love, what the world needs, what you're good at, and what you can be rewarded for. Through bite-sized video lectures curated by Queen's University faculty and hands-on assignments drawn from the Disciplined Entrepreneurship framework, you'll validate your initial idea, understand your target market, and begin building the foundation for a viable venture."
      },
      {
        title: "Ignite",
        desc: "Advancement to the Ignite stage requires demonstrated commitment and progress. Fellows who show dedication on their entrepreneurial journey unlock new opportunities: tailored mentorship, deeper market access, and resources to refine their venture.",
        extended: "The Ignite stage is where ideas catch fire. Fellows who have demonstrated commitment through consistent assignment completion, lecture attendance, and active office hour participation gain access to personalized mentorship from experienced entrepreneurs and industry experts. This stage focuses on customer discovery, value proposition refinement, and building a Minimum Viable Product (MVP). Hands-on boot camps in diverse locations provide immersive, cross-cultural learning experiences."
      },
      {
        title: "Launch",
        desc: "The final stage unlocks the full power of the Quest ecosystem: seed funding to scale, tailored mentorship from seasoned operators, and market access to take your venture from prototype to real-world impact.",
        extended: "The Launch stage is where ventures become real. Fellows who have successfully navigated Explore and Ignite gain access to seed funding, strategic mentorship from operators who have built and scaled companies, and direct market access to emerging economies where their solutions can have the greatest impact. This stage is about execution: landing pilot customers, generating revenue, and building the operational foundation for sustainable growth."
      }
    ],
    howWeHelpIntro: "We provide a comprehensive blend of education, mentorship, and support: curated lectures by Queen's University faculty, hands-on boot camps in diverse locations, and a self-paced curriculum built on MIT's Disciplined Entrepreneurship framework. Through three progressive stages you will...",
    features: [
      { title: "Queen's University Curriculum", desc: "Curated lectures by acclaimed faculty members from one of Canada's premier research universities. The curriculum draws from Disciplined Entrepreneurship: 24 Steps to a Successful Startup by Bill Aulet, developed at the Martin Trust Center for MIT Entrepreneurship, a systematic, proven approach to venture creation.", icon: "Globe" },
      { title: "Three-Stage Progression", desc: "The program structure revolves around three distinct stages (Explore, Ignite, and Launch), each unlocking new opportunities and resources. Advancement hinges on your commitment and dedication, demonstrated through assignments, lecture attendance, quizzes, and active participation in biweekly office hours.", icon: "Zap" },
      { title: "Self-Paced Learning", desc: "Quest is a self-paced program offering a wealth of training materials including bite-sized video lectures. Whether you're a full-time student or a working professional, the program adapts to your schedule while maintaining rigorous standards for advancement.", icon: "Activity" },
      { title: "Hands-On Boot Camps", desc: "Immersive boot camps held in diverse locations around the world, providing experiential learning that goes beyond the classroom. These boot camps are designed to stress-test your venture in real-world environments and expose you to different market dynamics.", icon: "Target" },
      { title: "Seed Funding & Market Access", desc: "Each stage unlocks new resources, from seed funding to tailored mentorship and direct market access to emerging economies. Quest focuses on emerging markets because therein lies the greatest potential for impact: real-world problems, employment generation, and sustainable growth.", icon: "Users" },
      { title: "Biweekly Office Hours", desc: "Regular one-on-one and group sessions with mentors and program leaders. These aren't generic check-ins. They're targeted working sessions designed to unblock your specific challenges and accelerate your venture's progress.", icon: "Workflow" }
    ],
    unfairAdvantageTitle: "The Quest Unfair Advantage",
    unfairAdvantageImages: {
      left: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
    },
    isForYouIf: [
      "You are an unconventional thinker who wants to address challenges on a global or local scale.",
      "You are an ecosystem amplifier looking to drive innovation-driven entrepreneurship.",
      "You want to find your Ikigai: purpose, impact, and sustainable livelihood.",
      "You are committed to building ventures that create employment and drive sustainable growth in emerging markets.",
      "You value a structured, systematic approach to entrepreneurship backed by MIT's Disciplined Entrepreneurship framework.",
      "You want access to Queen's University faculty, mentorship, and global boot camp experiences."
    ],
    faqs: [
      { q: "What is the Quest Fellowship?", a: "Quest Fellowship is a semester-long initiative developed by AirDrop Labs in collaboration with the Dunin-Deshpande Queen's Innovation Centre (DDQIC) at Queen's University. It equips young minds with the tools to transform ideas, technologies, or passions into impactful ventures that contribute to shaping the future." },
      { q: "How does the three-stage structure work?", a: "The program revolves around three stages: Explore, Ignite, and Launch. Advancement through stages hinges on your commitment and dedication: completing assignments, attending lectures, engaging in quizzes, and actively participating in biweekly office hours. Each stage unlocks new opportunities and resources, from mentorship to seed funding and market access." },
      { q: "What curriculum does Quest use?", a: "The curriculum draws inspiration from the systematic approach outlined in Disciplined Entrepreneurship: 24 Steps to a Successful Startup by Bill Aulet, developed at the Martin Trust Center for MIT Entrepreneurship. This is delivered through bite-sized video lectures curated by Queen's University faculty." },
      { q: "Why does Quest focus on emerging markets?", a: "Because therein lies the greatest potential for impact. Quest is dedicated to tackling real-world problems, generating employment opportunities, and driving sustainable growth through innovative solutions that uplift communities and leave a lasting legacy." },
      { q: "Is the program full-time?", a: "No. Quest is a self-paced program offering a wealth of training materials including bite-sized video lectures. It's designed to accommodate both full-time students and working professionals, while maintaining rigorous standards for advancement through the three stages." }
    ],
    trackRecord: [
      { label: "Program Stages", value: "3" },
      { label: "University Partner", value: "Queen's" },
      { label: "Methodology", value: "MIT 24-Step" },
      { label: "Active Cohort", value: "Cohort 2" }
    ],
    ideas: [
      { partner: "Program Director", title: "AquaReach", desc: "Low-cost water purification systems for rural communities in East Africa. Solar-powered, modular, and deployable within 48 hours. [Water Systems]", partnerImage: "https://i.pravatar.cc/100?img=17" },
      { partner: "Fellow Lead", title: "SkillBridge", desc: "Digital apprenticeship platform connecting informal economy workers to certified training and formal employment pathways across West Africa. [Education & Human Capital]", partnerImage: "https://i.pravatar.cc/100?img=18" },
      { partner: "Venture Mentor", title: "CropWise", desc: "AI-powered crop advisory for smallholder farmers using satellite imagery and local weather data. Increases yields by 30% in pilot regions. [Food & Agriculture]", partnerImage: "https://i.pravatar.cc/100?img=25" },
      { partner: "Queen's Faculty", title: "MedConnect", desc: "Telemedicine platform for underserved communities with offline-capable diagnostics and AI-assisted triage. Active in 5 countries. [Health & Mobility]", partnerImage: "https://i.pravatar.cc/100?img=26" },
      { partner: "DDQIC Lead", title: "GreenGrid", desc: "Decentralized renewable energy marketplace enabling peer-to-peer solar trading in urban informal settlements. [Energy Systems]", partnerImage: "https://i.pravatar.cc/100?img=30" }
    ],
    testimonial: {
      quote: "Quest Fellowship isn't just about building companies; it's about finding your Ikigai and creating lasting impact in the communities that need it most.",
      author: "Quest Fellow",
      role: "Cohort 1 Graduate",
      image: "https://i.pravatar.cc/100?img=4"
    },
    companies: [
      { name: "AquaReach", desc: "low-cost water purification for rural East Africa.", focus: "Water Purification", field: "Water Systems", funding: "$500k Seed", teamSize: "5-10", categories: "Water / Infra", location: "Kampala" }
    ],
    applicationCycles: [
      { cycle: "Cohort 3, Spring 2025", opens: "Apr 1, 2025", closes: "Jun 15, 2025", cohortStart: "Aug 2025", status: "open" },
      { cycle: "Cohort 4, Fall 2025", opens: "Sep 1, 2025", closes: "Nov 15, 2025", cohortStart: "Jan 2026", status: "upcoming" },
    ],
    whatYouGet: [
      { title: "Queen's University Curriculum", desc: "Curated lectures by acclaimed faculty. The MIT Disciplined Entrepreneurship 24-step framework delivered through bite-sized video content.", icon: "Globe" },
      { title: "Three-Stage Progression", desc: "Explore, Ignite, and Launch, each stage unlocks new resources. Advancement based on demonstrated commitment, not arbitrary timelines.", icon: "Zap" },
      { title: "Self-Paced Flexibility", desc: "Designed for both full-time students and working professionals. Bite-sized lectures that adapt to your schedule without compromising rigor.", icon: "Activity" },
      { title: "Hands-On Boot Camps", desc: "Immersive experiences in diverse locations, stress-testing your venture in real-world environments and different market dynamics.", icon: "Target" },
      { title: "Seed Funding Access", desc: "Launch stage fellows unlock seed funding to take their venture from prototype to real-world impact in emerging markets.", icon: "Users" },
      { title: "Biweekly Office Hours", desc: "Targeted working sessions with mentors and program leaders designed to unblock your specific challenges and accelerate progress.", icon: "Workflow" },
    ],
    icon: Search,
    color: "bg-[#6366F1]",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    link: "/programs/quest-fellowship"
  }
];
