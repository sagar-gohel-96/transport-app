import {
  Autocomplete,
  Box,
  Group,
  NumberInput,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { CirclePlus, Plus, Trash } from "tabler-icons-react";
import { TransactionData } from "../../../../../types";

export interface TransactionTableProps {
  form: UseFormReturnType<TransactionData>;
  areas: string[];
  handleAddTransaction: () => void;
}

export const TranactionTable = ({
  areas,
  form,
  handleAddTransaction,
}: TransactionTableProps) => {
  return (
    <Box
      sx={{
        // minHeight: 250,
        "@media (max-width: 1200px) and (min-width: 300px)": {
          display: "none",
        },
      }}
    >
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>C. G. No</th>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>No of Arts</th>
            <th>Freight</th>
            <th>Hamali</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {rows} */}
          {form.values.transactions.map((element, i) => (
            <tr key={i}>
              <td>
                <TextInput
                  {...form.getInputProps(`transactions.${i}.CGNo`)}
                  required
                />
              </td>
              <td>
                <DatePicker
                  // label=" Date"
                  placeholder="Date"
                  withAsterisk
                  {...form.getInputProps(`transactions.${i}.date`)}
                />
              </td>
              <td>
                <Autocomplete
                  placeholder="From Place"
                  data={areas ?? []}
                  {...form.getInputProps(`transactions.${i}.fromPlace`)}
                  limit={5}
                />
              </td>
              <td>
                <Autocomplete
                  placeholder="To Place"
                  data={areas ?? []}
                  {...form.getInputProps(`transactions.${i}.toPlace`)}
                  limit={5}
                />
              </td>
              <td>
                <NumberInput
                  required
                  placeholder="No of Arts"
                  {...form.getInputProps(`transactions.${i}.noOfArts`)}
                />
              </td>
              <td>
                <NumberInput
                  required
                  placeholder="Freight"
                  {...form.getInputProps(`transactions.${i}.freight`)}
                />
              </td>
              <td>
                <NumberInput
                  required
                  placeholder="Hamali"
                  {...form.getInputProps(`transactions.${i}.hamali`)}
                />
              </td>
              <td>
                <NumberInput
                  required
                  placeholder="Amount"
                  {...form.getInputProps(`transactions.${i}.amount`)}
                />
              </td>
              <td>
                {i === form.values.transactions.length - 1 ? (
                  <Box></Box>
                ) : (
                  <UnstyledButton
                    type="button"
                    onClick={() => form.removeListItem("transactions", i)}
                  >
                    <Trash color="red" />
                  </UnstyledButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <UnstyledButton type="button" onClick={handleAddTransaction}>
          <Group spacing={4}>
            <CirclePlus />
            <Text weight={600} size="sm">
              Add New
            </Text>
          </Group>
        </UnstyledButton>
      </Table>
    </Box>
  );
};
