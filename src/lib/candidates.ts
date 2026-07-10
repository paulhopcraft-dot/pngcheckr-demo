// Static, public-safe candidate directory for this demo. Reference codes are
// meant to be looked up by anyone (that's the point of the badge flow), so
// hardcoding this small fixed list keeps the API surface to the 3 specified
// routes instead of adding an unlisted "list candidates" endpoint.
export interface CandidateOption {
  id: number;
  name: string;
  role: string;
  referenceCode: string;
}

export const CANDIDATES: CandidateOption[] = [
  { id: 1, name: "Joseph Kaupa", role: "Site Logistics Supervisor", referenceCode: "ATT-7Q3K9M" },
  { id: 2, name: "Ruth Ovia", role: "Accounts Officer", referenceCode: "ATT-2C91K4" },
  { id: 3, name: "Daniel Wambi", role: "Electrical Technician", referenceCode: "ATT-N4XZ08" },
];

export function findCandidateByNameOrCode(query: string): CandidateOption | undefined {
  const q = query.trim().toLowerCase();
  return CANDIDATES.find(
    (c) => c.name.toLowerCase() === q || c.referenceCode.toLowerCase() === q
  );
}
