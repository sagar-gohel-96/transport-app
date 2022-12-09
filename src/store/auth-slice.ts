import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from "../types/userType";

interface UserStore {
  user: UserResponse | null;
  token?: string;
}

interface AuthState {
  initialized: boolean;
  user: UserStore | null;

}

const initialState: AuthState = {
  initialized: false,
  user: {
    user: null,
    token: ''
  },

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStore | null>) => {
      return {
        ...state,
        initialized: true,
        user: action.payload,
      };
    },
  },
});

export const authAction = authSlice.actions;
