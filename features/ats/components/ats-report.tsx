'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AtsEvaluation } from '../types/ats';
import { CheckCircle2, XCircle, AlertTriangle, Info, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AtsReportProps {
  evaluation: AtsEvaluation;
  onReset: () => void;
}

export function AtsReport({ evaluation, onReset }: AtsReportProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{evaluation.jobTitle}</h2>
          {evaluation.companyName && (
            <p className="text-muted-foreground text-sm">{evaluation.companyName}</p>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Run Another Audit
        </Button>
      </div>

      {/* Primary Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="col-span-1 md:col-span-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-sm font-medium text-muted-foreground mb-2">Overall Score</span>
          <div className="text-5xl font-extrabold text-primary mb-2">
            {evaluation.overallScore}%
          </div>
          <Badge variant={evaluation.overallScore >= 80 ? 'default' : 'destructive'}>
            {evaluation.overallScore >= 80 ? 'Strong Match' : 'Needs Optimization'}
          </Badge>
        </Card>

        <Card className="col-span-1 md:col-span-3 p-6 space-y-4">
          <CardTitle className="text-base">Breakdown Score Metrics</CardTitle>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Keyword Match</span>
                <span>{evaluation.breakdown.keywordMatch}%</span>
              </div>
              <Progress value={evaluation.breakdown.keywordMatch} />
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Skills Match</span>
                <span>{evaluation.breakdown.skillsMatch}%</span>
              </div>
              <Progress value={evaluation.breakdown.skillsMatch} />
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>Experience Relevance</span>
                <span>{evaluation.breakdown.experienceMatch}%</span>
              </div>
              <Progress value={evaluation.breakdown.experienceMatch} />
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span>ATS Formatting Compliance</span>
                <span>{evaluation.breakdown.formattingScore}%</span>
              </div>
              <Progress value={evaluation.breakdown.formattingScore} />
            </div>
          </div>
        </Card>
      </div>

      {/* Keywords Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Keywords & Skills Gap Analysis</CardTitle>
          <CardDescription>
            Comparison between keywords identified in the job post versus your resume.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-emerald-600 mb-2 flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1" /> Matched Keywords ({evaluation.keywords.matched.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {evaluation.keywords.matched.map((kw) => (
                <Badge key={kw} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-rose-600 mb-2 flex items-center">
              <XCircle className="h-4 w-4 mr-1" /> Missing Keywords ({evaluation.keywords.missing.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {evaluation.keywords.missing.map((kw) => (
                <Badge key={kw} variant="outline" className="border-rose-300 text-rose-700 bg-rose-50">
                  {kw}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actionable Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {evaluation.recommendations.map((rec) => (
            <Alert
              key={rec.id}
              variant={rec.severity === 'critical' ? 'destructive' : 'default'}
            >
              {rec.severity === 'critical' ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <Info className="h-4 w-4" />
              )}
              <AlertTitle className="capitalize">{rec.severity} Fix ({rec.category})</AlertTitle>
              <AlertDescription>{rec.message}</AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}