export interface SignInRequest {
  login: string;
  password: string;
}

export interface User {
  id: number | string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface UserProfileRequest {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

export interface ErrorData {
  reason: string;
}
