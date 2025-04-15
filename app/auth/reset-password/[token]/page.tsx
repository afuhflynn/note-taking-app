"use client";

import { useState } from "react";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Reset Your Password"
        description="Choose a new password to secure your account."
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              New Password
            </label>
            <AuthInput
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              name="password"
              isPassword
            />
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
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm New Password
            </label>
            <AuthInput
              value={formData.confirmPassword}
              onChange={handleInputChange}
              type="password"
              name="confirmPassword"
              isPassword
            />
          </div>
          <AuthButton title="Reset Password" type="submit" />
        </form>
      </AuthWrapper>
    </div>
  );
}
