export type ResourceType = "past-questions" | "slides" | "handouts" | "assignments" | "textbooks";
export type FileFormat = "pdf" | "zip" | "docx" | "pptx";

export interface Resource {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  year: string;
  semester: "Semester 1" | "Semester 2";
  type: ResourceType;
  format: FileFormat;
  sizeKB: number;
  dateAdded: string; // ISO date
  downloads: number;
}

export const resourceTypeLabels: Record<ResourceType, string> = {
  "past-questions": "Past Questions",
  slides: "Lecture Slides",
  handouts: "Handouts",
  assignments: "Assignments",
  textbooks: "Textbooks",
};

export const years = ["Year 1", "Year 2", "Year 3", "Year 4"];
export const semesters = ["Semester 1", "Semester 2"] as const;

/*
  PLACEHOLDER DATA — illustrative course codes/titles to demo the filter
  and card design, not verified against the real KNUST curriculum. Swap
  for real uploaded resources before ship.
*/
export const placeholderResources: Resource[] = [
  { id: "1", title: "End of Semester Past Questions 2024", courseCode: "COE 251", courseName: "Digital Systems Design", year: "Year 2", semester: "Semester 1", type: "past-questions", format: "pdf", sizeKB: 2100, dateAdded: "2026-07-20", downloads: 342 },
  { id: "2", title: "Lecture Slides — Weeks 1-6", courseCode: "COE 251", courseName: "Digital Systems Design", year: "Year 2", semester: "Semester 1", type: "slides", format: "pptx", sizeKB: 8600, dateAdded: "2026-07-18", downloads: 210 },
  { id: "3", title: "Lab Handout — Combinational Logic", courseCode: "COE 251", courseName: "Digital Systems Design", year: "Year 2", semester: "Semester 1", type: "handouts", format: "pdf", sizeKB: 640, dateAdded: "2026-06-30", downloads: 98 },
  { id: "4", title: "Assignment 3 — Karnaugh Maps", courseCode: "COE 251", courseName: "Digital Systems Design", year: "Year 2", semester: "Semester 1", type: "assignments", format: "docx", sizeKB: 210, dateAdded: "2026-06-15", downloads: 156 },
  { id: "5", title: "Calculus & Analysis Past Questions (5yr)", courseCode: "MATH 151", courseName: "Calculus & Analysis", year: "Year 1", semester: "Semester 1", type: "past-questions", format: "zip", sizeKB: 5400, dateAdded: "2026-07-22", downloads: 501 },
  { id: "6", title: "Recommended Textbook — Stewart's Calculus", courseCode: "MATH 151", courseName: "Calculus & Analysis", year: "Year 1", semester: "Semester 1", type: "textbooks", format: "pdf", sizeKB: 41200, dateAdded: "2026-05-12", downloads: 620 },
  { id: "7", title: "Circuit Theory Lecture Slides", courseCode: "EE 251", courseName: "Circuit Theory", year: "Year 2", semester: "Semester 2", type: "slides", format: "pptx", sizeKB: 6300, dateAdded: "2026-07-10", downloads: 187 },
  { id: "8", title: "Assignment 1 — Kirchhoff's Laws", courseCode: "EE 251", courseName: "Circuit Theory", year: "Year 2", semester: "Semester 2", type: "assignments", format: "pdf", sizeKB: 180, dateAdded: "2026-07-05", downloads: 76 },
  { id: "9", title: "Data Structures Past Questions", courseCode: "COE 361", courseName: "Data Structures & Algorithms", year: "Year 3", semester: "Semester 1", type: "past-questions", format: "pdf", sizeKB: 1800, dateAdded: "2026-07-24", downloads: 289 },
  { id: "10", title: "Lecture Handout — Binary Trees", courseCode: "COE 361", courseName: "Data Structures & Algorithms", year: "Year 3", semester: "Semester 1", type: "handouts", format: "pdf", sizeKB: 950, dateAdded: "2026-07-19", downloads: 134 },
  { id: "11", title: "Microprocessors Lecture Slides", courseCode: "COE 401", courseName: "Microprocessor Systems", year: "Year 4", semester: "Semester 1", type: "slides", format: "pptx", sizeKB: 9100, dateAdded: "2026-07-15", downloads: 92 },
  { id: "12", title: "Final Year Project Handbook", courseCode: "COE 471", courseName: "Final Year Project", year: "Year 4", semester: "Semester 2", type: "handouts", format: "pdf", sizeKB: 1200, dateAdded: "2026-06-01", downloads: 245 },
];

export function formatFileSize(kb: number): string {
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function formatDateAdded(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
