"use client";

import { useState } from "react";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";

export default function ResendVerificationEmailPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Did't receive a verification email"
        description="Enter your email below to receive another email."
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
          <AuthButton title="Resend Email" type="submit" />
        </form>
      </AuthWrapper>
    </div>
  );
}
