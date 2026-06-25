export interface Company {
  id: string;
  field: string;
  name: string;
  focus: string;
  mission: string;
  technologies: string[];
  funding: string;
  location: string;
  teamSize: string;
}

export const companiesData: Company[] = [
  {
    id: "heliogrid-frontier",
    field: "Energy",
    name: "HelioGrid Frontier",
    focus: "Solar Microgrids",
    location: "Mali",
    mission: "Deploying self-sustaining energy systems and microgrids to bypass centralized grids in rural Mali.",
    technologies: ["Solar PV", "Grid APIs", "Lithium-ion storage"],
    funding: "$2.5M Seed",
    teamSize: "15-50",
  },
  {
    id: "aquaos",
    field: "Water",
    name: "AquaOS",
    focus: "Desalination AI",
    location: "Niamey",
    mission: "Building the municipal water operating system using AI-optimized atmospheric harvesting and desalination.",
    technologies: ["AI", "Reverse Osmosis", "IoT Sensors"],
    funding: "$4M Series A",
    teamSize: "30-100",
  },
  {
    id: "mycelium-structures",
    field: "Manufacturing",
    name: "Mycelium Structures",
    focus: "3D-Printed Housing",
    location: "Kigali",
    mission: "Creating circular-material hubs that turn waste into 3D-printed housing using mycelium composites.",
    technologies: ["3D Printing", "Biomaterials", "Mycelium"],
    funding: "$1.2M Pre-Seed",
    teamSize: "1-15",
  },
  {
    id: "synth-agri",
    field: "Biotech",
    name: "SynthAgri",
    focus: "Climate-resilient Crops",
    location: "Nairobi",
    mission: "Engineering climate-resilient crops and vertical protein to ensure food self-sufficiency in East Africa.",
    technologies: ["CRISPR", "Vertical Farming", "Genomics"],
    funding: "$8M Series A",
    teamSize: "50-200",
  },
  {
    id: "indep-data-net",
    field: "Intelligence",
    name: "IndepData Net",
    focus: "Decentralized Ident",
    location: "Senegal",
    mission: "Establishing independent AI and decentralized identity networks governed by local communities.",
    technologies: ["Blockchain", "Edge Compute", "Federated Learning"],
    funding: "$5M Seed",
    teamSize: "15-50",
  },
  {
    id: "aeropulse-logistics",
    field: "Mobility",
    name: "AeroPulse Logistics",
    focus: "Drone Corridors",
    location: "Rwanda",
    mission: "Creating drone corridors and last-mile networks for informal economies and medical deliveries.",
    technologies: ["UAVs", "Autonomous Flight", "Logistics OS"],
    funding: "$12M Series B",
    teamSize: "50-200",
  },
];
