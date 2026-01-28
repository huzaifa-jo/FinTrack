// ================== DATA STORAGE ==================
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let debts = JSON.parse(localStorage.getItem("debts")) || [];

// ================== SAVE TO LOCALSTORAGE ==================
function saveData() {
  localStorage.setItem("incomes", JSON.stringify(incomes));
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("debts", JSON.stringify(debts));
}

// ================== DASHBOARD TOTALS ==================
function updateDashboardTotals() {
  const incomeTotal = incomes.reduce((sum, i) => sum + i.amount, 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

  const owedToMe = debts
    .filter(d => d.type === "owedToMe")
    .reduce((sum, d) => sum + d.amount, 0);

  const iOwe = debts
    .filter(d => d.type === "iOwe")
    .reduce((sum, d) => sum + d.amount, 0);

  const disposable = incomeTotal - expenseTotal;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setText("total-income", "Total Income: " + incomeTotal);
  setText("total-expense", "Total Expense: " + expenseTotal);
  setText("saved-cash", "Disposable Income: " + disposable);
  setText("total-owed", "Net Debts: " + (owedToMe - iOwe));
}

// ================== RECENT TRANSACTIONS TABLE ==================
function displayRecentTransactions() {
  const container = document.getElementById("recent-transactions");
  if (!container) return;

  container.innerHTML = "";

  const allTx = [
    ...incomes.map((i, index) => ({
      type: "Income",
      amount: i.amount,
      note: i.note,
      date: i.date,
      del: `deleteIncome(${index})`
    })),
    ...expenses.map((e, index) => ({
      type: "Expense",
      amount: e.amount,
      note: e.note,
      date: e.date,
      del: `deleteExpense(${index})`
    })),
    ...debts.map((d, index) => ({
      type: d.type === "owedToMe" ? "Debt (To Me)" : "Debt (I Owe)",
      amount: d.amount,
      note: d.reason,
      date: d.date,
      del: `deleteDebt(${index})`
    }))
  ];

  allTx.sort((a, b) => new Date(b.date) - new Date(a.date));

  allTx.slice(0, 10).forEach(tx => {
    container.innerHTML += `
      <tr>
        <td>${tx.type}</td>
        <td>${tx.amount}</td>
        <td>${tx.note}</td>
        <td>${new Date(tx.date).toLocaleDateString()}</td>
        <td><button class="delete-btn" onclick="${tx.del}">delete</button></td>
      </tr>
    `;
  });
}

// ================== DELETE FUNCTIONS ==================
function deleteIncome(index) {
  incomes.splice(index, 1);
  saveData();
  displayRecentTransactions();
  updateDashboardTotals();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveData();
  displayRecentTransactions();
  updateDashboardTotals();
}

function deleteDebt(index) {
  debts.splice(index, 1);
  saveData();
  displayRecentTransactions();
  updateDashboardTotals();
}

// ================== INITIAL LOAD ==================
displayRecentTransactions();
updateDashboardTotals();





