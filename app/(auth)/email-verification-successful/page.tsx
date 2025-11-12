import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthButton } from "@/components/auth/button";
import Link from "next/link";

export default function EmailVerifiedSuccessfullyPage() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Email Verified"
        description="Click the button below to continue to sign in."
      >
        <Link href="/sign-in" prefetch>
          <AuthButton title="Proceed to sign in" />
        </Link>
      </AuthWrapper>
    </div>
  );
}
