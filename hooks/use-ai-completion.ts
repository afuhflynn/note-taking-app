import { useCompletion } from "@ai-sdk/react";
import { useCallback } from "react";
import { useOnlineStatus } from "./use-online-status";
import { toast } from "sonner";

export interface UseAICompletionOptions {
  onSuccess?: (completion: string) => void;
  onError?: (error: Error) => void;
}

export function useAICompletion(options: UseAICompletionOptions = {}) {
  const { onSuccess, onError } = options;
  const isOnline = useOnlineStatus();

  const { completion, complete, isLoading, error, stop, setCompletion } =
    useCompletion({
      api: "/api/completion",
      onFinish: (prompt, completion) => {
        if (onSuccess) {
          onSuccess(completion);
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
    });

  const generateCompletion = useCallback(
    async (prompt: string, context: string = "") => {
      // Check if online before attempting AI completion
      if (!isOnline) {
        toast.error("AI completion requires internet connection");
        return;
      }

      try {
        await complete(prompt, {
          body: {
            context,
          },
        });
      } catch (err) {
        console.error("AI completion error:", err);
        toast.error("AI completion failed. Please try again.");
      }
    },
    [complete, isOnline]
  );

  const clearCompletion = useCallback(() => {
    setCompletion("");
  }, [setCompletion]);

  return {
    completion,
    generateCompletion,
    isLoading,
    error,
    stop,
    clearCompletion,
    isOnline,
  };
}
