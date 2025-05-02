"use client";
import { NotesLogo } from "@/components/ui/logo";
import { Footer } from "./footer";
import { GitHubButton } from "./github";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useUserStore } from "@/store/user.store";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  showAuthButton?: boolean;
  isSignUp?: boolean;
  isSignIn?: boolean;
}

export function AuthWrapper({
  children,
  title,
  description,
  showAuthButton,
  isSignIn,
  isSignUp,
}: AuthWrapperProps) {
  const { error, message } = useUserStore();
  return (
    <div className="w-full max-w-md md:p-8 p-4 md:py-10 py-5 bg-background rounded-lg shadow-sm border-border">
      <div className="flex flex-col items-center mb-6 gap-6 w-full">
        <NotesLogo className="dark:fill-white" />
        <div className="flex flex-col item-center gap-1 text-center w-full">
          <h1 className="text-2xl font-bold text-center">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      {children}

      {showAuthButton && (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center w-full">
              <hr className="w-full bg-input h-[0.8px] rounded-full" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                Or log in with
              </span>
            </div>
          </div>

          <div className="mt-4">
            <GitHubButton />
          </div>
        </div>
      )}
      {(isSignIn || isSignUp) && (
        <div className="flex flex-col items-center w-full mt-4">
          <hr className="w-full bg-input h-[0.8px] rounded-full" />
          {isSignIn && (
            <Footer comment="No account yet" sub="Sign Up" subUrl="sign-up" />
          )}
          {isSignUp && (
            <Footer
              comment="Already have an account"
              sub="Sign In"
              subUrl="sign-in"
            />
          )}
        </div>
      )}
      <FormError error={error} />
      <FormSuccess message={message} />
    </div>
  );
}
