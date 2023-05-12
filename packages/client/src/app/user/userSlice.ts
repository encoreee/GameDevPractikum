import { createAsyncThunk } from '@reduxjs/toolkit';

import userApi from '../../infrastructure/api/auth/userApi';
import { UserProfileRequest } from '@/infrastructure/api/auth/contracts';

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (request: UserProfileRequest) => {
    return await userApi.profile(request);
  }
);
