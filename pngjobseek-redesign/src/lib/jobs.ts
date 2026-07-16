export type Job = {
  id: string;
  title: string;
  company: string;
  province: string;
  category: string;
  type: "Full-time" | "Part-time" | "Contract";
  salary: string;
  postedDaysAgo: number;
  closingDate: string;
  featured?: boolean;
  urgent?: boolean;
  verifiedPreferred?: boolean;
  description: string;
  requirements: string[];
};

export const CATEGORIES = [
  "Mining & Resources",
  "Construction & Engineering",
  "Health & Medical",
  "Education & Training",
  "Admin & Office",
  "Hospitality & Tourism",
  "Agriculture & Fisheries",
  "IT & Telecommunications",
  "Banking & Finance",
  "Government & NGO",
] as const;

export const PROVINCES = [
  "National Capital District",
  "Morobe",
  "Western Highlands",
  "East New Britain",
  "Madang",
  "Western Province",
  "Milne Bay",
  "Eastern Highlands",
] as const;

export const JOBS: Job[] = [
  {
    id: "mine-surveyor-ok-tedi",
    title: "Mine Surveyor",
    company: "Ok Tedi Mining Ltd",
    province: "Western Province",
    category: "Mining & Resources",
    type: "Full-time",
    salary: "K85,000 – K110,000 / yr",
    postedDaysAgo: 2,
    closingDate: "14 Aug 2026",
    featured: true,
    verifiedPreferred: true,
    description:
      "Support open-pit survey operations at the Tabubil site — pit mapping, volumetrics, and grade-control survey support for the mine planning team.",
    requirements: [
      "Diploma or degree in Mine Surveying or related field",
      "3+ years open-pit survey experience",
      "Trimble / AutoCAD proficiency",
      "Willing to work FIFO roster",
    ],
  },
  {
    id: "site-engineer-lae-port",
    title: "Site Engineer — Port Upgrade",
    company: "Morobe Civil Works",
    province: "Morobe",
    category: "Construction & Engineering",
    type: "Contract",
    salary: "K12,000 / mo",
    postedDaysAgo: 1,
    closingDate: "5 Aug 2026",
    urgent: true,
    verifiedPreferred: true,
    description:
      "18-month contract overseeing civil works for the Lae port wharf extension. Coordinate subcontractors, manage quality control, and report to the project director.",
    requirements: [
      "Bachelor's in Civil Engineering",
      "5+ years site supervision experience",
      "Experience with marine/port infrastructure preferred",
    ],
  },
  {
    id: "registered-nurse-pom-general",
    title: "Registered Nurse — Emergency Ward",
    company: "Port Moresby General Hospital",
    province: "National Capital District",
    category: "Health & Medical",
    type: "Full-time",
    salary: "K42,000 – K56,000 / yr",
    postedDaysAgo: 4,
    closingDate: "20 Aug 2026",
    verifiedPreferred: true,
    description:
      "Join the emergency department team providing acute care to patients across the National Capital District. Rotating roster, includes night shifts.",
    requirements: [
      "PNG Nursing Council registration",
      "2+ years post-registration experience",
      "Current CPR/ACLS certification",
    ],
  },
  {
    id: "secondary-teacher-mt-hagen",
    title: "Secondary School Teacher — Mathematics",
    company: "Mt Hagen International School",
    province: "Western Highlands",
    category: "Education & Training",
    type: "Full-time",
    salary: "K38,000 – K48,000 / yr",
    postedDaysAgo: 6,
    closingDate: "1 Sep 2026",
    description:
      "Teach mathematics to years 9–12 following the PNG national curriculum. Small class sizes, supportive staff, housing allowance included.",
    requirements: [
      "Bachelor of Education or equivalent",
      "PNG Teaching Service Commission registration (or eligible)",
      "2+ years classroom experience",
    ],
  },
  {
    id: "office-admin-rabaul-trading",
    title: "Office Administrator",
    company: "Rabaul Trading Co.",
    province: "East New Britain",
    category: "Admin & Office",
    type: "Full-time",
    salary: "K24,000 – K30,000 / yr",
    postedDaysAgo: 3,
    closingDate: "10 Aug 2026",
    description:
      "Manage front-office operations, correspondence, and basic bookkeeping for a growing trading company in Rabaul.",
    requirements: [
      "Diploma in Business Administration",
      "MS Office proficiency",
      "Strong written English",
    ],
  },
  {
    id: "resort-manager-milne-bay",
    title: "Resort Operations Manager",
    company: "Tawali Coastal Resort",
    province: "Milne Bay",
    category: "Hospitality & Tourism",
    type: "Full-time",
    salary: "K55,000 – K70,000 / yr",
    postedDaysAgo: 8,
    closingDate: "25 Aug 2026",
    description:
      "Oversee day-to-day resort operations including guest services, housekeeping, and dive-shop coordination for an eco-tourism resort.",
    requirements: [
      "3+ years hospitality management experience",
      "Hands-on leadership style",
      "Comfortable with remote-location living",
    ],
  },
  {
    id: "agronomist-madang-coffee",
    title: "Field Agronomist — Cocoa & Coffee",
    company: "Madang Agri Cooperative",
    province: "Madang",
    category: "Agriculture & Fisheries",
    type: "Full-time",
    salary: "K34,000 – K44,000 / yr",
    postedDaysAgo: 5,
    closingDate: "18 Aug 2026",
    description:
      "Provide extension services to smallholder cocoa and coffee farmers, running quality-improvement and yield programs across Madang province.",
    requirements: [
      "Degree in Agriculture or Agronomy",
      "Field extension experience",
      "Valid driver's licence",
    ],
  },
  {
    id: "network-technician-digicel",
    title: "Network Technician",
    company: "Highlands Telecom Services",
    province: "Eastern Highlands",
    category: "IT & Telecommunications",
    type: "Full-time",
    salary: "K30,000 – K40,000 / yr",
    postedDaysAgo: 1,
    closingDate: "8 Aug 2026",
    featured: true,
    description:
      "Install, maintain, and troubleshoot cell-tower network equipment across the Goroka service area. On-call rotation required.",
    requirements: [
      "Diploma in Telecommunications or Electronics",
      "2+ years network technician experience",
      "Willing to travel within province",
    ],
  },
  {
    id: "credit-analyst-bsp-pom",
    title: "Credit Analyst",
    company: "Highlands & Coastal Bank",
    province: "National Capital District",
    category: "Banking & Finance",
    type: "Full-time",
    salary: "K48,000 – K62,000 / yr",
    postedDaysAgo: 7,
    closingDate: "22 Aug 2026",
    verifiedPreferred: true,
    description:
      "Assess commercial loan applications, prepare credit memos, and monitor portfolio risk for the SME lending division.",
    requirements: [
      "Degree in Finance, Accounting, or Economics",
      "2+ years credit or banking experience",
      "Strong analytical and Excel skills",
    ],
  },
  {
    id: "program-officer-ngo-lae",
    title: "Program Officer — WASH",
    company: "Community Health Partners PNG",
    province: "Morobe",
    category: "Government & NGO",
    type: "Contract",
    salary: "K40,000 – K50,000 / yr",
    postedDaysAgo: 3,
    closingDate: "12 Aug 2026",
    description:
      "Coordinate water, sanitation, and hygiene program delivery across rural Morobe communities in partnership with local government.",
    requirements: [
      "Degree in Public Health, Development Studies, or related field",
      "3+ years program coordination experience",
      "Willing to travel to remote sites",
    ],
  },
];

export function getJob(id: string) {
  return JOBS.find((job) => job.id === id);
}
