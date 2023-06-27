import { apiFetch, API_ADDRESS } from '../../apiFetch';
import { handleErrors } from '../errorHandler';
import { SignInRequest, SignUpRequest } from './contracts';

const API_ADDRESS_2 = 'http://localhost:3000/';

class AuthApi {
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

  getServiceId = (redirectUri: string) => {
    return apiFetch()
      .get(`${API_ADDRESS}/oauth/yandex/service-id?redirect_uri=${redirectUri}`)
      .then(handleErrors);
  };

  findUserByEmail = (email: string) => {
    return apiFetch()
      .get(`${API_ADDRESS_2}/api/users/${email}`)
      .then(handleErrors);
  };

  registerUserInDb = (data: Omit<SignUpRequest, 'password' | 'phone'>) => {
    return apiFetch().post(`${API_ADDRESS_2}/api/users`, data);
  };
}

export default new AuthApi();
