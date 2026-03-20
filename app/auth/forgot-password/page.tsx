import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { AuthHeading } from "@/components/AuthHeading";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset link",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeading
        title="Forgot password?"
        subtitle="We will email you a reset link"
      />
      <div className="mt-6">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
