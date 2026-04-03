import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { AuthHeading } from "@/components/AuthHeading";
import { getMessages, LOCALE_COOKIE, resolveLocale } from "@/lib/i18n";
import { translate } from "@/lib/i18n/translate";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);
  return {
    title: t("authPages.forgotPassword.metaTitle"),
    description: t("authPages.forgotPassword.metaDescription"),
  };
}

export default async function ForgotPasswordPage() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);

  return (
    <>
      <AuthHeading
        title={t("authPages.forgotPassword.headingTitle")}
        subtitle={t("authPages.forgotPassword.headingSubtitle")}
      />
      <div className="mt-6">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
