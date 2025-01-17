"use client";

import React from "react";
import { Trash } from "iconsax-react";
import { deleteExpense } from "@/actions/delete-actions";
import { useTransition } from "react";

interface DeleteButtonProps {
  id: string;
}

function DeleteButton({ id }: DeleteButtonProps) {
  const [, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteExpense(id);
      if (!result.success) {
        // Handle error (e.g., show a toast notification)
        console.error(result.error);
      }
    });
  };

  return (
    // spinner if deleting
    <span
      className="bg-red-100 p-1.5 rounded transition-colors duration-300 cursor-pointer"
      onClick={handleDelete}
      aria-label="Delete expense"
    >
      <Trash size="12" color="red" />
    </span>
  );
}

export default DeleteButton;
