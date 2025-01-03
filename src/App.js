import React, { useState, useCallback } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import AddExpenseTypeModal from "./components/AddExpenseTypeModal";
import { Button } from "./components/ui/button";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [showExpenseList, setShowExpenseList] = useState(false);
  const [customExpenseTypes, setCustomExpenseTypes] = useState([]);
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    );
    setEditingExpense(null);
  };

  const filterExpenses = useCallback(() => {
    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();
      return expenseDate >= start && expenseDate <= end;
    });
    setFilteredExpenses(filtered);
  }, [expenses, startDate, endDate]);

  const toggleExpenseList = () => {
    setShowExpenseList(!showExpenseList);
  };

  const addCustomExpenseType = (newType) => {
    setCustomExpenseTypes([...customExpenseTypes, newType]);
    setShowAddTypeModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">DIIWAAN APP</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Expense Form */}
          <div>
            <ExpenseForm
              onAddExpense={addExpense}
              editingExpense={editingExpense}
              onEditExpense={editExpense}
              customExpenseTypes={customExpenseTypes}
              onAddExpenseType={() => setShowAddTypeModal(true)}
            />
          </div>

          {/* Expense Summary */}
          <div>
            <ExpenseSummary
              expenses={expenses}
              filteredExpenses={filteredExpenses}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onFilter={filterExpenses}
            />
          </div>

          {/* Expense List */}
          <div className="bg-white ">
            <div className="mb-4">
              <Button onClick={toggleExpenseList} className="w-full">
                {showExpenseList ? "Hide Expenses" : "View Expenses"}
              </Button>
            </div>
            {showExpenseList && (
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={deleteExpense}
                onEditExpense={setEditingExpense}
                onClose={toggleExpenseList}
              />
            )}
          </div>
        </div>
      </div>
      <AddExpenseTypeModal
        isOpen={showAddTypeModal}
        onClose={() => setShowAddTypeModal(false)}
        onAddType={addCustomExpenseType}
      />
    </div>
  );
}

export default App;
