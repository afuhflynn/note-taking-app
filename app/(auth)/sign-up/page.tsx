import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Create Your Account"
        description="Sign up to start organizing your notes and boost your productivity"
        showAuthButton
        isSignUp
      >
        <SignUpForm />
      </AuthWrapper>
    </div>
  );
}
