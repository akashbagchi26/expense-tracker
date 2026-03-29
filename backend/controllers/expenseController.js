const Expense = require("../models/expenseModel");

// @desc    Get all expenses
// @route   GET /api/expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new expense
// @route   POST /api/expenses
exports.createExpense = async (req, res) => {
  const expense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
    date: req.body.date,
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (req.body.title) expense.title = req.body.title;
    if (req.body.amount) expense.amount = req.body.amount;
    if (req.body.date) expense.date = req.body.date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
