import { api } from "@/lib/api";
import {
  clearAuthCookies,
  getAccessTokenFromCookie,
  notifyAuthChanged,
  setAuthCookies,
} from "@/lib/auth-cookies";
import {
  ApiEnvelope,
  AuthResponse,
  ForgotPasswordPayload,
  LoginData,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<ApiEnvelope<unknown>>("/auth/register", payload);
    return {
      message: response.data.message,
    };
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<ApiEnvelope<LoginData>>("/auth/login", payload);
    const loginData = response.data.data;
    return {
      message: response.data.message,
      twoFactorRequired: loginData.twoFactorRequired,
      accessToken: loginData.accessToken,
      refreshToken: loginData.refreshToken,
      expiresAt: loginData.expiresAt,
      sessionId: loginData.sessionId,
      user: loginData.user,
    };
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<AuthResponse> {
    const response = await api.post<ApiEnvelope<unknown>>("/auth/forgot-password", payload);
    return {
      message: response.data.message,
    };
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<AuthResponse> {
    const response = await api.post<ApiEnvelope<unknown>>("/auth/reset-password", payload);
    return {
      message: response.data.message,
    };
  },

  setTokens(accessToken: string, refreshToken?: string, expiresAt?: string) {
    if (typeof window !== "undefined") {
      setAuthCookies(accessToken, refreshToken, expiresAt);
      notifyAuthChanged();
    }
  },

  clearTokens() {
    if (typeof window !== "undefined") {
      clearAuthCookies();
      notifyAuthChanged();
    }
  },

  getAccessToken(): string | null {
    return getAccessTokenFromCookie();
  },
};
