import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import BaseCard from "../shared/BaseCard";

const investmentData = [
  { date: "Aug", value: 1000 },
  { date: "Sep", value: 1050 },
  { date: "Oct", value: 1020 },
  { date: "Nov", value: 1080 },
  { date: "Dec", value: 1120 },
  { date: "Jan", value: 1150 },
  { date: "Feb", value: 1200 },
  { date: "Mar", value: 1250 },
  { date: "Apr", value: 1220 },
  { date: "May", value: 1300 },
  { date: "Jun", value: 1280 },
  { date: "Jul", value: 1350 },
];

const tradingData = [
  { date: "19-07", value: 105.12 },
  { date: "20-07", value: 106.58 },
  { date: "21-07", value: 105.55 },
  { date: "22-07", value: 101.2 },
  { date: "23-07", value: 103.57 },
  { date: "24-07", value: 105.88 },
  { date: "25-07", value: 107.95 },
  { date: "26-07", value: 103.25 },
  { date: "27-07", value: 108.11 },
  { date: "28-07", value: 110.2 },
  { date: "29-07", value: 113.84 },
  { date: "30-07", value: 110.87 },
];

type Props = {
  title: string;
};

const FinChart: React.FC<Props> = ({ title }) => {
  return (
    <BaseCard title={title}>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={title === "Investments" ? investmentData : tradingData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis
            domain={title === "Investments" ? [1020, 1350] : [101.2, 113.84]}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#0473ea", color: "#fff" }}
            itemStyle={{ color: "#fff", fontFamily: "Arial, sans-serif" }}
          />
          <Brush dataKey="date" height={30} stroke="#0083B3" />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0473ea"
            fillOpacity={0.3}
            fill="#0473ea"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </BaseCard>
  );
};

export default FinChart;
