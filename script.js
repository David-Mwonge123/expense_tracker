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

function renderExpenses(expensesToRender = tracker.expenses) {
  listExpense.innerHTML = "";

  expensesToRender.map(({ id, description, amount, category }) => {
    const li = document.createElement("li");
    li.className = "expense-item";
    li.innerHTML = `
      <span><strong>${description}</strong> - ${category} - KES ${amount}</span>
      <button data-id="${id}">Delete</button>
    `;
    listExpense.appendChild(li);
  });

  totalAmount.textContent = tracker.getTotal().toFixed(2);

  document.querySelectorAll(".expense-item button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      tracker.removeExpense(id);
      renderExpenses(tracker.filterByCategory(filterCategory.value));
    });
  });
}
addBtn.addEventListener("click", () => {
  const description = descInput.value.trim();
  const amount = amountInput.value;
  const category = categoryInput.value;

  if (!description || !amount || !category) {
    alert("Please fill all fields");
    return;
  }

  tracker.addExpense({ description, amount, category });
  descInput.value = "";
  amountInput.value = "";
  renderExpenses(tracker.filterByCategory(filterCategory.value));
});

filterCategory.addEventListener("change", () => {
  renderExpenses(tracker.filterByCategory(filterCategory.value));
});


