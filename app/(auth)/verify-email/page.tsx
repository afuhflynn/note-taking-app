"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { verifyEmailSchema } from "@/zod/zod.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function VerifyEmail() {
  const form = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof verifyEmailSchema>) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Verify your email address"
        description="Enter the 6 digit verification code sent to your email below."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" htmlFor="code">
                    Verification Code
                  </FormLabel>
                  <FormControl>
                    <AuthInput
                      className={`${
                        form.formState.errors.code
                          ? "border-destructive"
                          : "border-input"
                      }`}
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AuthButton title="Verify Email" type="submit" />
            <div className="flex flex-row items-center gap-1 text-muted-foreground text-sm h-auto">
              <span>Did&apos;t receive the code?</span>
              <Link
                href="/auth/resend-verification-email"
                className="flex flex-row items-center gap-1 text-muted-foreground text-sm h-auto hover:underline hover:text-muted-foreground/90"
              >
                Resend Email
              </Link>
            </div>
          </form>
        </Form>
      </AuthWrapper>
    </div>
  );
}
