import { useMemo } from "react";
import {
  useAddPartyMutation,
  useDeletePartyMutation,
  useGetPartiesQuery,
  useUpdatePartyMutation,
} from "../api";

export const useParties = () => {
  const { data, isLoading, refetch } = useGetPartiesQuery("");
  const [addParty] = useAddPartyMutation();
  const [updateParty] = useUpdatePartyMutation();
  const [deleteParty] = useDeletePartyMutation();

  const getParties = useMemo(() => {
    return { data: data?.data, isLoading, refetch };
  }, [data, isLoading, refetch]);

  return { getParties, addParty, updateParty, deleteParty };
};
