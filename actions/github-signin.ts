"use server";

import { auth } from "@/lib/auth";

// Example server action for GitHub sign-in
export async function githubSignInAction() {
  return await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: "/notes",
      errorCallbackURL: "/sign-in",
    },
  });
}
