"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateSummary } from "@/store/slices/builder-slice";

export function SummaryForm() {
  const dispatch = useAppDispatch();

  const summary = useAppSelector(
    (state) => state.builder.resume.summary,
  );

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Professional Summary
        </h2>

        <p className="text-sm text-muted-foreground">
          Write a concise summary of your professional experience.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>

        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => dispatch(updateSummary(e.target.value))}
          placeholder="Experienced software engineer with..."
          className="min-h-32"
        />
      </div>
    </section>
  );
}