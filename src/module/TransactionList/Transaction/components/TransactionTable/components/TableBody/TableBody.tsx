import {
  Autocomplete,
  Box,
  NumberInput,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { useEffect, useMemo, useRef } from "react";
import { Trash } from "tabler-icons-react";
import { TransactionData } from "../../../../../../../types";
import { format } from "../../../../../../../utils";

interface TableBodyProps {
  index: number;
  areas: string[];
  form: UseFormReturnType<TransactionData>;
}

export const TableBody = ({ form, index, areas }: TableBodyProps) => {
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
    <tr key={index}>
      <td>
        <TextInput
          {...form.getInputProps(`transactions.${index}.CGNo`)}
          required
        />
      </td>
      <td>
        <DatePicker
          dropdownType="modal"
          placeholder="Date"
          withAsterisk
          inputFormat={format}
          defaultValue={new Date()}
          {...form.getInputProps(`transactions.${index}.date`)}
        />
      </td>
      <td>
        <Autocomplete
          placeholder="From Place"
          data={areas ?? []}
          {...form.getInputProps(`transactions.${index}.fromPlace`)}
          limit={5}
        />
      </td>
      <td>
        <Autocomplete
          placeholder="To Place"
          data={areas ?? []}
          {...form.getInputProps(`transactions.${index}.toPlace`)}
          limit={5}
        />
      </td>
      <td>
        <NumberInput
          hideControls
          required
          placeholder="No of Arts"
          {...form.getInputProps(`transactions.${index}.noOfArts`)}
        />
      </td>
      <td>
        <NumberInput
          hideControls
          required
          placeholder="Freight"
          {...form.getInputProps(`transactions.${index}.freight`)}
        />
      </td>
      <td>
        <NumberInput
          hideControls
          required
          placeholder="Hamali"
          {...form.getInputProps(`transactions.${index}.hamali`)}
        />
      </td>
      <td>
        <NumberInput
          hideControls
          required
          placeholder="Amount"
          {...form.getInputProps(`transactions.${index}.amount`)}
        />
      </td>
      <td>
        {index === form.values.transactions.length - 1 ? (
          <Box></Box>
        ) : (
          <UnstyledButton
            type="button"
            onClick={() => form.removeListItem("transactions", index)}
          >
            <Trash color="red" />
          </UnstyledButton>
        )}
      </td>
    </tr>
  );
};
