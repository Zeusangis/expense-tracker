"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Food & Dining", value: 350, color: "#FF6384" },
  { name: "Transportation", value: 250, color: "#36A2EB" },
  { name: "Shopping", value: 200, color: "#FFCE56" },
  { name: "Utilities", value: 150, color: "#4BC0C0" },
  { name: "Entertainment", value: 100, color: "#9966FF" },
  { name: "Other", value: 50, color: "#FF9F40" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface payloadPropType {
  payload: {
    name: string;
    value: number;
    color: string;
    payload: { value: number };
  }[];
}

const CustomLegend = ({ payload }: payloadPropType) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">
            {entry.value} - ${data[index].value} (
            {((data[index].value / entry.payload.value) * 100).toFixed(1)}%)
          </span>
        </div>
      ))}
    </div>
  );
};

const ExpensePieChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="max-w-[300px] bg-white shadow-none border-none flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer
          config={Object.fromEntries(
            data.map((item) => [
              item.name,
              { label: item.name, color: item.color },
            ])
          )}
          className="h-[310px] w-[200px]"
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="-100%"
                cy="25%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "transparent" }}
              />
              <Legend
                layout="vertical"
                align="left"
                verticalAlign="bottom"
                formatter={(value, entry) => (
                  <span className="text-xs">
                    {value} - ${entry.payload?.value}
                  </span>
                )}
                wrapperStyle={{
                  paddingTop: "20px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensePieChart;
