document.addEventListener('DOMContentLoaded', () => {
    let transactions = JSON.parse(localStorage.getItem('budget_data')) || [];
    let budgetChart = null;

    // Elements
    const list = document.getElementById('transaction-list');
    const totalInc = document.getElementById('total-income');
    const totalExp = document.getElementById('total-expense');
    const netBal = document.getElementById('net-balance');
    const balCard = document.getElementById('balance-card');

    function updateDashboard() {
        list.innerHTML = '';
        let inc = 0;
        let exp = 0;

        transactions.forEach((t, index) => {
            const amount = parseFloat(t.amount);
            if (t.type === 'income') inc += amount;
            else exp += amount;

            const li = document.createElement('li');
            li.className = t.type === 'income' ? 'income-item' : 'expense-item';
            li.innerHTML = `
                <div>
                    <strong>${t.desc}</strong><br>
                    <small>${t.category} | ${t.date}</small>
                </div>
                <div>
                    ₹${amount.toLocaleString()} 
                    <button class="delete-btn" onclick="removeEntry(${index})">✕</button>
                </div>
            `;
            list.appendChild(li);
        });

        // Calculations
        const balance = inc - exp;
        totalInc.innerText = `₹${inc.toLocaleString()}`;
        totalExp.innerText = `₹${exp.toLocaleString()}`;
        netBal.innerText = `₹${balance.toLocaleString()}`;

        // Dynamic Styling
        balCard.style.border = balance < 0 ? "2px solid #e71d36" : "none";

        localStorage.setItem('budget_data', JSON.stringify(transactions));
        updateAnalytics(inc, exp);
    }

    document.getElementById('add-btn').onclick = () => {
        const desc = document.getElementById('description').value;
        const amt = document.getElementById('amount').value;
        const cat = document.getElementById('category').value;
        const type = document.getElementById('type').value;

        if (desc && amt > 0) {
            transactions.push({
                desc,
                amount: amt,
                category: cat,
                type,
                date: new Date().toLocaleDateString()
            });
            document.getElementById('description').value = '';
            document.getElementById('amount').value = '';
            updateDashboard();
        } else {
            alert("Please provide valid transaction details.");
        }
    };

    window.removeEntry = (i) => {
        transactions.splice(i, 1);
        updateDashboard();
    };

    function updateAnalytics(i, e) {
        const ctx = document.getElementById('budget-chart').getContext('2d');
        if (budgetChart) budgetChart.destroy();
        
        budgetChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Income', 'Expense'],
                datasets: [{
                    data: [i, e],
                    backgroundColor: ['#2ec4b6', '#e71d36'],
                    borderWidth: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // Controls
    document.getElementById('theme-toggle').onclick = () => document.body.classList.toggle('dark-mode');
    document.getElementById('reset-btn').onclick = () => {
        if(confirm("Are you sure you want to wipe all project data?")) {
            transactions = [];
            updateDashboard();
        }
    };

    updateDashboard();
});
