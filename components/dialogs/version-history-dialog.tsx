"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, RotateCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useAppStore } from "@/store/app.store";

interface NoteVersion {
  id: string;
  versionNumber: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
    image?: string;
  };
  contentSnapshot: string;
}

interface VersionHistoryDialogProps {
  noteId: string;
}

export function VersionHistoryDialog({ noteId }: VersionHistoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<NoteVersion | null>(
    null
  );
  const queryClient = useQueryClient();
  const { currentNote } = useAppStore();

  // Listen for keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modKey = isMac ? e.metaKey : e.ctrlKey;

      if (modKey && e.shiftKey && e.key === "H") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch version history
  const { data: versionsData, isLoading } = useQuery({
    queryKey: ["noteHistory", noteId],
    queryFn: async () => {
      const res = await fetch(`/api/notes/${noteId}/history`);
      if (!res.ok) throw new Error("Failed to fetch version history");
      return res.json();
    },
    enabled: open,
    staleTime: 0, // Always refetch when dialog opens
  });

  // Restore version mutation
  const restoreVersion = useMutation({
    mutationFn: async (versionNumber: number) => {
      const res = await fetch(`/api/notes/${noteId}/restore`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionNumber }),
      });
      if (!res.ok) throw new Error("Failed to restore version");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["noteHistory", noteId] });
      toast.success("Version restored successfully!");
      setSelectedVersion(null);
    },
    onError: (error) => {
      toast.error(`Failed to restore version: ${error.message}`);
    },
  });

  const versions = versionsData?.versions || [];

  const handleRestoreVersion = (version: NoteVersion) => {
    restoreVersion.mutate(version.versionNumber);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">History</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Version History
          </DialogTitle>
          <DialogDescription>
            View and restore previous versions of this note
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : versions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No version history available yet.
            </div>
          ) : (
            <>
              {/* Versions List */}
              <div className="space-y-2 border rounded-lg overflow-hidden">
                {versions.map((version: NoteVersion, index: number) => (
                  <button
                    key={version.id}
                    onClick={() => setSelectedVersion(version)}
                    className={`w-full text-left p-4 border-b last:border-b-0 transition-colors ${
                      selectedVersion?.id === version.id
                        ? "bg-primary/10 border-l-2 border-l-primary"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded bg-muted text-muted-foreground">
                            v{version.versionNumber}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(version.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {version.user.image && (
                            <img
                              src={version.user.image}
                              alt={version.user.name}
                              className="h-5 w-5 rounded-full"
                            />
                          )}
                          <div className="text-sm font-medium">
                            {version.user.name}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({version.user.email})
                          </span>
                        </div>
                      </div>
                      {index === 0 && (
                        <span className="text-xs font-medium px-2 py-1 rounded bg-green-500/10 text-green-700 dark:text-green-400">
                          Current
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Version Preview */}
              {selectedVersion && (
                <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">Version Preview</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        v{selectedVersion.versionNumber} -{" "}
                        {formatDistanceToNow(
                          new Date(selectedVersion.createdAt),
                          {
                            addSuffix: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="bg-background rounded p-3 max-h-[200px] overflow-y-auto border">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                        {typeof selectedVersion.contentSnapshot === "string"
                          ? selectedVersion.contentSnapshot
                          : JSON.stringify(
                              selectedVersion.contentSnapshot,
                              null,
                              2
                            )}
                      </p>
                    </div>
                  </div>

                  {/* Restore Button */}
                  <Button
                    onClick={() => handleRestoreVersion(selectedVersion)}
                    disabled={
                      restoreVersion.isPending ||
                      selectedVersion.versionNumber ===
                        (versions[0]?.versionNumber || 0)
                    }
                    className="w-full gap-2"
                    variant={
                      selectedVersion.versionNumber ===
                      (versions[0]?.versionNumber || 0)
                        ? "outline"
                        : "default"
                    }
                  >
                    {restoreVersion.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Restoring...
                      </>
                    ) : selectedVersion.versionNumber ===
                      (versions[0]?.versionNumber || 0) ? (
                      "This is the current version"
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4" />
                        Restore This Version
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
