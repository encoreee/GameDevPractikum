import AuthAPI from '../infrastructure/api/auth/authApi';
import {
  SignInRequest,
  UserProfileRequest,
} from '../infrastructure/api/auth/contracts';
import { AppMessage } from '../utils/const';

export class AuthController {
  public async signIn(data: SignInRequest) {
    try {
      await AuthAPI.signIn(data);
    } catch (err) {
      return (err as Error).message || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async signUp(data: UserProfileRequest) {
    try {
      await AuthAPI.signUp(data);
    } catch (err) {
      return (err as Error).message || AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async getUserInfo() {
    try {
      const user = await AuthAPI.getUserInfo();
      return user;
    } catch (e) {
      return undefined;
    }
  }
}

export default new AuthController();
