import { useMemo } from "react";
import {
  useGetAreasQuery,
  useAddAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} from "../api";

export const useAreas = () => {
  const { data, isLoading, refetch } = useGetAreasQuery("");
  const [addArea] = useAddAreaMutation();
  const [updateArea] = useUpdateAreaMutation();
  const [deleteArea] = useDeleteAreaMutation();

  const getAreas = useMemo(() => {
    return { data: data?.data, isLoading, refetch };
  }, [data, isLoading, refetch]);

  return { getAreas, addArea, updateArea, deleteArea };
};
