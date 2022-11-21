import { useMemo } from "react";
import {
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
} from "../api";

export const useTransaction = (id: string) => {
  const isUpdateId = parseInt(id);

  const { data, isLoading, refetch } = useGetTransactionsQuery(
    !!isUpdateId ? id : ""
  );

  const [addTransaction, { isLoading: addTransactionLoading }] =
    useAddTransactionMutation();
  const [updateTransaction, { isLoading: updateTransactionLoading }] =
    useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const getTransactions = useMemo(() => {
    return { data: data?.data, isLoading, refetch };
  }, [data, isLoading, refetch]);

  return {
    getTransactions,
    addTransaction,
    addTransactionLoading,
    updateTransaction,
    updateTransactionLoading,
    deleteTransaction,
  };
};
