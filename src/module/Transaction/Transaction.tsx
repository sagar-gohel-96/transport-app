import {
  Button,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import { Plus, Trash } from "tabler-icons-react";
import { useParties } from "../../hooks";

interface TransactionData {
  invoiceDate: string;
  from: string;
  to: string;
  noOfArts: string;
  freint: string;
  humali: number;
  amount: number;
}

export const Transaction = () => {
  const [value, setValue] = useState<TransactionData[]>([]);
  const { getParties } = useParties();

  const form = useForm<TransactionData>({
    initialValues: {
      invoiceDate: "",
      from: "",
      to: "",
      noOfArts: "",
      freint: "",
      humali: 0,
      amount: 0,
    },

    validate: {},
  });

  const rows = value.map((element, i) => (
    <tr key={i}>
      {/* <td>{element.invoiceDate}</td> */}
      <td>{element.from}</td>
      <td>{element.to}</td>
      <td>{element.noOfArts}</td>
      <td>{element.freint}</td>
      <td>{element.humali}</td>
      <td>{element.amount}</td>
      <td>
        <Button onClick={() => handleDelete(i)}>
          <Trash />
        </Button>
      </td>
    </tr>
  ));

  const handleDelete = (i: number) => {
    value.splice(i, 1);
  };

  const handleSubmit = (values: TransactionData) => {
    setValue([...value, values]);
  };

  const parties = useMemo(
    () => getParties.data.map((value: any) => value.name),
    [getParties.data]
  );

  return (
    <Stack>
      <Group position="apart">
        <Text weight={600} size={24}>
          Transaction
        </Text>
        <Text weight={600} size={18}>
          Invoice No. 10001
        </Text>
      </Group>
      <Paper radius="sm" sx={{}}>
        <SimpleGrid cols={2} px="sm" py="sm">
          {/* <TextInput required placeholder="Party Name" label="Party Name" /> */}
          <Select label="Parties" placeholder="Parties" data={parties} />
          <TextInput required placeholder="Invoice Date" label="Invoice Date" />
        </SimpleGrid>
      </Paper>
      <Paper
        radius="sm"
        sx={{
          minHeight: "24rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Stack justify="space-between" sx={{ display: "flex", flex: 1 }}>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Table horizontalSpacing="sm" verticalSpacing="sm">
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
                {rows}
                <tr>
                  {/* <td>
                  <TextInput
                    required
                    placeholder="Invoice Date"
                    type="date"
                    {...form.getInputProps("invoiceDate")}
                  />
                </td> */}
                  <td>
                    <TextInput
                      required
                      placeholder="From"
                      {...form.getInputProps("from")}
                    />
                  </td>
                  <td>
                    <TextInput
                      required
                      placeholder="To"
                      {...form.getInputProps("to")}
                    />
                  </td>
                  <td>
                    <TextInput
                      required
                      placeholder="No of Arts"
                      {...form.getInputProps("noOfArts")}
                    />
                  </td>
                  <td>
                    <TextInput
                      required
                      placeholder="Freint"
                      {...form.getInputProps("freint")}
                    />
                  </td>
                  <td>
                    <TextInput
                      required
                      placeholder="Humali"
                      {...form.getInputProps("humali")}
                    />
                  </td>
                  <td>
                    <TextInput
                      required
                      placeholder="Amount"
                      {...form.getInputProps("amount")}
                    />
                  </td>
                  <td>
                    <Button type="submit">
                      <Plus />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </form>

          <SimpleGrid
            cols={3}
            p="sm"
            sx={{ borderTop: "1px solid", borderColor: "gray" }}
          >
            <TextInput placeholder="Total Amount" label="Total Amount" />
            <TextInput placeholder="GST Amount" label="GST Amount" />
            <TextInput placeholder="Net Amount" label="Net Amount" />
          </SimpleGrid>
        </Stack>
      </Paper>
    </Stack>
  );
};
