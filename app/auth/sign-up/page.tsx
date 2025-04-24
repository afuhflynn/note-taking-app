"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/zod/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpPage() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: any) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Create Your Account"
        description="Sign up to start organizing your notes and boost your productivity"
        showAuthButton
        isSignUp
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-sm font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <AuthInput type="password" isPassword {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="flex flex-row items-center gap-1 text-muted-foreground text-sm h-auto">
                    <Image
                      src="/icons/info circle.svg"
                      alt="Info icon"
                      width={24}
                      height={24}
                      className="w-auto h-auto dark:invert"
                    />{" "}
                    <span>At least 8 characters</span>
                  </div>
                </FormItem>
              )}
            />
            {/* Repeat FormField for email, password, and confirmPassword */}
            <AuthButton title="Sign Up" type="submit" />
          </form>
        </Form>
      </AuthWrapper>
    </div>
  );
}
