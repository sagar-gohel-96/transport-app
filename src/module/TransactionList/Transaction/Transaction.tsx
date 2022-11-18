import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Group,
  Input,
  MediaQuery,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check } from "tabler-icons-react";
import { LoadingIndicator } from "../../../components/common";
import { useAreas, useParties, useTransaction } from "../../../hooks";
import {
  FetchAreaData,
  FetchPartiesData,
  FetchTransaction,
  TransactionData,
} from "../../../types";
import moment from "moment";
import { RoutesEnum } from "../../../Routes";
import { Pricing, TranactionTable, TransactionCardView } from "./components";

export const Transaction = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { getParties } = useParties(param.id!);
  const { addTransaction, addTransactionLoading, getTransactions } =
    useTransaction();
  const { getAreas } = useAreas();

  const transactionInitialValues = {
    invoiceDate: new Date(),
    partyName: "",
    totalAmount: 0,
    GSTAmount: 0,
    netAmount: 0,
    comments: "",
    transactions: [
      {
        fromPlace: "",
        toPlace: "",
        noOfArts: 0,
        freint: 0,
        humali: 0,
        amount: 0,
      },
    ],
  };

  // const getTransactionData = (data: FetchTransaction): FetchTransaction => {
  //   return {
  //     invoiceDate: new Date(),
  //     partyName: "",
  //     totalAmount: 0,
  //     GSTAmount: 0,
  //     netAmount: 0,
  //     comments: "",
  //     transactions: [
  //       {
  //         fromPlace: "",
  //         toPlace: "",
  //         noOfArts: 0,
  //         freint: 0,
  //         humali: 0,
  //         amount: 0,
  //       },
  //     ],
  //   };
  // };

  const form = useForm<TransactionData>({
    initialValues: transactionInitialValues,

    validate: {
      partyName: (value) =>
        value.length < 0 ? "Please Select Party Name" : null,
    },
  });
  const calculateTotalAmount = useMemo(
    () => form.values.transactions.reduce((acc, crr) => acc + crr.amount, 0),
    [form.values.transactions]
  );

  const calculateNetAmount = useMemo(
    () => calculateTotalAmount + form.values.GSTAmount,
    [calculateTotalAmount, form.values.GSTAmount]
  );

  const formRef = useRef(form);
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    formRef.current.setValues({
      totalAmount: calculateTotalAmount || 0,
      netAmount: calculateNetAmount || 0,
    });
  }, [calculateNetAmount, calculateTotalAmount]);

  const handleSubmit = async (values: TransactionData) => {
    console.log("Form Trans", values);
    const { invoiceDate, ...rest } = values;

    const getInvoiceDate = moment(new Date(invoiceDate)).unix();

    try {
      const addData: any = await addTransaction({
        invoiceDate: getInvoiceDate,
        ...rest,
      });
      if (addData.data.success) {
        showNotification({
          id: "load-data",
          loading: addTransactionLoading,
          title: "Transaction",
          message: "Transaction Creating...",
          autoClose: false,
          disallowClose: true,
        });

        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Transaction",
          message: addData.data.message,
          icon: <Check size={16} />,
          autoClose: 2000,
        });

        form.reset();
      }
    } catch (err) {
      console.log("error", err);
    } finally {
      getTransactions.refetch();
      navigate(`/${RoutesEnum.TransactionList}`);
    }
  };

  const handleAddTransaction = () => {
    form.insertListItem("transactions", {
      fromPlace: "",
      toPlace: "",
      noOfArts: 0,
      freint: 0,
      humali: 0,
      amount: 0,
    });
  };

  const parties = useMemo(
    () =>
      !getParties.isLoading &&
      getParties.data.map((val: FetchPartiesData) => val.name),
    [getParties.data, getParties.isLoading]
  );

  const areas = useMemo(() => {
    if (!getAreas.isLoading && !!getAreas.data.length) {
      return getAreas.data.map((val: FetchAreaData) => val.areaName);
    }
  }, [getAreas.data, getAreas.isLoading]);

  return (
    <Fragment>
      {getParties.isLoading && (
        <LoadingIndicator isLoading loadingType="overlay" />
      )}
      {parties && (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack sx={{ overflowY: "hidden" }}>
            <Group position="apart">
              <Text weight={600} size={24}>
                Transaction
              </Text>
            </Group>
            <Paper radius="sm" sx={{}}>
              <SimpleGrid cols={2} px="sm" py="sm">
                <Select
                  required
                  label="Parties"
                  placeholder="Parties"
                  nothingFound="No Area Found"
                  data={parties}
                  {...form.getInputProps("partyName")}
                />

                <DatePicker
                  placeholder="Invoice Date"
                  label="Invoice Date"
                  withAsterisk
                  {...form.getInputProps("invoiceDate")}
                />
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
              p="sm"
            >
              <Stack justify="space-between" sx={{ display: "flex", flex: 1 }}>
                <Box>
                  <TranactionTable
                    areas={areas}
                    form={form}
                    handleAddTransaction={handleAddTransaction}
                  />

                  <TransactionCardView
                    areas={areas}
                    form={form}
                    handleAddTransaction={handleAddTransaction}
                  />
                </Box>
                <Divider />
                <Box>
                  <Textarea
                    placeholder="Comments"
                    {...form.getInputProps("comments")}
                  />
                </Box>

                <Group
                  position="apart"
                  sx={(theme) => ({
                    borderTop: "1px solid",
                    borderColor: theme.colors.gray[4],
                  })}
                >
                  <Box></Box>
                  <Stack>
                    <Pricing form={form} />
                    <Group position="apart">
                      <Button type="submit" variant="outline">
                        Save & Add New
                      </Button>
                      <Button type="submit">Save Transaction</Button>
                    </Group>
                  </Stack>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        </form>
      )}
    </Fragment>
  );
};
