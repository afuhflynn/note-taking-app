"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Example server action for GitHub sign-in
export async function githubSignInAction() {
  return await auth.api.signOut({ headers: await headers() });
}
