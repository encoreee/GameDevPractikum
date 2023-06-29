import { apiFetch, LOCAL_ADDRESS } from '../../apiFetch';

class UserApi {
  toggleUserTheme = (themeName: string) => {
    return apiFetch().put(`${LOCAL_ADDRESS}/api/theme`, {
      mode: themeName,
    });
  };
}

export default new UserApi();
