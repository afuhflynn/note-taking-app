"use client";

import { useEffect, useState, useRef } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ChevronRight, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AISuggestionWidgetProps {
  editor: Editor | null;
  suggestion: string;
  isLoading: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export function AISuggestionWidget({
  editor,
  suggestion,
  isLoading,
  onAccept,
  onReject,
}: AISuggestionWidgetProps) {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Calculate position based on cursor location
  useEffect(() => {
    if (!editor || (!suggestion && !isLoading)) {
      setPosition(null);
      return;
    }

    const { from } = editor.state.selection;
    const coords = editor.view.coordsAtPos(from);

    if (coords) {
      setPosition({
        top: coords.top + 30,
        left: coords.left,
      });
    }
  }, [editor, suggestion, isLoading]);

  if (!suggestion && !isLoading) {
    return null;
  }

  return (
    <div
      ref={widgetRef}
      className={cn(
        "fixed z-50 rounded-lg border border-border bg-background shadow-lg p-3 max-w-sm",
        "animate-in fade-in slide-in-from-top-2 duration-200"
      )}
      style={
        position
          ? {
              top: `${position.top}px`,
              left: `${position.left}px`,
            }
          : undefined
      }
    >
      {isLoading ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>AI generating suggestion...</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary/60 animate-pulse rounded-full" />
          </div>
        </div>
      ) : suggestion ? (
        <>
          <p className="text-sm text-foreground mb-3 leading-relaxed">
            <span className="text-muted-foreground">Suggestion: </span>
            {suggestion}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={onAccept}
              size="sm"
              className="flex-1 gap-1 text-xs h-7"
              variant="default"
            >
              <ChevronRight className="h-3 w-3" />
              Accept (Tab)
            </Button>
            <Button
              onClick={onReject}
              size="sm"
              className="flex-1 gap-1 text-xs h-7"
              variant="outline"
            >
              <X className="h-3 w-3" />
              Reject (Esc)
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
