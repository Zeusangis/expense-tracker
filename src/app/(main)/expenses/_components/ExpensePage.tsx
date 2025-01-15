"use client";

import AddExpenseDialog from "./AddExpenseDialog";

export default function ExpensesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <AddExpenseDialog />
      </div>
    </div>
  );
}
