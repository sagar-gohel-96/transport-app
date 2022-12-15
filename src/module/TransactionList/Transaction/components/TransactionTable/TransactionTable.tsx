import { Box, Table } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { TransactionData } from "../../../../../types";
import { TableBody } from "./components/TableBody";

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
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {form.values.transactions.map((element, i) => (
            <TableBody form={form} index={i} key={i} areas={areas} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};
