import React, { useState } from "react";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";
import "./Expense.css";

const Expense = (props) => {
  const [selectedYear, setSelectedYear] = useState("2026");

  const filterChangeHandler = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  const expenesByYear = props.items.filter(
    (expense) => expense.date.getFullYear().toString() === selectedYear,
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={selectedYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpenseChart expenses={expenesByYear} />
        <ExpenseList
          items={expenesByYear}
          onDeleteExpense={props.onDeleteExpense}
          onEditExpense={props.onEditExpense}
        />
      </Card>
    </div>
  );
};

export default Expense;
