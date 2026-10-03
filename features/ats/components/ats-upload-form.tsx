'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface AtsUploadFormProps {
  onAnalyze: (file: File | null, jobDescription: string) => void;
  isLoading: boolean;
}

export function AtsUploadForm({ onAnalyze, isLoading }: AtsUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(file, jobDescription);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Scan Resume against Job Description</CardTitle>
        <CardDescription>
          Upload your resume PDF and paste the target job posting to simulate an ATS compatibility audit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Box */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Upload Resume (PDF)</label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors bg-muted/20">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-file-input"
              />
              <label
                htmlFor="resume-file-input"
                className="cursor-pointer text-sm font-semibold text-primary hover:underline"
              >
                Click to upload
              </label>
              <p className="text-xs text-muted-foreground mt-1">PDF format up to 10MB</p>
              {file && (
                <div className="mt-4 flex items-center space-x-2 bg-background p-2 rounded border text-xs font-medium text-foreground">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>{file.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Job Description Text Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Job Description</label>
            <Textarea
              placeholder="Paste the target job description details here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || (!file && !jobDescription.trim())}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing ATS Match...
              </>
            ) : (
              'Run ATS Check'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}