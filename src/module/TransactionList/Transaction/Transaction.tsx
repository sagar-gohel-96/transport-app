import {
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  UnstyledButton,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Check, CirclePlus, Plus } from 'tabler-icons-react';
import { LoadingIndicator } from '../../../components/common';
import { useAreas, useParties, useTransaction } from '../../../hooks';
import {
  FetchAreaData,
  FetchPartiesData,
  FetchTransaction,
  TransactionData,
  TransactionItemPayload,
} from '../../../types';
import moment from 'moment';
import { RoutesMapping } from '../../../Routes';
import { Pricing, TranactionTable, TransactionCardView } from './components';
import { format } from '../../../utils';

export const Transaction = () => {
  const param = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getParties } = useParties('');
  const {
    addTransaction,
    addTransactionLoading,
    getTransactions,
    updateTransaction,
    updateTransactionLoading,
  } = useTransaction(param.id!);
  const { getAreas } = useAreas('');
  const isUpdate = parseInt(param.id!);
  const id = '00000000000000000000000';

  const isDuplicate = location.pathname.split('/').includes('duplicate');

  const transactionInitialValues = {
    invoiceDate: new Date(),
    partyName: '',
    totalAmount: 0,
    GSTAmount: 0,
    netAmount: 0,
    comments: '',
    transactions: [
      {
        CGNo: 0,
        date: new Date(),
        fromPlace: '',
        toPlace: '',
        noOfArts: 0,
        freight: 0,
        hamali: 0,
        amount: 0,
      },
    ],
  };

  const getDuplicateData = (
    data: Omit<
      FetchTransaction,
      '_id,__v,createdAt,updatedAt,netAmount,GSTAmount'
    >
  ) => {
    const {
      _id,
      invoiceDate,
      partyName,
      totalAmount,
      GSTAmount,
      netAmount,
      comments,
      transactions,
    } = data;

    const transformTransaction = transactions.map((transaction) => {
      return { ...transaction, date: moment.unix(transaction.date).toDate() };
    });

    return {
      _id,
      invoiceDate: moment.unix(invoiceDate).toDate(),
      partyName,
      totalAmount,
      GSTAmount,
      netAmount,
      comments,
      transactions: transformTransaction,
    };
  };

  const getTransactionData = (data: FetchTransaction): TransactionData => {
    const {
      _id,
      invoiceDate,
      partyName,
      totalAmount,
      GSTAmount,
      netAmount,
      comments,
      transactions,
    } = data;

    const transformTransaction = transactions.map((transaction) => {
      return { ...transaction, date: moment.unix(transaction.date).toDate() };
    });

    return {
      _id,
      invoiceDate: moment.unix(invoiceDate).toDate(),
      partyName,
      totalAmount,
      GSTAmount,
      netAmount,
      comments,
      transactions: transformTransaction,
    };
  };
  const form = useForm<TransactionData>({
    initialValues: transactionInitialValues,

    validate: {
      partyName: (value) =>
        value.length < 0 ? 'Please Select Party Name' : null,
      invoiceDate: (value) => {
        // const todayDate = moment(new Date());
        // const FormDate  = moment(value);

        // const dDiff = todayDate.diff(FormDate,'days');
        // console.log("date diff",dDiff,todayDate,FormDate);

        // if (dDiff < 0)  return 'Date is future date'
        // if(dDiff=== 2658981674) return 'Date is past date'

        const dateDiffInPast = moment(new Date()).diff(
          moment(new Date(value)),
          'days'
        );
        const dateDiffInFuture = moment(new Date(value)).diff(
          moment(new Date()),
          'days'
        );

        console.log(
          'future date',
          dateDiffInFuture,
          dateDiffInPast,
          moment(new Date()),
          moment(value)
        );

        if (dateDiffInPast > 30) return 'Please Select Invoice Date';
        if (dateDiffInFuture > 0)
          return 'Are you sure you want to Select Future Invoice Date';
        return null;
      },

      transactions: {
        // CGNo: (value) => value.toString().length < 0? "Please Input CGNo" : null,
        // fromPlace : (value) => value.length < 0? "Please Input From Place" : null,
        // toPlace : (value) => value.length < 0? "Please Input To Place": null,
        // noOfArts: (value) => value.toString().length < 0? "Please Input No Of Arts" : null,
        // freight: (value) => value.toString().length < 0? "Please Input Freight" : null,
        // hamali: (value) => value.toString().length < 0? "Please Input Hamali" : null,
        // amount : (value) => value.toString().length < 0? "Please Input Amount" :null,
      },
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

  const TransactionData = useMemo(
    () => getTransactions.data,
    [getTransactions.data]
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
  }, [TransactionData, calculateNetAmount, calculateTotalAmount, isUpdate]);

  useEffect(() => {
    formRef.current.values.transactions.forEach((transaction, i) => {
      const calculateTransactionAmount =
        transaction.freight + transaction.hamali;
      formRef.current.setFieldValue(
        `transactions.${i}.amount`,
        calculateTransactionAmount ?? 0
      );
    });
  }, []);

  useEffect(() => {
    if (!TransactionData) {
      return;
    }

    if (isDuplicate) {
      formRef.current.setValues(
        getDuplicateData({
          ...TransactionData,
        })
      );
    }

    if (!!isUpdate && !isDuplicate) {
      formRef.current.setValues(
        getTransactionData({
          ...TransactionData,
        })
      );
    }
  }, [TransactionData, isDuplicate, isUpdate]);

  const handleSubmit = async (values: TransactionData) => {
    const { _id, invoiceDate, transactions, ...rest } = values;

    const getInvoiceDate = moment(new Date(invoiceDate)).unix();
    const transactionTransform: TransactionItemPayload[] = transactions.map(
      (val) => {
        return {
          ...val,
          date: moment(new Date(val.date)).unix(),
        };
      }
    );

    try {
      if (!!isUpdate && !isDuplicate) {
        const updateData: any = await updateTransaction({
          _id,
          invoiceDate: getInvoiceDate,
          transactions: transactionTransform,
          ...rest,
        });
        if (updateData.data.success) {
          showNotification({
            id: 'load-data',
            loading: updateTransactionLoading,
            title: 'Transaction',
            message: 'Transaction Updating...',
            autoClose: false,
            disallowClose: true,
          });

          updateNotification({
            id: 'load-data',
            color: 'teal',
            title: 'Transaction',
            message: updateData.data.message,
            icon: <Check size={16} />,
            autoClose: 2000,
          });
        }
      } else {
        const addData: any = await addTransaction({
          invoiceDate: getInvoiceDate,
          transactions: transactionTransform,
          ...rest,
        });
        if (addData.data.success) {
          showNotification({
            id: 'load-data',
            loading: addTransactionLoading,
            title: 'Transaction',
            message: 'Transaction Creating...',
            autoClose: false,
            disallowClose: true,
          });

          updateNotification({
            id: 'load-data',
            color: 'teal',
            title: 'Transaction',
            message: addData.data.message,
            icon: <Check size={16} />,
            autoClose: 2000,
          });
          form.reset();
        }
      }
    } catch (err) {
      console.log('error', err);
    } finally {
      getTransactions.refetch();
      navigate(`/${RoutesMapping.TransactionList}`);
    }
  };

  const handleAddTransaction = () => {
    form.insertListItem('transactions', {
      CGNo: 0,
      date: '',
      fromPlace: '',
      toPlace: '',
      noOfArts: 0,
      freight: 0,
      hamali: 0,
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

  // const clculateInvoiceNo = useMemo(() => {
  //   const { data } = getTransactions;
  //   const getLastIndex = data && data.length - 1;
  //   const getLastInvoiceNo = data && data[getLastIndex].invoiceNo;
  //   return getLastInvoiceNo + 1;
  // }, [getTransactions]);

  return (
    <Fragment>
      {getParties.isLoading && (
        <LoadingIndicator isLoading loadingType="overlay" />
      )}
      {parties && (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack sx={{ overflowY: 'hidden' }}>
            <Group position="apart">
              <Text weight={600} size={24}>
                Transaction
              </Text>
              <Text weight={600} size={18}>
                {/* InvoiceNo : AMS-{clculateInvoiceNo} */}
              </Text>
            </Group>
            <Paper radius="sm" sx={{}}>
              <SimpleGrid cols={2} px="sm" py="sm">
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Select
                    required
                    label="Parties"
                    placeholder="Parties"
                    nothingFound="No Parties Found"
                    data={parties}
                    searchable
                    {...form.getInputProps('partyName')}
                    sx={{ flex: 1 }}
                  />
                  <Stack justify="flex-end">
                    <Button
                      variant="outline"
                      leftIcon={<Plus />}
                      onClick={() =>
                        navigate(`/${RoutesMapping.PartiesList}/${id} `)
                      }
                    >
                      Party
                    </Button>
                  </Stack>
                </div>

                <DatePicker
                  dropdownType="modal"
                  placeholder="Invoice Date"
                  label="Invoice Date"
                  withAsterisk
                  inputFormat={format}
                  defaultValue={new Date()}
                  required
                  {...form.getInputProps('invoiceDate')}
                />
              </SimpleGrid>
            </Paper>
            <Paper
              radius="sm"
              sx={{
                minHeight: '24rem',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
              p="sm"
            >
              <Stack justify="space-between" sx={{ display: 'flex', flex: 1 }}>
                <Box>
                  <TranactionTable
                    areas={areas}
                    form={form}
                    handleAddTransaction={handleAddTransaction}
                  />
                  <Stack>
                    {form.values.transactions.map((element, i) => (
                      <TransactionCardView
                        key={i}
                        index={i}
                        areas={areas}
                        form={form}
                        handleAddTransaction={handleAddTransaction}
                      />
                    ))}
                  </Stack>
                </Box>
                <UnstyledButton type="button" onClick={handleAddTransaction}>
                  <Group spacing={4}>
                    <CirclePlus />
                    <Text weight={600} size="sm">
                      Add New
                    </Text>
                  </Group>
                </UnstyledButton>
                <Divider />
                <Box>
                  <Textarea
                    placeholder="Comments"
                    {...form.getInputProps('comments')}
                  />
                </Box>

                <Group
                  position="apart"
                  sx={(theme) => ({
                    borderTop: '1px solid',
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
