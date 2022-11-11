import { useMemo } from "react";
import {
  useAddPartyMutation,
  useDeletePartyMutation,
  useGetPartiesQuery,
  useUpdatePartyMutation,
} from "../api";

export const useParties = (id: string) => {
  const isUpdateId = parseInt(id);

  const { data, isLoading, refetch } = useGetPartiesQuery(
    !!isUpdateId ? id : ""
  );
  const [addParty] = useAddPartyMutation();
  const [updateParty] = useUpdatePartyMutation();
  const [deleteParty] = useDeletePartyMutation();

  const getParties = useMemo(() => {
    return { data: data?.data, isLoading, refetch };
  }, [data, isLoading, refetch]);

  return { getParties, addParty, updateParty, deleteParty };
};
