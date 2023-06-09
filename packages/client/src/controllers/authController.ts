import AuthAPI from '../infrastructure/api/auth/authApi';
import {
  ServiceIdResponse,
  SignInRequest,
  SignUpRequest,
  OauthRequest,
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

  public async logout() {
    try {
      await AuthAPI.logout();
    } catch (err) {
      return err instanceof Error ? err.message : AppMessage.UNKNOWN_API_ERROR;
    }
  }

  public async getServiceId(
    redirectUri: string
  ): Promise<ServiceIdResponse | null> {
    try {
      return await AuthAPI.getServiceId(redirectUri).then((res) => res.json());
    } catch (err) {
      return null;
    }
  }

  public async Oauth(data: OauthRequest) {
    try {
      await AuthAPI.postOauthCode(data);
    } catch (err) {
      console.log(err);

      return err instanceof Error ? err.message : AppMessage.OAUTH_ERROR;
    }
  }
}

export default new AuthController();
