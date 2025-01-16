import { getCategories } from "@/actions/category";
import AddExpenseDialog from "./AddExpenseDialog";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/utils/currentUser";

export default async function ExpensesPage() {
  const user = await getCurrentUser();
  const expenses = await prisma.expense.findMany({
    where: {
      userId: user?.id,
    },
  });
  console.log(expenses);
  const categories = (await getCategories()) || [];
  return (
    <div>
      <div className="flex items-center justify-between h-fit">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <AddExpenseDialog categories={categories} />
      </div>
      <div className="flex items-center justify-between mt-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-2 border-b"
          >
            <h2 className="text-lg font-semibold">{expense.title}</h2>
            <p className="text-sm">{expense.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
