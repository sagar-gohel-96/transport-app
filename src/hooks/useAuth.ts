import { useAppSelector } from '../store';

export const useAuth = () => {
  const {
    user: userData,
    token: userToken,
    initialized,
  } = useAppSelector((state) => state.auth);

  let user = userData;
  let token = userToken;
  const isInitialised = initialized;

  return {
    isInitialised,
    user,
    token,
  };
};
