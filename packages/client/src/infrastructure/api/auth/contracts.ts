export interface SignInRequest {
  login: string;
  password: string;
}

export interface User {
  id: number | string;
  first_name: string;
  second_name: string;
  display_name: string | undefined;
  login: string;
  email: string;
  phone: string;
  avatar: string | undefined;
  theme?: {
    name: string;
  };
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

export interface ServiceIdResponse {
  service_id: string;
}

export interface OauthRequest {
  code: string;
  redirect_uri: string;
}
