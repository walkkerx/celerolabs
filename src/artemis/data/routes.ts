/* ══════════════════════════════════════════════════════════════════════════
   ROUTES DATA, The Six Legs of the xCelero Routes
   ══════════════════════════════════════════════════════════════════════════ */

export interface KeyCity {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export interface CoreFlows {
  goods: string;
  capital: string;
  data: string;
  people: string;
}

export interface RouteDealThesis {
  title: string;
  description: string;
}

export interface SignatureDeal {
  name: string;
  duration: string;
  focus: string;
  inclusions: string[];
}

export interface CulturalWeaving {
  commonsFeast: string;
  heritageWalk: string;
  ritualClosing: string;
}

export interface SampleSchedule {
  period: string;
  keyHubs: string;
  climateNote: string;
}

export interface RouteLeg {
  id: string;
  name: string;
  subtitle: string;
  legNumber: number;
  hubCount: number;
  countries: string[];
  coreGeography: string;
  historicalAnchor: string;
  primaryFlow: string;
  coreFlows: CoreFlows;
  friction: string[];
  routeDealThesis: RouteDealThesis;
  signatureDeals: SignatureDeal[];
  culturalWeaving: CulturalWeaving;
  keyCities: KeyCity[];
  sampleSchedule: SampleSchedule;
  color: string;
}

export interface AnnualSchedule {
  period: string;
  leg: string;
  legId: string;
  hubs: string;
  climateNote: string;
}

/* ── Annual Cohort Schedule ── */

export const annualSchedule: AnnualSchedule[] = [
  {
    period: "Jan – Mar",
    leg: "Gulf of Guinea Arc",
    legId: "gulf-of-guinea",
    hubs: "49 hubs",
    climateNote: "Dry season: optimal coastal transit",
  },
  {
    period: "Apr – May",
    leg: "East African Corridor",
    legId: "east-african",
    hubs: "24 hubs",
    climateNote: "Pre-long rains: clear highland routes",
  },
  {
    period: "Jun – Jul",
    leg: "Central African Heartland",
    legId: "central-african",
    hubs: "19 hubs",
    climateNote: "Avoid peak rain: river levels navigable",
  },
  {
    period: "Aug – Sep",
    leg: "Southern Arc",
    legId: "southern-arc",
    hubs: "18 hubs",
    climateNote: "Cool dry season: highland clarity",
  },
  {
    period: "Oct – Nov",
    leg: "Sahel Band",
    legId: "sahel-band",
    hubs: "22 hubs",
    climateNote: "Post-rainy season: desert tracks firm",
  },
  {
    period: "Dec",
    leg: "North Africa & Global Gateways",
    legId: "north-africa-global",
    hubs: "80 hubs",
    climateNote: "Year-end capital window: global deal flow",
  },
];

/* ── The Six Legs ── */

export const routeLegs: RouteLeg[] = [
  {
    id: "gulf-of-guinea",
    name: "Gulf of Guinea Arc",
    subtitle: "Where Flow Remembers Its Name",
    legNumber: 1,
    hubCount: 49,
    countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"],
    coreGeography: "West African coastal littoral: from Senegal's Cap-Vert to Cameroon's Wouri estuary",
    historicalAnchor: "Transatlantic exchange; coastal maritime trade. For four centuries, the Gulf of Guinea was the fulcrum of global trade: first in human cargo, then in palm oil, cocoa, and now in digital value. The arc carries the memory of forced departure and the momentum of self-determined return.",
    primaryFlow: "FMCG, mobile money, creative IP, venture capital",
    coreFlows: {
      goods: "FMCG distribution, port-to-last-mile logistics, consumer goods",
      capital: "Mobile money networks, venture capital, remittances, diaspora investment",
      data: "Creative IP (Nollywood, Afrobeats), fintech innovation, market intelligence",
      people: "Diaspora returnees, creative talent, fintech operators, traders",
    },
    friction: [
      "Port congestion: 21-day average dwell time",
      "Fragmented FX: 15+ currencies with limited convertibility",
      "Non-harmonized customs across ECOWAS",
      "80% informal trade escaping formal measurement",
    ],
    routeDealThesis: {
      title: "The Circulation Accord",
      description: "This coast has always moved value: first unwillingly, then in palm oil and cocoa, now in digital flows. The Circulation Accord is designed to make these five hubs operate not as competing ports but as a union of flow, where value moves between them like water between connected vessels. When Lagos prototypes a new arrangement for value exchange, Accra can adopt it. When Abidjan maps cocoa logistics, Dakar can adapt the infrastructure. When Douala builds a bilingual trade corridor, the entire arc benefits. The Proto-Hanse principle is simple: a prototype in one city is designed to become infrastructure for ten. Ventures will surface at each port. Infrastructure will be mapped and shared, not hoarded. Capital will circulate instead of pooling in a single hub. Community will be woven through shared ritual and cohort experience, not through transactions.",
    },
    signatureDeals: [
      {
        name: "Flow Immersion: Port to Market",
        duration: "5 days",
        focus: "Cohort traces goods from ship to shelf, mapping shared infrastructure opportunities along the arc [Infrastructure + Ventures]",
        inclusions: ["Port authority access", "Customs broker shadowing", "Warehouse operations audit", "Last-mile delivery tracking", "FX settlement documentation"],
      },
      {
        name: "Covenant Sprint: Value Without Borders",
        duration: "4 days",
        focus: "Cohort convenes operators and regulators to design cross-border settlement arrangements that make value circulate across 15+ currencies — not through technical integration alone, but through shared governance and mutual trust [Capital + Infrastructure]",
        inclusions: ["Mobile money operator roundtable", "Regulatory landscape convening", "Settlement design session", "Pilot transaction arrangement"],
      },
      {
        name: "Commons Lab: Creative IP Distribution",
        duration: "3 days",
        focus: "Cohort builds shared creative distribution infrastructure, prototyping what Nollywood builds so the entire arc can deploy it [Ventures + Community]",
        inclusions: ["Studio visits", "Distribution chain mapping", "Revenue share modeling", "Digital rights architecture"],
      },
      {
        name: "Flow Immersion: Informal Trade Commons",
        duration: "6 days",
        focus: "Cohort enters the 80% informal economy, designing documentation and banking pathways that formalize without displacing [Capital + Community]",
        inclusions: ["Market immersion", "Trader trust networks", "Digital documentation systems", "Banking integration design"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Jollof rice cook-off: a deliberately competitive, deliberately joyful celebration of West African culinary identity. Each hub claims supremacy. The League makes no adjudication. The cohort judges only by appetite. This is a Commons Feast: nourishment as shared infrastructure.",
      heritageWalk: "Kurmi Market (Kano) → Cape Coast Castle (Ghana) → Gorée Island (Senegal). Three sites of memory: the inland market where goods gathered, the coastal fort where humans departed, the island of the door of no return. The cohort walks not as tourists but as witnesses, carrying the weight of what this coast has moved across centuries.",
      ritualClosing: "Libation pouring ritual: an offering to the ancestors of trade, to the waters that carried both pain and profit, and to the soil that receives what returns. Each cohort member pours for what they came to build and what they leave behind.",
    },
    keyCities: [
      { name: "Lagos", lat: 6.5, lng: 3.4, description: "The arc's velocity pillar: 20M people, where prototypes become infrastructure at scale" },
      { name: "Accra", lat: 5.6, lng: -0.2, description: "Stable gateway for the arc's fintech and creative ventures, designed to deploy what Lagos prototypes" },
      { name: "Abidjan", lat: 5.3, lng: -4.0, description: "Francophone node: financial services and cocoa logistics, bridging Anglophone and Francophone flow" },
      { name: "Dakar", lat: 14.7, lng: -17.4, description: "The arc's western anchor: maritime gateway and digital arts capital, where the Atlantic meets the Sahel" },
      { name: "Douala", lat: 4.0, lng: 9.7, description: "Bilingual corridor: where the coastal arc meets the Central African interior" },
    ],
    sampleSchedule: {
      period: "January – March",
      keyHubs: "Lagos → Accra → Abidjan → Dakar → Douala",
      climateNote: "Dry season across the coast: optimal for port and road transit",
    },
    color: "#FF4D00",
  },
  {
    id: "sahel-band",
    name: "Sahel Band",
    subtitle: "The Covenant of the Threshold",
    legNumber: 2,
    hubCount: 22,
    countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"],
    coreGeography: "The Sahelian belt: 5,400km of semi-arid transition from Atlantic to Red Sea",
    historicalAnchor: "Trans-Saharan salt-gold-knowledge routes. For a thousand years, caravans of 10,000 camels crossed the Sahel carrying salt from Taghaza, gold from Wangara, and manuscripts from Timbuktu. The route was not a road: it was a covenant for surviving hostile terrain through distributed knowledge.",
    primaryFlow: "Gold, livestock, climate data, humanitarian capital",
    coreFlows: {
      goods: "Artisanal gold, livestock, salt, agricultural commodities",
      capital: "Humanitarian aid, climate adaptation funds, diaspora remittances",
      data: "Climate monitoring, satellite imagery, displacement tracking",
      people: "Pastoral communities, displaced populations, climate migrants, aid workers",
    },
    friction: [
      "State fragility: governance gaps across 5+ conflict zones",
      "Violent extremism: active insurgency corridors",
      "Desertification: 600km² of arable land lost annually",
      "Less than 15% internet penetration: digital darkness",
    ],
    routeDealThesis: {
      title: "The Threshold Covenant",
      description: "The Sahel has always been a threshold: between desert and savanna, between scarcity and abundance, between the known and the unmapped. The caravans that crossed this belt for a thousand years did not conquer the terrain; they covenanted with it, building distributed covenants for survival through shared knowledge. The Threshold Covenant is designed to inherit that logic for a different century. Where states have retreated, community networks can advance. Where connectivity has failed, mesh infrastructure can be built from the ground up. Where people have been stripped of documentation by conflict, self-sovereign identity can restore recognition. This leg will prototype ventures that serve pastoral economies rather than extract from them. Infrastructure will be built to move with people, not around them. Capital will be channeled through climate adaptation funds and diaspora remittances, not despite fragility but because of it. Community will be woven through the tea ceremony, the heritage walk, the sand-writing ritual: practices that have held the Sahel together for longer than any state. Like Próspera, this leg asks: what if wealth creation were possible even where states have retreated? Like Praxis, it asks: what truth, what beauty, survives in the threshold?",
    },
    signatureDeals: [
      {
        name: "Flow Immersion: Pastoral Corridors",
        duration: "7 days",
        focus: "Cohort walks transhumance routes alongside pastoral communities, mapping the infrastructure that already exists in motion [Infrastructure + Community]",
        inclusions: ["Transhumance route documentation", "Market day mapping", "Veterinary checkpoint audit", "Conflict zone navigation arrangement"],
      },
      {
        name: "Covenant Sprint: Mesh Networks",
        duration: "4 days",
        focus: "Cohort deploys offline-first communication infrastructure where state connectivity has retreated [Infrastructure + Ventures]",
        inclusions: ["LoRa node deployment", "Solar power integration", "Community training", "Emergency covenant design"],
      },
      {
        name: "Commons Lab: Climate Data Independence",
        duration: "5 days",
        focus: "Cohort builds locally owned climate monitoring, so the Sahel governs its own data instead of being governed by it [Ventures + Capital]",
        inclusions: ["Sensor deployment", "Data governance co-design", "Community governance", "Early warning systems"],
      },
      {
        name: "Covenant Sprint: Displaced Identity",
        duration: "6 days",
        focus: "Cohort designs self-sovereign identity for those stripped of documentation by conflict, building recognition without state dependency [Infrastructure + Community]",
        inclusions: ["Identity enrollment workshop", "Offline recognition design", "Cross-border recognition", "Humanitarian integration"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Tuareg tea ceremony: three rounds of steeped green tea with fresh mint. The first is bitter like life, the second is sweet like love, the third is gentle like death. Served in the desert, it is both hospitality and philosophy. The cohort receives each round together, bound by the same cup, the same desert, the same threshold.",
      heritageWalk: "Timbuktu manuscripts → Agadez caravan routes. From the libraries that preserved 700,000 manuscripts through centuries of siege, to the caravan terminus where salt was traded gram-for-gram for gold. The cohort walks the inseparability of knowledge and commerce, carrying the question: what is the salt of this century?",
      ritualClosing: "Sand-writing ceremony: each cohort member traces an intention in Saharan sand, knowing the wind will carry it. An act of radical impermanence and profound trust in the desert's memory. What the sand receives, the sand remembers, even after the wind has erased the evidence.",
    },
    keyCities: [
      { name: "Bamako", lat: 12.6, lng: -8.0, description: "The band's administrative anchor: where music, gold, and governance meet" },
      { name: "Ouagadougou", lat: 12.4, lng: -1.5, description: "Burkinabé cultural capital: artisan commerce and resistance, where community infrastructure precedes state" },
      { name: "Niamey", lat: 13.5, lng: 2.1, description: "Niger River gateway: uranium wealth and pastoral trade, a threshold between river and desert" },
      { name: "N'Djamena", lat: 12.1, lng: 15.0, description: "Chad's crossroads: where humanitarian logistics can become locally governed infrastructure" },
      { name: "Timbuktu", lat: 16.8, lng: -3.0, description: "The legendary city of knowledge: proof that the Sahel's greatest export has always been thought" },
    ],
    sampleSchedule: {
      period: "October – November",
      keyHubs: "Bamako → Ouagadougou → Niamey → N'Djamena → Timbuktu",
      climateNote: "Post-rainy season: desert tracks firm, temperatures manageable",
    },
    color: "#E85D26",
  },
  {
    id: "east-african",
    name: "East African Corridor",
    subtitle: "Where the Monsoon Writes Its Code",
    legNumber: 3,
    hubCount: 24,
    countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"],
    coreGeography: "Indian Ocean littoral to Great Lakes highlands: the Swahili corridor and its inland extensions",
    historicalAnchor: "Indian Ocean monsoon trade; Swahili city-states. For two millennia, the monsoon winds carried dhows between the Persian Gulf, India, and the Swahili coast. Kilwa, Mombasa, Zanzibar: these were not ports but nodes in a maritime operating system that moved gold, ivory, ideas, and people across the Indian Ocean world.",
    primaryFlow: "Agricultural commodities, cross-border freight, tourism",
    coreFlows: {
      goods: "Agricultural commodities, cross-border freight, horticulture",
      capital: "Mobile money (M-Pesa ecosystem), development finance, tourism receipts",
      data: "Freight movement, agricultural pricing, health systems, tourism flows",
      people: "Tech talent, cross-border traders, agricultural workers, tourists",
    },
    friction: [
      "14+ day border dwell time for freight trucks",
      "Aging rail infrastructure: colonial-era gauge limitations",
      "Siloed mobile money: M-Pesa dominance without interop",
      "Regulatory divergence across EAC partner states",
    ],
    routeDealThesis: {
      title: "The Monsoon Accord",
      description: "For two millennia, the monsoon winds were the Indian Ocean's operating system: seasonal, reliable, indifferent to borders. The Swahili city-states did not need to harmonize their governance to trade; they needed a shared understanding for reading the wind. The Monsoon Accord is designed to succeed that logic for a different century. When Nairobi, Kigali, Dar es Salaam, Kampala, and Mombasa operate as a Proto-Hanse corridor, the same principle applies: coordination without uniformity. The cohort will walk this corridor as a mobile university — convening conversations with customs authorities, freight operators, and mobile money pioneers, designing arrangements that make the Northern Corridor as legible as a monsoon route. Ventures will surface at each node: agritech in Kampala, governance innovation in Kigali, fintech in Nairobi. Infrastructure will be shared: what Nairobi prototypes, Mombasa deploys. Capital will flow through mobile money interoperability, not despite regulatory divergence but around it. Community will be woven through shared Swahili heritage and the cohort's collective transit from highland to coast. Like Próspera, this leg asks: what if wealth creation were designed into the architecture of a region? Like Praxis, it asks: what heroism, what truth, what beauty is waiting to be built here?",
    },
    signatureDeals: [
      {
        name: "Covenant Sprint: Corridor Visibility",
        duration: "5 days",
        focus: "Cohort convenes customs authorities, freight operators, and payment providers to design the shared visibility that makes the corridor legible — not through a single platform but through mutual arrangement [Infrastructure + Ventures]",
        inclusions: ["Customs authority dialogue", "Freight visibility roundtable", "Border dwell assessment", "Payment flow mapping"],
      },
      {
        name: "Commons Lab: Mobile Money Interop",
        duration: "4 days",
        focus: "Cohort designs cross-border settlement architecture that routes around regulatory divergence [Capital + Infrastructure]",
        inclusions: ["M-Pesa ecosystem deep-dive", "Regulatory landscape convening", "Settlement arrangement design", "Pilot transaction arrangement"],
      },
      {
        name: "Flow Immersion: Agri-Market Price Commons",
        duration: "6 days",
        focus: "Cohort enters agricultural markets to build real-time pricing infrastructure that serves cross-border traders [Ventures + Capital]",
        inclusions: ["Price transparency workshop", "Market intelligence sharing", "Trader network convening", "Cross-border flow mapping"],
      },
      {
        name: "Flow Immersion: Tourism as Shared Infrastructure",
        duration: "3 days",
        focus: "Cohort maps visitor flows and revenue leaks, designing tourism that enriches communities, not just operators [Community + Ventures]",
        inclusions: ["Visitor flow assessment", "Revenue retention dialogue", "Digital booking co-design", "Community benefit arrangement"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Swahili coastal cuisine: coconut-infused stews, grilled seafood, pilau rice. The food of a coast that has absorbed Persian, Arab, Indian, and Portuguese influences over a thousand years of monsoon trade. Every plate is a treaty. The cohort shares this meal as a Commons Feast, tasting the union of civilizations that precedes them.",
      heritageWalk: "Fort Jesus (Mombasa) → Stone Town (Zanzibar). From the Portuguese fortress that changed hands nine times, to the Omani palace city where slave and spice markets operated side by side. The cohort walks architecture as evidence of contested self-determination, asking: what does sovereignty look like when it is shared, not seized?",
      ritualClosing: "Dhow sailing ceremony: the cohort boards a traditional lateen-rigged vessel at sunset, letting the monsoon wind determine direction. An act of surrender to the original routing wisdom. The wind does not negotiate with borders.",
    },
    keyCities: [
      { name: "Nairobi", lat: -1.3, lng: 36.8, description: "The corridor's prototyping pillar: where M-Pesa proved a venture can become shared infrastructure" },
      { name: "Kigali", lat: -1.9, lng: 30.1, description: "The governance node: proof that coordination without uniformity is possible at national scale" },
      { name: "Dar es Salaam", lat: -6.8, lng: 39.3, description: "The corridor's maritime gateway: where Indian Ocean flow meets inland freight" },
      { name: "Kampala", lat: 0.3, lng: 32.6, description: "Lake Victoria hub: mobile money and agricultural trade, where inland flow seeks the coast" },
      { name: "Mombasa", lat: -4.0, lng: 39.7, description: "Ancient port city: the monsoon's terminus, where the corridor's covenants meet the sea" },
    ],
    sampleSchedule: {
      period: "April – May",
      keyHubs: "Nairobi → Kigali → Dar es Salaam → Kampala → Mombasa",
      climateNote: "Pre-long rains: highland routes clear, coastal conditions stable",
    },
    color: "#CC6B33",
  },
  {
    id: "central-african",
    name: "Central African Heartland",
    subtitle: "Where the River Remembers Its Own Logic",
    legNumber: 4,
    hubCount: 19,
    countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"],
    coreGeography: "Congo Basin: the world's second-largest rainforest and its riverine highway network",
    historicalAnchor: "Congo Basin resource networks; riverine trade. The Congo River is not geography: it is infrastructure. Before roads, before rails, before colonial administration, the river and its 15,000km of navigable tributaries were the operating system of Central Africa. Villages became ports. Ports became cities. The river connected 75 million people before any state tried to.",
    primaryFlow: "Minerals, timber, river logistics, biodiversity data",
    coreFlows: {
      goods: "Cobalt, coltan, copper, timber, river-borne freight",
      capital: "Mining royalties, conservation finance, infrastructure bonds",
      data: "Biodiversity monitoring, mineral traceability, forest carbon data",
      people: "River communities, artisanal miners, conservation workers, displaced populations",
    },
    friction: [
      "River infrastructure decay: colonial-era ports in disrepair",
      "90% informal cobalt mining: no traceability, no safety",
      "Regulatory opacity: mining permits and forest concessions traded in shadow",
      "Less than 10% internet connectivity: deepest digital darkness",
    ],
    routeDealThesis: {
      title: "The River Accord",
      description: "The Congo River connected 75 million people before any state tried to. It was infrastructure before the word existed. The River Accord is designed to honor that logic: not to replace the river with something new, but to make its existing capacity visible, legible, and equitable. When Kinshasa, Brazzaville, Douala, Yaoundé, and Lubumbashi operate as a Proto-Hanse riverine union, the river becomes what it has always been: a shared operating system. Ventures will surface from traceability: making the 90% informal cobalt trade legible from pit to port. Infrastructure will be mapped along the river's own corridors, reviving what colonial neglect has let decay. Capital will be structured through mining royalties and conservation finance that flow to communities, not through them. Community will be woven through riverine ritual and forest knowledge, practices that have held the basin together longer than any permit or concession. This leg is civilizational prototyping at its most raw: the question is not what technology to build but what kind of civilization becomes possible when 75 million people already share an operating system.",
    },
    signatureDeals: [
      {
        name: "Flow Immersion: River Logistics Revival",
        duration: "6 days",
        focus: "Cohort travels the Congo River freight corridors, mapping what exists and designing digital coordination for what remains [Infrastructure + Capital]",
        inclusions: ["Port condition assessment", "Vessel visibility dialogue", "Customs co-design workshop", "Freight marketplace arrangement"],
      },
      {
        name: "Covenant Sprint: Making the Invisible Visible",
        duration: "5 days",
        focus: "Cohort designs end-to-end mineral traceability from pit to port, making the invisible legible [Ventures + Infrastructure]",
        inclusions: ["Pit-level tagging workshop", "Transport chain documentation", "Refinery verification dialogue", "Export certification arrangement"],
      },
      {
        name: "Commons Lab: Biodiversity Data Commons",
        duration: "4 days",
        focus: "Cohort builds open data infrastructure for Congo Basin biodiversity, so the forest's value is measured on its own terms [Ventures + Community]",
        inclusions: ["Sensor network co-design", "Community data collection", "Scientific partnership dialogue", "Carbon credit arrangement"],
      },
      {
        name: "Covenant Sprint: Offline-First Tools",
        duration: "7 days",
        focus: "Cohort builds digital tools that work in 10% connectivity, proving infrastructure can reach where the internet cannot [Infrastructure + Community]",
        inclusions: ["Offline-first tool co-design", "Local-first data arrangement", "Mesh communication co-design", "Solar charging workshop"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Congo Basin staples: fufu, pondu (cassava leaves), smoked fish, palm wine. Food born from river and forest, prepared with patience over charcoal. No shortcuts, no imports, only what the basin provides. The cohort shares this meal as a Commons Feast, eating what the river provides, on the river's terms.",
      heritageWalk: "Kinshasa markets → Congo River ports. From the sprawling markets where everything from satellite dishes to traditional medicine is traded, to the river ports where barges depart for Kisangani with 1,000 passengers and no manifest. The cohort walks commerce as chaos, chaos as covenant, asking: what if this disorder is the operating system?",
      ritualClosing: "River libation ritual: an offering to Mami Wata, the water spirit who governs the Congo's flow. Not superstition but acknowledgment that the river is alive, and its permission matters. Each cohort member pours into the river what they came to offer and receives what the river returns.",
    },
    keyCities: [
      { name: "Kinshasa", lat: -4.3, lng: 15.3, description: "17 million people: the river's largest port, where the basin's chaos concentrates into possibility" },
      { name: "Lubumbashi", lat: -11.7, lng: 27.5, description: "Copperbelt capital: where mineral wealth can be made legible and shared, not extracted and lost" },
      { name: "Douala", lat: 4.0, lng: 9.7, description: "The river's maritime gateway: where the Congo Basin meets the Atlantic and the world's capital markets" },
      { name: "Brazzaville", lat: -4.3, lng: 15.3, description: "Pool Malebo: twin city to Kinshasa, proof that the river connects what politics separates" },
      { name: "Yaoundé", lat: 3.9, lng: 11.5, description: "Bilingual bridge: where Francophone and Anglophone flows converge at the basin's edge" },
    ],
    sampleSchedule: {
      period: "June – July",
      keyHubs: "Kinshasa → Brazzaville → Douala → Yaoundé → Lubumbashi",
      climateNote: "Avoid peak rain: river levels navigable, roads passable",
    },
    color: "#B37840",
  },
  {
    id: "southern-arc",
    name: "Southern Arc",
    subtitle: "Where the Stone Remembers the Forge",
    legNumber: 5,
    hubCount: 18,
    countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"],
    coreGeography: "Southern African highveld and Copperbelt: from the Kalahari to the Drakensberg",
    historicalAnchor: "Great Zimbabwe trade; Copperbelt industrialization. Great Zimbabwe moved gold and copper across the Indian Ocean 800 years before Cecil Rhodes arrived. The Copperbelt: Kitwe, Ndola, Lubumbashi, was the 20th century's mineral backbone, powering two world wars and building the cities that now must reinvent themselves.",
    primaryFlow: "Copper, cobalt, rail freight, hydro energy",
    coreFlows: {
      goods: "Copper cathodes, cobalt, tobacco, cotton, rail freight",
      capital: "Mining royalties, commodity derivatives, national investment funds, hydro energy revenue",
      data: "Mining geology, energy grid telemetry, rail tracking, commodity pricing",
      people: "Miners, railway workers, agricultural labor, energy engineers, artisans",
    },
    friction: [
      "Rail gauge fragmentation: three incompatible systems across the arc",
      "Load-shedding: 12+ hour power cuts in manufacturing zones",
      "Currency volatility: six currencies with limited convertibility",
      "Skills mismatch: mining workforce needing transition to new economies",
    ],
    routeDealThesis: {
      title: "The Forge Accord",
      description: "Great Zimbabwe moved gold and copper across the Indian Ocean 800 years before Cecil Rhodes arrived. The Copperbelt powered two world wars and built cities that now must reinvent themselves. The Forge Accord is designed to inherit that industrial lineage for a different century, one where mineral wealth builds the civilization that extracts it. When Harare, Lusaka, Livingstone, Bulawayo, and Luanda operate as a Proto-Hanse industrial union, what was fragmented can become coordinated: three incompatible rail gauges unified through containerization arrangements, not through political merger. Ventures will surface from the transition itself: mining workforces retrained not by charity but by economic necessity. Infrastructure will be built to survive load-shedding, not wait for it to end. Capital will be structured across six volatile currencies, finding stability not in any single denomination but in the flow between them. Community will be woven through the shared experience of miners, farmers, and railway workers who have already built more than any charter could mandate. Próspera asks whether wealth creation can be designed into governance. This leg asks the same question for a region where mineral wealth has too often flowed outward. The answer will not come from a desk. It will come from the cohort walking this terrain alongside the people who have already built more than they are credited for.",
    },
    signatureDeals: [
      {
        name: "Covenant Sprint: Rail Corridor Harmonization",
        duration: "5 days",
        focus: "Cohort designs interoperable freight across three incompatible rail systems, proving coordination without uniformity [Infrastructure + Capital]",
        inclusions: ["Rail gauge assessment", "Containerization arrangement", "Scheduling dialogue", "Border crossing convening"],
      },
      {
        name: "Commons Lab: Energy-Resilient Manufacturing",
        duration: "6 days",
        focus: "Cohort builds manufacturing systems that survive load-shedding, turning power instability into infrastructure innovation [Infrastructure + Ventures]",
        inclusions: ["Micro-grid co-design", "Energy storage workshop", "Demand response co-design", "Off-grid production arrangements"],
      },
      {
        name: "Flow Immersion: Mining-to-Agri Skills Transfer",
        duration: "4 days",
        focus: "Cohort enters mining communities to design transition pathways, proving workforce transformation is an act of mutual flourishing [Community + Ventures]",
        inclusions: ["Skills assessment", "Training co-design", "Apprenticeship arrangement", "Cooperative formation"],
      },
      {
        name: "Covenant Sprint: Multi-Currency Flow",
        duration: "3 days",
        focus: "Cohort designs cross-border settlement for six-currency trade, finding stability in flow rather than denomination [Capital + Infrastructure]",
        inclusions: ["Currency corridor assessment", "Settlement arrangement", "FX risk dialogue", "Central bank convening"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Southern African staples: sadza (maize porridge), biltong, morogo (wild greens), chibuku (sorghum beer). The food of miners and farmers, high-energy, no-waste, communal. Eaten with hands, shared without counting. The cohort receives this Commons Feast as the region's original covenant for mutual sustenance.",
      heritageWalk: "Great Zimbabwe → Copperbelt. From the stone walls that moved gold without a single colonial charter, to the copper mines that powered empires they never owned. The cohort walks two monuments to African industry, separated by 800 years, connected by the same subterranean wealth, asking: who forges next?",
      ritualClosing: "Stone stacking ceremony: each cohort member places a stone from their journey on a growing cairn. The cairn is both landmark and covenant: we were here, we built, we return. Great Zimbabwe was also stones, stacked by hands, still standing. This is how civilization is prototyped.",
    },
    keyCities: [
      { name: "Harare", lat: -17.8, lng: 31.0, description: "The arc's agricultural and emerging tech node, where mining wealth can seed new ventures" },
      { name: "Lusaka", lat: -15.4, lng: 28.3, description: "Copperbelt logistics hub: where mineral flow can become shared industrial infrastructure" },
      { name: "Luanda", lat: -8.8, lng: 13.2, description: "Angola's capital: Portuguese-speaking gateway where oil wealth meets mineral flow" },
      { name: "Livingstone", lat: -17.8, lng: 25.9, description: "Victoria Falls: where hydro energy and tourism converge, designed to benefit the arc, not only the visitor" },
      { name: "Bulawayo", lat: -20.2, lng: 28.6, description: "Zimbabwe's second city: rail heritage and industrial base, a forge awaiting its next purpose" },
    ],
    sampleSchedule: {
      period: "August – September",
      keyHubs: "Harare → Lusaka → Livingstone → Bulawayo → Luanda",
      climateNote: "Cool dry season: highland clarity, optimal for surface transit",
    },
    color: "#99854D",
  },
  {
    id: "north-africa-global",
    name: "North Africa & Global Gateways",
    subtitle: "Where the Gateway Remembers It Was a League",
    legNumber: 6,
    hubCount: 80,
    countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"],
    coreGeography: "Mediterranean littoral and global diaspora network: from Cairo to Casablanca to 19 global hub cities",
    historicalAnchor: "Mediterranean trade; Silk Road terminus. Carthage controlled the western Mediterranean before Rome existed. Alexandria's library drew scholars from three continents. The Barbary corsairs made Algiers a maritime power. North Africa has always been a gateway: not a periphery.",
    primaryFlow: "Energy transit, maritime logistics, diaspora capital",
    coreFlows: {
      goods: "Energy (solar, natural gas), maritime freight, manufactured goods",
      capital: "Diaspora remittances, national investment funds, development finance, trade finance",
      data: "Regulatory data, maritime tracking, energy grid data, financial intelligence",
      people: "Diaspora networks, regulatory experts, maritime operators, energy engineers",
    },
    friction: [
      "Geopolitical volatility: active conflict zones and sanctions regimes",
      "Regulatory divergence: 20+ jurisdictions with incompatible frameworks",
      "Brain drain: top talent emigrating to Gulf, Europe, and North America",
      "Data independence, contested digital governance across jurisdictions",
    ],
    routeDealThesis: {
      title: "The Gateway Accord",
      description: "Carthage controlled the western Mediterranean before Rome existed. Alexandria's library drew scholars from three continents. The Barbary corsairs made Algiers a maritime power. North Africa has always been a gateway, not a periphery. The Gateway Accord is designed to make that gateway operate as a league, not a corridor. When Cairo, Casablanca, Tunis, Dubai, and London function as a Proto-Hanse network spanning 20+ jurisdictions, the question is not political integration but technical interoperability that makes political difference manageable. Ventures will surface from regulatory translation: building compliance infrastructure that routes around divergence. Infrastructure will be designed for data sovereignty, routing information through jurisdictions that respect it. Capital will be channeled through diaspora networks that have already built the trust infrastructure that formal markets lack. Community will be woven across the Mediterranean and its diasporas, through Commons Feasts that taste of Phoenician, Roman, Arab, Ottoman, and French influence, and through the compass ceremony that sends each cohort member forward with a bearing, not a goodbye. Like Próspera, this leg designs for wealth creation across jurisdictions. Like Praxis, it pursues the truth that the Mediterranean's oldest cities are not ruins but laboratories for the next epoch. xCelero's mission — human progress, the next epoch of civilization — finds its gateway here.",
    },
    signatureDeals: [
      {
        name: "Covenant Sprint: Data Sovereignty",
        duration: "5 days",
        focus: "Cohort convenes data sovereignty advocates and jurisdictional experts to design cross-border data arrangements that respect boundaries while enabling flow [Infrastructure + Ventures]",
        inclusions: ["Data sovereignty assessment", "Data routing arrangement", "Encryption design", "Compliance workflow co-design"],
      },
      {
        name: "Commons Lab: Regulatory Harmonization",
        duration: "6 days",
        focus: "Cohort convenes regulators and operators across 20+ jurisdictions to design interoperability arrangements that prove coordination without political merger [Infrastructure + Capital]",
        inclusions: ["Regulatory comparison convening", "Harmonization dialogue", "Compliance arrangement design", "Jurisdiction assessment tools"],
      },
      {
        name: "Flow Immersion: Reverse Diaspora Investment",
        duration: "4 days",
        focus: "Cohort enters diaspora networks to channel capital into structured investment vehicles, building on trust that already exists [Capital + Community]",
        inclusions: ["Diaspora network convening", "Investment vehicle workshop", "Repatriation policy dialogue", "Trust arrangement co-design"],
      },
      {
        name: "Flow Immersion: Maritime Logistics Commons",
        duration: "7 days",
        focus: "Cohort traces end-to-end maritime logistics from Mediterranean to global ports, designing shared infrastructure for the league's gateway [Infrastructure + Ventures]",
        inclusions: ["Port operations convening", "Vessel visibility dialogue", "Customs pre-clearance workshop", "Last-mile arrangement"],
      },
    ],
    culturalWeaving: {
      commonsFeast: "Mediterranean-North African fusion: couscous, tagine, b'stilla, mint tea, pastilla. The food of a coast that has absorbed Phoenician, Roman, Arab, Ottoman, and French influences over 3,000 years. Every dish is a treaty. Every spice route is a trade agreement. The cohort shares this Commons Feast as the Mediterranean's original covenant for civilizational exchange.",
      heritageWalk: "Pyramids (Cairo) → Carthage (Tunis). From the last surviving wonder of the ancient world to the city that rivaled Rome. The cohort walks two monuments to civilization's ambition and its capacity for destruction, asking: what is the Carthage of this century, and who will build it?",
      ritualClosing: "Compass ceremony: each cohort member orients toward their next destination and declares their intention. Not a goodbye but a bearing. The compass is both tool and metaphor: we know where we are going because we know where we have been. The league does not end; it disperses with direction.",
    },
    keyCities: [
      { name: "Cairo", lat: 30.0, lng: 31.2, description: "20 million people: Africa's largest city and the league's energy corridor, where ancient and modern flow converge" },
      { name: "Casablanca", lat: 33.6, lng: -7.6, description: "Morocco's economic pillar: maritime and financial gateway, designed to route between Africa and Europe" },
      { name: "Tunis", lat: 36.8, lng: 10.2, description: "Carthage's heir: where Mediterranean trade and digital governance can be prototyped at civilizational scale" },
      { name: "Dubai", lat: 25.2, lng: 55.3, description: "Global capital hub: where diaspora investment and logistics infrastructure can be structured for the league" },
      { name: "London", lat: 51.5, lng: -0.1, description: "Financial gateway: capital markets and regulatory bridge, the league's interface with global institutional flow" },
    ],
    sampleSchedule: {
      period: "December",
      keyHubs: "Cairo → Casablanca → Tunis → Dubai → London",
      climateNote: "Year-end capital window: optimal for deal flow and diaspora engagement",
    },
    color: "#FF6B2B",
  },
];

/* ── Aggregate Metrics ── */

export const routeMetrics = {
  legs: 6,
  hubs: 212,
  countries: 63,
};

/* ── Arc Pricing ── */

export interface ArcPricing {
  legId: string;
  pricePerPerson: number;
  solidarityRate: number;
  durationWeeks: number;
  scholarshipsPerDeparture: number;
  lodging: string;
  meals: string;
  transport: string;
  siteVisits: string;
  extras: string[];
}

export const arcPricing: ArcPricing[] = [
  {
    legId: "gulf-of-guinea",
    pricePerPerson: 3800,
    solidarityRate: 2800,
    durationWeeks: 8,
    scholarshipsPerDeparture: 3,
    lodging: "Shared hub lodging in Lagos, Accra, Abidjan",
    meals: "Breakfast + dinner daily; local lunches on site visit days",
    transport: "All inter-city ground transport + airport transfers",
    siteVisits: "12 venture site visits + 3 port facility tours",
    extras: ["Mobile money operator access", "Market immersion program", "Route deal sprint materials"],
  },
  {
    legId: "sahel-band",
    pricePerPerson: 4200,
    solidarityRate: 3100,
    durationWeeks: 7,
    scholarshipsPerDeparture: 4,
    lodging: "Hub lodging + desert camp accommodations",
    meals: "All meals included (remote terrain — no alternatives)",
    transport: "4x4 convoy transport + charter flights for remote legs",
    siteVisits: "8 infrastructure site visits + mesh-network deployments",
    extras: ["Climate data tools", "Humanitarian corridor access", "Emergency covenant training"],
  },
  {
    legId: "east-african",
    pricePerPerson: 4500,
    solidarityRate: 3300,
    durationWeeks: 8,
    scholarshipsPerDeparture: 3,
    lodging: "Co-working hub lodging in 5 cities + safari camp",
    meals: "Breakfast + dinner daily; local lunches at hub",
    transport: "Ground transport + internal flights (Nairobi–Dar–Kigali)",
    siteVisits: "14 venture visits + 2 port facility tours + agricultural station",
    extras: ["M-Pesa integration workshop", "Cross-border freight tracking", "Swahili cultural immersion"],
  },
  {
    legId: "central-african",
    pricePerPerson: 5200,
    solidarityRate: 3800,
    durationWeeks: 7,
    scholarshipsPerDeparture: 4,
    lodging: "Hub lodging + rainforest research station stays",
    meals: "All meals included (limited external options)",
    transport: "River transport + charter flights + 4x4 for interior",
    siteVisits: "10 site visits + river logistics coordination + biodiversity stations",
    extras: ["Mineral traceability workshop", "Offline-first digital tools", "Emergency medical kit"],
  },
  {
    legId: "southern-arc",
    pricePerPerson: 5800,
    solidarityRate: 4200,
    durationWeeks: 8,
    scholarshipsPerDeparture: 2,
    lodging: "Hotel + hub lodging in 6 cities across 4 countries",
    meals: "Breakfast + lunch at hubs; per diem for dinners",
    transport: "Rail corridor pass + ground transport + internal flights",
    siteVisits: "16 venture + infrastructure visits + copperbelt industrial tour + energy lab",
    extras: ["Energy-resilient manufacturing lab", "Multi-currency settlement workshop", "Skills transfer sessions"],
  },
  {
    legId: "north-africa-global",
    pricePerPerson: 7500,
    solidarityRate: 5500,
    durationWeeks: 10,
    scholarshipsPerDeparture: 2,
    lodging: "Business-class hub lodging in 5 cities + Mediterranean retreat",
    meals: "Breakfast + lunch at hubs; hosted dinners with local partners",
    transport: "All flights + ground transport + maritime port transfers",
    siteVisits: "20+ visits: regulatory bodies, port authorities, tech hubs, diaspora networks",
    extras: ["Data sovereignty workshop", "Regulatory harmonization convening", "Global gateway connections", "Compass ceremony program"],
  },
];

export const fullRoutePricing = {
  pricePerPerson: 22000,
  solidarityRate: 16000,
  durationMonths: 12,
  lodging: "Hub + hotel + camp lodging across all 6 arcs, 39 countries",
  meals: "Breakfast + lunch at all hubs; dinner included on site-visit days; per diem elsewhere",
  transport: "All inter-arc flights + ground transport + river/rail corridor passes + charter legs",
  siteVisits: "80+ venture, infrastructure, and port visits across every arc",
  extras: [
    "Lifetime Xcitizen ledger access",
    "Xcitizen status and credential",
    "Custom route compass",
    "212 hub access credentials",
    "Complete route deal portfolio",
    "Cultural weaving across all 6 arcs",
    "Global operator network membership",
    "Hanseatic Commons IP access",
    "Alumni economic carry participation",
    "Emergency extraction arrangement",
    "Post-route venture support (6 months)",
  ],
};

/* ── Map Location Data (calibrated for Newlab topographic map) ── */

export type LabelPos = "left" | "right";

export interface MapLocation {
  id: string;
  name: string;
  x: number;       // percentage from left – calibrated for Newlab map image
  y: number;       // percentage from top – calibrated for Newlab map image
  labelPos: LabelPos;
  legId: string;
  legNumber: number;
  legColor: string;
  description: string;
  countries: string[];
}

export const MAP_LOCATIONS: MapLocation[] = [
  // Leg 1 – Gulf of Guinea Arc
  { id: "lagos", name: "LAGOS", x: 48.3, y: 55.7, labelPos: "right", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Africa's commercial nerve center: 20M people, limitless velocity", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  { id: "accra", name: "ACCRA", x: 47.3, y: 56.3, labelPos: "right", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Stable gateway for West African fintech and creative industries", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  { id: "abidjan", name: "ABIDJAN", x: 46.3, y: 56.5, labelPos: "left", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Francophone hub: financial services and cocoa logistics", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  { id: "dakar", name: "DAKAR", x: 42.7, y: 50.5, labelPos: "left", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Westernmost point: maritime gateway and digital arts capital", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  { id: "douala", name: "DOUALA", x: 50.0, y: 57.3, labelPos: "right", legId: "gulf-of-guinea", legNumber: 1, legColor: "#FF4D00", description: "Central African port entry: bilingual trade corridor", countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"] },
  // Leg 2 – Sahel Band
  { id: "bamako", name: "BAMAKO", x: 45.2, y: 51.8, labelPos: "left", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "Sahel's administrative anchor: music and gold", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  { id: "ouagadougou", name: "OUAGADOUGOU", x: 47.0, y: 52.0, labelPos: "right", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "Burkinabé cultural capital: artisan commerce and resistance", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  { id: "niamey", name: "NIAMEY", x: 48.0, y: 51.3, labelPos: "right", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "Niger River gateway: uranium and pastoral trade", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  { id: "ndjamena", name: "N'DJAMENA", x: 51.4, y: 52.2, labelPos: "right", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "Chad's crossroads: humanitarian logistics hub", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  { id: "timbuktu", name: "TIMBUKTU", x: 46.6, y: 49.2, labelPos: "left", legId: "sahel-band", legNumber: 2, legColor: "#E85D26", description: "The legendary city of knowledge: manuscripts and memory", countries: ["Mali", "Burkina Faso", "Niger", "Chad", "Sudan"] },
  // Leg 3 – East African Corridor
  { id: "nairobi", name: "NAIROBI", x: 57.3, y: 60.7, labelPos: "right", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "East Africa's tech capital: M-Pesa, iHub, Silicon Savannah", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  { id: "kigali", name: "KIGALI", x: 55.5, y: 61.0, labelPos: "left", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "The clean governance model: governance innovation and ease-of-doing-business", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  { id: "dar-es-salaam", name: "DAR ES SALAAM", x: 58.0, y: 64.2, labelPos: "right", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "Indian Ocean port: freight gateway to the interior", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  { id: "kampala", name: "KAMPALA", x: 56.2, y: 59.6, labelPos: "left", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "Lake Victoria hub: mobile money and agricultural trade", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  { id: "mombasa", name: "MOMBASA", x: 58.1, y: 62.4, labelPos: "right", legId: "east-african", legNumber: 3, legColor: "#CC6B33", description: "Ancient port city: the Northern Corridor's maritime terminus", countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi", "Eastern DRC"] },
  // Leg 4 – Central African Heartland
  { id: "kinshasa", name: "KINSHASA", x: 51.5, y: 62.6, labelPos: "left", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "17 million people: the largest francophone city on Earth", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  { id: "lubumbashi", name: "LUBUMBASHI", x: 54.8, y: 67.3, labelPos: "right", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "Copperbelt capital: mineral processing and export", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  { id: "douala-cam", name: "DOUALA", x: 50.0, y: 57.3, labelPos: "left", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "Atlantic port: the River Stack's maritime gateway", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  { id: "brazzaville", name: "BRAZZAVILLE", x: 51.6, y: 62.6, labelPos: "right", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "Pool Malebo: twin city to Kinshasa across the river", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  { id: "yaounde", name: "YAOUNDÉ", x: 50.5, y: 57.4, labelPos: "right", legId: "central-african", legNumber: 4, legColor: "#B37840", description: "Cameroon's administrative capital: bilingual bridge", countries: ["DRC", "Cameroon", "Gabon", "Congo", "CAR"] },
  // Leg 5 – Southern Arc
  { id: "harare", name: "HARARE", x: 55.7, y: 71.1, labelPos: "right", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Zimbabwe's capital: agricultural trade and tech emergence", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  { id: "lusaka", name: "LUSAKA", x: 55.0, y: 69.6, labelPos: "left", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Zambia's commercial center: Copperbelt logistics hub", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  { id: "luanda", name: "LUANDA", x: 50.9, y: 65.4, labelPos: "left", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Angola's oil capital: Portuguese-speaking gateway", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  { id: "livingstone", name: "LIVINGSTONE", x: 54.4, y: 71.1, labelPos: "left", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Victoria Falls: tourism and energy infrastructure", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  { id: "bulawayo", name: "BULAWAYO", x: 55.1, y: 72.7, labelPos: "right", legId: "southern-arc", legNumber: 5, legColor: "#99854D", description: "Zimbabwe's second city: rail heritage and industrial base", countries: ["Zimbabwe", "Zambia", "Angola", "Lesotho", "Eswatini", "Malawi"] },
  // Leg 6 – North Africa & Global Gateways
  { id: "cairo", name: "CAIRO", x: 55.8, y: 40.8, labelPos: "right", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "20 million people: Africa's largest city and energy corridor", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
  { id: "casablanca", name: "CASABLANCA", x: 45.3, y: 38.5, labelPos: "left", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "Morocco's economic pillar: maritime and financial gateway", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
  { id: "tunis", name: "TUNIS", x: 50.1, y: 36.5, labelPos: "right", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "Carthage's heir: Mediterranean trade and digital governance", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
  { id: "dubai", name: "DUBAI", x: 62.3, y: 43.9, labelPos: "right", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "Global capital hub: diaspora investment and logistics", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
  { id: "london", name: "LONDON", x: 47.4, y: 27.2, labelPos: "right", legId: "north-africa-global", legNumber: 6, legColor: "#FF6B2B", description: "Financial gateway: capital markets and regulatory bridge", countries: ["Egypt", "Morocco", "Algeria", "Tunisia", "+ 19 global jurisdictions"] },
];

/* ── Arc Image Paths ── */

export const arcImages: Record<string, string[]> = {
  "gulf-of-guinea": [
    "/routes/gulf-of-guinea-1.png",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1553729459-uj9p7pk3e2l?auto=format&fit=crop&w=600&q=80",
  ],
  "sahel-band": [
    "/routes/sahel-1.png",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80",
  ],
  "east-african": [
    "/routes/east-african-1.png",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  ],
  "central-african": [
    "/routes/central-african-1.png",
    "https://images.unsplash.com/photo-1565792323902-486ad4b6a110?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  ],
  "southern-arc": [
    "/routes/southern-arc-1.png",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1565792323902-486ad4b6a110?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
  ],
  "north-africa-global": [
    "/routes/north-africa-1.png",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80",
  ],
};
