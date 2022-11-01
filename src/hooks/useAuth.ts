import { useAppSelector } from "../store";
import { UserResponse } from "../types/userType";
import { config } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const { getLocalStorageItem: userLocalStorage } =
    useLocalStorage<UserResponse>(config.userLocalStorageKey as string);
  const { user: userData } = useAppSelector((state) => state.auth);

  const isInitialised = false;

  let user = userData?.user;
  const token = userData?.token;

  if (!user) {
    user = JSON.parse(JSON.stringify(userLocalStorage));
  }

  return {
    isInitialised,
    user,
    token,
  };
};
