import { api } from "@/lib/api";
import {
  ApiEnvelope,
  AuthResponse,
  ForgotPasswordPayload,
  LoginData,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";

const ACCESS_TOKEN_KEY = "blog_access_token";
const REFRESH_TOKEN_KEY = "blog_refresh_token";

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

  setTokens(accessToken: string, refreshToken?: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
    }
  },

  clearTokens() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
  },
};
