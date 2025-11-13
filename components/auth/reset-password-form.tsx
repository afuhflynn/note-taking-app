"use client";

import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AuthInput } from "./input";
import { AuthButton } from "./button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/zod/zod.schema";
import { z } from "zod";

export const ResetPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    // Handle form submission
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password" className="text-sm font-medium">
                New Password
              </FormLabel>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className="text-sm font-medium"
                htmlFor="confirmPassword"
              >
                Confirm New Password
              </FormLabel>

              <FormControl>
                <AuthInput
                  className={`${
                    form.formState.errors.confirmPassword
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
        <AuthButton title="Reset Password" type="submit" />
      </form>
    </Form>
  );
};
