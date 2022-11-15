import { useMemo } from "react";
import {
  useAddCompanyMutation,
  useDeleteCompanyMutation,
  useGetcompaniesQuery,
  useUpdateCompanyMutation,
} from "../api";

export const useCompanies = (id: string) => {
  const isUpdateId = parseInt(id);
  const { data, isLoading, refetch } = useGetcompaniesQuery(
    !!isUpdateId ? id : ""
  );
  const [addCompany] = useAddCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [deletecompany] = useDeleteCompanyMutation();

  const getCompanies = useMemo(() => {
    return { data: data?.data, isLoading, refetch };
  }, [data, isLoading, refetch]);

  return { getCompanies, addCompany, updateCompany, deletecompany };
};
