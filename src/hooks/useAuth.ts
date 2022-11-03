import { useAppDispatch, useAppSelector } from "../store";
import { authAction } from "../store/auth-slice";
import { UserResponse } from "../types/userType";
import { config } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { getLocalStorageItem: userLocalStorage } =
    useLocalStorage<UserResponse>(config.userLocalStorageKey as string);
  const { user: userData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isInitialised = false;

  let user = userData?.user;
  const token = userData?.token;

  if (!user && userLocalStorage) {
    dispatch(
      authAction.setUser({
        user: JSON.parse(JSON.stringify(userLocalStorage)),
      })
    );
    user = JSON.parse(JSON.stringify(userLocalStorage));
  }

  return {
    isInitialised,
    user,
    token,
  };
};
