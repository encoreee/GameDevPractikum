import { apiFetch, API_ADDRESS, LOCAL_ADDRESS } from '../../apiFetch';
import { handleErrors } from '../errorHandler';
import { SignInRequest, SignUpRequest, User } from './contracts';

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

  findUserInDb = (id: string | number) => {
    return apiFetch()
      .get(`${LOCAL_ADDRESS}/api/users/${id}`)
      .then((res) => res.json())
      .catch((e) => console.error(e));
  };

  registerUserInDb = (data: User) => {
    return apiFetch().post(`${LOCAL_ADDRESS}/api/users`, data);
  };
}

export default new AuthApi();
