import { apiFetch, LOCAL_ADDRESS, API_ADDRESS } from '../../apiFetch';

class UserApi {
  toggleUserTheme = (themeName: string) => {
    return apiFetch().put(`${LOCAL_ADDRESS}/api/theme`, {
      mode: themeName,
    });
  };
  updateAvatar = (avatar: FormData) => {
    return apiFetch().put(`${API_ADDRESS}/user/profile/avatar`, avatar);
  };
}

export default new UserApi();
