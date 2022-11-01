import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddUserPayload } from "../types/userType";

interface UserStore {
  user: AddUserPayload;
  token: string;
}

interface AuthState {
  initialized: boolean;
  user: UserStore | null;
}

const initialState: AuthState = {
  initialized: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any | null>) => {
      console.log("payload", action.payload);
      return {
        ...state,
        initialized: true,
        user: action.payload,
      };
    },
  },
});

export const authAction = authSlice.actions;
