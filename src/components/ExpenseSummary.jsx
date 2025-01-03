import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ExpenseSumary({
  expenses,
  filteredExpenses,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
}) {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenseTypes, setExpenseTypes] = useState({ employee: 0, vendor: 0 });
  const [paymentMethods, setPaymentMethods] = useState({
    cashBank: 0,
    bank: 0,
    invoice: 0,
  });

  useEffect(() => {
    const total = filteredExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setTotalExpenses(total);

    const types = filteredExpenses.reduce(
      (acc, expense) => {
        acc[expense.type] = (acc[expense.type] || 0) + expense.amount;
        return acc;
      },
      { employee: 0, vendor: 0 }
    );
    setExpenseTypes(types);

    const methods = filteredExpenses.reduce(
      (acc, expense) => {
        acc[expense.paymentMethod] =
          (acc[expense.paymentMethod] || 0) + expense.amount;
        return acc;
      },
      { cashBank: 0, bank: 0, invoice: 0 }
    );
    setPaymentMethods(methods);
  }, [filteredExpenses]);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const setToday = () => {
    const today = new Date();
    onStartDateChange(formatDate(today));
    onEndDateChange(formatDate(today));
    onFilter();
  };

  const setYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    onStartDateChange(formatDate(yesterday));
    onEndDateChange(formatDate(yesterday));
    onFilter();
  };

  const handleStartDateChange = (date) => {
    onStartDateChange(date);
  };

  const handleEndDateChange = (date) => {
    onEndDateChange(date);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Expense Summary</h2>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mb-4 flex space-x-4">
        <Button onClick={setToday} variant="outline">
          Today
        </Button>
        <Button onClick={setYesterday} variant="outline">
          Yesterday
        </Button>
        <Button onClick={onFilter} variant="default">
          Save
        </Button>
      </div>
      <div className="space-y-2">
        <p className="text-lg">
          Total Expenses:{" "}
          <span className="font-bold">${totalExpenses.toFixed(2)}</span>
        </p>

        <p className="text-sm text-gray-600">
          Vendor Expenses: ${expenseTypes.vendor.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">
          Employee Expenses: ${expenseTypes.employee.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">
          Cash/Bank: ${paymentMethods.cashBank.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">
          Invoice Payments: ${paymentMethods.invoice.toFixed(2)}
        </p>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Total number of expenses: {expenses.length}
      </p>
    </div>
  );
}
