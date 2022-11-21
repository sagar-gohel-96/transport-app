import {
  Autocomplete,
  Box,
  NumberInput,
  Table,
  UnstyledButton,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Plus, Trash } from "tabler-icons-react";
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
            {/* <th>Invoice Date</th> */}
            <th>From</th>
            <th>To</th>
            <th>No of Arts</th>
            <th>Freint</th>
            <th>Humali</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {rows} */}
          {form.values.transactions.map((element, i) => (
            <tr key={i}>
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
                  placeholder="Freint"
                  {...form.getInputProps(`transactions.${i}.freint`)}
                />
              </td>
              <td>
                <NumberInput
                  required
                  placeholder="Humali"
                  {...form.getInputProps(`transactions.${i}.humali`)}
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
                  <UnstyledButton type="button" onClick={handleAddTransaction}>
                    <Plus />
                  </UnstyledButton>
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
      </Table>
    </Box>
  );
};
