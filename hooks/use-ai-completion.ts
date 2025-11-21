import { useCompletion } from "ai/react";
import { useCallback } from "react";

export interface UseAICompletionOptions {
  onSuccess?: (completion: string) => void;
  onError?: (error: Error) => void;
}

export function useAICompletion(options: UseAICompletionOptions = {}) {
  const { onSuccess, onError } = options;

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
      try {
        await complete(prompt, {
          body: {
            context,
          },
        });
      } catch (err) {
        console.error("AI completion error:", err);
      }
    },
    [complete]
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
  };
}
