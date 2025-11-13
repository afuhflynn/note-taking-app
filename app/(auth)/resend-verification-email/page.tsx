import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { ResendVerificationEmail } from "@/components/auth/resend-verification-email";

export default function ResendVerificationEmailPage() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Did't receive a verification email"
        description="Enter your email below to receive another email."
      >
        <ResendVerificationEmail />
      </AuthWrapper>
    </div>
  );
}
