import React from "react";
import { Button } from "./ui/button";

export default function ExpenseItem({ expense, onDelete, onEdit }) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-100 p-4 rounded-md">
      <div className="mb-2 sm:mb-0">
        <h3 className="font-semibold">{expense.description}</h3>
        <p className="text-sm text-gray-600">
          {new Date(expense.date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600"> Expense Type: {expense.type}</p>
        <p className="text-sm text-gray-600">
          Payment Method: {expense.paymentMethod}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold">${expense.amount.toFixed(2)}</span>
        <Button onClick={() => onEdit(expense)} variant="outline" size="sm">
          Edit
        </Button>
        <Button
          className="text-white bg-red-700"
          onClick={() => onDelete(expense.id)}
          variant="destructive"
          size="sm"
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
