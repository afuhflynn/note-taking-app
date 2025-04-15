"use client";

import { useState } from "react";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import Image from "next/image";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Create Your Account"
        description="Sign up to start organizing your notes and boost your productivity"
        showAuthButton
        isSignUp
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
            <label htmlFor="password" className="text-sm font-medium">
              Password
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
          <AuthButton title="Sign Up" type="submit" />
        </form>
      </AuthWrapper>
    </div>
  );
}
