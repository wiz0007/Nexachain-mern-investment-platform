import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";

interface Props {
  data: any[];
}

const EarningsChart = ({
  data,
}: Props) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <LineChart data={data}>
        <CartesianGrid />

        <XAxis
          dataKey="date"
        />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="roi"
        />

        <Line
          type="monotone"
          dataKey="levelIncome"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EarningsChart;