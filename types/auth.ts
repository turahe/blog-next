export interface LoginPayload {
  email: string;
  password: string;
  deviceId: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  permissions?: string[];
}

export interface LoginData {
  twoFactorRequired: boolean;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  sessionId: string;
  user: AuthUser;
}

export interface ApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
}

export interface AuthResponse {
  message: string;
  user?: AuthUser;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  sessionId?: string;
  twoFactorRequired?: boolean;
}
