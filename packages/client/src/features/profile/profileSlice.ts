import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/infrastructure/api/auth/contracts';

export const initialState: User = {
  avatar: null,
  display_name: null,
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
