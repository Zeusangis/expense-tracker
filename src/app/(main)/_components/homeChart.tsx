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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react";

interface HomeProps {
  transformedData: {
    date: string;
    expense: number;
  }[];
}

export default function Home({ transformedData: data }: HomeProps) {
  const total = data.reduce((acc, { expense }) => acc + expense, 0);

  const weeklyTotal = data.reduce((acc, { expense }, index) => {
    const weekIndex = Math.floor(index / 7);
    if (!acc[weekIndex]) {
      acc[weekIndex] = 0;
    }
    acc[weekIndex] += expense;
    return acc;
  }, [] as number[]);

  const monthlyTotal = data.reduce((acc, { expense }, index) => {
    const monthIndex = Math.floor(index / 30);
    if (!acc[monthIndex]) {
      acc[monthIndex] = 0;
    }
    acc[monthIndex] += expense;
    return acc;
  }, [] as number[]);

  console.log(weeklyTotal);
  console.log(total);
  return (
    <>
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="py-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium opacity-80">
              Total Expense
            </CardTitle>
            <CardDescription className="text-sm font-light text-purple-100">
              Last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline">
                <DollarSign className="w-8 h-8 mr-2" />
                <span className="text-4xl font-bold">{total.toFixed(2)}</span>
              </div>
              {monthlyTotal.length > 1 && (
                <div
                  className={`flex items-center ${
                    monthlyTotal[monthlyTotal.length - 1] >
                    monthlyTotal[monthlyTotal.length - 2]
                      ? "text-red-300"
                      : "text-green-300"
                  }`}
                >
                  {monthlyTotal[monthlyTotal.length - 1] >
                  monthlyTotal[monthlyTotal.length - 2] ? (
                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {Math.abs(
                      ((monthlyTotal[monthlyTotal.length - 1] -
                        monthlyTotal[monthlyTotal.length - 2]) /
                        monthlyTotal[monthlyTotal.length - 2]) *
                        100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4 text-sm">
              <span className="opacity-80">Weekly average: </span>
              <span className="font-semibold">
                ${(total / weeklyTotal.length).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
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
            className="h-auto w-[295px]"
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
    </>
  );
}
