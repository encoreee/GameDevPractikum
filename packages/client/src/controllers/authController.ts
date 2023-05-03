import AuthAPI from '../infrastructure/api/auth/authApi';
import {
  SignInRequest,
  SignUpRequest,
} from '../infrastructure/api/auth/contracts';
import { AppMessage } from '../utils/const';

export class AuthController {
  public async signIn(data: SignInRequest) {
    try {
      await AuthAPI.signIn(data);
    } catch (err) {
      return err instanceof Error ? err.message : AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async signUp(data: SignUpRequest) {
    try {
      await AuthAPI.signUp(data);
    } catch (err) {
      return err instanceof Error ? err.message : AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async getUserInfo() {
    try {
      const user = await AuthAPI.getUserInfo();
      return user;
    } catch (err) {
      return undefined;
    }
  }
}

export default new AuthController();
