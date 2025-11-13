"use client"; // Ensure this is a client component

import { Button } from "../ui/button";

// Use a client-safe function from a client library (for example, next-auth/react)
import { FormEvent, useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

export function GoogleButton() {
  const { setError, setMessage, loading } = useUserStore();
  // Client-side handler that calls a client-safe signIn method
  const handleGoogleSignIn = async (event: FormEvent) => {
    const toastId = toast.loading("Redirecting to Google...");
    try {
      event.preventDefault();
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/notes",
        errorCallbackURL: "/sign-in",
      });
      setMessage("Google Sign in initiated. Redirecting...");

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
    <form onSubmit={handleGoogleSignIn} className="w-full h-auto">
      <Button
        variant="outline"
        type="submit"
        disabled={loading}
        className="w-full border-input rounded-xl flex items-center gap-3 py-5 hover:bg-muted"
      >
        <Image
          src={"/icons/Google_Dark.svg"}
          alt="Google icon"
          width={24}
          height={24}
          className="hidden"
        />
        <Image
          src={"/icons/Google_Light.svg"}
          alt="Google icon"
          width={24}
          height={24}
          className="dark:hidden"
        />
        Google
      </Button>
    </form>
  );
}
