"use server";

import prisma from "@/lib/db";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
  }
}
