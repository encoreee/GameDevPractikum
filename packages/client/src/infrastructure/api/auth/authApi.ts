import { apiFetch, API_ADDRESS } from '../../apiFetch';
import { handleErrors } from '../errorHandler';
import { SignInRequest, SignUpRequest, OauthRequest } from './contracts';

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
}

export default new AuthApi();
