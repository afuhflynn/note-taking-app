"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthButton } from "@/components/auth/button";
import { useParams } from "next/navigation";

export default function VerifyEmail() {
  const { token } = useParams();
  console.log(token);

  return (
    <div className="auth-container">
      <AuthWrapper
        title="Verify your email address"
        description="Click the 'Verify Email' button below to proceed."
      >
        <form className="space-y-4">
          <AuthButton title="Verify Email" type="submit" />
        </form>
      </AuthWrapper>
    </div>
  );
}
