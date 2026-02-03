import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      message: "An email address is required.",
    })
    .min(4, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, {
      message: "Email must be at most 30 characters.",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z
    .string({
      message: "A password is required.",
    })
    .min(1, {
      message: "Password must be at least 1 character.",
    }),
});

export const signUpSchema = z.object({
  email: z
    .string({
      message: "An email address is required.",
    })
    .min(4, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, {
      message: "Email must be at most 30 characters.",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z
    .string({
      message: "A password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(20, {
      message: "Password must be at most 20 characters.",
    }),
  name: z
    .string({
      message: "Please enter a name to proceed.",
    })
    .min(1, {
      message: "A valid name must contain atleast 1 character.",
    })
    .max(30, {
      message: "A valid name must not be more than 30 characters.",
    }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      message: "An email address is required.",
    })
    .min(4, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, {
      message: "Email must be at most 30 characters.",
    })
    .email({
      message: "Please enter a valid email",
    }),
});

export const resendVerificationEmailSchema = z.object({
  email: z
    .string({
      message: "An email address is required.",
    })
    .min(4, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, {
      message: "Email must be at most 30 characters.",
    })
    .email({
      message: "Please enter a valid email",
    }),
});

export const verifyEmailSchema = z.object({
  code: z
    .string({
      message: "A verification code must be provided.",
    })
    .min(1, {
      message: "Code must be at least 1 characters.",
    })
    .max(6, {
      message: "Code must be at most 6 characters.",
    }),
});

export const verifyEmailWithTokenSchema = z.object({
  token: z.string({
    message: "A verification token must be provided.",
  }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        message: "A password must be provided.",
      })
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string({
      message: "Please fill all empty fields.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const emailVerificationSchema = z.object({
  code: z
    .string({
      message: "A code must be provided",
    })
    .min(1, {
      message: "A valid code must be at least 1 character",
    })
    .max(6, {
      message: "A valid code must be at most 6 characters",
    }),
});

export const emailVerificationSchemaToken = z.object({
  token: z
    .string({
      message: "A token must be provided",
    })
    .min(1, {
      message: "A valid token must be at least 1 character",
    })
    .max(6, {
      message: "A valid token must be at most 6 characters",
    }),
});

export const signOutSchema = z.object({
  id: z
    .string({
      message: "An id must be provided",
    })
    .min(1, {
      message: "A valid email must be at least 1 character",
    }),
});

export const resetPasswordSchemaServer = z.object({
  password: z
    .string({
      message: "A password must be provided",
    })
    .min(8, {
      message: "A valid email must be at least 8 characters",
    })
    .max(20, {
      message: "A valid email must be at most 20 characters",
    }),
  token: z
    .string({
      message: "An token must be provided",
    })
    .min(1, {
      message: "A valid token must be at least 1 character",
    }),
});

export const forgotPasswordSchemaServer = z.object({
  email: z
    .string({
      message: "An email must be provided",
    })
    .email({
      message: "Please provide a valid email",
    })
    .min(4, {
      message: "A valid email must be at least 4 characters",
    })
    .max(30, {
      message: "A valid email must be at most 30 characters",
    }),
});

export const deleteAccountSchemaServer = z.object({
  email: z
    .string({
      message: "An email must be provided",
    })
    .email({
      message: "Please provide a valid email",
    })
    .min(4, {
      message: "A valid email must be at least 4 characters",
    })
    .max(30, {
      message: "A valid email must be at most 30 characters",
    }),
  id: z
    .string({
      message: "An id must be provided",
    })
    .min(1, {
      message: "A valid email must be at least 1 character",
    }),
});

export const creatNoteSchema = z.object({
  title: z
    .string({
      message: "At least a note title must be provided to create a note.",
    })
    .min(4, {
      message: "A valid note title must be at least 4 characters.",
    })
    .max(200, {
      message: "A valid note title must be a maximum of 200 characters",
    }),
  tags: z
    .string()
    .max(400, {
      message: "A valid note tags must not be more than 400 characters",
    })
    .min(1, {
      message: "A valid note tags must be at least 1 character.",
    })
    .optional(),
  content: z.any().optional(),
  size: z.number().optional(),
});

export const updateNoteSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "A valid note title must be at least 4 characters.",
    })
    .max(200, {
      message: "A valid note title must be a maximum of 200 characters",
    })
    .optional(),
  tags: z
    .string()
    .max(400, {
      message: "A valid note tags must not be more than 400 characters",
    })
    .optional(),
  content: z.any().optional(),
  size: z.number().optional(),
});
