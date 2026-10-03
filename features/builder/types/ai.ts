export interface BulletSuggestion {
  id: string;
  originalText: string;
  enhancedText: string;
  focus: 'impact' | 'brevity' | 'keywords' | 'action-oriented';
}

export interface BulletEnhanceRequest {
  bulletText: string;
  jobTitle?: string;
  targetKeywords?: string[];
}