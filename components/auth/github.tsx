"use client"; // Ensure this is a client component

import { githubSignInAction } from "@/actions/github-signin";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

// Use a client-safe function from a client library (for example, next-auth/react)
import { FormEvent, useEffect } from "react";
import { redirect } from "next/navigation";
import { useUserStore } from "@/store/user.store";

export function GitHubButton() {
  const { setError, error, setMessage, message } = useUserStore();
  // Client-side handler that calls a client-safe signIn method
  const handleGitHubSignIn = async (event: FormEvent) => {
    try {
      event.preventDefault();
      await githubSignInAction();
      setMessage("Github Sign in successful");
    } catch (error: Error | any) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!error && message) {
      redirect("/notes");
    }
  }, [error, message, redirect]);

  return (
    <form onSubmit={handleGitHubSignIn} className="w-full h-auto">
      <Button
        variant="outline"
        type="submit"
        className="w-full border-input rounded-xl flex items-center gap-3 py-5 hover:bg-muted"
      >
        <Github className="w-auto h-auto dark:text-white" />
        GitHub
      </Button>
    </form>
  );
}
