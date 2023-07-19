import UserApi from '../infrastructure/api/user/userApi';
// import {
//   ServiceIdResponse,
//   SignInRequest,
//   SignUpRequest,
// } from '../infrastructure/api/auth/contracts';
import { AppMessage } from '../utils/const';

export class AuthController {
  public async updateAvatar(data: FormData) {
    try {
      await UserApi.updateAvatar(data);
    } catch (err) {
      return err instanceof Error ? err.message : AppMessage.UNKNOWN_API_ERROR;
    }
  }
}

export default new AuthController();
