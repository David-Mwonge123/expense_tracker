global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
};
const { Expense, ExpenseTracker } = require("./script.js");
describe("ExpenseTracker", () => {
  let tracker;

  beforeEach(() => {
    localStorage.store = {};
    tracker = new ExpenseTracker();
  });

  test("Adding expenses", () => {
    tracker.addExpense({ description: "Lunch", amount: 500, category: "Food" });
    expect(tracker.expenses).toHaveLength(1);
    expect(tracker.expenses[0].description).toBe("Lunch");
  });

  test("Removing expenses", () => {
    const exp = tracker.addExpense({
      description: "Bus",
      amount: 100,
      category: "Transport",
    });
    tracker.removeExpense(exp.id);
    expect(tracker.expenses).toHaveLength(0);
  });

  test("Calculating total expenses", () => {
    tracker.addExpense({ description: "A", amount: 200, category: "Food" });
    tracker.addExpense({ description: "B", amount: 300, category: "Bills" });
    expect(tracker.getTotal()).toBe(500);
  });

  test("Filtering expenses by category", () => {
    tracker.addExpense({ description: "Lunch", amount: 500, category: "Food" });
    tracker.addExpense({
      description: "Uber",
      amount: 400,
      category: "Transport",
    });
    const filtered = tracker.filterByCategory("Food");
    expect(filtered).toHaveLength(1);
    expect(filtered[0].category).toBe("Food");
  });

  test("Rest operator - add multiple", () => {
    tracker.addMultipleExpenses(
      { description: "1", amount: 100, category: "Food" },
      { description: "2", amount: 200, category: "Food" },
    );
    expect(tracker.expenses).toHaveLength(2);
  });
});
