"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import { venturesData } from "@/artemis/data/ventures";
import {
  ArrowRight,
  ChevronDown,
  Shield,
  Check,
  X,
  Loader2,
  Zap,
  Building2,
  HandCoins,
  Landmark,
  Mail,
  PiggyBank,
  Banknote,
  CircleDollarSign,
  Clock,
  Layers,
} from "lucide-react";

/* ── Derived Data ── */

const totalVentures = venturesData.length;
const totalCountries = 39;
const totalHubs = 190;
const capitalTarget = "$4B";

/* ── Investment Vehicles ── */
const investmentVehicles = [
  {
    id: "xcelero-fund",
    name: "xCelero Fund",
    shortName: "The Fund",
    icon: CircleDollarSign,
    tagline: "Continuous capital. Broad exposure. Open access.",
    description:
      "An open-ended, evergreen commingled fund that deploys across the full xCelero venture portfolio. The Fund offers quarterly liquidity windows, transparent NAV reporting, and entry from $500: making institutional-grade venture accessible to everyone.",
    details: [
      { label: "Structure", value: "Open-ended evergreen fund" },
      { label: "Min entry", value: "$500" },
      { label: "Mgmt fee", value: "1.0%" },
      { label: "Carry", value: "None" },
      { label: "Liquidity", value: "Quarterly (up to 5% NAV)" },
      { label: "Reporting", value: "Quarterly NAV + updates" },
    ],
    bestFor: "First-time venture investors, portfolio diversification, passive exposure to critical tech",
    color: "#FF4D00",
    howItWorks: [
      "Open your account online with $500 minimum and complete KYC verification",
      "Capital is deployed across the full xCelero venture portfolio automatically",
      "Receive quarterly NAV reports, portfolio updates, and capital call notices",
      "Request redemptions during quarterly liquidity windows (up to 5% of NAV)",
      "Reinvest returns or withdraw as your strategy evolves",
    ],
    keyFeatures: [
      "Zero carry: investors keep 100% of returns above management fee",
      "Quarterly liquidity windows provide regular redemption access",
      "Broad diversification across energy, food, defense, manufacturing, digital finance",
      "Transparent NAV reporting with independent annual audit",
      "Mobile money and local agent deposit options in select African jurisdictions",
    ],
    riskNote: "Venture investments are illiquid and involve substantial risk of loss. The Fund's quarterly liquidity windows are subject to gate provisions and may be suspended in market stress events. All vehicle structures are subject to regulatory approval and may differ from what is described here. This is not an offer to sell securities.",
  },
  {
    id: "spv-syndicates",
    name: "SPV Syndicates",
    shortName: "SPV",
    icon: Layers,
    tagline: "Co-invest alongside institutions on breakout deals.",
    description:
      "Purpose-built Special Purpose Vehicles for individual follow-on investments in high-conviction ventures. Each SPV is a single-asset vehicle with defined economics: you know exactly what you're investing in, with side-by-side GP economics and institutional-grade deal terms.",
    details: [
      { label: "Structure", value: "Single-asset SPV per deal" },
      { label: "Min entry", value: "$5,000" },
      { label: "Mgmt fee", value: "1.0%" },
      { label: "Carry", value: "10% above hurdle" },
      { label: "Liquidity", value: "Illiquid until exit" },
      { label: "Reporting", value: "Quarterly + ad-hoc" },
    ],
    bestFor: "Experienced investors seeking deal-level selection, co-investment rights with institutional partners",
    color: "#FF4D00",
    howItWorks: [
      "Review deal memos for breakout ventures in the xCelero portfolio",
      "Select individual SPV opportunities aligned with your conviction",
      "Invest with full transparency: valuation, cap table, use of proceeds disclosed upfront",
      "Hold alongside institutional co-investors with identical economic terms",
      "Receive proceeds at exit event (acquisition, IPO, secondary sale)",
    ],
    keyFeatures: [
      "Single-asset transparency: know exactly where every dollar is deployed",
      "Side-by-side economics with institutional lead investors",
      "Deal-level selection: invest only in ventures that match your thesis",
      "Defined carry structure with hurdle rate protection",
      "Access to xCelero deal flow typically reserved for institutional allocators",
    ],
    riskNote: "SPV investments are illiquid until exit event. Single-asset concentration increases idiosyncratic risk. Carry applies to returns above the preferred return hurdle. All vehicle structures are subject to regulatory approval and may differ from what is described here. This is not an offer to sell securities.",
  },
  {
    id: "thematic-funds",
    name: "Thematic Funds",
    shortName: "Thematic",
    icon: PiggyBank,
    tagline: "Concentrated bets on critical technology verticals.",
    description:
      "Commingled closed-end funds targeting specific verticals: Energy, Food Systems, Critical Tech, Digital Finance. Each fund concentrates capital in 8 to 15 ventures within a single domain, giving investors targeted exposure to the sectors they believe in most.",
    details: [
      { label: "Structure", value: "7-year closed-end fund" },
      { label: "Min entry", value: "$50,000" },
      { label: "Mgmt fee", value: "1.5%" },
      { label: "Carry", value: "20% above 8% hurdle" },
      { label: "Liquidity", value: "Semi-annual tender offers" },
      { label: "Reporting", value: "Monthly + custom" },
    ],
    bestFor: "Institutional allocators, family offices, sector-conviction investors, impact-mandated capital",
    color: "#FF4D00",
    howItWorks: [
      "Select your vertical: Energy, Food Systems, Critical Tech, or Digital Finance",
      "Capital is deployed across 8 to 15 ventures within that single domain",
      "Monthly reporting with custom data room access for deeper due diligence",
      "Semi-annual tender offers provide structured liquidity opportunities",
      "At fund maturity (7 years), remaining positions are distributed or liquidated",
    ],
    keyFeatures: [
      "Concentrated portfolio: 8 to 15 ventures per fund for high-conviction exposure",
      "Four verticals aligned with xCelero's core thesis of critical technology",
      "20% carry above 8% hurdle aligns GP and LP incentives",
      "Impact reporting meets institutional mandates for measurable outcomes",
      "Board observer seats available for Anchor-tier allocations",
    ],
    riskNote: "Closed-end funds are subject to J-curve dynamics with early negative returns typical. Sector concentration amplifies market-specific risks. Semi-annual tender offers are at Board discretion and not guaranteed. All vehicle structures are subject to regulatory approval and may differ from what is described here. This is not an offer to sell securities.",
  },
  {
    id: "catalyst-notes",
    name: "Catalyst Notes",
    shortName: "Catalyst",
    icon: Banknote,
    tagline: "Revenue-linked returns. Venture velocity without equity dilution.",
    description:
      "Revenue-based financing instruments for portfolio ventures that have reached revenue milestones. Investors receive a fixed return multiple tied to venture revenue performance: no equity dilution, no valuation negotiations. Capital that moves at the speed of the business.",
    details: [
      { label: "Structure", value: "Revenue-linked note" },
      { label: "Min entry", value: "$10,000" },
      { label: "Return target", value: "1.5 to 2.5x multiple" },
      { label: "Duration", value: "24 to 48 months" },
      { label: "Security", value: "Revenue assignment" },
      { label: "Reporting", value: "Monthly revenue reports" },
    ],
    bestFor: "Yield-oriented investors, revenue-stage venture exposure, non-dilutive capital supporters",
    color: "#111111",
    howItWorks: [
      "Select revenue-stage ventures from the xCelero portfolio with proven traction",
      "Invest via a revenue-linked note with a defined return multiple (1.5 to 2.5x)",
      "Venture remits a percentage of monthly revenue until the return cap is reached",
      "Monthly revenue reports provide real-time visibility into repayment progress",
      "At maturity, note is retired regardless of whether the return cap was achieved",
    ],
    keyFeatures: [
      "No equity dilution for founders: capital that preserves ownership",
      "Defined return target: no valuation negotiations or exit dependency",
      "Revenue-linked: returns accelerate when the venture grows faster",
      "Monthly reporting with real-time repayment tracking",
      "Shorter duration (24 to 48 months) vs. traditional venture timelines",
    ],
    riskNote: "Revenue-linked notes depend on venture revenue performance. If the venture's revenue declines, repayment slows and the full return target may not be achieved. No equity upside beyond the defined return multiple. All vehicle structures are subject to regulatory approval and may differ from what is described here. This is not an offer to sell securities.",
  },
  {
    id: "non-dilutive-desk",
    name: "Non-Dilutive Desk",
    shortName: "Non-Dilutive",
    icon: Shield,
    tagline: "Unlock grants, prizes, and government incentives across 39 countries.",
    description:
      "Not a fund: a service. Our Non-Dilutive Capital Desk matches ventures with grants, prizes, government incentives, and development finance across every country on the Route. Average non-dilutive raise per venture: $180K. This is capital that doesn't cost equity.",
    details: [
      { label: "Structure", value: "Advisory + placement" },
      { label: "Min entry", value: "N/A (venture-side)" },
      { label: "Fee", value: "8 to 12% success fee" },
      { label: "Avg raise", value: "$180K per venture" },
      { label: "Pipeline", value: "2,400+ active programs" },
      { label: "Geographies", value: "39 countries" },
    ],
    bestFor: "Ventures seeking working capital without dilution; grant-mandated organizations seeking pipeline",
    color: "#111111",
    howItWorks: [
      "xcelero assesses your venture against 2,400+ active grant and incentive programs",
      "We match your technology, geography, and stage to the highest-probability opportunities",
      "Our team writes and submits applications on your behalf",
      "We manage compliance, reporting, and milestone documentation post-award",
      "Success fee is charged only on capital secured: no win, no fee",
    ],
    keyFeatures: [
      "2,400+ active programs across 39 countries on the Route",
      "Average $180K raised per venture with zero equity cost",
      "Full-service: application, compliance, and post-award management",
      "Success-fee only model: aligned incentives with founders",
      "Deep relationships with DFIs, government agencies, and development finance institutions",
    ],
    riskNote: "Grant timelines are subject to government and institutional review cycles. Success fees apply only to awarded capital. This is an advisory service, not an investment vehicle. All services are subject to availability and may differ from what is described here.",
  },
  {
    id: "anchor-mandate",
    name: "Anchor Mandate",
    shortName: "Anchor",
    icon: Landmark,
    tagline: "Custom portfolio construction for institutional-scale allocators.",
    description:
      "For investors deploying $250K+, Anchor Mandates offer bespoke portfolio construction with advisory board participation, direct venture selection input, custom SPV formation, GP carry participation, and real-time dashboard access. This is venture investing on your terms.",
    details: [
      { label: "Structure", value: "Custom mandate / SMA" },
      { label: "Min entry", value: "$250,000" },
      { label: "Mgmt fee", value: "Negotiated" },
      { label: "Carry", value: "Negotiated carry participation" },
      { label: "Liquidity", value: "Custom terms" },
      { label: "Reporting", value: "Real-time dashboard" },
    ],
    bestFor: "National development funds, DFIs, endowments, ultra-high-net-worth, family offices with strategic mandates",
    color: "#111111",
    howItWorks: [
      "Collaborate with xCelero's investment team to define your strategic priorities and constraints",
      "We construct a bespoke portfolio across vehicles, sectors, and geographies",
      "Advisory board participation gives you direct input on venture selection",
      "Custom SPVs are formed for your targeted co-investment opportunities",
      "Real-time dashboard provides live portfolio analytics and reporting",
    ],
    keyFeatures: [
      "Bespoke portfolio construction with sector, geography, and stage allocation",
      "Advisory board seat with direct venture selection input",
      "Custom SPV formation for targeted co-investment",
      "GP carry participation: share in the economics of the fund management",
      "Real-time dashboard with live NAV, cash flow projections, and impact metrics",
    ],
    riskNote: "Anchor Mandates are fully customizable and subject to negotiated terms. Minimum commitment of $250K. Investment terms, fees, and carry are determined through direct negotiation. All vehicle structures are subject to regulatory approval and may differ from what is described here. This is not an offer to sell securities.",
  },
];

