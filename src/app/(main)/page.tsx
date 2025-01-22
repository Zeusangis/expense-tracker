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
    include: {
      category: true, // Include the category relation
    },
  });

  // Process data for the pie chart
  const categoryExpenses = rawData.reduce((acc, expense) => {
    const categoryName = expense.category?.name || "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    acc[categoryName] += expense.amount || 0;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(categoryExpenses).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Process data for the daily expenses chart
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

  return (
    <>
      {transformedData.length > 0 ? (
        <div className="min-h-[446.5px] max-h-[519px] overflow-y-auto scrollbar-hide">
          <Home transformedData={transformedData} />
          <div className="flex h-auto justify-center items-center mt-6">
            <PieChartComponent data={pieChartData} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[446.5px]">
          <p className="text-gray-500 text-lg">No expenses found</p>
        </div>
      )}
    </>
  );
}

export default HomePage;
