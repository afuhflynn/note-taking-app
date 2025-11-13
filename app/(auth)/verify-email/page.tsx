import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { VerifyEmailForm } from "@/components/auth/verify-email-form";

export default function VerifyEmail() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Verify your email address"
        description="Enter the 6 digit verification code sent to your email below."
      >
        <VerifyEmailForm />
      </AuthWrapper>
    </div>
  );
}
