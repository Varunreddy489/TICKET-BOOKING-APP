import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "@/components/ui/chart";

const data = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 15000 },
  { name: "Mar", revenue: 18000 },
  { name: "Apr", revenue: 22000 },
  { name: "May", revenue: 28000 },
  { name: "Jun", revenue: 32000 },
  { name: "Jul", revenue: 38000 },
  { name: "Aug", revenue: 35000 },
  { name: "Sep", revenue: 30000 },
  { name: "Oct", revenue: 25000 },
  { name: "Nov", revenue: 22000 },
  { name: "Dec", revenue: 28000 },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue from ticket sales</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip
              formatter={(value) => [`$${value}`, "Revenue"]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Bar
              dataKey="revenue"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
