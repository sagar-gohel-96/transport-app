import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { authAction } from "../store/auth-slice";
import { UserResponse } from "../types/userType";
import { config } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { getLocalStorageItem: userLocalStorage } =
    useLocalStorage<UserResponse>(config.userLocalStorageKey as string);
  const { user: userData, initialized } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isInitialised = initialized;

  let user = userData?.user;
  const token = userData?.token;

  useEffect(() => {
    dispatch(
      authAction.setUser({
        user: JSON.parse(JSON.stringify(userLocalStorage)),
      })
    );
  }, [dispatch, userLocalStorage]);

  if (!user && userLocalStorage) {
    user = JSON.parse(JSON.stringify(userLocalStorage));
  }

  return {
    isInitialised,
    user,
    token,
  };
};
