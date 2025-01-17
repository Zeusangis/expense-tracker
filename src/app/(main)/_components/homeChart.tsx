"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface HomeProps {
  transformedData: {
    date: string;
    expense: number;
  }[];
}

export default function Home({ transformedData: data }: HomeProps) {
  return (
    <div className="overflow-hidden">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex justify-center items-center">
        <ScrollArea className="h-full w-[300px] -ml-6 mt-6 bg-gray-100 rounded-lg p-2">
          <ChartContainer
            config={{
              sales: {
                label: "Daily Expenses",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-full w-[295px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="var(--color-sales)"
                  name="Daily Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ScrollArea>
      </div>
    </div>
  );
}
