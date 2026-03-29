import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [formState, setFormState] = useState(false);

  // Automatically show form if editing
  const isEditing = !!props.editingExpense;
  const showForm = formState || isEditing;

  const saveExpenseDataHandler = (enteredExpenseData) => {
    if (isEditing) {
      const expenseData = {
        ...enteredExpenseData,
        id: props.editingExpense.id,
      };
      props.onUpdateExpense(expenseData);
    } else {
      const expenseData = {
        ...enteredExpenseData,
        id: Math.random().toString(),
      };
      props.onAddExpense(expenseData);
    }
    setFormState(false);
  };

  const onOpenFormHandler = () => {
    setFormState(true);
  };

  const onCancelHandler = () => {
    setFormState(false);
    if (isEditing) props.onCancelEdit();
  };

  return (
    <div className="new-expense">
      {!showForm && (
        <button onClick={onOpenFormHandler}>Add New Expense</button>
      )}
      {showForm && (
        <ExpenseForm
          onCancel={onCancelHandler}
          onSaveExpenseData={saveExpenseDataHandler}
          editingExpense={props.editingExpense}
        />
      )}
    </div>
  );
};

export default NewExpense;
