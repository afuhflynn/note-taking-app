"use server";

import { auth } from "@/lib/auth";

// Example server action for GitHub sign-in
export async function githubSignInAction() {
  return await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/notes",
      errorCallbackURL: "/sign-in",
    },
  });
}
