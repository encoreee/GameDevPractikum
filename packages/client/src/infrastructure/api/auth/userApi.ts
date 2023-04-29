import { apiFetch, API_ADDRESS } from '../../apiFetch';
import { handleErrors } from '../errorHandler';
import { UserProfileRequest } from './contracts';

class UserApi {
  profile = (userProfileRequest: UserProfileRequest) => {
    return apiFetch()
      .put(`${API_ADDRESS}/user/profile`, userProfileRequest)
      .then(handleErrors);
  };
}

const userApi = new UserApi();

export default userApi;
