"use server";

import { revalidatePath } from "next/cache";

// fetch products from prisma and return
export async function fetchProducts() {
  //   return dummyProducts;
}

export async function deleteProduct(id: number) {
  //   return dummyProducts.filter((product) => product.id !== id);
  revalidatePath("/products", "layout");
}
