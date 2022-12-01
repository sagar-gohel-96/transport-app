import {
  Autocomplete,
  Box,
  NumberInput,
  SimpleGrid,
  Stack,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { useEffect, useMemo, useRef } from "react";
import { X } from "tabler-icons-react";
import { TransactionData } from "../../../../../types";
import { format } from "../../../../../utils";

export interface TransactionCardViewProps {
  form: UseFormReturnType<TransactionData>;
  areas: string[];
  index: number;
  handleAddTransaction: () => void;
}

export const TransactionCardView = ({
  areas,
  form,
  index,
  handleAddTransaction,
}: TransactionCardViewProps) => {
  const transaction = useMemo(() => {
    return form.values.transactions[index];
  }, [form.values.transactions, index]);

  const formRef = useRef(form);

  useEffect(() => {
    const calculateTransactionAmount = transaction.freight + transaction.hamali;
    formRef.current.setFieldValue(
      `transactions.${index}.amount`,
      calculateTransactionAmount || 0
    );
  }, [transaction.freight, transaction.hamali, index]);

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
        <Box
          sx={(theme) => ({
            border: "1px solid",
            borderColor: theme.colors.gray[4],
            borderRadius: 4,
            position: "relative",
          })}
        >
          <UnstyledButton
            type="button"
            onClick={() => form.removeListItem("transactions", index)}
            sx={{ position: "absolute", right: 4, top: 4 }}
          >
            <X strokeWidth={1.5} />
          </UnstyledButton>
          <SimpleGrid
            cols={3}
            key={index}
            p="sm"
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "md" },
              { maxWidth: 755, cols: 2, spacing: "sm" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            <TextInput
              placeholder="C. G. No."
              label="C. G. No."
              {...form.getInputProps(`transactions.${index}.CGNo`)}
            />
            <DatePicker
              dropdownType="modal"
              label=" Date"
              placeholder="Date"
              withAsterisk
              inputFormat={format}
              {...form.getInputProps(`transactions.${index}.date`)}
            />
            <Autocomplete
              placeholder="From Place"
              label="From Place"
              data={areas ?? []}
              {...form.getInputProps(`transactions.${index}.fromPlace`)}
              limit={5}
            />
            <Autocomplete
              placeholder="To Place"
              label="To Place"
              data={areas ?? []}
              {...form.getInputProps(`transactions.${index}.toPlace`)}
              limit={5}
            />
            <NumberInput
              hideControls
              required
              placeholder="No of Arts"
              label="No of Arts"
              {...form.getInputProps(`transactions.${index}.noOfArts`)}
            />
            <NumberInput
              hideControls
              required
              placeholder="Freight"
              label="Freight"
              {...form.getInputProps(`transactions.${index}.freight`)}
            />
            <NumberInput
              hideControls
              required
              placeholder="Hamali"
              label="Hamali"
              {...form.getInputProps(`transactions.${index}.hamali`)}
            />
            <NumberInput
              hideControls
              required
              placeholder="Amount"
              label="Amount"
              {...form.getInputProps(`transactions.${index}.amount`)}
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </Box>
  );
};
