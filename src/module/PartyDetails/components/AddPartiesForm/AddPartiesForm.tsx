import {
  Button,
  Card,
  NumberInput,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface AddPartyData {
  partyCode: string;
  name: string;
  category: string;
  address: string;
  city: string;
  pincode: number;
  district: string;
  state: string;
  contactPerson: string;
  phoneNumber: "";
  email: string;
  GSTIN: string;
  PAN: string;
  creditLimit: number;
  creditPeriod: number;
  creditInvoice: number;
}

interface AddPartyProps {
  handleCloseModal: () => void;
  // setIsLoading: (value: boolean) => void;
}

export const AddPartiesForm = ({
  handleCloseModal,
}: // setIsLoading,
AddPartyProps) => {
  const form = useForm<AddPartyData>({
    initialValues: {
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
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = (values: AddPartyData) => {
    console.log(values);
    handleCloseModal();
    // setIsLoading(false);
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
