import { apiFetch, API_ADDRESS, apiAuthFetch } from '../apiFetch';
import { handleErrors } from '../errorHandler';
import { LoginRequest, LoginResponse, TokenRefreshRequest } from './contracts';

class AuthApi {
  login = (loginRequest: LoginRequest) => {
    return apiFetch()
      .post(`${API_ADDRESS}/api/auth/login`, loginRequest)
      .then(handleErrors)
      .then<LoginResponse>((res) => res.json());
  };

  refresh = (tokenRefreshRequest: TokenRefreshRequest) => {
    return apiFetch()
      .post(`${API_ADDRESS}/api/auth/refresh`, tokenRefreshRequest)
      .then(handleErrors)
      .then<LoginResponse>((res) => res.json());
  };

  revoke = (token: string) => {
    return apiAuthFetch().post(`${API_ADDRESS}/api/auth/revoke`, token);
  };
}

const authApi = new AuthApi();

export default authApi;
