import { Group, Input, SimpleGrid, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CurrencyRupee } from "tabler-icons-react";
import { TransactionData } from "../../../../../types";

export interface PricingProps {
  form: UseFormReturnType<TransactionData>;
}

export const Pricing = ({ form }: PricingProps) => {
  return (
    <SimpleGrid cols={1} spacing="xs" py="sm">
      <Group position="apart">
        <Text weight={600} size="md">
          Total Amount
        </Text>
        <Input
          icon={<CurrencyRupee size={18} />}
          variant="filled"
          placeholder="0"
          readOnly
          {...form.getInputProps("totalAmount")}
          sx={{ maxWidth: 130 }}
        />
      </Group>
      <Group position="apart">
        <Text weight={600}>GST Amount</Text>

        <Input
          icon={<CurrencyRupee size={18} />}
          variant="filled"
          placeholder="0"
          readOnly
          {...form.getInputProps("GSTAmount")}
          sx={{ maxWidth: 130 }}
        />
      </Group>
      <Group position="apart">
        <Text weight={600}>Net Amount</Text>

        <Input
          icon={<CurrencyRupee size={18} />}
          variant="filled"
          placeholder="0"
          readOnly
          {...form.getInputProps("netAmount")}
          sx={{ maxWidth: 130 }}
        />
      </Group>
    </SimpleGrid>
  );
};
