"use client";

import { useState } from "react";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import Link from "next/link";

export default function VerifyEmail() {
  const [formData, setFormData] = useState({
    code: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Verify your email address"
        description="Enter the 4 digit verification code sent to your email below."
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Verification Code
            </label>
            <AuthInput
              value={formData.code}
              onChange={handleInputChange}
              type="number"
              name="code"
            />
          </div>
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
      </AuthWrapper>
    </div>
  );
}
