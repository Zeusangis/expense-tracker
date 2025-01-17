"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteExpense(id: string) {
  try {
    await prisma.expense.delete({
      where: { id: id },
    });
    revalidatePath("/expenses");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete expense:", error);
    return { success: false, error: "Failed to delete expense" };
  }
}
