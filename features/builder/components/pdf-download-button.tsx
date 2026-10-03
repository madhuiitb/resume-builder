"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/store/hooks";
import { ResumePDF } from "./resume-pdf";

export function PDFDownloadButton() {
  const resume = useAppSelector(
    (state) => state.builder.resume,
  );

  const selectedTemplate = useAppSelector(
    (state) => state.builder.selectedTemplates,
  );

  const fileName =
    `${resume.personalInfo.fullName || "resume"}-resume.pdf`
      .toLowerCase()
      .replace(/\s+/g, "-");

  return (
    <PDFDownloadLink
      document={
        <ResumePDF
          resume={resume}
          template={selectedTemplate}
        />
      }
      fileName={fileName}
    >
      {({ loading }) => (
        <Button variant="outline" disabled={loading}>
          <Download className="mr-2 h-4 w-4" />

          {loading ? "Generating..." : "Export PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}