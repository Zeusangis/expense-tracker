import React from "react";
import Home from "./_components/homeChart";
import { getCurrentUser } from "@/utils/currentUser";
import prisma from "@/lib/db";
import { formatDate } from "date-fns";

async function HomePage() {
  const user = await getCurrentUser();
  const rawData = await prisma.expense.findMany({
    where: { userId: user?.id },
    // orderBy: { createdAt: "asc" },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });

  const dailyExpenses = rawData.reduce<Record<string, number>>(
    (acc, expense) => {
      // const date = new Date(expense.createdAt).toISOString().split("T")[0];
      const date = formatDate(new Date(expense.createdAt), "MMM dd");
      if (!acc[date]) {
        acc[date] = 0; // Initialize the date key if not present
      }
      acc[date] += expense.amount; // Accumulate the expense amount for the date
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
    <div>
      <Home transformedData={transformedData} />
    </div>
  );
}

export default HomePage;
