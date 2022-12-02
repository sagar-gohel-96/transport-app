import { SimpleGrid, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

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
} from 'chart.js';
import moment from 'moment';
import { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { User } from 'tabler-icons-react';
import { useTransaction } from '../../hooks';
import { FetchTransaction } from '../../types';
import { Card } from './components/Card';
import { BarChart } from './utils/barChart';
import { LineChart } from './utils/lineChart';

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
  const { getTransactions } = useTransaction('');
  const { data } = getTransactions;
  const matches = useMediaQuery('(max-width: 1200px)', true, {
    getInitialValueInEffect: false,
  });

  const currentMonth = new Date().getMonth() + 1;
  const currentMonthName = new Date().toLocaleString('default', {month: 'long'})
  const currentYearStartDate = moment().startOf('year').format("l"); 
  const currentYear = moment().year().toString()

  const filterCurrentMonthData = useMemo(
    () =>
      data &&
      data.filter((transaction: FetchTransaction) => {
        const transactionDate =
          new Date(
            moment.unix(transaction.invoiceDate).format('l')
          ).getMonth() + 1;
        return transactionDate === currentMonth;
      }),
    [currentMonth, data]
  );

  const filterCurrentYearUptoTodayData = useMemo(
    () =>
      data &&
      data.filter((transaction: FetchTransaction) => {
        const transactionDate = moment.unix(transaction.invoiceDate).format('l')
        return moment(transactionDate).isBetween(currentYearStartDate,new Date())
      }),
    [currentYearStartDate, data]
  );

  console.log(filterCurrentYearUptoTodayData)

  const calculateCurrentMonthTotalTransactionAmount = useMemo(
    () =>
    filterCurrentMonthData && filterCurrentMonthData.reduce(
        (acc: number, crr: { netAmount: number }) => acc + crr.netAmount,
        0
      ),
    [filterCurrentMonthData]
  );

  const calculateCurrentMonthTotalTransaction = useMemo(
    () => filterCurrentMonthData && filterCurrentMonthData.length,
    [filterCurrentMonthData]
  );

  const calculateCurrentYearTotalTransactionAmount = useMemo(
    () =>
    filterCurrentYearUptoTodayData && filterCurrentYearUptoTodayData.reduce(
        (acc: number, crr: { netAmount: number }) => acc + crr.netAmount,
        0
      ),
    [filterCurrentYearUptoTodayData]
  );

  const calculateCurrentYearTotalTransaction = useMemo(
    () => filterCurrentYearUptoTodayData && filterCurrentYearUptoTodayData.length,
    [filterCurrentYearUptoTodayData]
  );

  console.log(
    'calculateCurrentMonthTotalTransaction',
    
  );

  const DashboardCard = [
    {
      icon: <User size={38} />,
      label: 'Total Transaction',
      duration: currentMonthName,
      value: calculateCurrentMonthTotalTransaction,
    },
    {
      icon: <User size={38} />,
      label: 'Total Transaction Amount',
      duration: currentMonthName,
      value: `₹ ${calculateCurrentMonthTotalTransactionAmount}`,
    },
    {
      icon: <User size={38} />,
      label: 'Total Transaction',
      duration: currentYear,
      value: calculateCurrentYearTotalTransaction,
    },
    {
      icon: <User size={38} />,
      label: 'Total Transaction Amount',
      duration: currentYear,
      value: `₹ ${calculateCurrentYearTotalTransactionAmount}`,
    },
  ];

  return (
    <Stack>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 1500, cols: 2, spacing: 'md' },
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {DashboardCard.map((item, i) => (
          <Card
            key={i}
            icon={item.icon}
            lable={item.label}
            value={item.value}
            duration={item.duration}
          />
        ))}
      </SimpleGrid>

      <SimpleGrid cols={matches ? 1 : 2}>
        {/* <Card>
          <Bar options={BarChart.options} data={BarChart.data} />
        </Card>
        <Card>
          <Line options={LineChart.options} data={LineChart.data} />
        </Card> */}
      </SimpleGrid>
    </Stack>
  );
};
