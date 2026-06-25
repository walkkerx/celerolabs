export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "investment" | "product-programs" | "business-community" | "finance-operations" | "research";
  bio: string;
  location: string;
  isFounder?: boolean;
}

export const teamData: TeamMember[] = [
  // Founder
  {
    id: "0",
    name: "Abraham Walker",
    role: "Founder & CEO",
    category: "investment",
    bio: "Founded xCelero to systematize venture creation and infrastructure development for emerging markets. Combines deep operating experience across Africa, the Middle East, and North America with a conviction that the Global South needs platforms, not pilots.",
    location: "Nairobi, Kenya",
    isFounder: true,
  },

  // Investment & Governance
  {
    id: "1",
    name: "Amina Osei-Mensah",
    role: "Managing Partner",
    category: "investment",
    bio: "Former head of Africa investments at a top-tier sovereign wealth fund. Built three venture-backed companies across energy and logistics before founding xCelero to systematize venture creation for emerging markets.",
    location: "Nairobi, Kenya",
  },
  {
    id: "2",
    name: "Kwame Asante",
    role: "General Partner",
    category: "investment",
    bio: "16 years in development finance across IFC, AfDB, and two pan-African funds. Structured over $800M in emerging market transactions. Leads capital strategy, public-private partnerships, and the six investment vehicles.",
    location: "Accra, Ghana",
  },
  {
    id: "3",
    name: "Ngozi Eze",
    role: "General Partner",
    category: "investment",
    bio: "Wharton MBA and former McKinsey analyst specializing in African capital markets. Sources ventures, runs due diligence, and works hands-on with founders on go-to-market and commercialization across the Route.",
    location: "Lagos, Nigeria",
  },
  {
    id: "4",
    name: "Camilo Adeyemi",
    role: "Partner Emeritus",
    category: "investment",
    bio: "Engineer and strategic operator. Leads technology commercialization through partnerships, pilots, and market validation. Previously: partnerships and advisory at the African Development Bank, corporate strategy at Shell Africa, Wharton.",
    location: "Abidjan, Cote d'Ivoire",
  },

  // Product & Programs
  {
    id: "5",
    name: "David Kamau",
    role: "Head of Product",
    category: "product-programs",
    bio: "Stanford CS PhD and former Google X engineer. Led distributed systems teams across three continents. Now builds the product and technology backbone of the Route network, from platform tools to prototyping infrastructure.",
    location: "Addis Ababa, Ethiopia",
  },
  {
    id: "6",
    name: "Fatima Al-Rashid",
    role: "Head of Programs",
    category: "product-programs",
    bio: "Scaled operations for two Y Combinator companies across Sub-Saharan Africa. Expert in building distributed teams and cross-border logistics systems that work where infrastructure is thin.",
    location: "Lagos, Nigeria",
  },
  {
    id: "7",
    name: "Liya Tadesse",
    role: "Product Engineer",
    category: "product-programs",
    bio: "MIT-trained systems engineer who designed manufacturing execution systems for semiconductor fabs. Now architects the prototyping labs, maker spaces, and pilot zones inside every XEmbassy node.",
    location: "Addis Ababa, Ethiopia",
  },

  // Business & Community
  {
    id: "8",
    name: "Isata Bangura",
    role: "Global Head of Business",
    category: "business-community",
    bio: "Cambridge economics graduate with deep experience in digital finance and mobile money across West Africa. Leads industry and government partnerships, startup commercialization, and market entry strategy. Previously: McKinsey, European Union.",
    location: "Freetown, Sierra Leone",
  },
  {
    id: "9",
    name: "Adaeze Nwosu",
    role: "Membership & Community",
    category: "business-community",
    bio: "Community operations leader and connector. Previously: member experience operations at a pan-African co-working network and a global tech campus. Focused on member experience, defining culture, creating connections, and building the XCitizen network across 39 countries.",
    location: "Lagos, Nigeria",
  },

  // Finance & Operations
  {
    id: "10",
    name: "Samuel Mengistu",
    role: "Fund Controller",
    category: "finance-operations",
    bio: "Former quantitative researcher at a Nairobi-based hedge fund. Builds the financial models and scenario analyses that underpin every SPV and Thematic Fund allocation. Works closely with founders on unit economics and fundraising.",
    location: "Addis Ababa, Ethiopia",
  },
  {
    id: "11",
    name: "Emeka Obi",
    role: "Finance",
    category: "finance-operations",
    bio: "Former facilities director for a pan-African logistics company operating across 14 countries. Oversees financial planning, budgeting, and capital allocation across all 190+ Route hubs, XEmbassy nodes, and product realization labs.",
    location: "Lagos, Nigeria",
  },
  {
    id: "12",
    name: "Blessing Okonkwo",
    role: "Legal Analyst",
    category: "finance-operations",
    bio: "Civil engineer turned legal and compliance operator. Managed regulatory frameworks across 8 West African jurisdictions before joining xCelero to navigate cross-border legal structures and investment compliance across the Route.",
    location: "Accra, Ghana",
  },

  // Research & Associates
  {
    id: "13",
    name: "Thandiwe Moyo",
    role: "Writer & Researcher",
    category: "research",
    bio: "Former program director at a leading African accelerator with 200+ alumni companies. Now leads thesis development, thought leadership, and the intellectual infrastructure that underpins every investment and program decision on the Route.",
    location: "Harare, Zimbabwe",
  },
  {
    id: "14",
    name: "Yusuf Hassan",
    role: "Associates",
    category: "research",
    bio: "Serial founder turned operator. His last company built solar microgrids across 12 Kenyan counties before acquisition. Now supports deal flow analysis, venture due diligence, and cohort operations across accelerator programs.",
    location: "Mombasa, Kenya",
  },
  {
    id: "15",
    name: "Marie-Claire Uwimana",
    role: "Associates",
    category: "research",
    bio: "Education specialist with a decade of experience designing experiential learning programs for engineers and operators across East Africa. Supports fellowship operations, talent pipeline development, and program design for the Route.",
    location: "Kigali, Rwanda",
  },
  {
    id: "16",
    name: "Dr. Adebayo Ogunlesi",
    role: "Partner Emeritus",
    category: "investment",
    bio: "Former managing director at Goldman Sachs and chairman of a major African infrastructure fund. Brings four decades of institutional capital and infrastructure development experience to xCelero's strategic planning.",
    location: "London, UK",
  },
  {
    id: "17",
    name: "Dr. Wangari Mwangi",
    role: "Associates",
    category: "research",
    bio: "Former Kenyan Cabinet Secretary for Industrialization. Architect of East Africa's most successful special economic zone legislation and a trusted bridge between venture capital and government. Advises on policy and regulatory strategy.",
    location: "Nairobi, Kenya",
  },
];
