"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addEducation,
  updateEducation,
  removeEducation,
} from "@/store/slices/builder-slice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus, Trash2 } from "lucide-react";

export function EducationForm() {
  const dispatch = useAppDispatch();

  const education = useAppSelector(
    (state) => state.builder.resume.education,
  );

  const handleAdd = () => {
    dispatch(
      addEducation({
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
      }),
    );
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Education</h2>

        <p className="text-sm text-muted-foreground">
          Add your educational background.
        </p>
      </div>

      {education.map((item, index) => (
        <div
          key={item.id}
          className="space-y-4 rounded-lg border border-border/60 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              Education {index + 1}
            </h3>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                dispatch(removeEducation(item.id))
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Institution</Label>

            <Input
              value={item.institution}
              onChange={(e) =>
                dispatch(
                  updateEducation({
                    id: item.id,
                    data: {
                      institution: e.target.value,
                    },
                  }),
                )
              }
              placeholder="IIT Bombay"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Degree</Label>

              <Input
                value={item.degree}
                onChange={(e) =>
                  dispatch(
                    updateEducation({
                      id: item.id,
                      data: {
                        degree: e.target.value,
                      },
                    }),
                  )
                }
                placeholder="Master of Technology"
              />
            </div>

            <div className="space-y-2">
              <Label>Field of Study</Label>

              <Input
                value={item.field}
                onChange={(e) =>
                  dispatch(
                    updateEducation({
                      id: item.id,
                      data: {
                        field: e.target.value,
                      },
                    }),
                  )
                }
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>

              <Input
                type="month"
                value={item.startDate}
                onChange={(e) =>
                  dispatch(
                    updateEducation({
                      id: item.id,
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
                value={item.endDate}
                onChange={(e) =>
                  dispatch(
                    updateEducation({
                      id: item.id,
                      data: {
                        endDate: e.target.value,
                      },
                    }),
                  )
                }
              />
            </div>
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
        Add Education
      </Button>
    </section>
  );
}