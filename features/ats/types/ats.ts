export interface Recommendation {
  id: string;
  category: 'formatting' | 'content' | 'keywords';
  severity: 'critical' | 'warning' | 'info';
  message: string;
}

export interface AtsEvaluation {
  id: string;
  jobTitle: string;
  companyName?: string;
  overallScore: number;
  breakdown: {
    keywordMatch: number;
    skillsMatch: number;
    experienceMatch: number;
    formattingScore: number;
  };
  keywords: {
    matched: string[];
    missing: string[];
  };
  recommendations: Recommendation[];
}