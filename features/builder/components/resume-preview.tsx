"use client";

import { useAppSelector } from "@/store/hooks";
import { toDisplayBullets } from "../lib/bullets";

export function ResumePreview() {
  const resume = useAppSelector(
    (state) => state.builder.resume,
  );
   const selectedTemplate = useAppSelector(
    (state) => state.builder.selectedTemplates,
  );

  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    projects,
  } = resume;

  return (
    <div className="min-h-0 overflow-y-auto bg-muted/30 p-6">
      <div className={`mx-auto min-h-[800px] max-w-2xl bg-background p-10 shadow-sm ${
    selectedTemplate === "modern"
      ? "border-l-4 border-primary"
      : ""
  }`}>
        {/* Header */}

        <header  className={
    selectedTemplate === "modern"
      ? "border-b border-border pb-5"
      : "border-b border-border pb-5 text-center"
  }>
          <h1 className="text-3xl font-bold">
            {personalInfo.fullName || "Your Name"}
          </h1>

          <div className="mt-2 text-sm text-muted-foreground">
            {[
              personalInfo.email,
              personalInfo.phone,
              personalInfo.location,
            ]
              .filter(Boolean)
              .join(" • ") || "Contact information"}
          </div>

          {(personalInfo.linkedin || personalInfo.website) && (
            <div className="mt-1 text-sm text-muted-foreground">
              {[personalInfo.linkedin, personalInfo.website]
                .filter(Boolean)
                .join(" • ")}
            </div>
          )}
        </header>

        {/* Summary */}

        {summary && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Summary
            </h2>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}

        {experience.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Experience
            </h2>

            <div className="mt-3 space-y-5">
              {experience.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {item.role || "Role"}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {item.company}
                        {item.location
                          ? ` • ${item.location}`
                          : ""}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm text-muted-foreground">
                      {item.startDate}
                      {" – "}
                      {item.current
                        ? "Present"
                        : item.endDate}
                    </p>
                  </div>

                    {toDisplayBullets(item.description).length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                      {toDisplayBullets(item.description).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}

        {education.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Education
            </h2>

            <div className="mt-3 space-y-4">
              {education.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {item.degree}
                        {item.field
                          ? `, ${item.field}`
                          : ""}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {item.institution}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm text-muted-foreground">
                      {item.startDate}
                      {" – "}
                      {item.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}

        {skills.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Skills
            </h2>

            <p className="mt-2 text-sm leading-6">
              {skills.join(" • ")}
            </p>
          </section>
        )}

        {/* Projects */}

        {projects.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              Projects
            </h2>

            <div className="mt-3 space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold">
                    {project.name || "Project"}
                  </h3>

                  {project.description && (
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6">
                      {project.description}
                    </p>
                  )}

                  {project.technologies.length > 0 && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.technologies.join(" • ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}