import { getCategories } from "@/actions/category";
import AddExpenseDialog from "./AddExpenseDialog";

export default async function ExpensesPage() {
  const categories = (await getCategories()) || [];
  console.log(categories);
  return (
    <div>
      <div className="flex items-center justify-between h-fit">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <AddExpenseDialog categories={categories} />
      </div>
    </div>
  );
}
