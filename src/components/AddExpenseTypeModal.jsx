import React, { useState } from "react";
import { Button } from "./ui/button";

export default function AddExpenseTypeModal({ isOpen, onClose, onAddType }) {
  const [newType, setNewType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newType.trim()) {
      onAddType(newType.trim());
      setNewType("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Expense Type</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="Enter new expense type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Type</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
