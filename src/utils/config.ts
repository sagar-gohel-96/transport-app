export const config = {
  get userLocalStorageKey() {
    return process.env.REACT_APP_USER_LOCAL_STORAGE_KEY;
  },
  get apiBaseUrl() {
    return process.env.REACT_APP_TRANSPORT_API;
  },
};
