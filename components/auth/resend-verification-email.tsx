"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { AuthInput } from "./input";
import { AuthButton } from "./button";
import { zodResolver } from "@hookform/resolvers/zod";
import { resendVerificationEmailSchema } from "@/zod/zod.schema";
import { z } from "zod";

export const ResendVerificationEmail = () => {
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
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <AuthButton title="Resend Email" type="submit" />
      </form>
    </Form>
  );
};
