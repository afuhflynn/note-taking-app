import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      message: "An email address is required.",
    })
    .min(4, {
      message: "Email must contain at least 2 characters.",
    })
    .max(30, {
      message: "Email must contain at most 30 characters.",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z.string({
    message: "A password is required.",
  }),
});
export const signUpSchema = z.object({
  email: z
    .string({
      message: "An email address is required.",
    })
    .min(4, {
      message: "Email must contain at least 2 characters.",
    })
    .max(30, {
      message: "Email must contain at most 30 characters.",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z
    .string({
      message: "A password is required.",
    })
    .min(8, {
      message: "Password must contain at least 8 characters.",
    })
    .max(20, {
      message: "Password must contain at most 20 characters.",
    }),
});
