import { Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check } from "tabler-icons-react";
import { useAuth, useCompanies } from "../../../hooks";
import { AddCompanyData, FetchCompanyData } from "../../../types";
import { CompanyForm } from "./CompanyForm";

const formInitialValue: AddCompanyData = {
  companyCode: "",
  companyName: "",
  category: "",
  address: "",
  city: "",
  pincode: 0,
  district: "",
  state: "",
  contactPerson: "",
  phoneNumber: "",
  email: "",
  GSTIN: "",
  PAN: "",
  logoImage: "",
  headerImage: "",
  creditLimit: 0,
  creditPeriod: 0,
  creditInvoice: 0,
};

const getCompanyData = (data: FetchCompanyData): FetchCompanyData => {
  return {
    _id: data?._id ?? "",
    companyCode: "12345",
    companyName: data?.companyName ?? "",
    category: data?.category ?? "",
    address: data?.address ?? "",
    city: data?.city ?? "",
    pincode: data?.pincode ?? 0,
    district: data?.district ?? "",
    state: data?.state ?? "",
    contactPerson: data?.contactPerson ?? "",
    phoneNumber: data?.phoneNumber ?? "",
    email: data?.email ?? "",
    GSTIN: data?.GSTIN ?? "",
    PAN: data?.PAN ?? "",
    logoImage: "",
    headerImage: "",
    creditLimit: data?.creditLimit ?? 0,
    creditPeriod: data?.creditPeriod ?? 0,
    creditInvoice: data?.creditInvoice ?? 0,
  };
};

export const CompanyDetails = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { getCompanies, addCompany, updateCompany } = useCompanies(param.id!);
  const { data, isLoading, refetch } = getCompanies;
  const [headerImageUrl, setHeaderImageUrl] = useState(
    data?.headerImage ? data?.headerImage : ""
  );
  const [logoImageUrl, setLogoImageUrl] = useState(
    data?.logoImage ? data?.logoImage : ""
  );
  const [progresspercent, setProgresspercent] = useState(0);
  const { user } = useAuth();

  const isUpdate = parseInt(param.id!);
  const CompaniesData = useMemo(() => data, [data]);

  const isImageUploading = useMemo(() => !!progresspercent, [progresspercent]);

  const form = useForm<AddCompanyData>({
    initialValues: formInitialValue,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (!!isUpdate) {
      formRef.current.setValues(getCompanyData(CompaniesData));
    }
  }, [CompaniesData, data, isUpdate]);

  const handleSubmit = async (values: AddCompanyData) => {
    const _id = values._id;
    try {
      if (values?._id) {
        const updateData: any = await updateCompany({ _id, ...values });
        if (updateData.data.success) {
          showNotification({
            id: "load-data",
            loading: isLoading,
            title: "Company",
            message: "Company data Updating...",
            autoClose: false,
            disallowClose: true,
          });

          updateNotification({
            id: "load-data",
            color: "teal",
            title: "Company",
            message: updateData.data.message,
            icon: <Check size={16} />,
            autoClose: 2000,
          });
        }
      } else {
        const addData: any = await addCompany(values);
        if (addData.data.success) {
          showNotification({
            title: "Company",
            message: addData.data.message,
          });
        }
      }
    } catch (err) {
      console.log("Error");
    } finally {
      navigate("/companies");
      refetch();
    }
  };

  return (
    <Stack>
      <Text weight={700} size="xl">
        Company Details
      </Text>
      <CompanyForm
        form={form}
        handleSubmit={handleSubmit}
        fileUpload={{
          headerImageUrl,
          logoImageUrl,
          setHeaderImageUrl,
          setLogoImageUrl,
          setProgresspercent,
        }}
        user={user!}
      />
    </Stack>
  );
};
