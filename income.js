function addIncome() {
  const amountInput = document.getElementById("income-amount").value.trim();
  const note = document.getElementById("income-note").value.trim();
  const amount = Number(amountInput);

  if (amountInput === "" || isNaN(amount) || amount <= 0) {
    return alert("Please enter a valid number greater than 0");
  }

  incomes.push({
    amount,
    note,
    date: new Date().toISOString()
  });

  saveData();
  alert("Income added!");

  document.getElementById("income-amount").value = "";
  document.getElementById("income-note").value = "";
}
function displayIncome() {
  const container = document.getElementById("income-list");
  if (!container) return;

  container.innerHTML = "";

  incomes.forEach((i, index) => {
    container.innerHTML += `
      <tr>
        <td>${i.amount}</td>
        <td>${i.note}</td>
        <td>${new Date(i.date).toLocaleDateString()}</td>
        <td><button class="delete-btn" onclick="deleteIncome(${index})">delete</button></td>
      </tr>
    `;
  });
}

displayIncome();



