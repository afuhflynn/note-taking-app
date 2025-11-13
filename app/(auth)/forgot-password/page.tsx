import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Forgotten your password?"
        description="Enter your email below and we'll send a link to reset it."
      >
        <ForgotPasswordForm />
      </AuthWrapper>
    </div>
  );
}
