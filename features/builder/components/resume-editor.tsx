"use client";

import { PersonalInfoForm } from "./personal-info-form";
import { SummaryForm } from "./summary-form";
import { ExperienceForm } from "./experience-form";
import { EducationForm } from "./education-form";
import { SkillsForm } from "./skills-form";
import { ProjectsForm } from "./projects-form";

export function ResumeEditor() {
  return (
    <div className="min-h-0 overflow-y-auto border-r border-border/60 p-6">
      <div className="mx-auto max-w-xl space-y-10">
        <PersonalInfoForm />

        <SummaryForm />

        <ExperienceForm />

        <EducationForm />

        <SkillsForm />

        <ProjectsForm />
      </div>
    </div>
  );
}