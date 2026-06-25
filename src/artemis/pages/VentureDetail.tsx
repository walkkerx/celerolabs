"use client";

import { useRouter, Link } from "@/artemis/router";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Scale,
  Rocket,
  DollarSign,
  Users,
} from "lucide-react";
import { venturesData } from "@/artemis/data/ventures";

function generateOrigin(venture: (typeof venturesData)[number]): string[] {
  // Each vertical has a structured thesis with facts, observation, proof, and conclusion
  const originTheses: Record<string, { facts: string; observation: string; proof: string; thesis: string }> = {
    Energy: {
      facts: "600 million Africans lack reliable electricity. The continent loses $100 billion annually to energy deficits. Yet Africa receives 5.5 kWh/m²/day of solar radiation, more than double Germany's irradiance, and Germany generates 12% of its electricity from solar. The problem is not scarcity of energy; it is the absence of systems to capture, distribute, and trade it.",
      observation: "The mobile money revolution proved that infrastructure-poor environments can leapfrog centralized systems. M-Pesa processed $30 billion in transactions before most African households had a bank account. The same architecture, decentralized nodes, mobile billing, peer-to-peer settlement, can be applied to energy.",
      proof: "Microgrid pilots in Tanzania and Rwanda have demonstrated 40% cost reductions versus diesel generation. AI-managed load balancing has reduced battery degradation by 60% in Indian microgrid deployments. The unit economics work at 50 nodes; they become transformative at 10,000.",
      thesis: "Energy poverty is not a technology problem. It is an orchestration failure. If distributed energy systems can be coordinated the way telecom networks route packets, then universal energy access becomes inevitable at a fraction of traditional grid cost."
    },
    Water: {
      facts: "500 million people in water-stressed regions rely on trucked water costing $10–30/m³. Atmospheric water generation produces clean water at $0.5/m³, a 20–60× cost advantage. 1.8 million children die annually from waterborne disease, most from contaminated surface water sources within 5 km of their homes.",
      observation: "The economics of atmospheric water generation have shifted dramatically. Early AWG systems consumed 0.8 kWh/L; modern solar-powered units achieve 0.15 kWh/L. Solar panel costs have fallen 90% since 2010. The capital cost of a 500 L/day AWG kiosk is now under $5,000, within reach of community microfinance.",
      proof: "AWG deployments in the UAE and South Africa have demonstrated consistent production at $0.01/L. Mobile money billing infrastructure already handles per-liter micropayments across East Africa. The model mirrors the prepaid mobile revolution: small, frequent payments that match irregular income patterns.",
      thesis: "Water scarcity is a distribution and pricing problem, not a supply problem. If atmospheric water generation can be decentralized and billed like mobile airtime, then clean water access becomes independent of municipal infrastructure."
    },
    "Food & Agriculture": {
      facts: "250 million Africans are undernourished while 60% of the world's uncultivated arable land sits in Africa. The continent yields only 10% of global food output. Post-harvest losses destroy $48 billion in value annually. Smallholders earn less than 20 cents on every dollar of food sold.",
      observation: "Africa's agricultural failure is an information and market-access failure, not a land or labor failure. Idle land and idle capital exist in the same geographies but cannot find each other. The missing layer is digital infrastructure that matches supply to demand, facilitates trust, and handles settlement.",
      proof: "Digital marketplace models in India (AgroStar, DeHaat) have increased farmer incomes by 30–50% by eliminating middlemen. Mobile money escrow systems in Kenya have reduced transaction fraud in agricultural trade by 80%. The unit economics improve with every additional participant, classic network effects.",
      thesis: "The continent that holds the world's most uncultivated arable land should not be its most food-insecure. If idle land and idle capital can be matched with algorithmic precision, then a regenerative agricultural surplus that feeds the continent becomes not just possible but inevitable."
    },
    "Materials & Manufacturing": {
      facts: "Africa exports $150 billion annually in raw minerals and imports $300 billion in finished goods, a value capture ratio below 5%, representing a $400 billion annual value drain. Raw cobalt from the DRC sells for $15,000/tonne; battery-grade cobalt sulfate commands $50,000/tonne. The refining margin is captured elsewhere.",
      observation: "Raw material wealth without processing capability is not wealth. It is dependency. The same minerals that leave African ports as unrefined ore return as batteries, electronics, and vehicles at 10–50× the export price. Local value addition can be 10× more capital-efficient than raw export because it eliminates shipping, handling, and intermediary margins.",
      proof: "Hydrometallurgical refining units now exist in containerized form, deployable at mine sites within 90 days. A single 40-foot container can produce battery-grade cobalt sulfate from raw ore at 30% lower cost than Chinese refiners, because it eliminates ocean freight, warehousing, and Chinese labor premiums. Namibia's recently commissioned lithium refinery validated this model in 2024.",
      thesis: "If local value addition can be 10× more capital-efficient than raw export, then a new industrial base can be built from the mine upward, one that captures refining margin on the continent instead of shipping it overseas."
    },
    "Mobility & Logistics": {
      facts: "Intra-African freight costs 3–5× more than equivalent distances in Europe. Road transport accounts for 80% of African freight but takes 10× longer than rail. African port clearance averages 14 days versus 2 days in Singapore. $20 billion annually is lost to port congestion alone.",
      observation: "Movement is the circulatory system of economies, and Africa's is critically blocked. The informal transport sector moves 60% of all cross-border freight but operates without digital coordination, no shared booking, no route optimization, no consolidated payment. The missing infrastructure is not roads or ports; it is information and settlement rails.",
      proof: "Truck-booking platforms in India (BlackBuck) reduced empty-return rates from 40% to 12% within 3 years. Digital port clearance systems in Singapore reduced vessel turnaround time from 48 hours to 12 hours. M-Pesa's mobile money rails already handle the settlement volume that African logistics requires.",
      thesis: "If the informal transport sector can be digitized without displacing its operators, then a seamless mobility fabric across the continent becomes possible, one that reduces cost, increases reliability, and unlocks the $1 trillion in trade that geographic fragmentation currently prevents."
    },
    "Data & Intelligence": {
      facts: "95% of AI is trained on English-language data. 2,000+ African languages have less than 0.1% of global training data. Government decisions in Africa are made with 18–24 month old data, contributing to $50 billion+ in misallocated public spending annually. Data independence and AI capability are inseparable, you cannot outsource one without surrendering the other.",
      observation: "Independent intelligence infrastructure is the prerequisite for independent decision-making. The same data that African governments, hospitals, and farms generate daily is being processed by foreign AI systems and sold back at premium prices. The value chain is extractive by design: African data feeds foreign intelligence, which makes foreign decisions about African outcomes.",
      proof: "Federated learning architectures now allow AI models to be trained on data that never leaves its source country. Rwanda's national data platform processes health, agriculture, and infrastructure data locally while contributing to continental models. India's Aadhaar system demonstrated that independent digital infrastructure at billion-person scale is achievable.",
      thesis: "If data independence and AI capability can be developed simultaneously, training models on local data for local decisions while contributing to collective intelligence, then independent intelligence that serves the people who generate it becomes not just desirable but structurally inevitable."
    },
    "Built Environments": {
      facts: "The global housing deficit stands at 300 million units; Africa alone needs 50 million units by 2030. Traditional construction costs $30,000+ per unit with a skilled labor shortage of 3 million workers. The $11 trillion construction industry has the lowest productivity growth of any sector, 98% of projects are delivered late and over budget.",
      observation: "The housing crisis is a manufacturing crisis in disguise. Housing can be manufactured the way cars are, at scale, on assembly lines, with radical cost reduction. The same lean manufacturing principles that reduced automobile costs by 90% between 1900 and 1930 have never been applied to construction at scale.",
      proof: "China's prefabricated housing industry produces apartments at $15,000/unit in 14 days. 3D-printed homes in the US have achieved $10,000/unit at 48-hour build times. Containerized micro-factories can be deployed on-site, eliminating the supply chain fragmentation that causes 30% construction waste. The economics are proven; the deployment model for emerging markets is not.",
      thesis: "If housing can be manufactured with automotive-grade efficiency, standardized components, assembly-line production, on-site micro-factories, then a built environment that grows with its people rather than trapping them becomes achievable at a fraction of today's cost."
    },
    "Life Sciences": {
      facts: "Centralized lab diagnostics reach less than 30% of Africa's rural population. 1.5 million preventable deaths occur annually from undiagnosed malaria, HIV, and TB. The most biodiverse continent on Earth is the most underexplored pharmacopeia, 90% of African biodiversity hotspots have never been screened for therapeutic compounds. Human genomics databases are 78% European; African genetic diversity is highest globally yet least studied.",
      observation: "Life-saving innovation should not be geographically bound to the global north. Africa's disease burden is known, its genetic diversity is unmatched, and its biodiversity is largely unexplored. The convergence of CRISPR diagnostics, microfluidic point-of-care testing, and AI-driven drug discovery creates an opportunity to build a life sciences industry that serves the global south first and the world second.",
      proof: "CRISPR-based paper-strip diagnostics have demonstrated $1/test detection of malaria and Zika in field trials. Microfluidic cartridges running 100+ tests from a single drop of blood have achieved CE marking. African biobanks in Rwanda and South Africa have proven that consented genomic sampling at scale is feasible. The technology exists; the integration and distribution infrastructure does not.",
      thesis: "If the most biodiverse continent can deploy the most advanced diagnostics and drug discovery tools, built locally, priced accessibly, designed for the environments where they are needed most, then a life sciences industry that serves the global south first and the world second becomes not just possible but structurally advantageous."
    },
    "Digital Finance": {
      facts: "1.7 billion adults are unbanked globally. Mobile money covers 400 million Africans but lacks multi-currency, cross-border rails. 57% of Africans remain unbanked. African government bonds yield 8–15% yet are inaccessible to retail investors. Cross-border banking for African diaspora costs 7–10% in fees. $95 billion in annual diaspora remittances flows through extractive intermediaries.",
      observation: "Capital must flow as freely as information, and the infrastructure to enable it already exists in pockets. Mobile money rails can carry far more than payments; they can carry equity, savings, and ownership. The same USSD infrastructure that handles $50 billion in annual M-Pesa transactions can be extended to fractional investment, portable pensions, and cross-border settlement.",
      proof: "M-Pesa processes more transactions than Western Union globally. Nigeria's fintech sector attracted $1.3 billion in VC in 2022 alone. CBDC pilots in Nigeria (eNaira) and Ghana (e-Cedi) have demonstrated independent digital currency feasibility. Fractional bond platforms in Brazil enabled 2 million retail investors to access government debt within 18 months. The rails exist; the products and regulatory frameworks do not.",
      thesis: "If mobile money rails can carry equity, savings, and ownership, not just payments, then financial infrastructure that builds wealth rather than extracting it becomes possible for the 1.7 billion people currently excluded from the formal financial system."
    },
    "Education & Cognitive Infrastructure": {
      facts: "265 million children are out of school globally. African students score 40% below OECD averages on standardized assessments. One-size-fits-all curricula waste $200 billion annually. Africa needs 20 million new skilled workers by 2030 but produces fewer than 5 million graduates per year. No African university ranks in the global top 200.",
      observation: "Cognitive infrastructure is the most leveraged investment any civilization can make. Education systems designed for the industrial age can be replaced by adaptive, project-based, culturally grounded learning. The one-room schoolhouse model, one teacher, many students, fixed curriculum, is the educational equivalent of a mainframe computer. AI enables the personal computer of education: one-to-one tutoring at $1/month.",
      proof: "Benjamin Bloom's 1984 study demonstrated that 1-to-1 tutoring produces 2-sigma (98th percentile) improvement in learning outcomes, a result that has never been achieved at scale through any other intervention. AI tutoring systems in India (Mindspark) have achieved 1-sigma improvements at $2/month per student. Project-based learning improves retention by 75% versus lectures. The pedagogy is proven; the delivery mechanism has never been scaled.",
      thesis: "If education systems can be rebuilt on adaptive, AI-powered, culturally grounded foundations, replacing one-size-fits-all with personalized mastery, then a generation of system-builders rather than job-seekers becomes possible, and the most leveraged investment any civilization can make becomes universally accessible."
    },
    "Space & Off-World Industrialization": {
      facts: "Africa has zero independent launch capability. The $1 trillion space economy by 2040 is entirely Western and Chinese. African nations spend $600 million annually on foreign satellite data. Only 30% of Africa has internet access; satellite internet costs $600/year, unaffordable for 80% of the population. 700 million Africans remain offline.",
      observation: "Orbital independence is the next frontier of national independence. A continent of 54 nations can pool orbital ambition into a single independent capability. The cost of access to space has fallen 95% since 2010, SpaceX rideshare launches at $1.1 million to orbit. The barrier is no longer physics; it is institutional coordination and capital allocation.",
      proof: "Rwanda launched its first satellite (RwandaSat-1) in 2019 for $1.5 million via rideshare. Kenya's 1KUNS-PF cubesat demonstrated Earth observation at under $500,000. The UAE built a independent space program from zero to Mars mission in 12 years. Small satellite constellations now provide sub-meter Earth observation at 1/100th the cost of legacy systems.",
      thesis: "If a continent of 54 nations can pool orbital ambition into a single independent capability, shared satellites, shared ground stations, shared data, then Africa's permanent seat at the table of the space economy becomes not aspirational but structurally inevitable."
    },
    "Quantum Computing": {
      facts: "Quantum computers currently require $15 million+ infrastructure and -273°C cooling. 99% of the world's researchers cannot access quantum hardware. Quantum advantage remains confined to 3 labs globally. Classical encryption becomes obsolete within 10 years as quantum computers break RSA-2048, putting $120 trillion in digital assets at risk.",
      observation: "Quantum advantage should not be the exclusive domain of three labs on one continent. Quantum computing can be demystified, decentralized, and deployed as independent infrastructure. The same logic that drove the transition from mainframes to cloud computing applies: centralized, expensive, specialist-only systems eventually give way to distributed, affordable, accessible ones.",
      proof: "Room-temperature topological qubits using Majorana fermions have been demonstrated in laboratory settings. Cloud quantum APIs (IBM Quantum, Amazon Braket) have proven that remote access to quantum hardware is viable. Quantum key distribution networks in China have secured 700 km of communication channels. The physics works; the engineering challenge is cost reduction and deployment scale.",
      thesis: "If quantum computing can be demystified, decentralized, and deployed as independent infrastructure, accessible to researchers and nations regardless of geography, then quantum advantage becomes a shared resource rather than a proprietary one, and the $120 trillion in digital assets at risk from quantum decryption gains a defense."
    },
    "Robotics & Autonomous Systems": {
      facts: "Agricultural labor shortages cost $50 billion annually globally. Underground mining kills 12,000 workers per year. 80% of African mineral deposits are too dangerous for human entry. Construction labor productivity has grown only 1% annually for 20 years. 3.5 billion people need housing that current construction methods cannot deliver.",
      observation: "Automation should augment human labor, not replace it, especially where labor is most scarce. Robotics designed for the world's harshest environments will work everywhere. The same autonomous navigation, swarm coordination, and adaptive manipulation that works in a DRC mine or a Sahelian farm will work in a European warehouse, but the reverse is not true.",
      proof: "Swarm robotics in agriculture has achieved 80% weeding accuracy at sub-$500 per unit in Chinese trials. Autonomous mining robots in Australia operate 30% more efficiently than human crews in hazardous environments. 3D-printing construction robots in the UAE built a 60 m² house in 72 hours. The technology is proven in controlled environments; the challenge is ruggedization and cost reduction for African deployment conditions.",
      thesis: "If robotics designed for the world's harshest environments can be built affordably and deployed at scale, augmenting human labor where it is most scarce rather than replacing it where it is most abundant, then an autonomous workforce that amplifies human capability where it matters most becomes not a luxury but a necessity."
    },
    "Longevity & Human Augmentation": {
      facts: "Aging costs the global economy $60 trillion annually in healthcare and lost productivity. 570 million people over 65 globally will grow to 1.5 billion by 2050. Mobility loss is the number one predictor of mortality in the elderly. Existing exoskeletons cost $50,000+ and weigh 15 kg. Brain-computer interfaces require invasive surgery and cost $500,000+.",
      observation: "Longer, healthier lives should not be a luxury of geography or GDP. Aging is a biological engineering problem, and biology is an engineering platform. The 12 hallmarks of aging (telomere attrition, epigenetic alterations, mitochondrial dysfunction, cellular senescence, stem cell exhaustion, and others) are not mysteries; they are engineering specifications for intervention.",
      proof: "Senolytic drugs have extended healthy lifespan by 25% in mouse models at the Mayo Clinic. Epigenetic clock testing can now determine biological age from a finger-prick blood sample for under $100. Non-invasive brain-computer interfaces using ultrasound neuromodulation have achieved 95% accuracy on 10-command vocabularies in primate studies. Exoskeletons under 3 kg have been demonstrated in Japanese labs. The science is advancing rapidly; the distribution is not.",
      thesis: "If aging is treated as an engineering problem with solvable specifications, and if the interventions are designed for equitable global access from the outset, then healthy lifespan extension that is universally accessible becomes not a speculative ambition but an engineering program with measurable milestones."
    },
    "Ocean & Blue Economy": {
      facts: "Illegal fishing costs Africa $11.4 billion annually. 34% of fish stocks are overfished. 50% of coral reefs will die by 2050 at current rates. 80% of the ocean floor is unmapped. The ocean economy is projected at $3 trillion by 2030, yet African coastal nations capture less than 1% of that value.",
      observation: "The blue economy is Africa's second continent, vast, untapped, and essential to survival. The ocean can be farmed, monitored, and harvested autonomously and regeneratively. The same satellite-AI-drone sensor fusion that monitors land-based infrastructure can be applied to ocean systems, but 90% of ocean monitoring investment targets Northern Hemisphere waters.",
      proof: "Autonomous fish farming platforms in Norway have achieved 10× the yield per hectare of traditional aquaculture. Bio-electric reef restoration in the Maldives has grown coral 5× faster than natural rates. AI vessel monitoring using satellite AIS data has detected 90% of illegal fishing in West African pilot programs. Tidal energy generators have achieved $0.03/kWh in Scottish trials. The technology works; the deployment in African waters has not been funded.",
      thesis: "If the ocean can be farmed, monitored, and harvested autonomously and regeneratively, with African coastal nations capturing the value rather than foreign fleets, then a blue economy that feeds and powers the continent without depleting it becomes a viable economic engine for 35 coastal African states."
    },
    "Defense & Self-Reliance": {
      facts: "African nations spend $50 billion annually on imported defense systems. 90% of African borders are unmonitored. Asymmetric threats, drone swarms, cyber attacks, disinformation, outpace traditional procurement cycles by 10 years. Drone warfare is reshaping conflicts globally; 50+ countries now use armed drones. Counter-drone systems cost $500,000+ per installation.",
      observation: "No nation is truly independent when its security infrastructure is imported. Independent defense requires independent technology, built locally, controlled locally. The asymmetric nature of modern threats (drones, cyber, disinformation) favors distributed, AI-driven, software-defined defense over the traditional hardware-heavy approach that African nations have been sold.",
      proof: "AI-powered sensor fusion systems have demonstrated 95% border incursion detection in Israeli pilot programs. Distributed counter-drone meshes using $5,000 directional EMP nodes have neutralized 90% of drone threats in Ukrainian field testing. Independent cloud infrastructure in India and China has demonstrated that air-gapped, locally-built data centers can serve government needs without foreign access. The technology exists; the local manufacturing and deployment do not.",
      thesis: "If independent defense technology can be built locally and controlled locally, distributed sensor networks instead of imported hardware, software-defined countermeasures instead of expensive platforms, then defense capability that protects without dependency becomes achievable for African nations at a fraction of current procurement costs."
    },
    "Frontier Computing": {
      facts: "Current AI training consumes $10 billion annually in compute costs. GPUs are hitting physical limits, transistor counts cannot double forever. The human brain computes at 20 watts; equivalent AI consumes 20 megawatts, a million-fold efficiency gap. Data centers consume 2% of global electricity, projected to reach 8% by 2030.",
      observation: "The next era of computation must be co-designed by the continent with the most to gain. Neuromorphic, photonic, and biological computing represent fundamentally different paradigms that do not depend on silicon miniaturization. The continent that was bypassed by the silicon revolution has the opportunity to leapfrog directly to post-silicon computing.",
      proof: "Memristor-based neuromorphic chips have demonstrated 1,000× energy efficiency improvements over GPUs in Stanford lab tests. Photonic tensor processors using light for matrix multiplication have achieved 100× speed improvements over electronic GPUs at MIT. DNA-based storage has achieved 215 petabytes per gram at Microsoft Research. The physics works; the commercialization has not happened because silicon incumbents have no incentive to obsolete their own products.",
      thesis: "If the next computing paradigm is co-designed by those who need it most, optimized for energy efficiency, manufactured affordably, deployed as independent infrastructure, then computational infrastructure that leapfrogs the silicon era entirely becomes possible for nations that were excluded from the first computing revolution."
    },
    "Climate & Regeneration": {
      facts: "Africa sequesters 40% of global carbon but earns less than 1% of carbon credit revenue. Deforestation releases 4.8 gigatons of CO₂ annually. Direct air capture costs $600/tonne: the IPCC says we need 10 gigatons per year by 2050. Current global DAC capacity is 0.01 megatons per year, 99.999% short of target.",
      observation: "The communities least responsible for climate change must lead its reversal. Climate reversal can be an economic engine, not a cost center. The same technologies that measure, verify, and monetize carbon sequestration can create revenue streams for African land stewards, forest communities, and coastal nations, turning climate action from aid dependency into wealth generation.",
      proof: "Satellite-monitored carbon credits in Kenya have generated $25/tonne for pastoralist communities, 5× the global average carbon credit price. Bio-acoustic forest monitoring in Brazil has reduced illegal logging by 70% in monitored concessions. Seawater CO₂ extraction prototypes have demonstrated 3× efficiency over conventional direct air capture. The technology and economics are validated; the institutional infrastructure for African carbon markets is not.",
      thesis: "If climate reversal is structured as an economic engine, generating verified carbon credits, forest protection revenue, and regenerative agricultural income for African communities, then a carbon-negative economy that generates wealth while healing the planet becomes the most rational economic strategy for the continent with the most to gain."
    },
    "Communication & Culture": {
      facts: "7,000+ languages exist globally; 2,000+ are African. Language barriers cost $50+ billion annually in lost trade. 70% of Africans cannot access internet content in their first language. Internet shutdowns cost African economies $2+ billion annually. 30+ African countries have imposed internet blackouts.",
      observation: "Language is the operating system of civilization, and 2,000+ African languages are running on legacy code. Every language deserves real-time digital presence, and the AI to make it possible exists now. The same few-shot learning techniques that enabled ChatGPT to learn Icelandic can be applied to Yoruba, Amharic, and Kinyarwanda, but only if the training data and compute are made available.",
      proof: "Meta's NLLB-200 model demonstrated translation for 200 languages, including 30 African languages, with >90% BLEU scores. Few-shot learning has reduced the training data required for new languages by 95%. Offline speech recognition models now run on $30 smartphones. Mesh networking protocols have maintained local connectivity during internet shutdowns in Myanmar and Iran. The technology is ready; the data collection and deployment are not.",
      thesis: "If every African language can achieve real-time digital presence, translation, voice, text, and if the infrastructure cannot be shut down because it is decentralized, then a linguistically independent digital civilization becomes possible for the 2,000+ African languages currently excluded from the digital world."
    },
    "Consumer & e-Commerce": {
      facts: "African fashion is a $31 billion industry but 90% of value is captured by foreign brands. The $300 billion African food and beverage market is fragmented. African cuisine represents 1% of global food e-commerce despite 17% of world population. $10 trillion in consumer spending drives 70% of CO₂ emissions.",
      observation: "African consumers are the world's largest untapped market, and they want products designed for them, not adapted from elsewhere. The same on-demand manufacturing, digital marketplace, and direct-to-consumer models that disrupted Western retail can be applied to African markets, but with local design, local manufacturing, and local IP protection from the start.",
      proof: "On-demand textile printing has reduced fashion waste to near-zero in European micro-factory models. Cross-border cold-chain logistics have enabled African specialty food exports at 40% margin. Digital marketplace platforms in India (Meesho) enabled 15 million small sellers to reach national markets. The models work; the local infrastructure for African deployment does not.",
      thesis: "If African consumers can access products designed for their lives, made in their communities, and delivered through Afrocentric infrastructure, then a consumer economy that creates value locally rather than extracting it becomes the largest untapped opportunity in global commerce."
    },
    "Industrial Biotech": {
      facts: "Petroleum-based chemicals generate 2 gigatons of CO₂ annually. The $4 trillion chemical industry has no scalable green alternative. Africa produces less than 1% of its own vaccines. Cement production emits 8% of global CO₂. Africa's cement demand will triple by 2050.",
      observation: "Biology is the most advanced manufacturing technology ever devised, and Africa has the biodiversity to prove it. Microbes are the factories of the future, and Africa has the agricultural feedstock to power them. Engineered biology can replace petrochemistry, cement, and synthetic fertilizer simultaneously, but only if the bio-manufacturing infrastructure is built where the feedstock is.",
      proof: "Engineered yeast producing spider silk protein has achieved industrial-scale fermentation at Bolt Threads. Microbially-induced calcite precipitation (bio-cement) has demonstrated compressive strength matching Portland cement in Dutch trials. mRNA platform technology was repurposed for COVID-19 vaccines within 100 days, proving the rapid-response capability of bio-manufacturing. The biology works; the manufacturing scale-up for African deployment has not been funded.",
      thesis: "If biology is harnessed as a manufacturing platform, engineered microbes producing chemicals, cement, vaccines, and materials from African agricultural feedstock, then a petrochemical replacement industry grown from African soil becomes not just environmentally necessary but economically inevitable."
    },
    "Rare Earth & Mineral Independence": {
      facts: "Africa produces 70% of the world's cobalt and 50% of its lithium but refines less than 5% locally. Mineral value capture is below 3%. China controls 80% of rare earth processing. $1 trillion in mineral value leaves Africa unrefined per decade. Lithium-ion battery waste will reach 11 million tonnes per year by 2030; less than 5% is recycled.",
      observation: "The ground beneath Africa's feet should build Africa's future, not just fill foreign supply chains. Refining at source captures 10× more value than exporting raw ore. The same minerals that power the global energy transition can power Africa's industrialization, but only if the refining, recycling, and manufacturing happen on the continent.",
      proof: "Containerized cobalt refining units deployed at DRC mine sites have demonstrated 30% higher value capture versus export-to-China models. Hydrometallurgical battery recycling recovers 95%+ of lithium, cobalt, and nickel at 50% lower cost than mining. Namibia's lithium refinery validated the economic model of local processing in 2024. The technology and economics are proven; the institutional and capital infrastructure are not.",
      thesis: "If refining at source captures 10× more value than exporting raw ore, and if circular recycling captures another 95% of critical minerals from waste batteries, then a mineral-to-manufacturing pipeline that keeps value on the continent becomes the most rational industrial strategy for the world's most mineral-rich region."
    },
    "Circular Economy": {
      facts: "Africa generates 125 million tonnes of solid waste annually; 90% is landfilled or burned. Informal recyclers handle 60% of recycling with no digital infrastructure. The circular economy is worth $4.5 trillion globally. E-waste will reach 74 million tonnes annually by 2030; Africa receives a disproportionate share.",
      observation: "Waste is a design failure, and Africa has the chance to build the first circular industrial economy from scratch. Waste streams are supply chains in disguise, and AI can map the transformation from waste to value. The informal recycling sector that handles 60% of Africa's recycling is not a problem to be solved. It is a distribution network to be digitized.",
      proof: "AI-powered waste sorting in Europe has achieved 95% material recovery rates. Digital waste marketplace platforms in India have connected 100,000 waste pickers to industrial buyers, increasing picker income by 40%. Hydrometallurgical recycling recovers 95%+ of critical minerals from e-waste at lower cost than mining. The technology works; the digital coordination layer for African informal recyclers does not.",
      thesis: "If waste streams are recognized as supply chains in disguise, and if the informal recycling sector is digitized rather than displaced, then an industrial ecosystem where nothing is wasted and everything has value becomes possible for a continent that cannot afford the linear extract-use-discard model."
    },
    "Biotechnology Tools": {
      facts: "Cell therapy manufacturing costs $500,000 per patient. 90% of cell therapy candidates fail in manufacturing scale-up. Malaria kills 600,000+ annually, 95% in Africa. Gene drive technology can eliminate malaria vectors but remains stuck in labs. No African-owned gene drive platform exists.",
      observation: "The tools of life itself should not be locked behind patents and paywalls. The democratization of biotech tools is as transformative as the democratization of computing was. CRISPR, automated cell manufacturing, and gene drive are the CRDOS of biology, platform technologies whose impact depends entirely on who has access.",
      proof: "Automated cell manufacturing foundries have reduced CAR-T cell production costs from $500,000 to $50,000 per patient in Chinese pilot programs. CRISPR-based gene drives have demonstrated 99% inheritance rates in Anopheles mosquito populations in contained lab studies. Community consent protocols for gene drive release have been developed and validated in Burkina Faso by Target Malaria. The biology works; the manufacturing and governance infrastructure for African deployment do not.",
      thesis: "If the tools of biotechnology, automated manufacturing, gene editing, gene drives, are democratized and made accessible to African researchers and communities, then a globally competitive biotech sector emerging from the Global South becomes not just possible but structurally inevitable, because the greatest biological diversity demands the greatest biotechnological capability."
    },
    "AI Safety & Alignment": {
      facts: "AI systems are deployed without safety guarantees. 90% of AI safety research is Western-centric. African value systems and contexts are absent from alignment research. $100+ billion is spent on AI deployment with less than 1% on safety. The next generation of AI systems will make life-or-death decisions in healthcare, defense, and governance, including for African populations who had zero input into their design.",
      observation: "AI aligned only to Western values is not aligned. It is colonized. AI aligned with African values is not less capable. It is more universally robust. The philosophical frameworks of Ubuntu (interdependence), Maat (harmonic balance), and Harambee (collective action) offer alignment principles that are fundamentally different from the individualistic, utilitarian frameworks dominant in Western AI safety research.",
      proof: "Red-teaming of major AI systems has revealed systematic failures in African contexts, from medical misdiagnosis to cultural insensitivity to economic miscalculation. Ubuntu-based cooperation frameworks have been formalized in computer science literature (Murungi, 2023) as viable alignment architectures. The African Union's AI strategy explicitly calls for independent safety evaluation. The need is documented; the safety evaluation infrastructure does not exist.",
      thesis: "If AI safety incorporates African philosophical frameworks, Ubuntu, Maat, Harambee, alongside Western alignment approaches, then AI systems that serve all of humanity, not just the cultures that built them, become possible, and the continent with the most to lose from misaligned AI gains the capacity to evaluate, certify, and if necessary, reject AI deployments that fail African safety standards."
    },
    "Synthetic Biology": {
      facts: "Spider silk is stronger than Kevlar and more flexible than nylon but cannot be farmed at scale. Haber-Bosch fertilizer production consumes 2% of global energy and emits 1.4% of CO₂. Africa imports $8 billion annually in fertilizer. Biological nitrogen fixation exists in nature but not in cereal crops. The $50 billion market for high-performance fibers has no bio-based alternative at scale.",
      observation: "Biology can manufacture anything, and Africa has the biological diversity to manufacture everything. Engineered biology can replace petrochemistry, agriculture, and mining simultaneously. The same CRISPR tools that edit human genes can redirect microbial metabolism to produce materials, chemicals, and fertilizers from African feedstock.",
      proof: "Engineered yeast producing spider silk proteins has achieved gram-scale fermentation at Bolt Threads. Nitrogen-fixing microbes colonizing cereal crop roots have shown 50% fertilizer reduction in field trials at Pivot Bio. Engineered microbes converting agricultural waste to industrial chemicals have reached cost parity with petroleum feedstocks in Ginkgo Bioworks pilots. The biology is proven; the manufacturing infrastructure for African deployment does not exist.",
      thesis: "If engineered biology is harnessed as a manufacturing platform, producing materials, chemicals, and fertilizers from African biodiversity and agricultural feedstock, then a bio-industrial revolution grown from African soil becomes the most resource-efficient path to industrialization for the most biodiverse continent on Earth."
    },
    "Governance & Network States": {
      facts: "Democratic participation in Africa averages 30–50% turnout. Corruption costs Africa $100+ billion annually. 100+ countries have SEZ frameworks but no independent governance OS. Citizens have no real-time visibility into government spending. African passport holders can visit only 30 countries visa-free.",
      observation: "Governance is a technology, and it is overdue for a rewrite. Governance can be as iterative, transparent, and accountable as open-source software. The same principles that make software reliable, version control, automated testing, continuous deployment, open audit, can be applied to governance: real-time expenditure tracking, automated anomaly detection, participatory budgeting, and zero-knowledge privacy for citizens.",
      proof: "Estonia's e-governance platform handles 99% of government services digitally, reducing corruption by an estimated 30%. Participatory budgeting in Porto Alegre, Brazil, redirected 40% of municipal spending to underserved communities. Blockchain property registries in Georgia reduced title fraud by 90%. Zero-knowledge proof systems enable transparent auditing without revealing individual data. The technology works; the deployment in African governance contexts has not been attempted at scale.",
      thesis: "If governance is treated as a technology, iterated, tested, deployed, and audited like software, then self-correcting institutions that earn trust through verifiable action become possible, and the $100+ billion lost annually to corruption and mismanagement becomes a solvable engineering problem rather than an intractable political one."
    },
  };

  const origin = originTheses[venture.vertical] ?? {
    facts: venture.problem,
    observation: "The scale of this challenge demands a fundamentally different approach, one that treats the root cause rather than the symptoms.",
    proof: "Proven technologies and models from adjacent domains demonstrate that the unit economics work at pilot scale. The challenge is not viability but deployment velocity.",
    thesis: "If the underlying system failure can be identified and addressed at its root, rather than mitigating symptoms, then transformative, self-sustaining impact becomes structurally inevitable."
  };

  return [origin.facts, origin.observation, origin.proof, origin.thesis];
}

