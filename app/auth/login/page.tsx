import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";
import { AuthHeading } from "@/components/AuthHeading";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Go Blog account",
};

export default function LoginPage() {
  return (
    <>
      <AuthHeading
        title="Welcome back"
        subtitle="Sign in to continue"
      />
      <div className="mt-6">
        <LoginForm />
      </div>
    </>
  );
}
