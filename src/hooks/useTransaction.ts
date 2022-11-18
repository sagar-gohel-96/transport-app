import { useMemo } from "react";
import { useAddTransactionMutation, useGetTransactionsQuery } from "../api";

export const useTransaction = (id?: string) => {
  const { data, isLoading, refetch } = useGetTransactionsQuery("");
  const [addTransaction, { isLoading: addTransactionLoading }] =
    useAddTransactionMutation();

  const getTransactions = useMemo(() => {
    return { data: data?.data, isLoading, refetch };
  }, [data, isLoading, refetch]);

  return { getTransactions, addTransaction, addTransactionLoading };
};
