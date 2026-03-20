"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/contexts/LocaleProvider";
import { authService } from "@/services/auth.service";

const generateDeviceId = (): string => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

export function LoginForm() {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [deviceId] = useState(() => generateDeviceId());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const result = await authService.login({ email, password, deviceId });
      if (result.accessToken) {
        authService.setTokens(result.accessToken, result.refreshToken, result.expiresAt);
      }
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("auth.email")}
        required
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring-2"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("auth.password")}
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-16 text-sm outline-none ring-blue-500 focus:ring-2"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          {showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
        </button>
      </div>
      <input
        type="hidden"
        name="deviceId"
        value={deviceId}
        readOnly
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t("auth.signInSubmitting") : t("auth.signIn")}
      </button>

      <div className="flex items-center justify-between pt-1 text-sm">
        <Link href="/auth/forgot-password" className="text-slate-600 hover:text-slate-900">
          {t("auth.forgotPassword")}
        </Link>
        <Link href="/auth/register" className="text-slate-600 hover:text-slate-900">
          {t("auth.createAccount")}
        </Link>
      </div>
    </form>
  );
}
