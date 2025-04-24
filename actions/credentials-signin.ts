"use server";

import { signIn } from "@/lib/auth"; // This module should include your server-side logic (e.g., using Prisma)
import { signInSchema } from "@/zod/zod.schema";
import { z } from "zod";

type SignInData = z.infer<typeof signInSchema>;
// Example server action for Credentials sign-in
export async function credentialsSignInAction(formData: SignInData) {
  const result = signInSchema.safeParse(formData);

  if (!result.success) {
    // Handle validation errors
    return { error: result.error.format() };
  }
  await signIn("credentials", {
    email: result.data.email,
    password: result.data.password,
  });
}
