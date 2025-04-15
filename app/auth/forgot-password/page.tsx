"use client";

import { useState } from "react";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Forgotten your password?"
        description="Enter your email below and we'll send a link to reset it."
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
          <AuthButton title="Send Reset Link" type="submit" />
        </form>
      </AuthWrapper>
    </div>
  );
}
