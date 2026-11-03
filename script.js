class Expense {
  constructor({
    description,
    amount,
    category,
    id = Date.now(),
    date = new Date().toISOString(),
  }) {
    this.id = id;
    this.description = description;
    this.amount = parseFloat(amount);
    this.category = category;
    this.date = date;
  }
}

class ExpenseTracker {
  constructor() {
    this.expenses = this.loadExpenses();
  }
  addExpense(expenseData) {
    const newExpense = new Expense(expenseData);
    this.expenses = [...this.expenses, newExpense];
    this.saveExpenses();
    return newExpense;
  }
  addMultipleExpenses(...expensesData) {
    expensesData.forEach((data) => this.addExpense(data));
  }
  removeExpense(id) {
    this.expenses = this.expenses.filter((exp) => exp.id !== id);
    this.saveExpenses();
  }
  getTotal() {
    return this.expenses.reduce((total, { amount }) => total + amount, 0);
  }
  filterByCategory(category) {
    if (category === "All") return this.expenses;
    return this.expenses.filter(({ category: cat }) => cat === category);
  }

  saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(this.expenses));
  }

  loadExpenses() {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  }
}

const tracker = new ExpenseTracker();
const descInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("add-btn");
const listExpense = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const filterCategory = document.getElementById("filter-category");
