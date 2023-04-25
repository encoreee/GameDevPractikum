import AuthAPI from '../infrastructure/api/auth/authApi';
import { SignInRequest } from '@/infrastructure/api/auth/contracts';
import { AppMessage } from '../utils/const';
import { redirect } from 'react-router-dom';

export class AuthController {
  public async signIn(data: SignInRequest) {
    try {
      const response = await AuthAPI.signIn(data);
      console.log(response.status);
      return redirect('/');
    } catch (err) {
      return (err as Error).message || AppMessage.UNKNOWN_API_ERROR;
    }
  }
}

export default new AuthController();
