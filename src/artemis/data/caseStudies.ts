export interface CaseStudy {
  id: string;
  title: string;
  ventureName: string;
  vertical: string;
  summary: string;
  challenge: string;
  approach: string;
  results: {
    revenue: string;
    jobsCreated: number;
    capitalRaised: string;
    countriesReached: number;
  };
  timeline: string;
  quotes: {
    text: string;
    author: string;
    role: string;
  }[];
  image: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "solargrid-africa",
    title: "Powering the Last Mile",
    ventureName: "SolarGrid Africa",
    vertical: "Energy",
    summary:
      "How a microgrid venture is projected to scale from XEmbassy prototype to 240,000 connections across three countries in 18 months.",
    challenge:
      "Over 600 million people in Sub-Saharan Africa lack access to reliable electricity. Existing grid extension programs move at 2% annual coverage and cost $15,000 per connection. Diesel generators, the default alternative, are expensive, polluting, and fragile. The technology for off-grid solar exists, but the business model for scaling it profitably did not.",
    approach:
      "xCelero embedded SolarGrid's founding team inside the Nairobi XEmbassy for 6 months of intensive prototyping. We provided the hardware lab for inverter testing, the pilot zone for initial deployments, and the Route network for cross-border expansion. The Accelerator program supplied $180K in non-dilutive grant capital plus $320K in seed investment through an SPV. By cohort month 9, SolarGrid is projected to reach its first 1,000 paying connections and be ready for Route-wide deployment.",
    results: {
      revenue: "$4.2M projected ARR",
      jobsCreated: 340,
      capitalRaised: "$6.8M target",
      countriesReached: 3,
    },
    timeline: "18 months from inception to revenue",
    quotes: [
      {
        text: "Without the XEmbassy lab, we would have spent a year just sourcing equipment. Instead, we walked in, built, tested, and deployed in weeks.",
        author: "Grace Mbeki",
        role: "Founder, SolarGrid Africa",
      },
      {
        text: "SolarGrid represents exactly what the Route is designed to do: take a technology thesis, give it infrastructure, and let the market prove it works.",
        author: "Kwame Asante",
        role: "Chief Investment Officer, xCelero Labs",
      },
    ],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "aquapure",
    title: "Water Where There Was None",
    ventureName: "AquaPure",
    vertical: "Water",
    summary:
      "Atmospheric water generation units built in an XEmbassy projected to serve 85,000 people in arid regions of the Horn of Africa.",
    challenge:
      "The Horn of Africa faces recurrent droughts affecting over 20 million people. Existing water infrastructure depends on boreholes that deplete aquifers and trucking operations that cost $12 per cubic meter. Atmospheric water generation technology existed in labs but had never been manufactured at a price point accessible to rural communities. The unit economics seemed impossible at African purchasing power.",
    approach:
      "xCelero assigned AquaPure to the Addis Ababa XEmbassy's prototyping lab, where the team redesigned the condensation cycle for high-temperature, low-humidity environments. The Non-Dilutive Desk secured $220K in grants from two development agencies. Route logistics connected the team with manufacturers in Mombasa and distributors in Djibouti. The Catalyst Notes vehicle provided $150K in revenue-linked financing that preserved founder equity during the critical scaling phase.",
    results: {
      revenue: "$1.8M projected ARR",
      jobsCreated: 120,
      capitalRaised: "$3.4M target",
      countriesReached: 4,
    },
    timeline: "14 months from prototype to first 10,000 users",
    quotes: [
      {
        text: "Everyone said atmospheric water generation couldn't work below 40% humidity. We proved them wrong in the XEmbassy lab, then proved the business model wrong on the Route.",
        author: "Abdi Mohamed",
        role: "Co-founder, AquaPure",
      },
    ],
    image: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "denari-finance",
    title: "Banking the Unbanked Profitably",
    ventureName: "Denari Finance",
    vertical: "Digital Finance",
    summary:
      "A mobile-first lending platform projected to grow from Fellowship project to $12M in disbursed loans across two countries.",
    challenge:
      "Traditional banks in West Africa serve fewer than 30% of adults. Mobile money has solved payments, but credit remains inaccessible because there is no credit bureau data, no formal income verification, and no collateral framework that works for informal traders. Existing microfinance institutions charge 40-60% annual rates and operate with heavy manual processes that limit scale.",
    approach:
      "Denari started as a xHansa Fellowship project, where the founding duo spent 3 months embedded in the Lagos XEmbassy building an alternative credit scoring model using mobile money transaction data. xCelero's Accelerator program provided $150K in pre-seed capital and connected the team with a West African bank as an anchor partner. The Route's regulatory infrastructure helped navigate licensing in Ghana and Nigeria simultaneously. By program graduation, Denari is projected to disburse $2M with a 94% repayment rate.",
    results: {
      revenue: "$2.1M projected ARR",
      jobsCreated: 85,
      capitalRaised: "$4.5M target",
      countriesReached: 2,
    },
    timeline: "22 months from fellowship application to $12M disbursed",
    quotes: [
      {
        text: "The Fellowship didn't just teach us, it gave us the infrastructure to build while other founders were still looking for office space.",
        author: "Chidinma Okafor",
        role: "Co-founder, Denari Finance",
      },
      {
        text: "Denari proved that alternative credit models work when you have the right data infrastructure and the right partners. The Route provided both.",
        author: "Ngozi Eze",
        role: "Senior Investment Associate, xCelero Labs",
      },
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "nomaa-agritech",
    title: "Algorithmic Agriculture at Scale",
    ventureName: "NomaAgri",
    vertical: "Food Systems",
    summary:
      "Precision agriculture sensors and market intelligence built in an XEmbassy projected to serve 12,000 smallholder farmers across East Africa.",
    challenge:
      "East Africa's 40 million smallholder farmers lose 30-40% of their harvest to preventable causes: wrong planting times, undetected crop disease, and market gluts that crash prices. Existing precision agriculture solutions cost $500+ per hectare per year, far beyond what a farmer earning $2/day can afford. The data existed, satellite imagery, weather patterns, market prices, but no one had built a delivery mechanism that worked at African price points and African connectivity conditions.",
    approach:
      "NomaAgri entered the xCelero Accelerator with a sensor prototype and a hypothesis. The XEmbassy's prototyping lab allowed rapid hardware iteration: 14 sensor revisions in 8 weeks. The Route network provided direct access to farming cooperatives in Kenya, Tanzania, and Uganda for real-world testing. xCelero's Non-Dilutive Desk secured a $300K USAID grant for the East Africa rollout. The Thematic Fund (Food Systems) invested $400K at seed stage, and the team used the Route's logistics backbone to distribute sensors at 1/10th the cost of Western competitors.",
    results: {
      revenue: "$890K projected ARR",
      jobsCreated: 65,
      capitalRaised: "$2.2M target",
      countriesReached: 3,
    },
    timeline: "16 months from Accelerator entry to 10,000 farmer milestone",
    quotes: [
      {
        text: "We built 14 versions of our sensor in 8 weeks at the XEmbassy. That would have taken us 18 months in a traditional setup. Speed is the ultimate competitive advantage in emerging markets.",
        author: "Joseph Mwangi",
        role: "Founder, NomaAgri",
      },
    ],
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=2000&q=80",
  },
];
