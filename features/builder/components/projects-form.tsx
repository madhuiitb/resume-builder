"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addProject,
  updateProject,
  removeProject,
} from "@/store/slices/builder-slice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Plus, Trash2 } from "lucide-react";

export function ProjectsForm() {
  const dispatch = useAppDispatch();

  const projects = useAppSelector(
    (state) => state.builder.resume.projects,
  );

  const handleAdd = () => {
    dispatch(
      addProject({
        id: crypto.randomUUID(),
        name: "",
        description: "",
        technologies: [],
        url: "",
      }),
    );
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Projects</h2>

        <p className="text-sm text-muted-foreground">
          Highlight relevant projects and technical work.
        </p>
      </div>

      {projects.map((project, index) => (
        <div
          key={project.id}
          className="space-y-4 rounded-lg border border-border/60 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Project {index + 1}
            </h3>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                dispatch(removeProject(project.id))
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Project Name</Label>

            <Input
              value={project.name}
              onChange={(e) =>
                dispatch(
                  updateProject({
                    id: project.id,
                    data: {
                      name: e.target.value,
                    },
                  }),
                )
              }
              placeholder="AI Resume Analyzer"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              value={project.description}
              onChange={(e) =>
                dispatch(
                  updateProject({
                    id: project.id,
                    data: {
                      description: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Describe the project, your contribution, and impact..."
              className="min-h-28"
            />
          </div>

          <div className="space-y-2">
            <Label>Technologies</Label>

            <Input
              value={project.technologies.join(", ")}
              onChange={(e) =>
                dispatch(
                  updateProject({
                    id: project.id,
                    data: {
                      technologies: e.target.value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    },
                  }),
                )
              }
              placeholder="React, TypeScript, Next.js"
            />
          </div>

          <div className="space-y-2">
            <Label>Project URL</Label>

            <Input
              value={project.url}
              onChange={(e) =>
                dispatch(
                  updateProject({
                    id: project.id,
                    data: {
                      url: e.target.value,
                    },
                  }),
                )
              }
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="w-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </section>
  );
}