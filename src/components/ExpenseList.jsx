import React from "react";
import ExpenseItem from "./ExpenseItem";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function ExpenseList({
  expenses,
  onDeleteExpense,
  onEditExpense,
  onClose,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
      >
        <X className="h-4 w-4" />
      </Button>
      <h2 className="text-2xl font-semibold mb-4">Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onDelete={onDeleteExpense}
              onEdit={onEditExpense}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
