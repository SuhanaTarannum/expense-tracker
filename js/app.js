let expenses = JSON.parse(localStorage.getItem("expenses")) || {};
let pieChart;
let barChart;

document.getElementById("monthPicker").value = new Date().toISOString().slice(0,7);

function addExpense() {
  const month = document.getElementById("monthPicker").value;
  const desc = document.getElementById("desc").value;
  const amt = parseFloat(document.getElementById("amt").value);
  const cat = document.getElementById("cat").value;

  if (!desc || !amt) return;

  if (!expenses[month]) {
    expenses[month] = [];
  }

  expenses[month].push({ desc, amt, cat });

  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("desc").value = "";
  document.getElementById("amt").value = "";

  updateUI();
}

function updateUI() {
  const month = document.getElementById("monthPicker").value;
  const table = document.getElementById("expenseTable");
  table.innerHTML = "";

  let total = 0;
  let categoryData = {};

  if (expenses[month]) {
    expenses[month].forEach((e, index) => {

      total += e.amt;

      if (!categoryData[e.cat]) categoryData[e.cat] = 0;
      categoryData[e.cat] += e.amt;

      table.innerHTML += `
        <tr>
          <td>${e.desc}</td>
          <td>$${e.amt}</td>
          <td>${e.cat}</td>
          <td><button onclick="deleteExpense('${month}', ${index})">X</button></td>
        </tr>
      `;
    });
  }

  document.getElementById("monthlyTotal").textContent = total;

  updatePie(categoryData);
  updateBar();
}

function deleteExpense(month, index) {
  expenses[month].splice(index,1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateUI();
}

// Update Pie Chart
function updatePie(data) {
  const ctx = document.getElementById("pieChart");

  if (pieChart) pieChart.destroy();

  pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          "#4da6ff", "#ff9999", "#ffcc66", "#66cc99", "#c266ff"
        ]
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: "#fff" // White legend text
          }
        }
      }
    }
  });
}

// Update Bar Chart
function updateBar() {
  const ctx = document.getElementById("barChart");

  if (barChart) barChart.destroy();

  const months = Object.keys(expenses);
  const totals = months.map(m =>
    expenses[m].reduce((sum,e)=>sum+e.amt,0)
  );

  barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: months,
      datasets: [{
        label: "Monthly Spending",
        data: totals,
        backgroundColor: "#4da6ff"
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "#fff" } // white text
        }
      },
      scales: {
        x: {
          ticks: { color: "#fff" }, // x-axis white
          grid: { color: "rgba(255,255,255,0.1)" }
        },
        y: {
          ticks: { color: "#fff" }, // y-axis white
          grid: { color: "rgba(255,255,255,0.1)" }
        }
      }
    }
  });
}

document.getElementById("monthPicker").addEventListener("change", updateUI);

updateUI();

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
