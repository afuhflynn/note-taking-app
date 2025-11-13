import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { VerifyEmailTokenForm } from "@/components/auth/verify-email-token-form";

export default function VerifyEmail() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Verify your email address"
        description="Click the 'Verify Email' button below to proceed."
      >
        <VerifyEmailTokenForm />
      </AuthWrapper>
    </div>
  );
}
