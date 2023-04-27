import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import authApi from '../../infrastructure/api/auth/authApi';
import { SignInRequest } from '@/infrastructure/api/auth/contracts';

export interface AuthState {
  status: 'idle' | 'loading' | 'failed';
  error?: SerializedError;
}

const initialState: AuthState = {
  status: 'idle',
};

export const singin = createAsyncThunk(
  'singin',
  async (request: SignInRequest) => {
    return await authApi.signIn(request);
  }
);

// export const logout = createAsyncThunk('logout', async () => {
//   return await authApi.logout();
// });

export const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(singin.pending, (state) => {
      state.status = 'loading';
    });
    build.addCase(singin.fulfilled, (state) => {
      state.status = 'idle';
    });
    build.addCase(singin.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    });
  },
});

export default authSlice.reducer;
