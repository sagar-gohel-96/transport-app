import {
  Autocomplete,
  Box,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CirclePlus, X } from "tabler-icons-react";
import { TransactionData } from "../../../../../types";

export interface TransactionCardViewProps {
  form: UseFormReturnType<TransactionData>;
  areas: string[];
  handleAddTransaction: () => void;
}

export const TransactionCardView = ({
  areas,
  form,
  handleAddTransaction,
}: TransactionCardViewProps) => {
  return (
    <Box
      sx={{
        display: "none",
        "@media (max-width: 1200px) and (min-width: 300px)": {
          display: "contents",
        },
      }}
    >
      <Stack>
        {form.values.transactions.map((element, i) => (
          <Box
            key={i}
            sx={(theme) => ({
              border: "1px solid",
              borderColor: theme.colors.gray[4],
              borderRadius: 4,
              position: "relative",
            })}
          >
            <UnstyledButton
              type="button"
              onClick={() => form.removeListItem("transactions", i)}
              sx={{ position: "absolute", right: 4, top: 4 }}
            >
              <X strokeWidth={1.5} />
            </UnstyledButton>
            <SimpleGrid
              cols={3}
              key={i}
              p="sm"
              breakpoints={[
                { maxWidth: 980, cols: 2, spacing: "md" },
                { maxWidth: 755, cols: 2, spacing: "sm" },
                { maxWidth: 600, cols: 1, spacing: "sm" },
              ]}
            >
              <Autocomplete
                placeholder="From Place"
                label="From Place"
                data={areas ?? []}
                {...form.getInputProps(`transactions.${i}.fromPlace`)}
                limit={5}
              />
              <Autocomplete
                placeholder="To Place"
                label="To Place"
                data={areas ?? []}
                {...form.getInputProps(`transactions.${i}.toPlace`)}
                limit={5}
              />
              <NumberInput
                required
                placeholder="No of Arts"
                label="No of Arts"
                {...form.getInputProps(`transactions.${i}.noOfArts`)}
              />
              <NumberInput
                required
                placeholder="Freint"
                label="Freint"
                {...form.getInputProps(`transactions.${i}.freint`)}
              />
              <NumberInput
                required
                placeholder="Humali"
                label="Humali"
                {...form.getInputProps(`transactions.${i}.humali`)}
              />
              <NumberInput
                required
                placeholder="Amount"
                label="Amount"
                {...form.getInputProps(`transactions.${i}.amount`)}
              />
            </SimpleGrid>
          </Box>
        ))}

        <UnstyledButton type="button" onClick={handleAddTransaction}>
          <Group spacing={4}>
            <CirclePlus />
            <Text weight={600} size="sm">
              Add New
            </Text>
          </Group>
        </UnstyledButton>
      </Stack>
    </Box>
  );
};
