"use client";

import { Button } from "@/components/ui/button";
import { AddCircle } from "iconsax-react";
import { useState } from "react";

export default function ExpensesPage() {
  const [, setAddOpen] = useState(false);

  const onAddClick = () => {
    console.log("object");
    setAddOpen(true);
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Expenses</h1>
      <Button onClick={onAddClick} variant="ghost">
        <AddCircle className="w-10 h-10" color="#000000" />
      </Button>
    </div>
  );
}
