function addExpense() {
  const amount = Number(document.getElementById("expense-amount").value);
  const note = document.getElementById("expense-note").value;

  if (!amount || amount <= 0) return alert("Enter valid amount");

  expenses.push({
    amount,
    note,
    date: new Date().toISOString()
  });

  saveData();
  alert("Expense added!");

  document.getElementById("expense-amount").value = "";
  document.getElementById("expense-note").value = "";
}

function displayExpenses() {
  const container = document.getElementById("expense-list");
  if (!container) return;

  container.innerHTML = "";

  expenses.forEach((e, index) => {
    container.innerHTML += `
      <tr>
        <td>${e.amount}</td>
        <td>${e.note}</td>
        <td>${new Date(e.date).toLocaleDateString()}</td>
        <td><button class="delete-btn" onclick="deleteExpense(${index})">delete</button></td>
      </tr>
    `;
  });
}

displayExpenses();

