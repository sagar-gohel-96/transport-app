import {
  Button,
  Card,
  NumberInput,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useMemo } from "react";
import { Check } from "tabler-icons-react";

import { AddCompanyData, FetchCompanyData } from "../../../../types";

interface AddCompanyProps {
  handleCloseModal: () => void;
  data?: FetchCompanyData | null;
  addCompany: (value: any) => void;
  updateCompany: (value: any) => void;
  refetch: () => void;
}

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

const setCompanyData = (data: FetchCompanyData): FetchCompanyData => {
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

export const AddCompany = ({
  handleCloseModal,
  data,
  addCompany,
  updateCompany,
  refetch,
}: AddCompanyProps) => {
  const CompanyData = useMemo(() => data, [data]);

  const form = useForm<AddCompanyData>({
    initialValues: CompanyData ? setCompanyData(CompanyData) : formInitialValue,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: AddCompanyData) => {
    const _id = values._id;
    try {
      if (values?._id) {
        const updateData: any = await updateCompany({ _id, ...values });
        if (updateData.data.success) {
          showNotification({
            id: "load-data",
            loading: true,
            title: "Company",
            message: "Company data Updating...",
            autoClose: false,
            disallowClose: true,
          });

          setTimeout(() => {
            updateNotification({
              id: "load-data",
              color: "teal",
              title: "Company",
              message: updateData.data.message,

              icon: <Check size={16} />,
              autoClose: 2000,
            });
          }, 3000);
        }
      } else {
        const addData: any = await addCompany(values);
        console.log("create company", addCompany);
        if (addData.data.success) {
          showNotification({
            title: "Company",
            message: addData.data.message,
          });
        }
      }
    } catch (err) {
      showNotification({
        title: "Company",
        message: "Company Failed to create",
      });
    } finally {
      handleCloseModal();
      refetch();
    }
  };

  return (
    <Card withBorder radius="sm">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 600, cols: 1, spacing: "sm" }]}
        >
          <TextInput
            required
            type="number"
            label="Company Code"
            placeholder="10001"
            {...form.getInputProps("companyCode")}
          />
          <TextInput
            required
            label="Name"
            placeholder="Company Name"
            {...form.getInputProps("companyName")}
          />
          <TextInput
            required
            label="Category"
            placeholder="Category"
            {...form.getInputProps("category")}
          />

          <TextInput
            required
            label="Address"
            placeholder="Address"
            {...form.getInputProps("address")}
          />
          <TextInput
            required
            label="City"
            placeholder="City"
            {...form.getInputProps("city")}
          />
          <NumberInput
            required
            type="number"
            label="Pin Code"
            placeholder="Pin Code"
            {...form.getInputProps("pincode")}
          />

          <TextInput
            required
            label="District"
            placeholder="District"
            {...form.getInputProps("district")}
          />
          <TextInput
            required
            label="State"
            placeholder="State"
            {...form.getInputProps("state")}
          />

          <TextInput
            required
            label="Contact Person"
            placeholder="Conatct Person"
            {...form.getInputProps("contactPerson")}
          />
          <TextInput
            required
            label="Phone Number"
            placeholder="Phone Number"
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            required
            label="Your Email"
            placeholder="Your Email"
            {...form.getInputProps("email")}
          />

          <TextInput
            required
            label="GSTIN"
            placeholder="GSTIN"
            {...form.getInputProps("GSTIN")}
          />
          <TextInput
            label="PAN"
            placeholder="PAN"
            {...form.getInputProps("PAN")}
          />

          <NumberInput
            required
            label="Credit Limit"
            placeholder="Credit Limit"
            {...form.getInputProps("creditLimit")}
          />
          <NumberInput
            required
            label="Credit Period"
            placeholder="Credit Period"
            {...form.getInputProps("creditPeriod")}
          />
          <NumberInput
            required
            label="Credit Invoices"
            placeholder="Credit Invoices"
            {...form.getInputProps("creditInvoice")}
          />
        </SimpleGrid>
        <Button
          type="submit"
          variant="outline"
          color="primaryBlue"
          sx={(theme) => ({ marginTop: "18px", display: "flex", flex: "1" })}
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};