/* ── Investment Tiers ── */
const investmentTiers = [
  {
    id: "scout",
    name: "Scout",
    min: 500,
    max: 4999,
    icon: Zap,
    color: "#FF4D00",
    tagline: "Start building your position",
    benefits: [
      "Access to xCelero Fund (Continuous Capital Flow)",
      "Quarterly portfolio updates & NAV reports",
      "Route Deal Flow pipeline visibility",
      "Community investor network access",
    ],
    vehicle: "xCelero Fund",
    holdPeriod: "Open-ended",
    reporting: "Quarterly",
  },
  {
    id: "syndicate",
    name: "Syndicate",
    min: 5000,
    max: 49999,
    icon: HandCoins,
    color: "#FF4D00",
    tagline: "Co-invest alongside institutions",
    benefits: [
      "All Scout benefits",
      "SPV co-investment rights",
      "Side-by-side GP economics",
      "Annual LP meeting invitation",
      "Dedicated investor relations contact",
    ],
    vehicle: "SPV Syndicates",
    holdPeriod: "3\u20135 years",
    reporting: "Quarterly + ad-hoc",
  },
  {
    id: "partner",
    name: "Partner",
    min: 50000,
    max: 249999,
    icon: Building2,
    color: "#FF4D00",
    tagline: "Institutional-grade allocation",
    benefits: [
      "All Syndicate benefits",
      "Thematic Fund allocation",
      "Board observer seats (select ventures)",
      "Co-investment first-look rights",
      "Custom reporting & data room access",
      "Annual strategy summit attendance",
    ],
    vehicle: "Thematic Funds",
    holdPeriod: "7-year fund life",
    reporting: "Monthly + custom",
  },
  {
    id: "anchor",
    name: "Anchor",
    min: 250000,
    max: null,
    icon: Landmark,
    color: "#111111",
    tagline: "Shape the portfolio",
    benefits: [
      "All Partner benefits",
      "Advisory board participation",
      "Direct venture selection input",
      "Custom SPV formation",
      "GP carry participation",
      "Portfolio construction rights",
    ],
    vehicle: "Anchor Mandate",
    holdPeriod: "Custom",
    reporting: "Real-time dashboard",
  },
];

