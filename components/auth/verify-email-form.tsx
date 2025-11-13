"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailSchema } from "@/zod/zod.schema";
import { AuthInput } from "./input";
import { AuthButton } from "./button";
import Link from "next/link";

export const VerifyEmailForm = () => {
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
            href="/resend-verification-email"
            className="flex flex-row items-center gap-1 text-muted-foreground text-sm h-auto hover:underline hover:text-muted-foreground/90"
            prefetch
          >
            Resend Email
          </Link>
        </div>
      </form>
    </Form>
  );
};
