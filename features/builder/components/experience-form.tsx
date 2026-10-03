"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addExperience,
  updateExperience,
  removeExperience,
} from "@/store/slices/builder-slice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus, Trash2 } from "lucide-react";
import { BulletListEditor } from "./bullet-list-editor";

export function ExperienceForm() {
  const dispatch = useAppDispatch();

  const experiences = useAppSelector(
    (state) => state.builder.resume.experience,
  );

  const handleAdd = () => {
    dispatch(
      addExperience({
        id: crypto.randomUUID(),
        company: "",
        role: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      }),
    );
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Experience</h2>

        <p className="text-sm text-muted-foreground">
          Add your professional experience.
        </p>
      </div>

      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          className="space-y-4 rounded-lg border border-border/60 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Experience {index + 1}
            </h3>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                dispatch(removeExperience(experience.id))
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Company</Label>

            <Input
              value={experience.company}
              onChange={(e) =>
                dispatch(
                  updateExperience({
                    id: experience.id,
                    data: {
                      company: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Google"
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>

            <Input
              value={experience.role}
              onChange={(e) =>
                dispatch(
                  updateExperience({
                    id: experience.id,
                    data: {
                      role: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Senior Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>

            <Input
              value={experience.location}
              onChange={(e) =>
                dispatch(
                  updateExperience({
                    id: experience.id,
                    data: {
                      location: e.target.value,
                    },
                  }),
                )
              }
              placeholder="Bengaluru, India"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>

              <Input
                type="month"
                value={experience.startDate}
                onChange={(e) =>
                  dispatch(
                    updateExperience({
                      id: experience.id,
                      data: {
                        startDate: e.target.value,
                      },
                    }),
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>

              <Input
                type="month"
                value={experience.endDate}
                disabled={experience.current}
                onChange={(e) =>
                  dispatch(
                    updateExperience({
                      id: experience.id,
                      data: {
                        endDate: e.target.value,
                      },
                    }),
                  )
                }
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={experience.current}
              onChange={(e) =>
                dispatch(
                  updateExperience({
                    id: experience.id,
                    data: {
                      current: e.target.checked,
                      endDate: e.target.checked
                        ? ""
                        : experience.endDate,
                    },
                  }),
                )
              }
            />

            I currently work here
          </label>

        <div className="space-y-2">
            <Label>Achievements</Label>

            <BulletListEditor
              value={experience.description}
              jobTitle={experience.role}
              onChange={(description) =>
                dispatch(
                  updateExperience({
                    id: experience.id,
                    data: { description },
                  }),
                )
              }
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
        Add Experience
      </Button>
    </section>
  );
}