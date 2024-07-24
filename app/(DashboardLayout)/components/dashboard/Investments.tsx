import React from "react";
import { useTheme } from "@mui/material/styles";
import BaseCard from "../shared/DashboardCard";
import Chart from "react-apexcharts";

const Investments = () => {
  const theme = useTheme();

  const state = {
    options: {
      chart: {
        id: "investments",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <BaseCard title="Investments">
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width="100%"
        height="200"
      />
    </BaseCard>
  );
};

export default Investments;
