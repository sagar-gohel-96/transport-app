import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../types/userType';

interface AuthState {
  initialized: boolean;
  user: UserResponse | null;
  token?: string | null;
}

const initialState: AuthState = {
  initialized: false,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<AuthState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setUser: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        initialized: action.payload.initialized,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
  },
});

export const authAction = authSlice.actions;
