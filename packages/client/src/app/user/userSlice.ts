import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import { RootState } from '../store'
import authApi from '../../infrastructure/api/auth/authApi'

export interface UserState {
  status: 'idle' | 'loading' | 'failed'
  user?: User
  error?: SerializedError
}

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

const initialState: UserState = {
  status: 'idle',
}

export const loadUser = createAsyncThunk('user/load', async () => {
  return await authApi.getUserInfo()
})

export const userSlice = createSlice({
  name: 'user-slice',
  initialState,
  reducers: {},
  extraReducers: build => {
    build.addCase(loadUser.pending, state => {
      state.status = 'loading'
    })
    build.addCase(loadUser.fulfilled, (state, action) => {
      state.status = 'idle'
      state.user = action.payload
    })
    build.addCase(loadUser.rejected, (state, action) => {
      state.status = 'failed'
      state.user = undefined
      state.error = action.error
    })
  },
})

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
