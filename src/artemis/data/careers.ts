export interface Job {
  id: string;
  title: string;
  location: string;
  remote: boolean;
  hybrid: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  salaryPeriod: "year" | "hour";
  postedDaysAgo: number;
  department: string;
  skills: string[];
  type: "full-time" | "part-time" | "contract" | "internship";
  applyUrl: string;
}

export interface CompanyJobs {
  companyId: string;
  companyName: string;
  companyLogo: string;
  stage: string;
  employees: string;
  industries: string[];
  locations: string[];
  description: string;
  jobs: Job[];
}

export const careersData: CompanyJobs[] = [
  {
    companyId: "helios",
    companyName: "Helios Energy",
    companyLogo: "⚡",
    stage: "Seed",
    employees: "10–50",
    industries: ["Energy", "AI"],
    locations: ["Kano, Nigeria", "Kisumu, Kenya"],
    description: "AI-managed modular solar microgrid OS with pay-as-you-go mobile money billing, peer-to-peer energy trading across 10,000+ nodes. Deploying self-sustaining energy systems to bypass centralized grids across sub-Saharan Africa.",
    jobs: [
      {
        id: "hel-001",
        title: "Senior Embedded Systems Engineer",
        location: "Kano, Nigeria",
        remote: false,
        hybrid: true,
        salaryMin: 45000,
        salaryMax: 65000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 1,
        department: "Engineering",
        skills: ["Rust", "Embedded Linux", "IoT", "Solar PV", "Raspberry Pi", "MQTT"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "hel-002",
        title: "AI/ML Engineer: Load Balancing",
        location: "Remote",
        remote: true,
        hybrid: false,
        salaryMin: 55000,
        salaryMax: 80000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 3,
        department: "AI & Data",
        skills: ["Python", "TensorFlow", "Time Series", "Energy Systems", "Reinforcement Learning"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "hel-003",
        title: "Mobile Money Integration Lead",
        location: "Kisumu, Kenya",
        remote: false,
        hybrid: true,
        salaryMin: 40000,
        salaryMax: 55000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 7,
        department: "Payments",
        skills: ["M-Pesa API", "USSD", "Node.js", "Mobile Money", "Flutterwave"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "hel-004",
        title: "Field Operations Intern",
        location: "Kano, Nigeria",
        remote: false,
        hybrid: false,
        salaryMin: 800,
        salaryMax: 1200,
        salaryCurrency: "USD",
        salaryPeriod: "month",
        postedDaysAgo: 2,
        department: "Operations",
        skills: ["Solar Installation", "Community Engagement", "Data Collection"],
        type: "internship",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "noma",
    companyName: "Noma AI",
    companyLogo: "🧠",
    stage: "Seed",
    employees: "10–50",
    industries: ["AI", "NLP"],
    locations: ["Kigali, Rwanda", "Nairobi, Kenya"],
    description: "Large language model trained on 100+ African languages + oral archives. Building independent AI infrastructure that serves health, legal, and government applications across the continent.",
    jobs: [
      {
        id: "nom-001",
        title: "Research Scientist: African NLP",
        location: "Kigali, Rwanda",
        remote: false,
        hybrid: true,
        salaryMin: 60000,
        salaryMax: 90000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 1,
        department: "Research",
        skills: ["Transformers", "Multilingual NLP", "PyTorch", "Swahili", "Hausa", "Low-Resource Languages"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "nom-002",
        title: "ML Infrastructure Engineer",
        location: "Remote",
        remote: true,
        hybrid: false,
        salaryMin: 70000,
        salaryMax: 100000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 5,
        department: "Engineering",
        skills: ["Kubernetes", "CUDA", "MLflow", "Docker", "GPU Clusters", "Ray"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "nom-003",
        title: "Product Manager: Government AI",
        location: "Nairobi, Kenya",
        remote: false,
        hybrid: true,
        salaryMin: 50000,
        salaryMax: 70000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 8,
        department: "Product",
        skills: ["B2G Sales", "Healthcare AI", "Public Policy", "Swahili", "User Research"],
        type: "full-time",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "vulcan",
    companyName: "Vulcan Homes",
    companyLogo: "🏗️",
    stage: "Series A",
    employees: "50–200",
    industries: ["Construction", "Manufacturing"],
    locations: ["Harare, Zimbabwe", "Luanda, Angola"],
    description: "Turnkey Mobile Micro-Factory™ producing all home components on-site. 1 house in 3 days with 10× fewer skilled workers needed. Tackling Africa's 50M unit housing deficit.",
    jobs: [
      {
        id: "vul-001",
        title: "Robotics Engineer: Automated Assembly",
        location: "Harare, Zimbabwe",
        remote: false,
        hybrid: false,
        salaryMin: 50000,
        salaryMax: 75000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 2,
        department: "Engineering",
        skills: ["ROS2", "Industrial Robotics", "PLC Programming", "3D Printing", "CAD/CAM"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "vul-002",
        title: "Supply Chain Director",
        location: "Luanda, Angola",
        remote: false,
        hybrid: false,
        salaryMin: 65000,
        salaryMax: 90000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 4,
        department: "Operations",
        skills: ["Supply Chain Management", "Procurement", "Cross-border Logistics", "SAP", "Manufacturing"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "vul-003",
        title: "Structural Engineer",
        location: "Harare, Zimbabwe",
        remote: false,
        hybrid: true,
        salaryMin: 40000,
        salaryMax: 60000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 12,
        department: "Engineering",
        skills: ["Structural Analysis", "Mycelium Composites", "AutoCAD", "Building Codes", "Sustainable Design"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "vul-004",
        title: "Franchise Operations Manager",
        location: "Harare, Zimbabwe",
        remote: false,
        hybrid: false,
        salaryMin: 35000,
        salaryMax: 50000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 6,
        department: "Business Development",
        skills: ["Franchise Management", "Training", "Operations", "Construction", "Local Partnerships"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "vul-005",
        title: "Architecture & Design Intern",
        location: "Harare, Zimbabwe",
        remote: false,
        hybrid: false,
        salaryMin: 700,
        salaryMax: 1000,
        salaryCurrency: "USD",
        salaryPeriod: "month",
        postedDaysAgo: 3,
        department: "Design",
        skills: ["AutoCAD", "Rhino", "Sustainable Architecture", "Parametric Design"],
        type: "internship",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "joule",
    companyName: "Joule Mobility",
    companyLogo: "🔋",
    stage: "Series A",
    employees: "50–200",
    industries: ["Mobility", "Energy"],
    locations: ["Kampala, Uganda", "Nairobi, Kenya"],
    description: "Locally assembled electric buses and cargo motorcycles using African-sourced components. Operator financing model making EVs accessible to boda-boda and matatu operators across East Africa.",
    jobs: [
      {
        id: "jou-001",
        title: "Senior Electrical Engineer: EV Powertrains",
        location: "Kampala, Uganda",
        remote: false,
        hybrid: true,
        salaryMin: 50000,
        salaryMax: 70000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 1,
        department: "Engineering",
        skills: ["EV Powertrain", "Battery Management Systems", "Motor Controllers", "PCB Design", "CAN Bus"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "jou-002",
        title: "Fleet Operations Manager",
        location: "Nairobi, Kenya",
        remote: false,
        hybrid: false,
        salaryMin: 40000,
        salaryMax: 55000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 3,
        department: "Operations",
        skills: ["Fleet Management", "EV Charging", "Logistics", "Data Analysis", "Team Leadership"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "jou-003",
        title: "Mobile Developer: Rider App",
        location: "Remote – Africa",
        remote: true,
        hybrid: false,
        salaryMin: 35000,
        salaryMax: 55000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 10,
        department: "Product",
        skills: ["React Native", "Flutter", "USSD", "Offline-First", "GPS Tracking", "Maps API"],
        type: "full-time",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "refract",
    companyName: "Refract Diagnostics",
    companyLogo: "🔬",
    stage: "Series A",
    employees: "50–200",
    industries: ["Life Sciences", "Healthcare"],
    locations: ["Kigali, Rwanda", "Cape Town, South Africa"],
    description: "Independent diagnostics platform: $5 disposable microfluidic cartridge running 100+ tests from 1 drop of blood, read by smartphone. Making point-of-care diagnostics universally accessible.",
    jobs: [
      {
        id: "ref-001",
        title: "Microfluidics Engineer",
        location: "Cape Town, South Africa",
        remote: false,
        hybrid: true,
        salaryMin: 55000,
        salaryMax: 80000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 1,
        department: "R&D",
        skills: ["Microfluidics", "Lab-on-Chip", "CAD", "Soft Lithography", "Biomedical Engineering"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "ref-002",
        title: "Regulatory Affairs Manager",
        location: "Kigali, Rwanda",
        remote: false,
        hybrid: false,
        salaryMin: 45000,
        salaryMax: 65000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 5,
        department: "Regulatory",
        skills: ["CE Marking", "FDA 510(k)", "ISO 13485", "Clinical Trials", "Sub-Saharan Africa Regulations"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "ref-003",
        title: "Clinical Data Scientist",
        location: "Remote",
        remote: true,
        hybrid: false,
        salaryMin: 60000,
        salaryMax: 85000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 8,
        department: "Data Science",
        skills: ["R", "Biostatistics", "Clinical Trials", "Machine Learning", "EHR Systems", "Python"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "ref-004",
        title: "Software Engineer: Smartphone Reader App",
        location: "Remote – Africa",
        remote: true,
        hybrid: false,
        salaryMin: 40000,
        salaryMax: 60000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 2,
        department: "Engineering",
        skills: ["Swift", "Kotlin", "Computer Vision", "ONNX", "Offline-First", "Bluetooth LE"],
        type: "full-time",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "denari",
    companyName: "Denari Finance",
    companyLogo: "💳",
    stage: "Seed",
    employees: "10–50",
    industries: ["Fintech", "Digital Finance"],
    locations: ["Nairobi, Kenya", "Lagos, Nigeria"],
    description: "Non-extractive prepaid multi-currency card with no interest, direct deposit, and timely-payment refund built on mobile money rails and local agent networks. Financial inclusion without extraction.",
    jobs: [
      {
        id: "den-001",
        title: "Backend Engineer: Payment Rails",
        location: "Nairobi, Kenya",
        remote: false,
        hybrid: true,
        salaryMin: 40000,
        salaryMax: 60000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 2,
        department: "Engineering",
        skills: ["Node.js", "M-Pesa API", "Stripe", "PostgreSQL", "PCI DSS", "Event-Driven Architecture"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "den-002",
        title: "Compliance & Risk Officer",
        location: "Lagos, Nigeria",
        remote: false,
        hybrid: false,
        salaryMin: 45000,
        salaryMax: 65000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 6,
        department: "Compliance",
        skills: ["AML/KYC", "CBN Regulations", "CBK Regulations", "Risk Assessment", "Fintech Compliance"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "den-003",
        title: "Growth Marketing Lead",
        location: "Remote – Africa",
        remote: true,
        hybrid: false,
        salaryMin: 35000,
        salaryMax: 50000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 4,
        department: "Marketing",
        skills: ["Growth Hacking", "WhatsApp Marketing", "USSD Campaigns", "Data Analytics", "B2C Fintech"],
        type: "full-time",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "sankofa",
    companyName: "Sankofa Education",
    companyLogo: "📚",
    stage: "Seed",
    employees: "10–50",
    industries: ["EdTech", "AI"],
    locations: ["Nairobi, Kenya", "Lagos, Nigeria"],
    description: "AI-powered adaptive tutoring platform trained on African epistemologies. Personalizes pace, content, and language for each learner across Kiswahili, Hausa, Yoruba, and 50+ African languages.",
    jobs: [
      {
        id: "san-001",
        title: "Full Stack Developer",
        location: "Nairobi, Kenya",
        remote: false,
        hybrid: true,
        salaryMin: 35000,
        salaryMax: 55000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 1,
        department: "Engineering",
        skills: ["React", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "PWA"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "san-002",
        title: "Curriculum Designer: STEM",
        location: "Lagos, Nigeria",
        remote: false,
        hybrid: true,
        salaryMin: 25000,
        salaryMax: 40000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 7,
        department: "Content",
        skills: ["Curriculum Design", "STEM Education", "Pedagogy", "Afrocentric Learning", "Assessment Design"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "san-003",
        title: "UX Researcher: Education",
        location: "Remote – Africa",
        remote: true,
        hybrid: false,
        salaryMin: 25000,
        salaryMax: 40000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 10,
        department: "Design",
        skills: ["User Research", "Usability Testing", "Figma", "Rural Communities", "Accessibility", "Mobile-First"],
        type: "contract",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "convoy",
    companyName: "Convoy Logistics",
    companyLogo: "🚛",
    stage: "Pre-Seed",
    employees: "1–15",
    industries: ["Logistics", "Trade"],
    locations: ["Nairobi, Kenya", "Kampala, Uganda"],
    description: "Federated logistics OS: shared booking, tracking, and payment for small cross-border freight operators across AfCFTA corridors. Connecting 54 countries through unified digital infrastructure.",
    jobs: [
      {
        id: "con-001",
        title: "Senior Backend Engineer",
        location: "Nairobi, Kenya",
        remote: false,
        hybrid: true,
        salaryMin: 40000,
        salaryMax: 60000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 3,
        department: "Engineering",
        skills: ["Go", "GraphQL", "PostgreSQL", "Real-time Tracking", "Mobile Money APIs", "AWS"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "con-002",
        title: "Cross-Border Trade Analyst",
        location: "Kampala, Uganda",
        remote: false,
        hybrid: false,
        salaryMin: 20000,
        salaryMax: 35000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 8,
        department: "Operations",
        skills: ["AfCFTA", "Customs Procedures", "Trade Compliance", "Data Analysis", "East Africa"],
        type: "full-time",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "xcelero",
    companyName: "xCelero Labs",
    companyLogo: "✕",
    stage: "Venture Studio",
    employees: "50–200",
    industries: ["Venture Studio", "Infrastructure"],
    locations: ["Global", "Mauritius HQ"],
    description: "The venture studio and infrastructure platform building category-defining companies across energy, food, mobility, life sciences, data, finance, education, and space. xCelero conceives, launches, and scales ProtoCos from first principles.",
    jobs: [
      {
        id: "xcl-001",
        title: "Venture Architect: Energy Vertical",
        location: "Mauritius HQ",
        remote: false,
        hybrid: false,
        salaryMin: 80000,
        salaryMax: 120000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 1,
        department: "Venture Design",
        skills: ["Venture Building", "Energy Markets", "Business Model Design", "Africa Strategy", "Team Building"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "xcl-002",
        title: "Principal Engineer: Platform Infrastructure",
        location: "Remote",
        remote: true,
        hybrid: false,
        salaryMin: 100000,
        salaryMax: 150000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 3,
        department: "Engineering",
        skills: ["System Design", "Kubernetes", "Multi-tenant SaaS", "TypeScript", "Terraform", "Microservices"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "xcl-003",
        title: "Head of Capital: Fund Strategy",
        location: "Mauritius HQ",
        remote: false,
        hybrid: false,
        salaryMin: 90000,
        salaryMax: 130000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 5,
        department: "Capital",
        skills: ["Fund Management", "Venture Capital", "African Markets", "LP Relations", "Portfolio Strategy"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "xcl-004",
        title: "Design Lead: ProtoCo Identity",
        location: "Remote – Global",
        remote: true,
        hybrid: false,
        salaryMin: 60000,
        salaryMax: 90000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 7,
        department: "Design",
        skills: ["Brand Design", "Figma", "Design Systems", "Typography", "Motion Design", "Storytelling"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "xcl-005",
        title: "Legal & Compliance Associate",
        location: "Mauritius HQ",
        remote: false,
        hybrid: true,
        salaryMin: 50000,
        salaryMax: 70000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 10,
        department: "Legal",
        skills: ["Corporate Law", "Mauritius GBL", "Cross-border Structuring", "IP Law", "Regulatory Compliance"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "xcl-006",
        title: "Studio Operations Intern",
        location: "Mauritius HQ",
        remote: false,
        hybrid: false,
        salaryMin: 1000,
        salaryMax: 1500,
        salaryCurrency: "USD",
        salaryPeriod: "month",
        postedDaysAgo: 2,
        department: "Operations",
        skills: ["Project Management", "Research", "Data Analysis", "Notion", "Communication"],
        type: "internship",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "vectis",
    companyName: "Vectis Ports",
    companyLogo: "⚓",
    stage: "Seed",
    employees: "10–50",
    industries: ["Logistics", "AI"],
    locations: ["Mombasa, Kenya", "Dar es Salaam, Tanzania"],
    description: "Digital twin + AI for African ports: real-time container tracking, customs pre-clearance, berth optimization. Reducing port clearance from 14 days to under 48 hours.",
    jobs: [
      {
        id: "vec-001",
        title: "Senior Full Stack Engineer",
        location: "Mombasa, Kenya",
        remote: false,
        hybrid: true,
        salaryMin: 45000,
        salaryMax: 65000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 2,
        department: "Engineering",
        skills: ["React", "Python", "Django", "PostgreSQL", "Docker", "Real-time Systems"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "vec-002",
        title: "Digital Twin Specialist",
        location: "Dar es Salaam, Tanzania",
        remote: false,
        hybrid: false,
        salaryMin: 50000,
        salaryMax: 75000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 6,
        department: "Engineering",
        skills: ["3D Modeling", "IoT Sensors", "Cesium.js", "GIS", "Port Operations", "Simulation"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "vec-003",
        title: "Government Relations Lead",
        location: "Mombasa, Kenya",
        remote: false,
        hybrid: false,
        salaryMin: 35000,
        salaryMax: 50000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 12,
        department: "Business Development",
        skills: ["Government Relations", "Port Authorities", "East Africa", "Trade Policy", "Stakeholder Management"],
        type: "full-time",
        applyUrl: "#/join"
      }
    ]
  },
  {
    companyId: "aegis",
    companyName: "Aegis Intelligence",
    companyLogo: "🛡️",
    stage: "Seed",
    employees: "10–50",
    industries: ["GovTech", "AI"],
    locations: ["Kigali, Rwanda", "Accra, Ghana"],
    description: "AI decision platform integrating all government data sources into a real-time digital twin of the nation. Scenario modeling for policy that saves billions in misallocated public spending.",
    jobs: [
      {
        id: "aeg-001",
        title: "Data Engineer: Government Systems",
        location: "Kigali, Rwanda",
        remote: false,
        hybrid: true,
        salaryMin: 45000,
        salaryMax: 65000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 3,
        department: "Engineering",
        skills: ["ETL Pipelines", "Apache Spark", "Data Warehousing", "Government Data", "Python", "SQL"],
        type: "full-time",
        applyUrl: "#/join"
      },
      {
        id: "aeg-002",
        title: "Product Designer: Civic Tech",
        location: "Accra, Ghana",
        remote: false,
        hybrid: true,
        salaryMin: 30000,
        salaryMax: 45000,
        salaryCurrency: "USD",
        salaryPeriod: "year",
        postedDaysAgo: 7,
        department: "Design",
        skills: ["Figma", "Civic Tech", "Accessibility", "Data Visualization", "User Research", "Design Systems"],
        type: "full-time",
        applyUrl: "#/join"
      }
    ]
  }
];

export const allRoles = [...new Set(careersData.flatMap(c => c.jobs.map(j => j.department)))].sort();
export const allSkills = [...new Set(careersData.flatMap(c => c.jobs.flatMap(j => j.skills)))].sort();
export const allLocations = [...new Set(careersData.flatMap(c => c.jobs.map(j => j.location)))].sort();
export const allIndustries = [...new Set(careersData.flatMap(c => c.industries))].sort();
export const allStages = [...new Set(careersData.map(c => c.stage))].sort();
