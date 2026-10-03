"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { fromBulletLines, toBulletLines } from "../lib/bullets";
import { AiBulletPopover } from "./ai-bullet-popover";

interface BulletListEditorProps {
  /** One bullet per line. */
  value: string;
  onChange: (value: string) => void;
  jobTitle?: string;
}

export function BulletListEditor({
  value,
  onChange,
  jobTitle,
}: BulletListEditorProps) {
  const lines = toBulletLines(value);

  const updateLine = (index: number, text: string) => {
    onChange(fromBulletLines(lines.map((l, i) => (i === index ? text : l))));
  };

  const removeLine = (index: number) => {
    const next = lines.filter((_, i) => i !== index);
    onChange(fromBulletLines(next.length > 0 ? next : [""]));
  };

  const addLine = () => onChange(fromBulletLines([...lines, ""]));

  return (
    <div className="space-y-3">
      {lines.map((line, index) => (
        <div key={index} className="space-y-1.5">
          <Textarea
            value={line}
            rows={2}
            aria-label={`Bullet ${index + 1}`}
            placeholder="Describe an achievement, e.g. Led migration of..."
            className="min-h-16"
            onChange={(e) => updateLine(index, e.target.value)}
            onKeyDown={(e) => {
              // One bullet per row: keep newlines out of a single bullet.
              if (e.key === "Enter") e.preventDefault();
            }}
          />

          <div className="flex items-center justify-end gap-1">
            <AiBulletPopover
              currentText={line}
              jobTitle={jobTitle}
              onApplySuggestion={(text) => updateLine(index, text)}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove bullet ${index + 1}`}
              onClick={() => removeLine(index)}
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addLine}
        className="w-full"
      >
        <Plus />
        Add bullet
      </Button>
    </div>
  );
}