"use client";

import Link from "next/link";
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
import { signInSchema } from "@/zod/zod.schema";
import { z } from "zod";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

type SignInData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const { loading, setLoading } = useUserStore();
  const router = useRouter();
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInData) => {
    setLoading(true);
    try {
      // Handle form submission
      const { error } = await signIn.email(values);
      if (error) {
        return toast.error(error.message);
      }

      toast.success("Sign In successful");
      router.push("/notes");
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Redirect the users to previous route after login if the route is not home page or any auth page.

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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium" htmlFor="password">
                  Password
                </FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs underline"
                  prefetch
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
        <AuthButton title="Sign In" type="submit" isLoading={loading} />
      </form>
    </Form>
  );
};
