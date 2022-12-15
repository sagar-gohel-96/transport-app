import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { authAction } from "../store/auth-slice";
import { config } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { getLocalStorageItem: userLocalStorage } =
    useLocalStorage(config.userLocalStorageKey as string);
  const { user: userData, token: userToken, initialized } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  let user = userData
  let token = userToken
  const isInitialised = initialized;

  useEffect(() => {
    if (userLocalStorage) {
      const userLocalData = userLocalStorage && JSON.parse(userLocalStorage as any)

      const userAuth = { initialized: true, user: userLocalData.user, token: userLocalData.token }

      dispatch(
        authAction.updateState(userAuth)
      );
    }
  }, [dispatch, userLocalStorage]);

  return {
    isInitialised,
    user,
    token,
  };
};
