import { apiFetch, API_ADDRESS } from '../../apiFetch';
import { handleErrors } from '../errorHandler';
import { SignInRequest, UserInfoResponse } from './contracts';

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
}

export default new AuthApi();
