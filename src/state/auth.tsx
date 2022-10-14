import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@auth0/auth0-react';

export interface AuthState {
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: User;
}

const initialState: AuthState = {
  isAdmin: false,
  isAuthenticated: false,
  isLoading: false,
  token: null,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      if (payload) {
        const roles = payload['https://odeko.com/roles'] || [];
        state.isAdmin = roles.includes('admin');
        state.isAuthenticated = true;
      } else {
        state.isAdmin = false;
        state.isAuthenticated = false;
      }
    },
  },
});
export const selectToken = (state: AuthState) => state.token;

export const { setToken, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
