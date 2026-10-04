"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, Check, Loader2, RefreshCw, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useEnhanceBulletMutation } from "@/store/api/ai-api";
import { getApiErrorMessage } from "@/store/api/errors";

import type { BulletSuggestion } from "../types/ai";

type Status = "idle" | "loading" | "success" | "error";

const FOCUS_LABELS: Record<BulletSuggestion["focus"], string> = {
  impact: "Impact",
  brevity: "Brevity",
  keywords: "Keywords",
  "action-oriented": "Action-oriented",
};

interface AiBulletPopoverProps {
  currentText: string;
  jobTitle?: string;
  targetKeywords?: string[];
  onApplySuggestion: (newText: string) => void;
}

export function AiBulletPopover({
  currentText,
  jobTitle,
  targetKeywords,
  onApplySuggestion,
}: AiBulletPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [suggestions, setSuggestions] = useState<BulletSuggestion[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Which bullet text the current suggestions were generated for.
  const fetchedForRef = useRef<string | null>(null);
  const [enhanceBullet] = useEnhanceBulletMutation();
  const requestRef = useRef<ReturnType<typeof enhanceBullet> | null>(null);

  const hasText = currentText.trim().length > 0;

  const fetchSuggestions = useCallback(async () => {
    requestRef.current?.abort();

    const request = enhanceBullet({
      bulletText: currentText,
      jobTitle,
      targetKeywords,
    });
    requestRef.current = request;

    setStatus("loading");

    try {
      const { suggestions: result } = await request.unwrap();

      // Ignore results from a request that was aborted or replaced.
      if (requestRef.current !== request) return;

      fetchedForRef.current = currentText;
      setSuggestions(result);
      setSelectedId(result[0]?.id ?? null);
      setStatus("success");
    } catch (error) {
      if (requestRef.current !== request) return;
      setErrorMessage(getApiErrorMessage(error));
      setStatus("error");
    }
  }, [enhanceBullet, currentText, jobTitle, targetKeywords]);

  // Cancel any in-flight request on unmount.
  useEffect(() => () => requestRef.current?.abort(), []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      requestRef.current?.abort();
      requestRef.current = null;
      if (status === "loading") setStatus("idle");
      return;
    }

    // Re-fetch only if we have nothing yet or the bullet changed since last time.
    if (fetchedForRef.current !== currentText) {
      void fetchSuggestions();
    }
  };

  const handleApply = () => {
    const selected = suggestions.find((s) => s.id === selectedId);
    if (!selected) return;

    onApplySuggestion(selected.enhancedText);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        disabled={!hasText}
        render={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label="Enhance this bullet with AI"
            title={hasText ? "Enhance with AI" : "Write something first"}
          />
        }
      >
        <Sparkles className="text-primary" />
        Enhance
      </PopoverTrigger>

      <PopoverContent className="w-96">
        <div className="space-y-3">
          <div>
            <PopoverTitle>AI suggestions</PopoverTitle>
            <PopoverDescription>
              Pick a rewrite, then apply it to this bullet.
            </PopoverDescription>
          </div>

          {status === "loading" && (
            <div
              role="status"
              className="flex items-center gap-2 py-6 text-sm text-muted-foreground"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Rewriting your bullet…
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div className="space-y-2">
                <p>{errorMessage}</p>
                <Button
                  type="button"
                  size="xs"
                  variant="outline"
                  onClick={() => void fetchSuggestions()}
                >
                  Try again
                </Button>
              </div>
            </div>
          )}

          {status === "success" && (
            <>
              <ul className="space-y-2" role="radiogroup" aria-label="Suggestions">
                {suggestions.map((suggestion) => {
                  const isSelected = suggestion.id === selectedId;

                  return (
                    <li key={suggestion.id}>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedId(suggestion.id)}
                        className={cn(
                          "w-full rounded-md border p-3 text-left text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/60",
                        )}
                      >
                        <span className="mb-1.5 flex items-center justify-between">
                          <Badge variant="secondary">
                            {FOCUS_LABELS[suggestion.focus]}
                          </Badge>
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </span>
                        <span className="block leading-6">
                          {suggestion.enhancedText}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between pt-1">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => void fetchSuggestions()}
                >
                  <RefreshCw />
                  Regenerate
                </Button>

                <Button
                  type="button"
                  size="sm"
                  onClick={handleApply}
                  disabled={!selectedId}
                >
                  Apply
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}