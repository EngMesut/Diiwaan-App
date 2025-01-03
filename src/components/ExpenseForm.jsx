import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function ExpenseForm({
  onAddExpense,
  editingExpense,
  onEditExpense,
  customExpenseTypes,
  onAddExpenseType,
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setDate(editingExpense.date);
      setType(editingExpense.type);
      setPaymentMethod(editingExpense.paymentMethod);
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setDate("");
    setType("");
    setPaymentMethod("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount && date && type && paymentMethod) {
      const expenseData = {
        description,
        amount: parseFloat(amount),
        date,
        type,
        paymentMethod,
      };
      if (editingExpense) {
        onEditExpense(editingExpense.id, expenseData);
      } else {
        onAddExpense(expenseData);
      }
      resetForm();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-8 expense-form"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {editingExpense ? "Edit Expense" : "Add New Expense"}
      </h2>
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Expense Type
        </label>
        <div className="flex items-center">
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Type</option>
            <option value="employee">Employee</option>
            <option value="vendor">Vendor</option>
            {customExpenseTypes.map((customType, index) => (
              <option key={index} value={customType}>
                {customType}
              </option>
            ))}
          </select>
          <Button
            type="button"
            onClick={onAddExpenseType}
            variant="outline"
            size="icon"
            className="ml-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="paymentMethod"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Payment Method
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Payment Method</option>
          <option value="cashBank">Cash/Bank</option>
          <option value="invoice">Invoice (Payable)</option>
        </select>
      </div>
      <Button type="submit" className="w-full">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </Button>
    </form>
  );
}
