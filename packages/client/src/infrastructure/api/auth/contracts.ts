export interface LoginRequest {
  userName: string;
  password: string;
  rememberMe: boolean;
}

export interface TokenRefreshRequest {
  token: string;
  refreshToken: string;
}

export interface LoginResponse {
  userName: string;
  token: string;
  refreshToken: string;
}
