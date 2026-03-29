import React, { useState, useEffect, useCallback } from "react";
import Expense from "./components/Expenses/Expense";
import NewExpense from "./components/NewExpense/NewExpense";

const API_URL = "/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpensesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log("Fetching expenses from:", API_URL);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`,
        );
      }
      const data = await response.json();
      console.log("Received data:", data);

      const loadedExpenses = data.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));

      setExpenses(loadedExpenses);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        "Could not connect to backend. Please ensure the server is running on port 5000.",
      );
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchExpensesHandler();
  }, [fetchExpensesHandler]);

  const addExpenseHandler = async (expense) => {
    try {
      console.log("📤 Adding expense:", expense);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {}
        throw new Error(
          errorData?.message || `Server error ${response.status}`,
        );
      }

      const data = await response.json();
      setExpenses((prevExpenses) => [
        { ...data, date: new Date(data.date) },
        ...prevExpenses,
      ]);
    } catch (err) {
      console.error("❌ Add error:", err);
      alert(`Error adding expense: ${err.message}`);
    }
  };

  const deleteExpenseHandler = async (expenseId) => {
    try {
      console.log("Deleting expense:", expenseId);
      const response = await fetch(`${API_URL}/${expenseId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseId),
      );
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting expense.");
    }
  };

  const startEditingHandler = (id) => {
    const expense = expenses.find((e) => e.id === id);
    setEditingExpense(expense);
  };

  const cancelEditingHandler = () => {
    setEditingExpense(null);
  };

  const updateExpenseHandler = async (updatedExpense) => {
    try {
      console.log("Updating expense:", updatedExpense);
      const response = await fetch(`${API_URL}/${updatedExpense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExpense),
      });
      if (!response.ok) throw new Error("Failed to update");
      const data = await response.json();
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === data.id
            ? { ...data, date: new Date(data.date) }
            : expense,
        ),
      );
      setEditingExpense(null);
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating expense.");
    }
  };

  let content = (
    <p style={{ textAlign: "center", color: "#94a3b8", padding: "2rem" }}>
      No expenses found.
    </p>
  );
  if (isLoading)
    content = (
      <p style={{ textAlign: "center", color: "#6366f1", padding: "2rem" }}>
        Loading dashboard...
      </p>
    );
  if (error)
    content = (
      <div style={{ textAlign: "center", color: "#f43f5e", padding: "2rem" }}>
        <p>{error}</p>
        <button
          onClick={fetchExpensesHandler}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p>Real-Time Finance Tracker</p>
      </header>
      <NewExpense
        onAddExpense={addExpenseHandler}
        editingExpense={editingExpense}
        onUpdateExpense={updateExpenseHandler}
        onCancelEdit={cancelEditingHandler}
      />
      {expenses.length > 0 ? (
        <Expense
          items={expenses}
          onDeleteExpense={deleteExpenseHandler}
          onEditExpense={startEditingHandler}
        />
      ) : (
        content
      )}
    </main>
  );
}

export default App;
