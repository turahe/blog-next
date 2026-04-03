import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LoginForm } from "@/components/LoginForm";
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
    title: t("authPages.login.metaTitle"),
    description: t("authPages.login.metaDescription"),
  };
}

export default async function LoginPage() {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const messages = getMessages(locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(messages as unknown as Record<string, unknown>, key, vars);

  return (
    <>
      <AuthHeading
        title={t("authPages.login.headingTitle")}
        subtitle={t("authPages.login.headingSubtitle")}
      />
      <div className="mt-6">
        <LoginForm />
      </div>
    </>
  );
}
