import { AtsEvaluation } from '../types/ats';

export const mockAtsEvaluation: AtsEvaluation = {
  id: 'eval-mock-001',
  jobTitle: 'Senior Frontend Engineer',
  companyName: 'TechCorp Solutions',
  overallScore: 82,
  breakdown: {
    keywordMatch: 85,
    skillsMatch: 78,
    experienceMatch: 90,
    formattingScore: 95,
  },
  keywords: {
    matched: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'Redux Toolkit',
      'State Management',
      'REST APIs',
    ],
    missing: [
      'GraphQL',
      'AWS',
      'Docker',
      'CI/CD Pipelines',
      'Performance Optimization',
    ],
  },
  recommendations: [
    {
      id: 'rec-1',
      category: 'formatting',
      severity: 'warning',
      message: 'Consider removing table-like layouts for experience dates; single-column list layouts parse higher in legacy ATS parsers.',
    },
    {
      id: 'rec-2',
      category: 'keywords',
      severity: 'critical',
      message: 'Missing key technical requirements found in job posting: "GraphQL" and "CI/CD".',
    },
    {
      id: 'rec-3',
      category: 'content',
      severity: 'info',
      message: 'Add quantifiable metrics to your recent role achievements (e.g., "Increased load speed by 35%").',
    },
  ],
};