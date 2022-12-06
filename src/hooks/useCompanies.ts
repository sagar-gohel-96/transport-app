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
  const [addCompany, { isLoading: companyAddLoading }] = useAddCompanyMutation();
  const [updateCompany, { isLoading: companyUpdateLoading }] = useUpdateCompanyMutation();
  const [deletecompany, { isLoading: companyDeleteLoading }] = useDeleteCompanyMutation();

  const getCompanies = useMemo(() => {
    return { data: data?.data, isLoading, refetch };
  }, [data, isLoading, refetch]);

  return { getCompanies, addCompany, updateCompany, deletecompany, companyAddLoading, companyUpdateLoading, companyDeleteLoading };
};
