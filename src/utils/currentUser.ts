import { getSession } from "@/actions/auth/session";
import prisma from "@/lib/db";

export const getCurrentUser = async () => {
  const session = await getSession();
  const user = await prisma.user.findFirst({
    where: {
      id: session?.id as string | undefined,
    },
  });
  return user;
};