/* ── FAQ ── */
const faqItems = [
  {
    q: "Who can invest?",
    a: "Individual investors from $500 via the xCelero Fund. No accreditation required. SPV Syndicates and Thematic Funds require qualified investor status depending on jurisdiction. Anchor Mandates are for institutional investors and family offices.",
  },
  {
    q: "How does xCelero deploy capital?",
    a: "We deploy across five vehicles: (1) xCelero Fund, broad exposure across the full portfolio; (2) SPV Syndicates, single-deal co-investments alongside institutions; (3) Thematic Funds, concentrated sector bets in energy, food, independent tech; (4) Catalyst Notes, revenue-linked returns for revenue-stage ventures; (5) Non-Dilutive Desk, grants and incentives matching across 39 countries.",
  },
  {
    q: "What are the fees?",
    a: "xCelero Fund: 1% management fee, no carry. SPV Syndicates: 1% management + 10% carry above hurdle. Thematic Funds: 1.5% management + 20% carry above 8% hurdle. Catalyst Notes: no management fee, return target 1.5–2.5x. No sales load on any vehicle. See offering documents for full expense ratios. All fees are projected and subject to change upon fund formation.",
  },
  {
    q: "How does liquidity work?",
    a: "The xCelero Fund offers quarterly redemption windows (up to 5% of NAV per quarter). SPV positions are illiquid until exit event. Thematic Funds may offer semi-annual tender offers at Board discretion. Catalyst Notes have a defined 24–48 month duration. Consider all positions illiquid and invest only capital you can commit. All liquidity terms are subject to final fund documentation.",
  },
  {
    q: "Is this a fund-of-funds?",
    a: "No. xCelero Capital originates and builds ventures directly. We are a venture studio that deploys capital into our own creations, not a passive allocator. When we co-invest through SPVs, it's alongside institutional partners we've selected, not into blind pools.",
  },
  {
    q: "What's the investment thesis?",
    a: "Critical technology, energy, food, water, defense, manufacturing, not SaaS arbitrage. Global South-first markets where infrastructure gaps are the opportunity. Revenue-adjacent ventures with working prototypes and pilot customers, not slide decks. Route-connected companies that leverage the 190-hub network for scale. Self-sustaining by design technology that enables self-determination, not dependency.",
  },
  {
    q: "Can international investors participate?",
    a: "Yes. xCelero Capital structures investments through Mauritius HoldCos and UAE Free Zone entities to accept global capital. US investors access vehicles via Reg D offerings. African investors can participate through mobile money rails and local agent networks in select jurisdictions.",
  },
  {
    q: "How is NAV calculated?",
    a: "Portfolio valuations follow ASC 820 fair value measurement. Early-stage ventures are valued at cost until a material financing event. Revenue-generating ventures use a mix of revenue multiples, comparable transactions, and discounted cash flows. The fund is audited annually by an independent registered public accounting firm. Valuation methodology is projected and subject to final fund documentation.",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   CAPITAL PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Capital() {
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div className="bg-white text-[#111111]">
      <Hero onSubscribe={() => setShowSubscribe(true)} />
      <CapitalBridge />
      <InvestmentVehicles />
      <CapitalMedia />
      <InvestmentTiers />
      <FAQSection />
      <SubscribeModal
        isOpen={showSubscribe}
        onClose={() => setShowSubscribe(false)}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, Editorial centered with serif accent
   ══════════════════════════════════════════════════════════════════════════ */
function Hero({ onSubscribe }: { onSubscribe: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const heroStats = [
    { value: capitalTarget, label: "Capital target" },
    { value: String(totalVentures), label: "Projected ventures" },
    { value: `${totalCountries}+`, label: "Countries" },
    { value: "6", label: "Investment vehicles" },
    { value: String(totalHubs), label: "Route hubs" },
  ];

  return (
    <section className="relative bg-white text-[#111111] pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div ref={ref} className="w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Small label */}
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 md:mb-12">
            xCelero Capital
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-8 md:mb-10">
            Invest in{" "}
            <em className="italic font-serif text-[#FF4D00]">critical</em>{" "}
            technology from $500*
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-[1.6] text-[#111111]/50 font-medium max-w-2xl mb-10 sm:mb-14 md:mb-20">
            Six investment vehicles being structured. One thesis: the technology that defines
            the next century will be built in the markets that need it most.
            xCelero is designed to give you access to that pipeline.
          </p>

          {/* Stats metrics row, matching Route page style */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-10 md:gap-x-16 mb-10 sm:mb-14 md:mb-20">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                className="text-center min-w-[60px]"
              >
                <div className="text-[26px] sm:text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] text-[#111111]">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link
              to="#invest-tiers"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document
                  .getElementById("invest-tiers")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00] transition-colors"
            >
              Invest Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onSubscribe}
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#111111]/20 text-[12px] font-bold uppercase tracking-[0.12em] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all bg-white"
            >
              Get Updates
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CAPITAL BRIDGE: Image strip + two-column capital thesis with dotted map
   ══════════════════════════════════════════════════════════════════════════ */

const capitalBridgeImages = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    alt: "Financial analytics",
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    alt: "Collaborative workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    alt: "Global network",
  },
];

/* Dot-matrix world map for Capital page */
const capitalWorldDots = (() => {
  const rows = [
    ".......##..........###.............#####..####..............",
    "......####.........####............######.######............",
    ".....######........#####...........########.######..........",
    ".....#######.......#####..........#########..######.........",
    "....#########......######.........#########...######........",
    "....##########.....#######........#########....#####........",
    "...############....########.......########.....#####........",
    "...############....########.......########......####........",
    "....###########....#########......#######.......####........",
    "....##########.....##########.....######........###.........",
    ".....#########.....##########.....######........###.........",
    "......########.....###########....#####.........##..........",
    ".......#######.....###########....#####.........##..........",
    "........######.....############...######.........#..........",
    ".........#####.....####.#####....########...................",
    "..........####.....####..####...#########...................",
    "...........###.....####...####..#########...................",
    "............##.....####....###..########....................",
    ".............#......###....###..#######.....................",
    "....................###.....##...######.....................",
    ".....................##.....##...#####......................",
    "......................##.....#...####.......................",
    ".......................#.........###........................",
    "................................##.........................",
    "................................#..........................",
    "............................................................",
    "............................................................",
    "............................................................",
    "............................................................",
    "............................................................",
  ];
  const dots: { row: number; col: number }[] = [];
  rows.forEach((row, r) => {
    [...row].forEach((ch, c) => {
      if (ch === "#") dots.push({ row: r, col: c });
    });
  });
  return dots;
})();

function CapitalBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Image strip: three overlapping images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-end justify-start gap-0 mb-16 md:mb-24"
        >
          {capitalBridgeImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden bg-[#F5F5F5] shadow-lg ${
                i === 0
                  ? "w-[36%] md:w-[32%] aspect-[4/3] z-10"
                  : i === 1
                  ? "w-[44%] md:w-[40%] aspect-[4/3] z-30 -mt-3 -ml-[8%] md:-ml-[4%]"
                  : "w-[36%] md:w-[32%] aspect-[4/3] z-10 -ml-[8%] md:-ml-[4%]"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column layout: text left, dotted map right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Capital thesis text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-[22px] sm:text-[28px] md:text-[34px] leading-[1.25] font-display font-medium tracking-[-0.02em] text-[#111111] mb-6 md:mb-8">
              Capital designed to understand the terrain, not just the <span className="text-[#FF4D00]">return profile</span>.
            </p>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#111111]/60 font-medium max-w-xl">
              Traditional venture capital flows where returns are proven. xCelero is designed to deploy capital where the technology is most needed, in the geographies building the next century&apos;s infrastructure. Six vehicles, one thesis: <span className="text-[#111111] font-semibold">critical technology in the markets that need it most</span>.
            </p>
          </motion.div>

          {/* Right: Dotted world map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <svg
                viewBox="0 0 60 30"
                className="w-full h-auto"
                style={{ imageRendering: "auto" }}
              >
                {/* All land dots in dark color */}
                {capitalWorldDots.map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.col * 1}
                    cy={dot.row * 1}
                    r="0.35"
                    className="fill-[#111111]/70"
                  />
                ))}
                {/* Africa highlighted region: cols 23-33, rows 3-21 */}
                {capitalWorldDots
                  .filter(
                    (d) =>
                      d.col >= 23 && d.col <= 33 && d.row >= 3 && d.row <= 21
                  )
                  .map((dot, i) => (
                    <circle
                      key={`af-${i}`}
                      cx={dot.col * 1}
                      cy={dot.row * 1}
                      r="0.4"
                      className="fill-[#FF4D00]"
                    />
                  ))}
              </svg>
              {/* Label */}
              <div className="absolute bottom-2 right-4 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                $4B Target · 6 Vehicles Planned
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STATS BAR, Horizontal ticker
   ══════════════════════════════════════════════════════════════════════════ */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: capitalTarget, label: "Capital target" },
    { value: String(totalVentures), label: "Active ventures" },
    { value: `${totalCountries}+`, label: "Countries" },
    { value: "6", label: "Investment vehicles" },
    { value: String(totalHubs), label: "Route hubs" },
  ];

  return (
    <section
      ref={ref}
      className="py-8 md:py-10 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="flex flex-wrap justify-between gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center flex-1 min-w-[100px]"
            >
              <span className="block text-[28px] md:text-[36px] font-display font-medium tracking-[-0.03em] leading-[1]">
                {stat.value}
              </span>
              <span className="block text-[11px] md:text-[12px] text-[#111111]/40 font-medium tracking-[0.05em] uppercase mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INVESTMENT VEHICLES, Tabbed editorial layout
   ══════════════════════════════════════════════════════════════════════════ */
function InvestmentVehicles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string>(investmentVehicles[0].id);
  const activeVehicle = investmentVehicles.find((v) => v.id === activeId)!;

  return (
    <section
      ref={ref}
      id="investment-vehicles"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            Investment Vehicles
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.9] mt-3">
            Six ways to deploy{" "}
            <em className="font-serif italic text-[#FF4D00]">capital</em>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] max-w-xl mt-4">
            From $500 in the xCelero Fund to custom Anchor Mandates at $250K+,
            every vehicle is being designed for the same thesis: critical technology in
            the markets that need it most.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-0 border border-[#111111]/10">
          {/* Left: Vertical tab nav */}
          <div className="lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-r border-[#111111]/10">
            {/* Mobile: horizontal scroll */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible">
              {investmentVehicles.map((vehicle, i) => {
                const Icon = vehicle.icon;
                const isActive = activeId === vehicle.id;
                return (
                  <motion.button
                    key={vehicle.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    onClick={() => setActiveId(vehicle.id)}
                    className={`flex items-center gap-3 px-5 py-4 lg:py-5 lg:px-6 text-left transition-all shrink-0 lg:shrink border-b lg:border-b lg:border-b-0 lg:border-r-0 border-[#111111]/5 whitespace-nowrap lg:whitespace-normal ${
                      isActive
                        ? "bg-[#FF4D00]/[0.04] border-l-2 border-l-[#FF4D00] lg:border-l-2"
                        : "border-l-2 border-l-transparent hover:bg-[#111111]/[0.02] hover:border-l-[#111111]/10"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? "bg-[#FF4D00]" : "border border-[#111111]/10"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 transition-colors ${
                          isActive ? "text-white" : "text-[#FF4D00]"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/25 block">
                        {vehicle.shortName}
                      </span>
                      <span
                        className={`text-[13px] md:text-[14px] font-medium leading-tight block truncate ${
                          isActive ? "text-[#111111]" : "text-[#111111]/50"
                        }`}
                      >
                        {vehicle.name}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Active vehicle detail */}
          <div className="lg:col-span-8 xl:col-span-9 bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVehicle.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 md:p-8 lg:p-10"
              >
                {/* Vehicle header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF4D00] flex items-center justify-center">
                      <activeVehicle.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">
                      {activeVehicle.shortName}
                    </span>
                  </div>
                  <h3 className="text-[24px] md:text-[30px] font-display font-medium tracking-tight mb-2">
                    {activeVehicle.name}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#FF4D00] font-medium leading-[1.5] mb-4">
                    {activeVehicle.tagline}
                  </p>
                  <p className="text-[14px] md:text-[15px] text-[#111111]/55 font-medium leading-[1.7] max-w-2xl">
                    {activeVehicle.description}
                  </p>
                </div>

                {/* Key terms bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8 border-t border-b border-[#111111]/5 py-5">
                  {activeVehicle.details.map((detail, i) => (
                    <div key={i}>
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/25 block mb-1">
                        {detail.label}
                      </span>
                      <span className="text-[13px] md:text-[14px] font-medium text-[#111111]/70 leading-[1.3]">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
                  {/* How It Works timeline */}
                  <div className="lg:col-span-7">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-5">
                      <Clock className="w-3.5 h-3.5 inline mr-2 -mt-0.5" />
                      How It Works
                    </span>
                    <div className="relative ml-1">
                      {activeVehicle.howItWorks.map((step, si) => (
                        <div key={si} className="flex gap-4 relative pb-5 last:pb-0">
                          {si < activeVehicle.howItWorks.length - 1 && (
                            <div className="absolute left-[15px] top-[34px] w-[2px] bottom-0 bg-[#FF4D00]/12" />
                          )}
                          <div className="shrink-0 w-8 h-8 rounded-full bg-[#FF4D00] flex items-center justify-center text-[11px] font-mono font-bold text-white z-10">
                            {String(si + 1).padStart(2, "0")}
                          </div>
                          <p className="text-[13px] md:text-[14px] text-[#111111]/55 font-medium leading-[1.6] pt-1">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features + Best For + Risk */}
                  <div className="lg:col-span-5">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-4">
                      Key Features
                    </span>
                    <ul className="space-y-2.5 mb-6">
                      {activeVehicle.keyFeatures.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-[#FF4D00] shrink-0 mt-0.5" strokeWidth={2} />
                          <span className="text-[12px] md:text-[13px] text-[#111111]/55 font-medium leading-[1.5]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-[#111111]/5 pt-4 mb-5">
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/25 block mb-2">
                        Best For
                      </span>
                      <p className="text-[12px] md:text-[13px] text-[#111111]/45 font-medium leading-[1.6]">
                        {activeVehicle.bestFor}
                      </p>
                    </div>

                    <div className="border-l-2 border-[#FF4D00]/15 pl-4">
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/20 block mb-1.5">
                        Risk
                      </span>
                      <p className="text-[11px] text-[#111111]/35 font-medium leading-[1.6] italic">
                        {activeVehicle.riskNote}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CAPITAL MEDIA: Full-width image/video panel
   ══════════════════════════════════════════════════════════════════════════ */
function CapitalMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-[#F5F5F5] shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
            alt="Infrastructure development across Africa: investment, technology, and connectivity hubs"
            className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          {/* Overlay label */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111]/60 to-transparent p-6 md:p-8">
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/60 block mb-2">
              xCelero Capital
            </span>
            <p className="text-[16px] md:text-[20px] font-display font-medium text-white leading-[1.3]">
              Building infrastructure where it&apos;s needed{" "}
              <em className="font-serif italic text-[#FF4D00]">most</em>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INVESTMENT TIERS, Multi-step wizard flow
   ══════════════════════════════════════════════════════════════════════════ */

/* Map each tier to its matching vehicle for howItWorks data */
const tierVehicleMap: Record<string, typeof investmentVehicles[number] | undefined> = {
  scout: investmentVehicles.find((v) => v.id === "xcelero-fund"),
  syndicate: investmentVehicles.find((v) => v.id === "spv-syndicates"),
  partner: investmentVehicles.find((v) => v.id === "thematic-funds"),
  anchor: investmentVehicles.find((v) => v.id === "anchor-mandate"),
};

type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const stepLabels = [
  { step: 1 as WizardStep, label: "Choose Tier", shortLabel: "Tier" },
  { step: 2 as WizardStep, label: "Your Vehicle", shortLabel: "Vehicle" },
  { step: 3 as WizardStep, label: "Benefits", shortLabel: "Benefits" },
  { step: 4 as WizardStep, label: "Get Started", shortLabel: "Start" },
  { step: 5 as WizardStep, label: "Fund", shortLabel: "Fund" },
  { step: 6 as WizardStep, label: "Details", shortLabel: "Details" },
  { step: 7 as WizardStep, label: "Confirmed", shortLabel: "Done" },
];

/* ── Payment Methods ── */
const paymentMethods = [
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    description: "Direct wire or ACH from your bank. Largest amounts, lowest fees. Settlement in 1–3 business days.",
    details: ["No transaction limits", "1–3 business day settlement", "USD, EUR, GBP, AED, KES, ZAR, NGN", "No processing fee"],
    icon: "🏦",
    bestFor: "Anchor & Partner tier investors, large allocations",
    speed: "1–3 days",
    fee: "None",
  },
  {
    id: "card",
    name: "Card Payment",
    description: "Visa or Mastercard for fast entry. Instant confirmation, higher processing fees apply.",
    details: ["Instant confirmation", "$50,000 per transaction limit", "Visa & Mastercard accepted", "2.5% processing fee"],
    icon: "💳",
    bestFor: "Scout & Syndicate tier, quick initial deposits",
    speed: "Instant",
    fee: "2.5%",
  },
  {
    id: "crypto",
    name: "Crypto Transfer",
    description: "USDC, USDT, or BTC via our partnered custodian. On-chain confirmation, converted to USD at point of deposit.",
    details: ["USDC, USDT, BTC supported", "On-chain confirmation", "Converted to USD at deposit", "0.5% conversion fee"],
    icon: "₿",
    bestFor: "Global investors seeking speed and jurisdiction flexibility",
    speed: "Minutes",
    fee: "0.5%",
  },
  {
    id: "mobile-money",
    name: "Mobile Money",
    description: "M-Pesa, Airtel Money, MTN Mobile Money. Built for African investors who move capital through mobile rails.",
    details: ["M-Pesa, Airtel, MTN supported", "Local agent deposit options", "KES, UGX, TZS, GHS, NGN", "No processing fee"],
    icon: "📱",
    bestFor: "East & West African investors, Scout tier entry",
    speed: "Instant",
    fee: "None",
  },
];

function InvestmentTiers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [selectedTierId, setSelectedTierId] = useState<string>("scout");

  const selectedTier = investmentTiers.find((t) => t.id === selectedTierId)!;
  const selectedVehicle = tierVehicleMap[selectedTierId];
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const confirmationRef = useRef<string>(`XCL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const [direction, setDirection] = useState<1 | -1>(1);

  /* ── Investor info state ── */
  const [investorName, setInvestorName] = useState("");
  const [investorEmail, setInvestorEmail] = useState("");
  const [accredited, setAccredited] = useState(false);

  /* ── Payment form state ── */
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const [cryptoNetwork, setCryptoNetwork] = useState("USDC");
  const [walletAddress, setWalletAddress] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");

  const [mobileProvider, setMobileProvider] = useState("M-Pesa");
  const [mobilePhone, setMobilePhone] = useState("");
  const [mobileAmount, setMobileAmount] = useState("");

  const resetPaymentForm = () => {
    setCardNumber(""); setCardExpiry(""); setCardCvv(""); setCardName("");
    setBankName(""); setAccountHolder(""); setAccountNumber(""); setSwiftCode("");
    setCryptoNetwork("USDC"); setWalletAddress(""); setCryptoAmount("");
    setMobileProvider("M-Pesa"); setMobilePhone(""); setMobileAmount("");
  };

  const isFormValid = (() => {
    if (!selectedPaymentId) return false;
    switch (selectedPaymentId) {
      case "card":
        return cardNumber.replace(/\s/g, "").length >= 15 && cardExpiry.length >= 4 && cardCvv.length >= 3 && cardName.trim().length > 0;
      case "bank-transfer":
        return bankName.trim().length > 0 && accountHolder.trim().length > 0 && accountNumber.trim().length > 0 && swiftCode.trim().length > 0;
      case "crypto":
        return walletAddress.trim().length > 0 && cryptoAmount.trim().length > 0;
      case "mobile-money":
        return mobilePhone.trim().length >= 8 && mobileAmount.trim().length > 0;
      default: return false;
    }
  })();

  const handleConfirmPayment = async () => {
    if (!selectedPaymentId || !isFormValid) return;
    setIsProcessing(true);
    setPaymentError(null);
    try {
      const res = await fetch("/api/capital/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: investorName.trim() || "Investor",
          email: investorEmail.trim(),
          amount: selectedTier.min,
          tier: selectedTierId,
          accredited,
          consent: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      goNext(); // go to step 7
    } catch (err) {
      setPaymentError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const goToStep = (step: WizardStep) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };
  const goNext = () => {
    if (currentStep < 7) {
      setDirection(1);
      setCurrentStep((currentStep + 1) as WizardStep);
    }
  };
  const goBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((currentStep - 1) as WizardStep);
    }
  };

  return (
    <section
      ref={ref}
      id="invest-tiers"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-t border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            Invest Now
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.9] mt-3">
            Your investment{" "}
            <em className="font-serif italic text-[#FF4D00]">journey</em>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] max-w-xl mt-4">
            Seven steps from curiosity to commitment. Choose your tier, understand
            your vehicle, see what you unlock, learn the process, select funding,
            enter details, and confirm.
          </p>
        </motion.div>

        {/* ── Step Progress Bar ── */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-0">
            {stepLabels.map((s, i) => {
              const isActive = currentStep === s.step;
              const isCompleted = currentStep > s.step;
              const isLast = i === stepLabels.length - 1;
              return (
                <div key={s.step} className="flex items-center flex-1 last:flex-none">
                  {/* Step circle + label */}
                  <button
                    onClick={() => {
                      if (isCompleted || isActive) goToStep(s.step);
                    }}
                    className={`flex items-center gap-2.5 group transition-all ${
                      isCompleted || isActive ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-[#FF4D00] text-white scale-110"
                          : isCompleted
                          ? "bg-[#FF4D00] text-white"
                          : "bg-[#111111]/8 text-[#111111]/30"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                      ) : (
                        String(s.step).padStart(2, "0")
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold tracking-widest uppercase hidden sm:inline transition-colors ${
                        isActive
                          ? "text-[#FF4D00]"
                          : isCompleted
                          ? "text-[#111111]/60"
                          : "text-[#111111]/25"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                  {/* Connecting line */}
                  {!isLast && (
                    <div className="flex-1 mx-3 md:mx-4 h-[2px] bg-[#111111]/8 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-[#FF4D00]"
                        initial={{ width: "0%" }}
                        animate={{
                          width: isCompleted ? "100%" : isActive ? "50%" : "0%",
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Step Content ── */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Choose Your Tier */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6">
                  <h3 className="text-[20px] md:text-[26px] font-display font-medium tracking-tight mb-2">
                    Choose your tier
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#111111]/50 font-medium leading-[1.6]">
                    Every tier builds on the one before. Start where you are. Upgrade anytime.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {investmentTiers.map((tier, i) => {
                    const Icon = tier.icon;
                    const isSelected = selectedTierId === tier.id;
                    return (
                      <motion.button
                        key={tier.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`text-left border bg-white transition-all p-5 md:p-6 ${
                          isSelected
                            ? "border-[#FF4D00] ring-1 ring-[#FF4D00]/20 shadow-md"
                            : "border-[#111111]/10 hover:border-[#FF4D00]/30 hover:shadow-sm"
                        }`}
                      >
                        {/* Top accent */}
                        <div
                          className={`h-1 w-10 mb-4 transition-colors ${
                            isSelected ? "bg-[#FF4D00]" : "bg-[#111111]/10"
                          }`}
                        />

                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                              isSelected ? "bg-[#FF4D00]" : "border border-[#111111]/10"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 transition-colors ${
                                isSelected ? "text-white" : "text-[#FF4D00]"
                              }`}
                              strokeWidth={1.5}
                            />
                          </div>
                          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">
                            {tier.vehicle}
                          </span>
                        </div>

                        <h4 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight mb-1">
                          {tier.name}
                        </h4>
                        <div className="mb-2">
                          <span className="text-[24px] md:text-[30px] font-display font-medium tracking-[-0.02em] leading-[1]">
                            ${tier.min.toLocaleString()}
                          </span>
                          <span className="text-[12px] text-[#111111]/35 font-medium ml-1">
                            {tier.max ? `– $${tier.max.toLocaleString()}` : "+"}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#FF4D00] font-medium">
                          {tier.tagline}
                        </p>

                        {/* Selected indicator */}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 pt-3 border-t border-[#FF4D00]/10 flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]"
                          >
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                            Selected
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Next button */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={goNext}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00] transition-colors"
                  >
                    Continue to your vehicle
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Your Vehicle */}
            {currentStep === 2 && selectedVehicle && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left: Vehicle details */}
                  <div className="lg:col-span-7">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF4D00] flex items-center justify-center">
                          <selectedVehicle.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">
                            {selectedTier.name} Tier
                          </span>
                          <h3 className="text-[22px] md:text-[28px] font-display font-medium tracking-tight">
                            {selectedVehicle.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-[13px] text-[#FF4D00] font-medium mb-3">
                        {selectedVehicle.tagline}
                      </p>
                      <p className="text-[14px] md:text-[15px] text-[#111111]/55 font-medium leading-[1.7]">
                        {selectedVehicle.description}
                      </p>
                    </div>

                    {/* Key terms grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 border-t border-[#111111]/5 pt-6">
                      {selectedVehicle.details.map((detail, i) => (
                        <div key={i}>
                          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 block mb-1">
                            {detail.label}
                          </span>
                          <span className="text-[14px] md:text-[15px] font-medium text-[#111111]/80 leading-[1.4]">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Risk note */}
                    <div className="bg-[#111111]/[0.03] border border-[#111111]/5 p-4">
                      <p className="text-[11px] text-[#111111]/40 font-medium leading-[1.6]">
                        <span className="font-bold uppercase tracking-wider text-[#111111]/50">Risk note:</span>{" "}
                        {selectedVehicle.riskNote}
                      </p>
                    </div>
                  </div>

                  {/* Right: Key features */}
                  <div className="lg:col-span-5">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-5">
                      Key Features
                    </span>
                    <ul className="space-y-3 mb-6">
                      {selectedVehicle.keyFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#FF4D00]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#FF4D00]" strokeWidth={2.5} />
                          </div>
                          <span className="text-[13px] md:text-[14px] text-[#111111]/60 font-medium leading-[1.5]">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-t border-[#111111]/5 pt-5">
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/25 block mb-2">
                        Best For
                      </span>
                      <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6]">
                        {selectedVehicle.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between border-t border-[#111111]/5 pt-6">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#111111]/10 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:border-[#111111] hover:text-[#111111] transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    Back
                  </button>
                  <button
                    onClick={goNext}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00] transition-colors"
                  >
                    See your benefits
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Benefits Unlocked */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left: Tier summary */}
                  <div className="lg:col-span-4">
                    <div className="border border-[#FF4D00] bg-white p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#FF4D00] flex items-center justify-center">
                          <selectedTier.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-[22px] md:text-[28px] font-display font-medium tracking-tight">
                            {selectedTier.name}
                          </h3>
                          <p className="text-[12px] text-[#FF4D00] font-medium">
                            {selectedTier.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-[#111111]/5 pt-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">Investment</span>
                          <span className="text-[13px] font-medium">
                            ${selectedTier.min.toLocaleString()}
                            {selectedTier.max ? ` – $${selectedTier.max.toLocaleString()}` : "+"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">Vehicle</span>
                          <span className="text-[13px] font-medium">{selectedTier.vehicle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">Hold period</span>
                          <span className="text-[13px] font-medium">{selectedTier.holdPeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">Reporting</span>
                          <span className="text-[13px] font-medium">{selectedTier.reporting}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Cumulative benefits */}
                  <div className="lg:col-span-8">
                    <h3 className="text-[20px] md:text-[26px] font-display font-medium tracking-tight mb-2">
                      What you unlock
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-[#111111]/50 font-medium leading-[1.6] mb-8">
                      Every tier includes the benefits of all tiers below it. Here&apos;s everything the{" "}
                      <span className="text-[#FF4D00] font-semibold">{selectedTier.name}</span> tier unlocks.
                    </p>

                    {/* Show all cumulative benefits from this tier and all below */}
                    {(() => {
                      const tierIndex = investmentTiers.findIndex((t) => t.id === selectedTierId);
                      const allBenefits = investmentTiers.slice(0, tierIndex + 1);
                      return (
                        <div className="space-y-6">
                          {allBenefits.map((t, tIdx) => {
                            const TierIcon = t.icon;
                            const isCurrentTier = t.id === selectedTierId;
                            return (
                              <div key={t.id}>
                                {/* Tier header */}
                                <div className="flex items-center gap-2.5 mb-3">
                                  <TierIcon
                                    className={`w-4 h-4 ${isCurrentTier ? "text-[#FF4D00]" : "text-[#111111]/25"}`}
                                    strokeWidth={1.5}
                                  />
                                  <span
                                    className={`text-[10px] font-mono font-bold tracking-widest uppercase ${
                                      isCurrentTier ? "text-[#FF4D00]" : "text-[#111111]/25"
                                    }`}
                                  >
                                    {t.name}
                                  </span>
                                  {isCurrentTier && (
                                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] bg-[#FF4D00]/10 px-2 py-0.5">
                                      Your tier
                                    </span>
                                  )}
                                </div>
                                {/* Benefits list */}
                                <ul className="space-y-2.5 ml-6">
                                  {t.benefits.map((benefit, bIdx) => (
                                    <motion.li
                                      key={bIdx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: tIdx * 0.1 + bIdx * 0.06,
                                      }}
                                      className="flex items-start gap-3"
                                    >
                                      <Check
                                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                                          isCurrentTier ? "text-[#FF4D00]" : "text-[#111111]/20"
                                        }`}
                                        strokeWidth={2}
                                      />
                                      <span
                                        className={`text-[13px] md:text-[14px] font-medium leading-[1.5] ${
                                          isCurrentTier ? "text-[#111111]/70" : "text-[#111111]/40"
                                        }`}
                                      >
                                        {benefit}
                                        {!isCurrentTier && (
                                          <span className="text-[#111111]/20 ml-1 text-[10px] font-mono uppercase tracking-wider">
                                            ({t.name})
                                          </span>
                                        )}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between border-t border-[#111111]/5 pt-6">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#111111]/10 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:border-[#111111] hover:text-[#111111] transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    Back
                  </button>
                  <button
                    onClick={goNext}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00] transition-colors"
                  >
                    How to get started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Get Started: How it works timeline + CTA */}
            {currentStep === 4 && selectedVehicle && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left: How it works timeline */}
                  <div className="lg:col-span-7">
                    <div className="mb-8">
                      <h3 className="text-[20px] md:text-[26px] font-display font-medium tracking-tight mb-2">
                        How to get started
                      </h3>
                      <p className="text-[14px] md:text-[15px] text-[#111111]/50 font-medium leading-[1.6]">
                        Your path from here to invested. {selectedVehicle.howItWorks.length} steps, zero friction.
                      </p>
                    </div>

                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-[#FF4D00]/10" />

                      {selectedVehicle.howItWorks.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="flex gap-5 relative pb-8 last:pb-0"
                        >
                          {/* Step node */}
                          <div className="relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#FF4D00] flex items-center justify-center text-[12px] font-mono font-bold text-white shadow-lg shadow-[#FF4D00]/20">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                          </div>
                          {/* Step content */}
                          <div className="pt-1.5">
                            <p className="text-[15px] md:text-[16px] text-[#111111]/70 font-medium leading-[1.6]">
                              {step}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Summary + CTA */}
                  <div className="lg:col-span-5">
                    <div className="border border-[#FF4D00] bg-white p-6 md:p-8 mb-6">
                      <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-4">
                        Investment Summary
                      </h4>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#FF4D00] flex items-center justify-center">
                            <selectedTier.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                          </div>
                          <div>
                            <span className="text-[16px] font-display font-medium">{selectedTier.name} Tier</span>
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 ml-2">
                              via {selectedVehicle.shortName}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-[#111111]/5 pt-3 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">Entry</span>
                            <span className="text-[13px] font-medium">${selectedTier.min.toLocaleString()}{selectedTier.max ? ` – $${selectedTier.max.toLocaleString()}` : "+"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">Structure</span>
                            <span className="text-[13px] font-medium">{selectedVehicle.details[0]?.value}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">Mgmt fee</span>
                            <span className="text-[13px] font-medium">{selectedVehicle.details[2]?.value}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">Hold</span>
                            <span className="text-[13px] font-medium">{selectedTier.holdPeriod}</span>
                          </div>
                        </div>
                      </div>

                      {/* Investor info fields */}
                      <div className="border-t border-[#111111]/5 pt-4 space-y-4 mb-6">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 block">
                          Your Details
                        </span>
                        <div>
                          <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={investorName}
                            onChange={(e) => setInvestorName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full border border-[#111111]/10 px-3 py-2.5 text-[13px] font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={investorEmail}
                            onChange={(e) => setInvestorEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full border border-[#111111]/10 px-3 py-2.5 text-[13px] font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                          />
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={accredited}
                            onChange={(e) => setAccredited(e.target.checked)}
                            className="mt-0.5 w-4 h-4 rounded border-[#111111]/20 text-[#FF4D00] focus:ring-[#FF4D00]/20 accent-[#FF4D00]"
                          />
                          <span className="text-[11px] text-[#111111]/50 font-medium leading-[1.5] group-hover:text-[#111111]/70 transition-colors">
                            I am an accredited investor (qualified under applicable jurisdiction)
                          </span>
                        </label>
                      </div>

                      <button
                        onClick={goNext}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#FF4D00] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#111111] transition-colors"
                      >
                        Continue to funding
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick actions */}
                    <div className="flex flex-col gap-3 mt-4">
                      <button
                        onClick={() => { goToStep(1); setSelectedTierId("scout"); }}
                        className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 hover:text-[#FF4D00] transition-colors text-left"
                      >
                        ← Start over with a different tier
                      </button>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between border-t border-[#111111]/5 pt-6">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#111111]/10 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:border-[#111111] hover:text-[#111111] transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    Back to benefits
                  </button>
                  <button
                    onClick={goNext}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#111111] transition-colors"
                  >
                    Fund your investment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Fund Your Investment: Payment methods */}
            {currentStep === 5 && selectedVehicle && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6">
                  <h3 className="text-[20px] md:text-[26px] font-display font-medium tracking-tight mb-2">
                    Fund your investment
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#111111]/50 font-medium leading-[1.6] max-w-2xl">
                    Choose how you move capital into your{" "}
                    <span className="text-[#FF4D00] font-semibold">{selectedTier.name}</span>{" "}
                    allocation. Select a payment method to continue.
                  </p>
                </div>

                {/* Payment method cards: selectable */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {paymentMethods.map((method, i) => {
                    const isSelected = selectedPaymentId === method.id;
                    return (
                      <motion.button
                        key={method.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        onClick={() => setSelectedPaymentId(method.id)}
                        className={`text-left border bg-white transition-all group ${
                          isSelected
                            ? "border-[#FF4D00] ring-1 ring-[#FF4D00]/20 shadow-md"
                            : "border-[#111111]/10 hover:border-[#FF4D00]/30"
                        }`}
                      >
                        <div className="p-5 md:p-6">
                          {/* Selection indicator */}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2 mb-3 text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]"
                            >
                              <Check className="w-3 h-3" strokeWidth={2.5} />
                              Selected
                            </motion.div>
                          )}

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-[24px] leading-none">{method.icon}</span>
                              <h4 className="text-[16px] md:text-[18px] font-display font-medium tracking-tight">
                                {method.name}
                              </h4>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/20">
                                {method.speed}
                              </span>
                              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 ${
                                method.fee === "None"
                                  ? "text-[#FF4D00] bg-[#FF4D00]/10"
                                  : "text-[#111111]/40 bg-[#111111]/5"
                              }`}>
                                {method.fee === "None" ? "No fee" : method.fee + " fee"}
                              </span>
                            </div>
                          </div>

                          <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6] mb-4">
                            {method.description}
                          </p>

                          <ul className="space-y-1.5 mb-4">
                            {method.details.map((detail, di) => (
                              <li key={di} className="flex items-start gap-2">
                                <Check className={`w-3 h-3 shrink-0 mt-0.5 ${isSelected ? "text-[#FF4D00]" : "text-[#111111]/15"}`} strokeWidth={2} />
                                <span className="text-[11px] md:text-[12px] text-[#111111]/45 font-medium leading-[1.5]">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <div className="border-t border-[#111111]/5 pt-3">
                            <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/20">
                              Best for
                            </span>
                            <p className="text-[11px] text-[#111111]/35 font-medium leading-[1.5]">
                              {method.bestFor}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Continue CTA: only visible when method selected */}
                <AnimatePresence>
                  {selectedPaymentId && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="border border-[#FF4D00] bg-white"
                    >
                      <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex-1 text-center sm:text-left">
                          <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-2">
                            {paymentMethods.find((m) => m.id === selectedPaymentId)?.name} selected
                          </h4>
                          <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6]">
                            You&apos;ll enter your {selectedPaymentId === "card" ? "card details" : selectedPaymentId === "bank-transfer" ? "bank account information" : selectedPaymentId === "crypto" ? "wallet and transfer details" : "mobile money details"} on the next step.
                          </p>
                        </div>
                        <button
                          onClick={goNext}
                          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF4D00] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#111111] transition-colors shrink-0"
                        >
                          Enter payment details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!selectedPaymentId && (
                  <div className="border border-dashed border-[#111111]/15 bg-[#111111]/[0.02] p-8 text-center">
                    <p className="text-[13px] text-[#111111]/30 font-medium">
                      Select a payment method above to continue
                    </p>
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between border-t border-[#111111]/5 pt-6">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#111111]/10 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:border-[#111111] hover:text-[#111111] transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    Back
                  </button>
                  <button
                    onClick={() => { goToStep(1 as WizardStep); setSelectedTierId("scout"); setSelectedPaymentId(null); resetPaymentForm(); }}
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#111111]/25 hover:text-[#FF4D00] transition-colors"
                  >
                    ← Start over
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Payment Details: Method-specific form */}
            {currentStep === 6 && selectedVehicle && selectedPaymentId && (
              <motion.div
                key="step-6"
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6">
                  <h3 className="text-[20px] md:text-[26px] font-display font-medium tracking-tight mb-2">
                    Enter your{" "}
                    <span className="text-[#FF4D00]">{paymentMethods.find((m) => m.id === selectedPaymentId)?.name}</span>{" "}
                    details
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#111111]/50 font-medium leading-[1.6] max-w-2xl">
                    All data is encrypted and processed securely. Your capital is not committed until you confirm the transaction.
                  </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Left: Form fields */}
                  <div className="lg:col-span-7">
                    <div className="border border-[#111111]/10 bg-white p-6 md:p-8">
                      {/* Card Payment Form */}
                      {selectedPaymentId === "card" && (
                        <div className="space-y-5">
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="Full name on card"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => {
                                const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                                const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
                                setCardNumber(formatted);
                              }}
                              placeholder="0000 0000 0000 0000"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => {
                                  let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                  if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                                  setCardExpiry(v);
                                }}
                                placeholder="MM/YY"
                                className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                                CVV
                              </label>
                              <input
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                placeholder="•••"
                                maxLength={4}
                                className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                              />
                            </div>
                          </div>
                          <div className="border-t border-[#111111]/5 pt-4 mt-2">
                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/20">
                              <Shield className="w-3.5 h-3.5" />
                              256-bit SSL encrypted · Visa & Mastercard accepted
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bank Transfer Form */}
                      {selectedPaymentId === "bank-transfer" && (
                        <div className="space-y-5">
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              value={bankName}
                              onChange={(e) => setBankName(e.target.value)}
                              placeholder="e.g. Standard Bank, KCB Bank"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Account Holder Name
                            </label>
                            <input
                              type="text"
                              value={accountHolder}
                              onChange={(e) => setAccountHolder(e.target.value)}
                              placeholder="Full legal name on the account"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Account Number / IBAN
                            </label>
                            <input
                              type="text"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value.replace(/\s/g, ""))}
                              placeholder="Account number or IBAN"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              SWIFT / BIC Code
                            </label>
                            <input
                              type="text"
                              value={swiftCode}
                              onChange={(e) => setSwiftCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11))}
                              placeholder="e.g. SBICUS33"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div className="border-t border-[#111111]/5 pt-4 mt-2">
                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/20">
                              <Shield className="w-3.5 h-3.5" />
                              Wire transfers settle in 1–3 business days · No processing fee
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Crypto Transfer Form */}
                      {selectedPaymentId === "crypto" && (
                        <div className="space-y-5">
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Network / Token
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {["USDC", "USDT", "BTC"].map((net) => (
                                <button
                                  key={net}
                                  type="button"
                                  onClick={() => setCryptoNetwork(net)}
                                  className={`py-2.5 text-[12px] font-mono font-bold uppercase tracking-widest border transition-all ${
                                    cryptoNetwork === net
                                      ? "border-[#FF4D00] bg-[#FF4D00]/5 text-[#FF4D00]"
                                      : "border-[#111111]/10 text-[#111111]/40 hover:border-[#111111]/20"
                                  }`}
                                >
                                  {net}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Your Wallet Address
                            </label>
                            <input
                              type="text"
                              value={walletAddress}
                              onChange={(e) => setWalletAddress(e.target.value)}
                              placeholder="0x... or your wallet address"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Amount ({cryptoNetwork})
                            </label>
                            <input
                              type="text"
                              value={cryptoAmount}
                              onChange={(e) => setCryptoAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                              placeholder="0.00"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div className="border-t border-[#111111]/5 pt-4 mt-2">
                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/20">
                              <Shield className="w-3.5 h-3.5" />
                              On-chain confirmation · Converted to USD at deposit · 0.5% conversion fee
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mobile Money Form */}
                      {selectedPaymentId === "mobile-money" && (
                        <div className="space-y-5">
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Mobile Money Provider
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {["M-Pesa", "Airtel", "MTN"].map((prov) => (
                                <button
                                  key={prov}
                                  type="button"
                                  onClick={() => setMobileProvider(prov === "M-Pesa" ? "M-Pesa" : prov === "Airtel" ? "Airtel Money" : "MTN Mobile Money")}
                                  className={`py-2.5 text-[11px] font-mono font-bold uppercase tracking-widest border transition-all ${
                                    mobileProvider === prov || (prov === "Airtel" && mobileProvider === "Airtel Money") || (prov === "MTN" && mobileProvider === "MTN Mobile Money")
                                      ? "border-[#FF4D00] bg-[#FF4D00]/5 text-[#FF4D00]"
                                      : "border-[#111111]/10 text-[#111111]/40 hover:border-[#111111]/20"
                                  }`}
                                >
                                  {prov}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={mobilePhone}
                              onChange={(e) => setMobilePhone(e.target.value.replace(/[^\d+\-\s()]/g, ""))}
                              placeholder="+254 7XX XXX XXX"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                              Amount (Local Currency)
                            </label>
                            <input
                              type="text"
                              value={mobileAmount}
                              onChange={(e) => setMobileAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                              placeholder="0.00"
                              className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-mono font-medium text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all bg-white"
                            />
                          </div>
                          <div className="border-t border-[#111111]/5 pt-4 mt-2">
                            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/20">
                              <Shield className="w-3.5 h-3.5" />
                              KES, UGX, TZS, GHS, NGN supported · No processing fee · Instant confirmation
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Summary + CTA */}
                  <div className="lg:col-span-5">
                    <div className="border border-[#111111]/10 bg-white p-6 md:p-8 lg:sticky lg:top-[120px]">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-5">
                        Payment Summary
                      </span>

                      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#111111]/5">
                        <div className="w-8 h-8 rounded-full bg-[#FF4D00] flex items-center justify-center">
                          <selectedTier.icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <span className="text-[14px] font-display font-medium">{selectedTier.name} Tier</span>
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 ml-2">
                            via {selectedVehicle.shortName}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Entry</span>
                          <span className="text-[13px] font-medium">${selectedTier.min.toLocaleString()}{selectedTier.max ? ` – $${selectedTier.max.toLocaleString()}` : "+"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Method</span>
                          <span className="text-[13px] font-medium">{paymentMethods.find((m) => m.id === selectedPaymentId)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Fee</span>
                          <span className="text-[13px] font-medium">{paymentMethods.find((m) => m.id === selectedPaymentId)?.fee === "None" ? "No fee" : paymentMethods.find((m) => m.id === selectedPaymentId)?.fee + " fee"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Speed</span>
                          <span className="text-[13px] font-medium">{paymentMethods.find((m) => m.id === selectedPaymentId)?.speed}</span>
                        </div>
                      </div>

                      <button
                        onClick={handleConfirmPayment}
                        disabled={!isFormValid || isProcessing}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#FF4D00] text-white text-[13px] font-bold uppercase tracking-[0.1em] hover:bg-[#111111] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#FF4D00]"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing…
                          </>
                        ) : (
                          <>
                            Confirm & pay
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      {!isFormValid && !isProcessing && (
                        <p className="text-[10px] text-[#FF4D00]/60 font-medium text-center mt-3 leading-[1.5]">
                          Please fill in all required fields above
                        </p>
                      )}

                      {isProcessing && (
                        <p className="text-[10px] text-[#111111]/30 font-medium text-center mt-3 leading-[1.5]">
                          Secure, encrypted transaction. Do not close this page.
                        </p>
                      )}

                      {paymentError && !isProcessing && (
                        <div className="mt-3 p-3 border border-red-200 bg-red-50 text-[11px] text-red-700 font-medium leading-[1.5] text-center">
                          <X className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
                          {paymentError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between border-t border-[#111111]/5 pt-6">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#111111]/10 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]/40 hover:border-[#111111] hover:text-[#111111] transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    Change method
                  </button>
                  <button
                    onClick={() => { goToStep(1 as WizardStep); setSelectedTierId("scout"); setSelectedPaymentId(null); resetPaymentForm(); }}
                    className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#111111]/25 hover:text-[#FF4D00] transition-colors"
                  >
                    ← Start over
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 7: Payment Confirmed: Success screen */}
            {currentStep === 7 && selectedVehicle && (
              <motion.div
                key="step-7"
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-center py-12 md:py-16">
                  {/* Success icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FF4D00] mb-8"
                  >
                    <Check className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2.5} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-[28px] md:text-[40px] font-display font-medium tracking-[-0.02em] mb-4">
                      Investment{" "}
                      <em className="font-serif italic text-[#FF4D00]">confirmed</em>
                    </h3>
                    <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] max-w-lg mx-auto mb-10">
                      Your {selectedTier.name} tier investment via {selectedVehicle?.shortName} has been submitted. You&apos;ll receive a confirmation email with your allocation details and next steps within 24 hours.
                    </p>
                  </motion.div>

                  {/* Confirmation details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="inline-block text-left border border-[#111111]/10 bg-white p-6 md:p-8 mb-10"
                  >
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-4">
                      Confirmation Details
                    </span>
                    <div className="space-y-3 min-w-[280px] md:min-w-[360px]">
                      <div className="flex justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Tier</span>
                        <span className="text-[13px] font-medium">{selectedTier.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Vehicle</span>
                        <span className="text-[13px] font-medium">{selectedVehicle?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Amount</span>
                        <span className="text-[13px] font-medium">${selectedTier.min.toLocaleString()}{selectedTier.max ? ` – $${selectedTier.max.toLocaleString()}` : "+"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Method</span>
                        <span className="text-[13px] font-medium">{paymentMethods.find((m) => m.id === selectedPaymentId)?.name ?? "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Reference</span>
                        <span className="text-[13px] font-mono font-medium text-[#FF4D00]">{confirmationRef.current}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25">Status</span>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF4D00] bg-[#FF4D00]/10 px-2 py-0.5">Confirmed</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Next steps */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="max-w-md mx-auto"
                  >
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/25 block mb-4">
                      What happens next
                    </span>
                    <div className="text-left space-y-3 mb-8">
                      {[
                        "KYC verification: complete identity verification within 48 hours",
                        "Fund transfer: capital is moved per your selected payment method",
                        "Allocation confirmed: receive your portfolio allocation and dashboard access",
                        "First report: quarterly NAV and portfolio update within 90 days",
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#FF4D00]/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-mono font-bold text-[#FF4D00]">{String(i + 1)}</span>
                          </div>
                          <p className="text-[12px] md:text-[13px] text-[#111111]/50 font-medium leading-[1.5]">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setSelectedTierId("scout");
                        setSelectedPaymentId(null);
                        resetPaymentForm();
                      }}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00] transition-colors"
                    >
                      Start a new investment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FAQ, Accordion
   ══════════════════════════════════════════════════════════════════════════ */
function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-[120px] lg:self-start"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
              Questions, Answered
            </span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.95] mt-3">
              Questions,
              <br />
              <em className="font-serif italic text-[#FF4D00]">answered</em>
            </h2>
          </motion.div>

          <div className="lg:col-span-7">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-t border-[#111111]/10"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 shrink-0">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[15px] md:text-[17px] font-medium leading-[1.5] pr-4">
                      {item.q}
                    </h3>
                  </div>
                  <div className="text-[#111111]/30 group-hover:text-[#111111]/60 transition-colors shrink-0">
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7] pb-6 pl-0 md:pl-14">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SUBSCRIBE MODAL
   ══════════════════════════════════════════════════════════════════════════ */
function SubscribeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/capital/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-[#111111]/10 p-8 md:p-10 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "success" ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-green-600" strokeWidth={2} />
                </div>
                <h3 className="text-[20px] font-display font-medium mb-2">
                  You&apos;re on the list
                </h3>
                <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.7]">
                  We&apos;ll send you portfolio updates, NAV reports, and new
                  investment opportunities.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[20px] font-display font-medium tracking-tight">
                      Get investor updates
                    </h3>
                    <p className="text-[12px] text-[#111111]/40 font-medium mt-1">
                      Portfolio news, NAV reports, and deal alerts
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-[#111111]/5 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-[#111111]/40" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-medium focus:outline-none focus:border-[#FF4D00] transition-colors bg-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="modal-consent"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-[#FF4D00]"
                    />
                    <label
                      htmlFor="modal-consent"
                      className="text-[11px] text-[#111111]/50 font-medium leading-[1.6]"
                    >
                      I agree to receive communications from xCelero Labs
                      related to investments. I understand I can unsubscribe at
                      any time.
                    </label>
                  </div>

                  {status === "error" && (
                    <p className="text-red-600 text-[12px] font-medium">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !consent}
                    className="w-full px-8 py-4 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subscribing&hellip;
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
