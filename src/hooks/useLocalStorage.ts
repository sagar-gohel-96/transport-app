import { useLocalStorage as useMantineLocalStorage } from "@mantine/hooks";

export const useLocalStorage = <T>(key: string) => {
  const [value, setValue, removeValue] = useMantineLocalStorage<T>({
    key,
  });

  const getLocalStorageItem = value;
  const setLocalStorageItem = (data: T) => {
    setValue(data);
  };

  const removeLocalStorageItem = removeValue;
  return { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
};
