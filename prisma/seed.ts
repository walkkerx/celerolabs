import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with hypothetical example data...\n");

  // ─── 10 Subscribers ───
  const subscribers = [
    { email: "amara.okonkwo@ventures.africa", firstName: "Amara", lastName: "Okonkwo", consent: true, source: "capital_page" },
    { email: "kwame.asante@gmail.com", firstName: "Kwame", lastName: "Asante", consent: true, source: "newsletter_home" },
    { email: "fatima.mohammed@talaat.org", firstName: "Fatima", lastName: "Mohammed", consent: true, source: "capital_page" },
    { email: "chidi.nwosu@hyperion.io", firstName: "Chidi", lastName: "Nwosu", consent: false, source: "rsvp_investor_event" },
    { email: "nala.sereti@originlabs.co.ke", firstName: "Nala", lastName: "Sereti", consent: true, source: "capital_page" },
    { email: "samuel.bekele@addisfund.et", firstName: "Samuel", lastName: "Bekele", consent: true, source: "newsletter_home" },
    { email: "zainab.ibrahim@kanoventures.ng", firstName: "Zainab", lastName: "Ibrahim", consent: true, source: "approach_page" },
    { email: "david.mwangi@nairobitech.co.ke", firstName: "David", lastName: "Mwangi", consent: false, source: "rsvp_demo_day" },
    { email: "aisha.toure@bamakocapital.ml", firstName: "Aisha", lastName: "Toure", consent: true, source: "capital_page" },
    { email: "emmanuel.osei@accrafund.gh", firstName: "Emmanuel", lastName: "Osei", consent: true, source: "newsletter_home" },
  ];

  for (const s of subscribers) {
    await prisma.subscriber.upsert({
      where: { email: s.email },
      update: {},
      create: s,
    });
  }
  console.log(`  ✅ Created ${subscribers.length} subscribers`);

  // ─── 10 Investment Inquiries ───
  const inquiries = [
    { name: "Amara Okonkwo", email: "amara.okonkwo@ventures.africa", amount: 25000, tier: "scout", accredited: true, consent: true, status: "pending" },
    { name: "Kwame Asante", email: "kwame.asante@gmail.com", amount: 100000, tier: "syndicate", accredited: true, consent: true, status: "reviewing" },
    { name: "Fatima Mohammed", email: "fatima.mohammed@talaat.org", amount: 500000, tier: "partner", accredited: true, consent: true, status: "contacted" },
    { name: "Chidi Nwosu", email: "chidi.nwosu@hyperion.io", amount: 50000, tier: "scout", accredited: false, consent: true, status: "pending" },
    { name: "Nala Sereti", email: "nala.sereti@originlabs.co.ke", amount: 250000, tier: "syndicate", accredited: true, consent: true, status: "invested" },
    { name: "Samuel Bekele", email: "samuel.bekele@addisfund.et", amount: 1000000, tier: "anchor", accredited: true, consent: true, status: "reviewing" },
    { name: "Zainab Ibrahim", email: "zainab.ibrahim@kanoventures.ng", amount: 75000, tier: "scout", accredited: false, consent: true, status: "pending" },
    { name: "David Mwangi", email: "david.mwangi@nairobitech.co.ke", amount: 150000, tier: "syndicate", accredited: true, consent: true, status: "contacted" },
    { name: "Aisha Toure", email: "aisha.toure@bamakocapital.ml", amount: 500000, tier: "partner", accredited: true, consent: true, status: "declined" },
    { name: "Emmanuel Osei", email: "emmanuel.osei@accrafund.gh", amount: 750000, tier: "anchor", accredited: true, consent: true, status: "pending" },
  ];

  for (const inq of inquiries) {
    await prisma.investmentInquiry.create({ data: inq });
  }
  console.log(`  ✅ Created ${inquiries.length} investment inquiries`);

  // ─── 10 Applications (mix of founder & partner) ───
  const applications = [
    { type: "founder", firstName: "Tariq", lastName: "Bello", email: "tariq@solargrid.ng", referral: "LinkedIn", linkedinUrl: "https://linkedin.com/in/tariqbello", companyName: "SolarGrid Nigeria", companyWebsite: "https://solargrid.ng", location: "Lagos, Nigeria", role: "CEO & Co-Founder", pitchDeckUrl: "https://docsend.com/solargrid-pitch", motivation: "Building distributed solar micro-grids for underserved communities in rural Nigeria. Our technology reduces installation costs by 60% and enables pay-as-you-go models through mobile money integration.", status: "pending" },
    { type: "partner", firstName: "Wanjiku", lastName: "Kamau", email: "wanjiku@kenyaic.org", referral: "xCellero website", orgName: "Kenya Innovation Centre", orgWebsite: "https://kenyaic.org", partnerRole: "Ecosystem Director", interest: "Co-investing in early-stage climate ventures across East Africa", description: "We run a 12,000 sq ft innovation hub in Nairobi with 40+ resident startups. Looking to partner on deal flow sharing, co-investment in climate-tech, and hosting xCelero Route events.", status: "reviewing" },
    { type: "founder", firstName: "Abena", lastName: "Mensah", email: "abena@agrismart.gh", referral: "Word of mouth", linkedinUrl: "https://linkedin.com/in/abenamensah", companyName: "AgriSmart Ghana", companyWebsite: "https://agrismart.gh", location: "Accra, Ghana", role: "CTO", pitchDeckUrl: "https://docsend.com/agrismart-deck", motivation: "Precision agriculture platform using satellite imagery and AI to help smallholder farmers increase yields by 40%. Currently serving 3,200 farmers across Ghana.", status: "contacted" },
    { type: "partner", firstName: "Youssef", lastName: "El Fassi", email: "youssef@maghrebvc.ma", referral: "Conference introduction", orgName: "Maghreb Ventures Capital", orgWebsite: "https://maghrebvc.ma", partnerRole: "Managing Partner", interest: "Sourcing high-growth startups from the North Africa Route", description: "We manage a $30M fund focused on North African technology companies. Interested in deal-sharing with xCelero for Morocco, Tunisia, and Algeria.", status: "pending" },
    { type: "founder", firstName: "Lindiwe", lastName: "Dlamini", email: "lindiwe@medlogistics.co.za", referral: "xCellero community", linkedinUrl: "https://linkedin.com/in/lindiwedlamini", companyName: "MedLogistics", companyWebsite: "https://medlogistics.co.za", location: "Johannesburg, South Africa", role: "Founder & CEO", pitchDeckUrl: "https://docsend.com/medlogistics-pitch", motivation: "Last-mile pharmaceutical delivery using drone technology to reach remote health facilities. 2,400+ deliveries in pilot phase.", status: "pending" },
    { type: "partner", firstName: "Olu", lastName: "Adebayo", email: "olu@lagosstateinnovates.gov.ng", referral: "Government liaison", orgName: "Lagos State Innovation Trust", orgWebsite: "https://lagosinnovates.gov.ng", partnerRole: "Head of Partnerships", interest: "Policy sandbox collaboration and startup subsidy programs", description: "Government-backed innovation trust with $5M annual budget for startup subsidies.", status: "accepted" },
    { type: "founder", firstName: "Mekdi", lastName: "Haile", email: "mekdi@edtechet.com", referral: "Quest Fellowship", linkedinUrl: "https://linkedin.com/in/mekdihaile", companyName: "EdTech Ethiopia", companyWebsite: "https://edtechet.com", location: "Addis Ababa, Ethiopia", role: "Co-Founder & Product Lead", pitchDeckUrl: "https://docsend.com/edtechet-deck", motivation: "Mobile-first adaptive learning platform for secondary students. 85,000 active users, 92% completion rate.", status: "reviewing" },
    { type: "partner", firstName: "Amina", lastName: "Diallo", email: "amina@terraventures.sn", referral: "xCellero Capital page", orgName: "Terre Ventures Dakar", orgWebsite: "https://terraventures.sn", partnerRole: "Investment Analyst", interest: "Route anchor partner for the West Africa leg", description: "Dakar-based impact investment firm managing a $15M climate adaptation fund.", status: "pending" },
    { type: "founder", firstName: "Kofi", lastName: "Boateng", email: "kofi@payroute.gh", referral: "Twitter/X", linkedinUrl: "https://linkedin.com/in/kofiboateng", companyName: "PayRoute", companyWebsite: "https://payroute.gh", location: "Kumasi, Ghana", role: "Founder", pitchDeckUrl: "https://docsend.com/payroute-deck", motivation: "Cross-border payment infrastructure connecting mobile money networks across West Africa.", status: "declined" },
    { type: "founder", firstName: "Nia", lastName: "Moyo", email: "nia@watertech.tz", referral: "Direct application", linkedinUrl: "https://linkedin.com/in/niamoyo", companyName: "WaterTech Tanzania", companyWebsite: "https://watertech.tz", location: "Dar es Salaam, Tanzania", role: "CEO & Founder", pitchDeckUrl: "https://docsend.com/watertech-pitch", motivation: "IoT-enabled water quality monitoring and purification systems for urban informal settlements.", status: "pending" },
  ];

  for (const app of applications) {
    await prisma.application.create({ data: app });
  }
  console.log(`  ✅ Created ${applications.length} applications`);

  // ─── 10 Job Applications ───
  const jobApplications = [
    { firstName: "Thabo", lastName: "Mokoena", email: "thabo.mokoena@gmail.com", phone: "+27 71 234 5678", linkedinUrl: "https://linkedin.com/in/thabomokoena", role: "Growth Lead", location: "Johannesburg, South Africa", availability: "1 Month Notice", motivation: "Passionate about scaling African tech ventures. 8 years in growth at Takealot and Yoco. Want to bring that playbook to xCelero's Route model.", referral: "LinkedIn", status: "pending" },
    { firstName: "Adaeze", lastName: "Okafor", email: "adaeze@techhustle.ng", phone: "+234 803 456 7890", linkedinUrl: "https://linkedin.com/in/adaezeokafor", portfolioUrl: "https://adaezeokafor.com", role: "Platform Engineer", location: "Lagos, Nigeria", availability: "2 Weeks Notice", motivation: "Full-stack engineer with 6 years building distributed systems at Flutterwave. Want to build the infrastructure that powers Route commerce.", referral: "Twitter/X", status: "reviewing" },
    { firstName: "Kamau", lastName: "Ndegwa", email: "kamau.ndegwa@outlook.com", phone: "+254 712 345 678", linkedinUrl: "https://linkedin.com/in/kamaundegwa", role: "Community Architect", location: "Nairobi, Kenya", availability: "Immediate", motivation: "Built and managed iHub Nairobi's community of 4,000+ members. Looking to architect the Route's community layer from the ground up.", referral: "Word of mouth", status: "contacted" },
    { firstName: "Fatoumata", lastName: "Diop", email: "fatoumata@designstudio.sn", phone: "+221 77 123 4567", linkedinUrl: "https://linkedin.com/in/fatoumatadiop", portfolioUrl: "https://fatoumatadiop.design", role: "Design Lead", location: "Dakar, Senegal", availability: "1 Month Notice", motivation: "Product designer with 7 years across fintech and agritech. Led design at Wave and CoinAfrique. Passionate about building for African contexts.", referral: "Dribbble", status: "pending" },
    { firstName: "Yohannes", lastName: "Gebremeskel", email: "yohannes.g@ethiotech.et", phone: "+251 91 234 5678", linkedinUrl: "https://linkedin.com/in/yohannesg", role: "Data Scientist", location: "Addis Ababa, Ethiopia", availability: "2 Weeks Notice", motivation: "ML engineer with background in agricultural remote sensing. Published 3 papers on crop yield prediction using satellite data for East African farmland.", referral: "Conference", status: "pending" },
    { firstName: "Blessing", lastName: "Eze", email: "blessing.eze@fintech.ng", phone: "+234 806 789 0123", linkedinUrl: "https://linkedin.com/in/blessingeze", role: "Capital Analyst", location: "Lagos, Nigeria", availability: "1 Month Notice", motivation: "CFA Level 3 candidate. 5 years at African Capital Alliance evaluating early-stage deals across West Africa. Want to build the investment engine for Route-based capital.", referral: "LinkedIn", status: "reviewing" },
    { firstName: "Palesa", lastName: "Moeti", email: "palesa.moeti@gmail.com", phone: "+267 71 234 567", linkedinUrl: "https://linkedin.com/in/palesamoeti", role: "Operations Lead", location: "Gaborone, Botswana", availability: "2 Weeks Notice", motivation: "Operations specialist who scaled Andela's Africa operations across 6 countries. Want to build xCelero's operational backbone for the Southern Africa Route.", referral: "Andela alumni", status: "pending" },
    { firstName: "Hamza", lastName: "El Amrani", email: "hamza@maghrebdev.ma", phone: "+212 661 234 567", linkedinUrl: "https://linkedin.com/in/hamzaelamrani", portfolioUrl: "https://hamzaelamrani.dev", role: "Platform Engineer", location: "Casablanca, Morocco", availability: "Immediate", motivation: "Backend engineer at Chari with expertise in distributed systems and API design. Looking to build the Route's data infrastructure layer.", referral: "GitHub", status: "contacted" },
    { firstName: "Nomsa", lastName: "Dube", email: "nomsa.d@zwtech.co.zw", phone: "+263 77 123 4567", linkedinUrl: "https://linkedin.com/in/nomsadube", role: "General Application", location: "Harare, Zimbabwe", availability: "1 Month Notice", motivation: "Serial entrepreneur with 2 exits in edtech and healthtech. Interested in any role where I can contribute to building the Route ecosystem.", referral: "xCellero website", status: "pending" },
    { firstName: "Ibrahim", lastName: "Sow", email: "ibrahim@terranova.ml", phone: "+223 70 123 456", linkedinUrl: "https://linkedin.com/in/ibrahimsow", role: "Venture Scout", location: "Bamako, Mali", availability: "Immediate", motivation: "Former VC associate at Janngo Capital with deep networks in Francophone West Africa. Want to source and evaluate ventures for the West Africa Route.", referral: "Janngo alumni", status: "declined" },
  ];

  for (const job of jobApplications) {
    await prisma.jobApplication.create({ data: job });
  }
  console.log(`  ✅ Created ${jobApplications.length} job applications`);

  // ─── 10 Program Applications ───
  const programApplications = [
    { programSlug: "xhansa-fellowship", firstName: "Selam", lastName: "Tadesse", email: "selam@greenquest.et", phone: "+251 91 234 5678", linkedinUrl: "https://linkedin.com/in/selamtadesse", location: "Addis Ababa, Ethiopia", currentRole: "Sustainability Consultant", companyName: "GreenQuest Ethiopia", motivation: "Building a carbon credit marketplace for Ethiopian smallholder farmers. The Xhansa Fellowship's Disciplined Entrepreneurship framework is exactly what I need to move from idea to product-market fit.", referral: "University network", status: "pending" },
    { programSlug: "xcelero-accelerator", firstName: "Obi", lastName: "Eze", email: "obi@paystacklite.ng", phone: "+234 803 456 7890", linkedinUrl: "https://linkedin.com/in/obieze", location: "Lagos, Nigeria", currentRole: "CTO", companyName: "PayStack Lite", motivation: "Simplified payment infrastructure for informal merchants. Already processing $200K/month. Need the Xcelero Accelerator's network and capital connections to scale across the Route.", referral: "Y Combinator alumni", status: "reviewing" },
    { programSlug: "inception-studios", firstName: "Amina", lastName: "Hassan", email: "amina@studio404.co.ke", phone: "+254 712 345 678", linkedinUrl: "https://linkedin.com/in/aminahassan", location: "Nairobi, Kenya", currentRole: "Product Lead", companyName: "Safaricom", motivation: "6 years building M-Pesa products. Have 3 venture ideas in insurtech and agritech that need the Inception Studios' co-building model to launch properly.", referral: "Safaricom internal", status: "pending" },
    { programSlug: "quest-fellowship", firstName: "Dawit", lastName: "Mekonnen", email: "dawit@biorift.et", phone: "+251 91 567 8901", linkedinUrl: "https://linkedin.com/in/dawitmekonnen", location: "Addis Ababa, Ethiopia", currentRole: "Research Scientist", companyName: "Ethiopian Biotechnology Institute", motivation: "Developing CRISPR-based diagnostic tools for livestock diseases. Need lab space, equipment access, and commercialization support that the Quest Fellowship provides.", referral: "Academic network", status: "contacted" },
    { programSlug: "xhansa-fellowship", firstName: "Grace", lastName: "Muthoni", email: "grace@farmconnect.co.ke", phone: "+254 722 345 678", linkedinUrl: "https://linkedin.com/in/gracemuthoni", location: "Nakuru, Kenya", currentRole: "Founder", companyName: "FarmConnect Kenya", motivation: "B2B marketplace connecting smallholder farmers to institutional buyers. 500 farmers on platform, $80K GMV. Xhansa Fellowship will help me professionalize operations and build the right team.", referral: "xCellero website", status: "pending" },
    { programSlug: "xcelero-accelerator", firstName: "Rashid", lastName: "Sow", email: "rashid@energysolutions.sn", phone: "+221 77 567 8901", linkedinUrl: "https://linkedin.com/in/rashidsow", location: "Dakar, Senegal", currentRole: "CEO", companyName: "Energy Solutions Sénégal", motivation: "Solar-as-a-service for commercial buildings in Dakar. 15 installations completed, $300K ARR. Xcelero Accelerator will help us build the operational systems to scale to 100+ installations.", referral: "Terre Ventures", status: "reviewing" },
    { programSlug: "inception-studios", firstName: "Bongi", lastName: "Nkosi", email: "bongi@towntech.co.za", phone: "+27 82 345 6789", linkedinUrl: "https://linkedin.com/in/bonginkosi", location: "Cape Town, South Africa", currentRole: "Head of Product", companyName: "Takealot", motivation: "Ex-entrepreneur with 1 exit. Have identified a gap in township logistics that needs the Inception Studios' co-building approach to execute while I maintain my day job.", referral: "Takealot alumni", status: "pending" },
    { programSlug: "quest-fellowship", firstName: "Mariam", lastName: "Traore", email: "mariam@biotech.ml", phone: "+223 70 567 8901", linkedinUrl: "https://linkedin.com/in/mariamtraore", location: "Bamako, Mali", currentRole: "PhD Researcher", companyName: "University of Bamako", motivation: "Researching low-cost water purification using locally sourced materials. Quest Fellowship would give me access to proper facilities and mentorship to turn my research into a viable product.", referral: "University supervisor", status: "accepted" },
    { programSlug: "xhansa-fellowship", firstName: "Kwesi", lastName: "Boateng", email: "kwesi@agrisolutions.gh", phone: "+233 24 567 8901", linkedinUrl: "https://linkedin.com/in/kwesiboateng", location: "Kumasi, Ghana", currentRole: "Agricultural Engineer", companyName: "AgriSolutions Ghana", motivation: "Precision irrigation system using IoT sensors and mobile money payments. Early prototype working on 3 farms. Xhansa Fellowship will help me validate the business model and build the right go-to-market.", referral: "KNUST network", status: "pending" },
    { programSlug: "xcelero-accelerator", firstName: "Fikre", lastName: "Mulugeta", email: "fikre@logix.et", phone: "+251 91 890 1234", linkedinUrl: "https://linkedin.com/in/fikremulugeta", location: "Addis Ababa, Ethiopia", currentRole: "Founder & CEO", companyName: "LogiX Ethiopia", motivation: "Last-mile logistics platform for Ethiopian e-commerce. Processing 500 deliveries/day in Addis. Need the Xcelero Accelerator to build the tech infrastructure and partnerships for national expansion.", referral: "ICE Addis", status: "declined" },
  ];

  for (const prog of programApplications) {
    await prisma.programApplication.create({ data: prog });
  }
  console.log(`  ✅ Created ${programApplications.length} program applications`);

  // ─── Summary ───
  const totalSubs = await prisma.subscriber.count();
  const totalInq = await prisma.investmentInquiry.count();
  const totalApps = await prisma.application.count();
  const totalJobs = await prisma.jobApplication.count();
  const totalProgs = await prisma.programApplication.count();
  const totalAmount = await prisma.investmentInquiry.aggregate({ _sum: { amount: true } });

  console.log("\n📊 Database summary:");
  console.log(`   Subscribers:          ${totalSubs}`);
  console.log(`   Investment Inquiries:  ${totalInq}`);
  console.log(`   Join Applications:     ${totalApps}`);
  console.log(`   Job Applications:      ${totalJobs}`);
  console.log(`   Program Applications:  ${totalProgs}`);
  console.log(`   Total Invest Amount:   $${(totalAmount._sum.amount || 0).toLocaleString()}`);
  console.log("\n✨ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
