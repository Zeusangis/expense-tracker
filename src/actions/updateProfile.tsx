"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function updateProfile(
  userId: string,
  name: string,
  email: string,
  password: string | null
) {
  try {
    let hashedPassword = null;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
        email: email,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });

    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    };
  }
}
