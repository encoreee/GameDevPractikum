import { apiFetch, API_ADDRESS } from '../../apiFetch';
import { handleErrors } from '../errorHandler';
import { SignInRequest, SignUpRequest, UserInfoResponse } from './contracts';

class AuthApi {
  getUserInfo = () => {
    return apiFetch()
      .get(`${API_ADDRESS}/auth/user`)
      .then(handleErrors)
      .then<UserInfoResponse>((res) => res.json());
  };

  signIn = (data: SignInRequest) => {
    return apiFetch()
      .post(`${API_ADDRESS}/auth/signin`, data)
      .then(handleErrors);
  };
  signUp = (data: SignUpRequest) => {
    return apiFetch()
      .post(`${API_ADDRESS}/auth/signup`, data)
      .then(handleErrors);
  };

  logout = () => {
    return apiFetch().post(`${API_ADDRESS}/auth/logout`).then(handleErrors);
  };
}

export default new AuthApi();
