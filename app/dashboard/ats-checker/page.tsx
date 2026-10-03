'use client';

import { useState } from 'react';
import { PageContainer } from '@/components/layout/page-container';
import { AtsUploadForm } from '@/features/ats/components/ats-upload-form';
import { AtsReport } from '@/features/ats/components/ats-report';
import { mockAtsEvaluation } from '@/features/ats/mocks/ats-mock';
import { AtsEvaluation } from '@/features/ats/types/ats';

const TECH_KEYWORDS = [
  'React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit',
  'State Management', 'REST APIs', 'GraphQL', 'AWS', 'Docker',
  'CI/CD Pipelines', 'Performance Optimization', 'Node.js', 'Express',
  'PostgreSQL', 'MongoDB', 'Jest', 'Cypress', 'System Design'
];

export default function AtsCheckerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<AtsEvaluation | null>(null);

  const handleAnalyze = (_file: File | null, jobDescription: string) => {
    setIsLoading(true);

    setTimeout(() => {
      if (!jobDescription.trim()) {
        setEvaluationResult(mockAtsEvaluation);
      } else {
        const textLower = jobDescription.toLowerCase();
        
        const foundInJd = TECH_KEYWORDS.filter(kw => 
          textLower.includes(kw.toLowerCase())
        );

        const userResumeSkills = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'State Management', 'REST APIs'];

        const matched = foundInJd.filter(kw => userResumeSkills.includes(kw));
        const missing = foundInJd.filter(kw => !userResumeSkills.includes(kw));

        const finalMatched = matched.length > 0 ? matched : userResumeSkills;
        const finalMissing = missing.length > 0 ? missing : ['GraphQL', 'AWS', 'Docker'];

        const calculatedScore = Math.min(
          98,
          Math.max(40, Math.round((finalMatched.length / (finalMatched.length + finalMissing.length)) * 100))
        );

        setEvaluationResult({
          id: `eval-${Date.now()}`,
          jobTitle: extractJobTitle(jobDescription) || 'Custom Job Position',
          companyName: 'Analyzed Job Posting',
          overallScore: calculatedScore,
          breakdown: {
            keywordMatch: calculatedScore,
            skillsMatch: Math.max(50, calculatedScore - 5),
            experienceMatch: Math.min(95, calculatedScore + 10),
            formattingScore: 92,
          },
          keywords: {
            matched: finalMatched,
            missing: finalMissing,
          },
          recommendations: [
            ...(finalMissing.length > 0 ? [{
              id: 'rec-missing-kw',
              category: 'keywords' as const,
              severity: 'critical' as const,
              message: `Missing key technical requirements found in job posting: "${finalMissing.slice(0, 3).join(', ')}".`,
            }] : []),
            {
              id: 'rec-formatting',
              category: 'formatting' as const,
              severity: 'warning' as const,
              message: 'Consider removing multi-column sections to ensure legacy ATS parsers read dates sequentially.',
            },
          ],
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  const extractJobTitle = (text: string): string => {
    const firstLine = text.trim().split('\n')[0];
    return firstLine.length < 40 ? firstLine : 'Target Position';
  };

    return (
       <PageContainer
         title="ATS Resume Checker"
         description="Scan and score your resume against target job descriptions."
       >
         <div className="mx-auto max-w-4xl py-4">
           {evaluationResult ? (
             <AtsReport
               evaluation={evaluationResult}
               onReset={() => setEvaluationResult(null)}
             />
           ) : (
             <AtsUploadForm onAnalyze={handleAnalyze} isLoading={isLoading} />
           )}
         </div>
       </PageContainer>
     );
}