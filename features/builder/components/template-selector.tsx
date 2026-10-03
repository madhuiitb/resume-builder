"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTemplate } from "@/store/slices/builder-slice";

import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional resume",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean modern layout",
  },
];

export function TemplateSelector() {
  const dispatch = useAppDispatch();

  const selectedTemplate = useAppSelector(
    (state) => state.builder.selectedTemplates
  );

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        Template:
      </span>

      {templates.map((template) => (
        <Button
          key={template.id}
          size="sm"
          variant={
            selectedTemplate === template.id
              ? "default"
              : "outline"
          }
          onClick={() =>
            dispatch(setTemplate(template.id))
          }
        >
          {template.name}
        </Button>
      ))}
    </div>
  );
}