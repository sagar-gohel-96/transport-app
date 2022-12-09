import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { authAction } from "../store/auth-slice";
import { config } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { getLocalStorageItem: userLocalStorage } =
    useLocalStorage(config.userLocalStorageKey as string);
  const { user: userData, initialized } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  let user = userData?.user;
  let token = userData?.token;
  const isInitialised = initialized;

  useEffect(() => {
    if (userLocalStorage) {
      dispatch(
        authAction.setUser(JSON.parse(userLocalStorage as string))
      );
    }
  }, [dispatch, userLocalStorage]);

  return {
    isInitialised,
    user,
    token,
  };
};
