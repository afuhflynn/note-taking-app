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
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/zod/zod.schema";
import { z } from "zod";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { Info, InfoIcon } from "lucide-react";

export const SignUpForm = () => {
  const { setError, setMessage, loading, setLoading } = useUserStore();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setLoading(true);

    await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      fetchOptions: {
        onSuccess() {
          toast.success("Account created successfully.");
          // Send user a verification email
          // await signUpUser({ email: values.email }); // TODO: REMOVE THIS LATER FOR INTERNET USAGE

          // router.push("/verify-email"); // TODO: Ensure correct redirect
          router.push("/sign-in");
        },
        onError(context) {
          const error = context.error;
          if (error) {
            setError(error.message);
            toast.error(error.message);
          } else {
            setMessage(
              "Sign up successful! Please check your email to verify your account.",
            );
            toast.success(
              "Sign up successful! Please check your email to verify your account.",
            );
          }
        },
      },
    });

    setLoading(false);
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium" htmlFor="name">
                Name
              </FormLabel>
              <FormControl>
                <AuthInput
                  type="name"
                  placeholder="John Doe"
                  {...field}
                  className={`${
                    form.formState.errors.name
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
              <FormLabel htmlFor="password" className="text-sm font-medium">
                Password
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
              <div className="flex flex-row items-center gap-2 text-muted-foreground text-sm h-auto mt-2">
                <InfoIcon
                  className={`size-[20px] ${
                    form.formState.errors.password ? "fill-destructive" : ""
                  }`}
                />

                <span
                  className={`${
                    form.formState.errors.password ? "text-destructive" : ""
                  }`}
                >
                  At least 8 characters
                </span>
              </div>
            </FormItem>
          )}
        />
        {/* Repeat FormField for email, password, and confirmPassword */}
        <AuthButton isLoading={loading} title="Sign Up" type="submit" />
      </form>
    </Form>
  );
};
