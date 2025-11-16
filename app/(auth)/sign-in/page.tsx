import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Welcome to Note"
        description="Please log in to continue"
        showAuthButton
        isSignIn
      >
        <SignInForm />
      </AuthWrapper>
    </div>
  );
}
