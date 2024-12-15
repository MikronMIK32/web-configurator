import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: from api
type User = {
  username: string;
};

export interface AuthState {
  user?: User;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (old, action: PayloadAction<Pick<AuthState, 'accessToken' | 'refreshToken'>>) => ({
      ...old,
      ...action.payload,
    }),
    setUser: (old, action: PayloadAction<User>) => ({ ...old, user: action.payload }),
  },
});
