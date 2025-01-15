"use client";
import { Button } from "@/components/ui/button";
import { AddCircle } from "iconsax-react";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import { createExpense } from "@/actions/expense";

interface AddExpenseDialogProps {
  categories: Category[];
}

const AddExpenseDialog = ({ categories }: AddExpenseDialogProps) => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    amount: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const response = await createExpense(
        formDetails.name,
        parseFloat(formDetails.amount),
        formDetails.categoryId
      );

      if (response.success) {
        setFormDetails({ name: "", amount: "", categoryId: "" });
        setError(null);
        document.getElementById("expenseAddDialog")?.click();
      } else {
        setError("Failed to add expense. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="cursor-pointer">
          <AddCircle className="size-6 stroke-black block" />
        </DialogTrigger>
        <DialogContent className="w-[280px] border-gray-200 p-4 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-left">Add Expense</DialogTitle>
            <div className="py-5">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    value={formDetails.name}
                    onChange={(e) =>
                      setFormDetails({ ...formDetails, name: e.target.value })
                    }
                    placeholder="Enter expense name"
                    required
                  />
                  <Input
                    value={formDetails.amount}
                    onChange={(e) =>
                      setFormDetails({ ...formDetails, amount: e.target.value })
                    }
                    placeholder="Enter amount"
                    type="number"
                    min="1"
                    max={Number.MAX_SAFE_INTEGER}
                    required
                  />
                  <div>
                    <Select
                      value={formDetails.categoryId}
                      onValueChange={(value) =>
                        setFormDetails({ ...formDetails, categoryId: value })
                      }
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-200">
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <div className="flex justify-end mt-5">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
        <DialogClose id="expenseAddDialog" />
      </Dialog>
    </div>
  );
};

export default AddExpenseDialog;
