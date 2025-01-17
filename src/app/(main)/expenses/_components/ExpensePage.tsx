import { getCategories } from "@/actions/category";
import AddExpenseDialog from "./AddExpenseDialog";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/utils/currentUser";
import { formatDistanceToNow } from "date-fns";
import DeleteButton from "./DeleteButton";
import { DollarCircle } from "iconsax-react";
import { DollarSign } from "lucide-react";

export default async function ExpensesPage() {
  const user = await getCurrentUser();
  const expenses = await prisma.expense.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const categories = (await getCategories()) || [];

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div>
      <div className="flex-none">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold text-gray-800">Expenses</h1>
          <AddExpenseDialog categories={categories} />
        </div>
        <p className="flex items-center justify-end gap-1 font-bold text-green-600 mb-2">
          <DollarCircle size="16" color="green" />
          <span>{totalExpenses.toFixed(2)}</span>
        </p>
      </div>

      <div className="max-h-[446.5px] overflow-y-scroll scrollbar-hide">
        {expenses.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            No expenses found. Add your first expense!
          </p>
        ) : (
          <ul className="space-y-3 ">
            {expenses.map((expense) => {
              const category = categories.find(
                (c) => c.id === expense.categoryId
              );
              return (
                <li
                  key={expense.id}
                  className="py-2 px-3 bg-white rounded-lg shadow-xs"
                >
                  <div className="">
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <h2 className="font-medium capitalize text-gray-900">
                          {expense.title}
                        </h2>
                        {category && (
                          <span className="ml-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                            {category.name}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(expense.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="flex items-center justify-start font-bold text-xs my-2">
                        <DollarSign size="11" color="black" />
                        <span>{expense.amount.toFixed(2)}</span>
                      </p>
                      <DeleteButton id={expense.id} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
