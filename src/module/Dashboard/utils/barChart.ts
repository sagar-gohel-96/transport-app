import { faker } from "@faker-js/faker";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Transactions",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      }
    },
    y: {
      grid: {
        display: false,
      },

    }
  }
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Per Week",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },

  ], grid: {
    display: false,
  }
};

export const BarChart = { options, labels, data };
