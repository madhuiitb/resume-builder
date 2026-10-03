"use client";

import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateSkills } from "@/store/slices/builder-slice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { X } from "lucide-react";

export function SkillsForm() {
  const dispatch = useAppDispatch();

  const skills = useAppSelector(
    (state) => state.builder.resume.skills,
  );

  const [skill, setSkill] = useState("");

  const addSkill = () => {
    const value = skill.trim();

    if (!value) return;

    if (skills.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setSkill("");
      return;
    }

    dispatch(updateSkills([...skills, value]));
    setSkill("");
  };

  const removeSkill = (skillToRemove: string) => {
    dispatch(
      updateSkills(
        skills.filter((item) => item !== skillToRemove),
      ),
    );
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Skills</h2>

        <p className="text-sm text-muted-foreground">
          Add skills relevant to your target role.
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="React.js"
        />

        <Button type="button" onClick={addSkill}>
          Add
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="gap-1 px-3 py-1"
            >
              {item}

              <button
                type="button"
                onClick={() => removeSkill(item)}
                className="rounded-full outline-none hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}