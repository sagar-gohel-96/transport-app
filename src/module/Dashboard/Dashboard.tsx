import { Card, Group, SimpleGrid, Stack, UnstyledButton } from "@mantine/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ColumnDef } from "@tanstack/react-table";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import moment from "moment";
import { useMemo } from "react";
import { CurrencyRupee, Download, TrendingUp } from "tabler-icons-react";
import { Table } from "../../components/common";
import { useCompanies, useParties, useTransaction } from "../../hooks";
import { FetchTransaction } from "../../types";
import { format } from "../../utils";
import { Formatter } from "../../utils/formatter";
import { TransactionChallan } from "../TransactionList";
import { TileCard } from "./components/TileCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const { getTransactions } = useTransaction("");
  const { data } = getTransactions;
  const { getCompanies } = useCompanies("");
  const { getParties } = useParties("");

  const currentMonth = new Date().getMonth() + 1;
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });
  const currentYearStartDate = moment().startOf("year").format("l");
  const currentYear = moment().year().toString();

  const filterCurrentMonthData = useMemo(
    () =>
      data &&
      data.filter((transaction: FetchTransaction) => {
        const transactionDate =
          new Date(
            moment.unix(transaction.invoiceDate).format("l")
          ).getMonth() + 1;
        return transactionDate === currentMonth;
      }),
    [currentMonth, data]
  );

  const filterCurrentYearData = useMemo(
    () =>
      data &&
      data.filter((transaction: FetchTransaction) => {
        const transactionDate = moment
          .unix(transaction.invoiceDate)
          .format("l");
        return moment(transactionDate).isBetween(
          currentYearStartDate,
          new Date()
        );
      }),
    [currentYearStartDate, data]
  );

  const currMonthTotalTransactionAmount = useMemo(
    () =>
      filterCurrentMonthData &&
      filterCurrentMonthData.reduce(
        (acc: number, crr: { netAmount: number }) => acc + crr.netAmount,
        0
      ),
    [filterCurrentMonthData]
  );

  const currMonthTotalTransaction = useMemo(
    () => filterCurrentMonthData && filterCurrentMonthData.length,
    [filterCurrentMonthData]
  );

  const currMonthTransactonAmount = useMemo(
    () =>
      filterCurrentYearData &&
      filterCurrentYearData.reduce(
        (acc: number, crr: { netAmount: number }) => acc + crr.netAmount,
        0
      ),
    [filterCurrentYearData]
  );

  const currYearTotalTransction = useMemo(
    () => filterCurrentYearData && filterCurrentYearData.length,
    [filterCurrentYearData]
  );

  const DashboardCard = [
    {
      icon: <TrendingUp size={38} />,
      iconColor: "#FF922B",
      label: "Total Transaction",
      duration: `In ${currentMonthName}`,
      value: currMonthTotalTransaction,
    },
    {
      icon: <CurrencyRupee size={38} />,
      iconColor: "#51CF66",
      label: "Total Transaction Amount",
      duration: `In ${currentMonthName}`,
      value: Formatter.formatCurrency(
        currMonthTotalTransactionAmount,
        "INR",
        2
      ),
    },
    {
      icon: <TrendingUp size={38} />,
      iconColor: "#FF922B",
      label: "Total Transaction",
      duration: `In ${currentYear}`,
      value: currYearTotalTransction,
    },
    {
      icon: <CurrencyRupee size={38} />,
      iconColor: "#51CF66",
      label: "Total Transaction Amount",
      duration: `In ${currentYear}`,
      value: Formatter.formatCurrency(currMonthTransactonAmount, "INR", 2),
    },
  ];

  const columns = useMemo<ColumnDef<FetchTransaction>[]>(
    () => [
      {
        header: "#",
        cell: (info) => parseInt(info.row.id) + 1,
        footer: (props) => props.column.id,
      },
      {
        header: "Invoice No",
        accessorKey: "invoiceNo",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Invoice Date",
        accessorKey: "invoiceDate",
        cell: (info) => moment.unix(info.getValue() as number).format(format),
        footer: (props) => props.column.id,
      },
      {
        header: "Party Name",
        accessorKey: "partyName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Net Amount",
        accessorKey: "netAmount",
        cell: (info) =>
          Formatter.formatCurrency(
            parseInt(info.getValue() as string, 10),
            "INR",
            2
          ),
        footer: (props) => props.column.id,
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div>
            <Group spacing={8}>
              <UnstyledButton>
                <PDFDownloadLink
                  document={
                    <TransactionChallan
                      parties={getParties.data ?? []}
                      companies={getCompanies.data ?? []}
                      data={row.original ?? []}
                    />
                  }
                  fileName="Transaction-Challan.pdf"
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                  }}
                >
                  <Download />
                </PDFDownloadLink>
              </UnstyledButton>
            </Group>
          </div>
        ),
      },
    ],
    [getCompanies.data, getParties.data]
  );

  return (
    <Stack>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1500, cols: 2, spacing: "md" },
          { maxWidth: 980, cols: 2, spacing: "md" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {DashboardCard.map((item, i) => (
          <TileCard key={i} item={item} />
        ))}
      </SimpleGrid>

      <SimpleGrid
        breakpoints={[
          { minWidth: 1500, cols: 2, spacing: "md" },
          { maxWidth: 980, cols: 1, spacing: "md" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        <Card>
          <Table
            columns={columns}
            data={getTransactions.data ? getTransactions.data : []}
            pagination
            toolbarProps={{
              title: "Last Transaction",
            }}
            isLoading={getTransactions.isLoading}
            LoadingType="relative"
          />
        </Card>
        <Card>
          <Table
            columns={columns}
            data={getTransactions.data ? getTransactions.data : []}
            pagination
            toolbarProps={{
              title: "Most Recent Transaction",
            }}
            isLoading={getTransactions.isLoading}
            LoadingType="relative"
          />
        </Card>
      </SimpleGrid>
    </Stack>
  );
};
