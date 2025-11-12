import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AuthButton } from "@/components/auth/button";
import Link from "next/link";

export default function EmailNotVerifiedPage() {
  return (
    <div className="auth-container">
      <AuthWrapper
        title="Email Not Verified"
        description="Email verification failed the verification link may have expired. Click the button below to enter your email and receive a new link."
      >
        <Link href="/resend-verification-email" prefetch>
          <AuthButton title="Proceed" />
        </Link>
      </AuthWrapper>
    </div>
  );
}
