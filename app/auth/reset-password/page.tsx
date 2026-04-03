import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { AuthHeading } from "@/components/AuthHeading";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);
  return {
    title: t("authPages.resetPassword.metaTitle"),
    description: t("authPages.resetPassword.metaDescription"),
  };
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const resolvedSearchParams = await searchParams;
  const token = resolvedSearchParams.token;

  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);

  return (
    <>
      <AuthHeading
        title={t("authPages.resetPassword.headingTitle")}
        subtitle={t("authPages.resetPassword.headingSubtitle")}
      />
      <div className="mt-6">
        <ResetPasswordForm token={token} />
      </div>
    </>
  );
}
