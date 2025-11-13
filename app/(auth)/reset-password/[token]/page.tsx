import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Reset Your Password"
        description="Choose a new password to secure your account."
      >
        <ResetPasswordForm />
      </AuthWrapper>
    </div>
  );
}
