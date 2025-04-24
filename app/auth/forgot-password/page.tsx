"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import { forgotPasswordSchema } from "@/zod/zod.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ForgotPasswordPage() {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: any) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Forgotten your password?"
        description="Enter your email below and we'll send a link to reset it."
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AuthButton title="Send Reset Link" type="submit" />
          </form>
        </Form>
      </AuthWrapper>
    </div>
  );
}