export function VentureDetail() {
  const { params, navigate } = useRouter();
  const id = params?.id;
  const venture = venturesData.find((v) => v.id === id);

  if (!venture) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen text-[#111111] flex flex-col items-center justify-center">
        <h1 className="text-[36px] sm:text-[60px] font-display font-medium tracking-tight mb-8">
          Not Found
        </h1>
        <button
          onClick={() => navigate("/ventures")}
          className="px-5 py-2.5 border border-[#111111] text-[11px] uppercase tracking-[0.1em] font-bold hover:bg-[#111111] hover:text-white transition-colors"
        >
          Return to Ventures
        </button>
      </div>
    );
  }

  const originStory = generateOrigin(venture);

  return (
    <div className="bg-[#FAFAFA] text-[#111111] min-h-screen">
      {/* Back Link */}
      <section className="pt-32 pb-0 px-6 md:px-12 lg:px-20">
        <div className="w-full max-w-[1400px] mx-auto">
          <Link
            to="/ventures"
            className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#111111]/50 hover:text-[#FF4D00] flex items-center gap-2 mb-12 w-fit transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Ventures
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-16 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-2 border border-[#111111] bg-[#FF4D00]/10 text-[#FF4D00] text-[11px] font-mono tracking-widest uppercase font-bold">
              {venture.vertical}
            </span>
            <span className="px-4 py-2 border border-[#111111] bg-[#111111]/5 text-[#111111] text-[11px] font-mono tracking-widest uppercase font-bold">
              {venture.launchModel}
            </span>
            <span className="px-4 py-2 border border-[#111111]/10 text-[#111111]/40 text-[11px] font-mono tracking-widest uppercase font-bold">
              {venture.code}
            </span>
          </div>

          <h1 className="text-[32px] sm:text-[50px] md:text-[80px] lg:text-[100px] leading-[0.9] font-display font-medium tracking-tight mb-6 uppercase text-balance">
            {venture.name}
          </h1>
        </div>
      </section>

      {/* Two-Column Content */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

          {/* Left Column, Main Content */}
          <div className="md:col-span-8">
            {/* The Civilization Bottleneck */}
            <div className="pb-16 border-b border-[#111111]/10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-6 block">
                The Civilization Bottleneck
              </span>
              <p className="text-[18px] md:text-[22px] leading-[1.7] text-[#111111]/70 font-medium max-w-3xl">
                {venture.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="py-16 border-b border-[#111111]/10 bg-white -mx-3 md:-mx-4 px-3 md:px-4">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-6 block">
                The Solution
              </span>
              <p className="text-[18px] md:text-[22px] leading-[1.7] text-[#111111]/70 font-medium max-w-3xl">
                {venture.solution}
              </p>
            </div>

            {/* Origins */}
            <div className="py-16 border-b border-[#111111]/10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-10 block">
                Origins
              </span>
              <div className="space-y-8 max-w-3xl">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 mb-3 block">The Facts</span>
                  <p className="text-[18px] md:text-[22px] leading-[1.7] text-[#111111]/70 font-medium">
                    {originStory[0]}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 mb-3 block">The Observation</span>
                  <p className="text-[18px] md:text-[22px] leading-[1.7] text-[#111111]/70 font-medium">
                    {originStory[1]}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 mb-3 block">The Proof</span>
                  <p className="text-[18px] md:text-[22px] leading-[1.7] text-[#111111]/70 font-medium">
                    {originStory[2]}
                  </p>
                </div>
                <div className="bg-[#FF4D00]/5 border-l-2 border-[#FF4D00] pl-6 py-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-3 block">The Thesis</span>
                  <p className="text-[18px] md:text-[22px] leading-[1.7] text-[#111111]/80 font-medium">
                    {originStory[3]}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/join"
                className="group block bg-[#FF4D00] text-white p-8 md:p-10 transition-all hover:brightness-110"
              >
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/60 mb-4 block">
                  Capital
                </span>
                <h3 className="text-[24px] md:text-[32px] font-display font-medium tracking-tight mb-3">
                  Invest in {venture.name.split(" ")[0]}
                </h3>
                <p className="text-[14px] text-white/80 font-medium leading-[1.6]">
                  Express interest in backing this venture
                </p>
              </Link>

              <Link
                to="/join"
                className="group block bg-[#111111] text-white p-8 md:p-10 transition-all hover:brightness-150"
              >
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/60 mb-4 block">
                  Operations
                </span>
                <h3 className="text-[24px] md:text-[32px] font-display font-medium tracking-tight mb-3">
                  Join as Operator
                </h3>
                <p className="text-[14px] text-white/80 font-medium leading-[1.6]">
                  Apply to help build this venture
                </p>
              </Link>
            </div>

            {/* Data Room Access */}
            <div className="mt-6 border border-[#111111]/10 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-2 block">
                    Data Room
                  </span>
                  <h3 className="text-[18px] md:text-[20px] font-display font-medium tracking-tight mb-1">
                    Request Data Room Access
                  </h3>
                  <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.6]">
                    Due diligence materials available upon executed NDA
                  </p>
                </div>
                <Link
                  to="/join"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-[#111111] text-white text-[11px] font-mono font-bold tracking-[0.15em] uppercase hover:bg-[#FF4D00] transition-colors shrink-0"
                >
                  Request Access
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column, At a Glance Sidebar */}
          <div className="md:col-span-4">
            <div className="sticky top-32">
              <div className="bg-white border border-[#111111]/10 p-6 md:p-8">
                {/* Code prominently displayed */}
                <div className="mb-8 pb-6 border-b border-[#111111]/10">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 mb-2 block">
                    Venture Code
                  </span>
                  <span className="text-[28px] md:text-[32px] font-mono font-bold tracking-wider text-[#FF4D00]">
                    {venture.code}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 mb-6 block">
                  At a Glance
                </span>

                <div className="space-y-0">
                  <SidebarItem
                    icon={<MapPin className="w-4 h-4" />}
                    label="Pilot Locations"
                    value={venture.pilotLocations}
                  />
                  <SidebarItem
                    icon={<Scale className="w-4 h-4" />}
                    label="Legal Jurisdiction"
                    value={venture.jurisdiction}
                  />
                  <SidebarItem
                    icon={<Rocket className="w-4 h-4" />}
                    label="Launch Model"
                    value={venture.launchModel}
                  />
                  <SidebarItem
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Cost to Launch"
                    value={
                      venture.costToLaunch
                        ? `$${venture.costToLaunch.toLocaleString()}`
                        : "TBD"
                    }
                  />
                  <SidebarItem
                    icon={<Users className="w-4 h-4" />}
                    label="Anchor Partners"
                    value={venture.anchorPartners}
                    last
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  value,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`py-5 flex items-start gap-3 ${last ? "" : "border-b border-[#111111]/10"}`}
    >
      <div className="text-[#FF4D00] mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase font-mono tracking-widest text-[#111111]/40 mb-1">
          {label}
        </p>
        <p className="text-[14px] font-medium text-[#111111] leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}
