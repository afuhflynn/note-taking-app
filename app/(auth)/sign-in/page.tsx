"use client";

import Link from "next/link";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/zod/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { credentialsSignInAction } from "@/actions/credentials-signin";

type SignInData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInData) => {
    // Handle form submission
    await credentialsSignInAction(values);
    console.log(values);
  };

  // TODO: Redirect the users to previous route after login if the route is not home page or any auth page.

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Welcome to Note"
        description="Please log in to continue"
        showAuthButton
        isSignIn
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel
                      className="text-sm font-medium"
                      htmlFor="password"
                    >
                      Password
                    </FormLabel>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs underline"
                    >
                      Forgot
                    </Link>
                  </div>

                  <FormControl>
                    <AuthInput
                      className={`${
                        form.formState.errors.password
                          ? "border-destructive"
                          : "border-input"
                      }`}
                      type="password"
                      isPassword
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Repeat FormField for email, password, and confirmPassword */}
            <AuthButton title="Sign In" type="submit" />
          </form>
        </Form>
      </AuthWrapper>
    </div>
  );
}
