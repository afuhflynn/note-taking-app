"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resendVerificationEmailSchema } from "@/zod/zod.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function ResendVerificationEmailPage() {
  const form = useForm({
    resolver: zodResolver(resendVerificationEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resendVerificationEmailSchema>) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Did't receive a verification email"
        description="Enter your email below to receive another email."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" htmlFor="email">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <AuthInput
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                      className={`${
                        form.formState.errors.email
                          ? "border-destructive"
                          : "border-input"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AuthButton title="Resend Email" type="submit" />
          </form>
        </Form>
      </AuthWrapper>
    </div>
  );
}
