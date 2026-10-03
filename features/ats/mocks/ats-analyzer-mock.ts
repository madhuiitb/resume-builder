import type { AtsEvaluation } from "../types/ats";
import { mockAtsEvaluation } from "./ats-mock";

const TECH_KEYWORDS = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Redux Toolkit",
  "State Management", "REST APIs", "GraphQL", "AWS", "Docker",
  "CI/CD Pipelines", "Performance Optimization", "Node.js", "Express",
  "PostgreSQL", "MongoDB", "Jest", "Cypress", "System Design",
];

const RESUME_SKILLS = [
  "React", "TypeScript", "Next.js", "Tailwind CSS",
  "Redux Toolkit", "State Management", "REST APIs",
];

function extractJobTitle(text: string): string {
  const firstLine = text.trim().split("\n")[0];
  return firstLine.length < 40 ? firstLine : "Target Position";
}

/** Mock replacement for the real ATS analysis (Phase 7). */
export function buildMockAtsEvaluation(jobDescription: string): AtsEvaluation {
  if (!jobDescription.trim()) return mockAtsEvaluation;

  const text = jobDescription.toLowerCase();
  const foundInJd = TECH_KEYWORDS.filter((kw) => text.includes(kw.toLowerCase()));

  const matched = foundInJd.filter((kw) => RESUME_SKILLS.includes(kw));
  const missing = foundInJd.filter((kw) => !RESUME_SKILLS.includes(kw));

  const finalMatched = matched.length > 0 ? matched : RESUME_SKILLS;
  const finalMissing = missing.length > 0 ? missing : ["GraphQL", "AWS", "Docker"];

  const score = Math.min(
    98,
    Math.max(
      40,
      Math.round((finalMatched.length / (finalMatched.length + finalMissing.length)) * 100),
    ),
  );

  return {
    id: `eval-${Date.now()}`,
    jobTitle: extractJobTitle(jobDescription) || "Custom Job Position",
    companyName: "Analyzed Job Posting",
    overallScore: score,
    breakdown: {
      keywordMatch: score,
      skillsMatch: Math.max(50, score - 5),
      experienceMatch: Math.min(95, score + 10),
      formattingScore: 92,
    },
    keywords: { matched: finalMatched, missing: finalMissing },
    recommendations: [
      {
        id: "rec-missing-kw",
        category: "keywords",
        severity: "critical",
        message: `Missing key technical requirements found in job posting: "${finalMissing.slice(0, 3).join(", ")}".`,
      },
      {
        id: "rec-formatting",
        category: "formatting",
        severity: "warning",
        message:
          "Consider removing multi-column sections to ensure legacy ATS parsers read dates sequentially.",
      },
    ],
  };
}