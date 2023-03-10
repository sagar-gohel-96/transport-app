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

import { AddPartyData, FetchPartiesData } from "../../../../types";

interface AddPartyProps {
  handleCloseModal: () => void;
  data?: FetchPartiesData | null;
  addParty: (value: any) => void;
  updateParty: (value: any) => void;
  refetch: () => void;
}

const formInitialValue: AddPartyData = {
  partyCode: "",
  name: "",
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
  creditLimit: 0,
  creditPeriod: 0,
  creditInvoice: 0,
};

const setPartyData = (data: FetchPartiesData): FetchPartiesData => {
  return {
    _id: data?._id ?? "",
    partyCode: "12345",
    name: data?.name ?? "",
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
    creditLimit: data?.creditLimit ?? 0,
    creditPeriod: data?.creditPeriod ?? 0,
    creditInvoice: data?.creditInvoice ?? 0,
  };
};

export const AddPartiesForm = ({
  handleCloseModal,
  data,
  addParty,
  updateParty,
  refetch,
}: AddPartyProps) => {
  const PartiesData = useMemo(() => data, [data]);

  const form = useForm<AddPartyData>({
    initialValues: PartiesData ? setPartyData(PartiesData) : formInitialValue,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: AddPartyData) => {
    const _id = values._id;
    try {
      if (values?._id) {
        const updateData: any = await updateParty({ _id, ...values });
        if (updateData.data.success) {
          showNotification({
            id: "load-data",
            loading: true,
            title: "Party",
            message: "Party Updating...",
            autoClose: false,
            disallowClose: true,
          });

          setTimeout(() => {
            updateNotification({
              id: "load-data",
              color: "teal",
              title: "Party",
              message: updateData.data.message,

              icon: <Check size={16} />,
              autoClose: 2000,
            });
          }, 3000);
        }
      } else {
        const addData: any = await addParty(values);
        if (addData.data.success) {
          showNotification({
            title: "Party",
            message: addData.data.message,
          });
        }
      }
    } catch (err) {
      console.log("Error");
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
            label="Party Code"
            placeholder="10001"
            {...form.getInputProps("partyCode")}
          />
          <TextInput
            required
            label="Name"
            placeholder="Party Name"
            {...form.getInputProps("name")}
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
