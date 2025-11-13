import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthInput } from "@/components/auth/input";
import { AuthButton } from "@/components/auth/button";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/zod/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
