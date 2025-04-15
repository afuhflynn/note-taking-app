"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
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
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <AuthInput
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              name="email"
              placeholder="email@example.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-xs underline">
                Forgot
              </Link>
            </div>
            <AuthInput
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              name="password"
              isPassword
            />
          </div>
          <AuthButton title="Sign In" type="submit" />
        </form>
      </AuthWrapper>
    </div>
  );
}
