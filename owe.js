function addDebt() {
  const name = document.getElementById("debt-name").value.trim();
  const amount = Number(document.getElementById("debt-amount").value);
  const reason = document.getElementById("debt-reason").value.trim();
  const type = document.getElementById("debt-type").value;

  if (!name || isNaN(amount) || amount <= 0) {
    return alert("Enter valid details");
  }

  debts.push({ name, amount, reason, type, date: new Date().toISOString() });
  saveData();
  displayDebts();

  document.getElementById("debt-name").value = "";
  document.getElementById("debt-amount").value = "";
  document.getElementById("debt-reason").value = "";
}

function displayDebts() {
  const container = document.getElementById("debt-list");
  if (!container) return;

  container.innerHTML = "";

  debts.forEach((d, i) => {
    container.innerHTML += `
      <tr>
        <td>${d.name}</td>
        <td>${d.amount}</td>
        <td>${d.reason}</td>
        <td>${d.type === "owedToMe" ? "They Owe Me" : "I Owe"}</td>
        <td><button class="delete-btn" onclick="deleteDebt(${i})">delete</button></td>
      </tr>
    `;
  });
}

displayDebts();
