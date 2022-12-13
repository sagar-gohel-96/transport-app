import { Card, Group, SimpleGrid, Stack } from "@mantine/core";

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
import { Bar } from "react-chartjs-2";
import moment from "moment";
import { useMemo } from "react";
import { CurrencyRupee, TrendingUp } from "tabler-icons-react";
import { useTransaction } from "../../hooks";
import { FetchTransaction } from "../../types";
import { Formatter } from "../../utils/formatter";
import { TileCard } from "./components";
import { LastTransaction } from "./LastTransaction";
import { MostRecentTransaction } from "./MostRecentTransaction";
import { BarChart } from "./utils/barChart";

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
      label: "Transaction",
      duration: `In ${currentMonthName}`,
      value: currMonthTotalTransaction,
    },
    {
      icon: <CurrencyRupee size={38} />,
      iconColor: "#51CF66",
      label: "Amount",
      duration: `In ${currentMonthName}`,
      value: `${Formatter.formatCurrency(
        currMonthTotalTransactionAmount,
        "INR",
        2
      )}`,
    },
    {
      icon: <TrendingUp size={38} />,
      iconColor: "#FF922B",
      label: "Transaction",
      duration: `In ${currentYear}`,
      value: currYearTotalTransction,
    },
    {
      icon: <CurrencyRupee size={38} />,
      iconColor: "#51CF66",
      label: "Amount",
      duration: `In ${currentYear}`,
      value: Formatter.formatCurrency(currMonthTransactonAmount, "INR", 2),
    },
  ];

  return (
    <Stack>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1500, cols: 4, spacing: "md" },
          { maxWidth: 1280, cols: 3, spacing: "md" },
          { maxWidth: 1080, cols: 2, spacing: "md" },
          { maxWidth: 600, cols: 1, spacing: "md" },
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
          <MostRecentTransaction />
        </Card>
        <Card>
          <LastTransaction />
        </Card>
      </SimpleGrid>
      <Card>
        <Group>
          <Bar options={BarChart.options} data={BarChart.data} />
        </Group>
      </Card>
    </Stack>
  );
};
