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