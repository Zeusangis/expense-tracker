"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createExpense(
  title: string,
  amount: number,
  categoryId: string
) {
  try {
    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        categoryId,
      },
    });
    console.log("Created expense:", expense);
    revalidatePath("/expenses");
    return { success: true, expense };
  } catch (error) {
    console.error("Error creating expense:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
