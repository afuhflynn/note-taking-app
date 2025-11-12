"use client"; // Ensure this is a client component

import { Button } from "../ui/button";
import { Github } from "lucide-react";

// Use a client-safe function from a client library (for example, next-auth/react)
import { FormEvent, useEffect } from "react";
import { redirect } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export function GitHubButton() {
  const { setError, setMessage, loading } = useUserStore();
  // Client-side handler that calls a client-safe signIn method
  const handleGitHubSignIn = async (event: FormEvent) => {
    const toastId = toast.loading("Redirecting to GitHub...");
    try {
      event.preventDefault();
      const { error, data } = await signIn.social({
        provider: "github",
        callbackURL: "/notes",
        errorCallbackURL: "/sign-in",
      });
      setMessage("Github Sign in initiated. Redirecting...");

      if (error) {
        setError(error.message);
      }

      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      console.error(error);
      setError(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <form onSubmit={handleGitHubSignIn} className="w-full h-auto">
      <Button
        variant="outline"
        type="submit"
        disabled={loading}
        className="w-full border-input rounded-xl flex items-center gap-3 py-5 hover:bg-muted"
      >
        <Github className="w-auto h-auto dark:text-white" />
        GitHub
      </Button>
    </form>
  );
}
