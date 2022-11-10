import { useMemo } from "react";
import {
  useAddCompanyMutation,
  useDeleteCompanyMutation,
  useGetcompaniesQuery,
  useUpdateCompanyMutation,
} from "../api";

export const useCompanies = () => {
  const { data, isLoading, refetch } = useGetcompaniesQuery("");
  const [addCompany] = useAddCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [deletecompany] = useDeleteCompanyMutation();

  const getCompanies = useMemo(() => {
    return { data: data?.data, isLoading, refetch };
  }, [data, isLoading, refetch]);

  return { getCompanies, addCompany, updateCompany, deletecompany };
};
