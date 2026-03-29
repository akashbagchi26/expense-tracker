import React, { useState, useEffect } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  useEffect(() => {
    if (props.editingExpense) {
      setEnteredTitle(props.editingExpense.title);
      setEnteredAmount(props.editingExpense.amount.toString());
      // Format Date object to YYYY-MM-DD for input
      const date = props.editingExpense.date;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      setEnteredDate(`${year}-${month}-${day}`);
    } else {
      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
    }
  }, [props.editingExpense]);

  const titleChangeHandler = (event) => setEnteredTitle(event.target.value);
  const amountChangeHandler = (event) => setEnteredAmount(event.target.value);
  const dateChangeHandler = (event) => setEnteredDate(event.target.value);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!enteredTitle || !enteredAmount || !enteredDate) {
      alert("Please fill in all fields");
      return;
    }

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            placeholder="e.g. Shopping"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2022-01-01"
            max="2026-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" className="alternative" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">
          {props.editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
