import { Button } from "@/components/ui/button";
import { AddCircle } from "iconsax-react";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

const AddExpenseDialog = () => {
  const onAddClick = () => {
    console.log("object");
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center justify-center cursor-pointer">
          <span onClick={onAddClick}>
            <AddCircle size="22" color="#000000" />
          </span>
        </DialogTrigger>
        <DialogContent className="w-[280px] border-gray-200 p-4 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-left">Add Expense</DialogTitle>
            <div className="py-5">
              <form action="">
                <div className="space-y-4">
                  <Input placeholder="Enter expense name" />
                  <Input placeholder="Enter amount" />
                  <div>
                    <Select>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-200">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-5">
                  <Button className="">Add</Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddExpenseDialog;
