import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { AuthHeading } from "@/components/AuthHeading";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your account",
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams.token;

  return (
    <>
      <AuthHeading title="Reset password" subtitle="Enter your new password" />
      <div className="mt-6">
        <ResetPasswordForm token={token} />
      </div>
    </>
  );
}
