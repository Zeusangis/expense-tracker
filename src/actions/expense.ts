"use server";

import prisma from "@/lib/db";
import { getCurrentUser } from "@/utils/currentUser";
import { revalidatePath } from "next/cache";

export async function createExpense(
  title: string,
  amount: number,
  categoryId: string
) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return {
      success: false,
      error: "User not authenticated",
    };
  }

  try {
    const expense = await prisma.expense.create({
      data: {
        userId: user.id,
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
