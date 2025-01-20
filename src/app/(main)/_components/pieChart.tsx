"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const RADIAN = Math.PI / 180;
const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FF6384",
  "#C9CBCF",
  "#4BC0C0",
  "#FF6384",
];

// Customized label for the pie chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
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

const ExpensePieChart = ({
  data,
}: {
  data: Array<{ name: string; value: number }>;
}) => {
  const chartData = useMemo(() => {
    return Array.isArray(data) && data.length > 0
      ? data
      : [{ name: "No Data", value: 1 }];
  }, [data]);

  const colorMap = useMemo(() => {
    return Object.fromEntries(
      chartData.map((item, index) => [item.name, COLORS[index % COLORS.length]])
    );
  }, [chartData]);

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
            chartData.map((item) => [
              item.name,
              { label: item.name, color: colorMap[item.name] },
            ])
          )}
          className="h-[310px] w-full"
        >
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorMap[entry.name]}
                  strokeWidth={0}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="center"
              verticalAlign="bottom"
              formatter={(value, entry: any) => (
                <span className="text-xs">{`${value} - $${
                  entry.payload?.value || 0
                }`}</span>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensePieChart;
