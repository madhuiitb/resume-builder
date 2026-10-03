import { BulletSuggestion } from '../types/ai';

export const generateMockBulletSuggestions = (originalText: string): BulletSuggestion[] => {
  const text = originalText.trim() || 'Worked on web applications using React and TypeScript';

  return [
    {
      id: 'sug-1',
      originalText: text,
      enhancedText: `Engineered responsive, high-traffic web interfaces using React and TypeScript, improving core application load speed by 35%.`,
      focus: 'impact',
    },
    {
      id: 'sug-2',
      originalText: text,
      enhancedText: `Architected and deployed scalable React & TypeScript components, adhering to modern clean code standards across cross-functional sprint teams.`,
      focus: 'action-oriented',
    },
    {
      id: 'sug-3',
      originalText: text,
      enhancedText: `Optimized client-side state management and REST API integrations in Next.js, driving a 20% boost in overall developer productivity.`,
      focus: 'keywords',
    },
  ];
};