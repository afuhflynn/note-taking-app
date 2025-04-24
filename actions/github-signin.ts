// app/actions/githubSignInAction.js
"use server";

import { signIn } from "@/lib/auth"; // This module should include your server-side logic (e.g., using Prisma)

// Example server action for GitHub sign-in
export async function githubSignInAction() {
  await signIn("github", { redirectTo: "/notes", redirect: false });
}
