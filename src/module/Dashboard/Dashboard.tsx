import { Card, SimpleGrid, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

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
import { Bar, Line } from "react-chartjs-2";
import { BarChart } from "./utils/barChart";
import { LineChart } from "./utils/lineChart";

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

const DashboardCard = [
  {
    title: "Total Merchant",
    totalNumber: "1025",
  },
  {
    title: "Total New Merchant",
    totalNumber: "556",
  },
  {
    title: "Total Order",
    totalNumber: "480",
  },
  {
    title: "Total Transection",
    totalNumber: "3000",
  },
];

export const Dashboard = () => {
  const matches = useMediaQuery("(max-width: 1200px)", true, {
    getInitialValueInEffect: false,
  });

  return (
    <Stack>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "md" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {DashboardCard.map((item, i) => (
          <Card
            key={i}
            shadow="sm"
            p="lg"
            radius="md"
            sx={(theme) => ({
              backgroundImage: theme.fn.gradient({
                from: theme.colors.primaryBlue[4],
                to: theme.colors.primaryBlue[3],
                deg: 0,
              }),
            })}
          >
            <Card.Section withBorder inheritPadding p="xs">
              <Text>{item.title}</Text>
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={matches ? 1 : 2}>
        <Card>
          <Bar options={BarChart.options} data={BarChart.data} />
        </Card>
        <Card>
          <Line options={LineChart.options} data={LineChart.data} />
        </Card>
      </SimpleGrid>
    </Stack>
  );
};
