import React from "react";
import Home from "./_components/homeChart";
import { getCurrentUser } from "@/utils/currentUser";
import prisma from "@/lib/db";
import { formatDate } from "date-fns";
import PieChartComponent from "./_components/pieChart";

async function HomePage() {
  const user = await getCurrentUser();
  const rawData = await prisma.expense.findMany({
    where: { userId: user?.id },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });

  const dailyExpenses = rawData.reduce<Record<string, number>>(
    (acc, expense) => {
      const date = formatDate(new Date(expense.createdAt), "MMM dd");
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += expense.amount;
      return acc;
    },
    {}
  );

  const transformedData = Object.entries(dailyExpenses).map(
    ([date, value]) => ({
      date,
      expense: value,
    })
  );

  console.log(transformedData); // Log the transformed data

  return (
    <div className="min-h-[446.5px] max-h-[519px] overflow-y-auto">
      <Home transformedData={transformedData} />
      <div className="flex h-auto justify-center items-center mt-6">
        <PieChartComponent />
      </div>
    </div>
  );
}

export default HomePage;
