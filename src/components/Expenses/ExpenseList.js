import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">No Expense Found !!!</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          date={expense.date}
          title={expense.title}
          amount={expense.amount}
          onDelete={props.onDeleteExpense}
          onEdit={props.onEditExpense}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
