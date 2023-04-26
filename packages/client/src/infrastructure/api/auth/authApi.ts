import { apiFetch, API_ADDRESS } from '../../apiFetch';
import { handleErrors } from '../errorHandler';
import { SinginRequest, UserInfoResponse } from './contracts';

class AuthApi {
  getUserInfo = () => {
    return apiFetch()
      .get(`${API_ADDRESS}/auth/user`)
      .then(handleErrors)
      .then<UserInfoResponse>((res) => res.json());
  };

  singin = (singinRequest: SinginRequest) => {
    return apiFetch()
      .post(`${API_ADDRESS}/auth/signin`, singinRequest)
      .then(handleErrors);
  };

  logout = () => {
    return apiFetch().post(`${API_ADDRESS}/auth/logout`).then(handleErrors);
  };
}

const authApi = new AuthApi();

export default authApi;
