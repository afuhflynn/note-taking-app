"use server";

import { auth } from "@/lib/auth";
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
  return await auth.api.signInEmail({
    body: {
      email: result.data.email,
      password: result.data.password,
      callbackURL: "/notes",
    },
  });
}
