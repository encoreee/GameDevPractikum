import { apiFetch, API_ADDRESS } from '../../apiFetch';
import { handleErrors } from '../errorHandler';
import { UserInfoResponse } from './contracts';

class AuthApi {
  getUserInfo = () => {
    return apiFetch()
      .get(`${API_ADDRESS}/auth/user`)
      .then(handleErrors)
      .then<UserInfoResponse>((res) => res.json());
  };
}

const authApi = new AuthApi();

export default authApi;
