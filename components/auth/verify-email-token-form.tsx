"use client";

import { AuthButton } from "./button";
import { useParams } from "next/navigation";

export const VerifyEmailTokenForm = () => {
  const { token } = useParams();
  console.log(token);
  return (
    <form className="space-y-4">
      <AuthButton title="Verify Email" type="submit" />
    </form>
  );
};
