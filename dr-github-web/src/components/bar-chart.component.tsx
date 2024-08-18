import {
  Bar,
  BarChart as BarChartOrg,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ChartDataType = {
  name: string;
  value: number;
};

type BarChartProps = {
  data: ChartDataType[];
};

export const BarChart = ({ data = [] }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" aspect={16 / 9}>
      <BarChartOrg width={150} height={40} data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f1f1" stopOpacity={1} />
            <stop offset="100%" stopColor="#f1f1f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Bar
          dataKey="value"
          style={{
            filter: `drop-shadow(0px 1px 3px #fff)`,
          }}
          fill="url(#colorUv)"
        />
        <XAxis
          dataKey="name"
          className="text-white"
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          dataKey="value"
          className="text-white"
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          label={false}
          content={(value) => {
            const tooltipValue: number | undefined =
              value?.payload?.[0]?.payload?.value;
            const tooltipName: number | undefined =
              value?.payload?.[0]?.payload?.name;

            return (
              <span className="rounded-md bg-white px-2 py-1 text-sm text-black">
                {tooltipValue} {tooltipName}
              </span>
            );
          }}
          cursor={false}
        />
      </BarChartOrg>
    </ResponsiveContainer>
  );
};
