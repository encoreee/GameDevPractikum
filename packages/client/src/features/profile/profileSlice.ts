import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiFetch, API_ADDRESS } from '@infrastructure/apiFetch';
import { STATE_STATUSES } from '@/shared/const/store/stateStatuses';
import { ProfileState } from './types';
import { RootState } from '@app/store';

export const getProfile = createAsyncThunk('profile/getProfile', async () => {
  const res = await apiFetch().get(`${API_ADDRESS}/auth/user`);
  const data = await res.json();
  return data;
});

const initialState: ProfileState = {
  status: { profileStatus: '' },
};

export const profileSlice = createSlice({
  name: 'profile-slice',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getProfile.pending, (state) => {
      state.status.profileStatus = STATE_STATUSES.LOADING;
    });
    build.addCase(getProfile.fulfilled, (state, action) => {
      state.status.profileStatus = STATE_STATUSES.IDLE;
      state.profile = action.payload;
    });
    build.addCase(getProfile.rejected, (state, action) => {
      state.status.profileStatus = STATE_STATUSES.LOADING;
      state.profile = undefined;
      state.error = action.error;
    });
  },
});

export const selectProfile = (state: RootState) => state?.profile?.profile;

export default profileSlice.reducer;
