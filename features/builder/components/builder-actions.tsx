"use client";

import { useEffect } from "react";
import { Save, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  loadBuilder,
  markSaved,
} from "@/store/slices/builder-slice";

const STORAGE_KEY = "resume-ai-builder";

export function BuilderActions() {
  const dispatch = useAppDispatch();

  const resume = useAppSelector(
    (state) => state.builder.resume,
  );

  const selectedTemplate = useAppSelector(
    (state) => state.builder.selectedTemplates,
  );

  const isDirty = useAppSelector(
    (state) => state.builder.isDirty,
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      dispatch(
        loadBuilder({
          resume: parsed.resume,
          selectedTemplate: parsed.selectedTemplate,
        }),
      );
    } catch {
      console.error("Unable to load saved resume.");
    }
  }, [dispatch]);

  const handleSave = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        resume,
        selectedTemplate,
      }),
    );

    dispatch(markSaved());
  };

  return (
    <Button
      onClick={handleSave}
      disabled={!isDirty}
      variant={isDirty ? "default" : "outline"}
    >
      {isDirty ? (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save
        </>
      ) : (
        <>
          <Check className="mr-2 h-4 w-4" />
          Saved
        </>
      )}
    </Button>
  );
}