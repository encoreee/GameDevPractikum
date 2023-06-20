import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/infrastructure/api/auth/contracts';

export const initialState: User = {
  avatar: undefined,
  display_name: undefined,
  email: '',
  first_name: '',
  id: '',
  login: '',
  phone: '',
  second_name: '',
};

export const profileSlice = createSlice({
  name: 'profile-slice',
  initialState,
  reducers: {},
});

export default profileSlice.reducer;
