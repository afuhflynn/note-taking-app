"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Share2, Copy, Check, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface ShareNoteDialogProps {
  noteId: string;
}

export function ShareNoteDialog({ noteId }: ShareNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch existing shares
  const { data: sharesData } = useQuery({
    queryKey: ["shares", noteId],
    queryFn: async () => {
      const res = await fetch(`/api/share?noteId=${noteId}`);
      if (!res.ok) throw new Error("Failed to fetch shares");
      return res.json();
    },
    enabled: open,
  });

  // Create share link
  const createShare = useMutation({
    mutationFn: async (data: { permission: string; expiresIn?: string }) => {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, ...data }),
      });
      if (!res.ok) throw new Error("Failed to create share link");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shares", noteId] });
      toast.success("Share link created!");
    },
    onError: () => {
      toast.error("Failed to create share link");
    },
  });

  // Delete share link
  const deleteShare = useMutation({
    mutationFn: async (shareToken: string) => {
      const res = await fetch(`/api/share?shareToken=${shareToken}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete share link");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shares", noteId] });
      toast.success("Share link deleted");
    },
    onError: () => {
      toast.error("Failed to delete share link");
    },
  });

  const copyToClipboard = async (url: string, token: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleCreateShare = (permission: string) => {
    createShare.mutate({ permission });
  };

  const shares = sharesData?.shares || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Note</DialogTitle>
          <DialogDescription>
            Create a shareable link for this note
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Create New Share */}
          <div className="space-y-3">
            <Label>Create New Share Link</Label>
            <div className="flex gap-2">
              <Button
                onClick={() => handleCreateShare("VIEW")}
                disabled={createShare.isPending}
                variant="outline"
                className="flex-1"
              >
                View Only
              </Button>
              <Button
                onClick={() => handleCreateShare("EDIT")}
                disabled={createShare.isPending}
                variant="outline"
                className="flex-1"
              >
                Can Edit
              </Button>
            </div>
          </div>

          {/* Existing Shares */}
          {shares.length > 0 && (
            <div className="space-y-3">
              <Label>Active Share Links</Label>
              <div className="space-y-2">
                {shares.map((share: any) => (
                  <div
                    key={share.id}
                    className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {share.permission}
                        </span>
                        {share.collaboratorCount > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {share.collaboratorCount} active
                          </span>
                        )}
                      </div>
                      <Input
                        value={share.shareUrl}
                        readOnly
                        className="text-xs h-8"
                      />
                      {share.expiresAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Expires:{" "}
                          {new Date(share.expiresAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(share.shareUrl, share.shareToken)
                        }
                      >
                        {copiedToken === share.shareToken ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(share.shareUrl, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteShare.mutate(share.shareToken)}
                        disabled={deleteShare.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {shares.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No active share links. Create one to get started.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
