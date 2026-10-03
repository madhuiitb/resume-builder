import { ResumeEditor } from "@/features/builder/components/resume-editor";
import { ResumePreview } from "@/features/builder/components/resume-preview";
import { BuilderActions } from "@/features/builder/components/builder-actions";
import { TemplateSelector } from "@/features/builder/components/template-selector";
import { PDFExportButton } from "@/features/builder/components/pdf-export-button";

export default function NewResumePage() {
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col">
      <div className="shrink-0 border-b border-border/60 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">
              Resume Builder
            </h1>

            <p className="text-sm text-muted-foreground">
              Create and optimize your resume.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TemplateSelector />

            <PDFExportButton />

            <BuilderActions />
          </div>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <ResumeEditor />

        <ResumePreview />
      </div>
    </div>
  );
}