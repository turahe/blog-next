import type { Metadata } from "next";
import { RegisterForm } from "@/components/RegisterForm";
import { AuthHeading } from "@/components/AuthHeading";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your Go Blog account",
};

export default function RegisterPage() {
  return (
    <>
      <AuthHeading
        title="Create account"
        subtitle="Join and start publishing"
      />
      <div className="mt-6">
        <RegisterForm />
      </div>
    </>
  );
}
