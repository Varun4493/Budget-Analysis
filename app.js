let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let totalIncome = 0;
let totalExpense = 0;

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    transactions.forEach(transaction => {
        addTransactionToUI(transaction.description, transaction.amount, transaction.category);
        if (transaction.amount >= 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpense += Math.abs(transaction.amount);
        }
    });
    updateSummary();
}

function addTransaction(description, amount, category = 'Others') {
    transactions.push({ description, amount, category, date: new Date().toISOString() });
    saveTransactions();
    addTransactionToUI(description, amount, category);
    if (amount >= 0) {
        totalIncome += amount;
    } else {
        totalExpense += Math.abs(amount);
    }
    updateSummary();
}

function addTransactionToUI(description, amount, category) {
    const transactionList = document.getElementById('transaction-list');
    const listItem = document.createElement('li');
    const type = amount >= 0 ? 'income' : 'expense';

    listItem.className = type;
    listItem.innerHTML = `
        ${description} (${category}): ₹${Math.abs(amount)} 
        <button onclick="deleteTransaction(this, '${description}', ${amount})">x</button>
        <button onclick="editTransaction('${description}', ${amount}, '${category}')">Edit</button>
    `;
    transactionList.appendChild(listItem);
}

function deleteTransaction(element, description, amount) {
    transactions = transactions.filter(transaction => !(transaction.description === description && transaction.amount === amount));
    saveTransactions();
    if (element) element.parentElement.remove();

    if (amount >= 0) {
        totalIncome -= amount;
    } else {
        totalExpense -= Math.abs(amount);
    }
    updateSummary();
}

function editTransaction(description, amount, category) {
    document.getElementById('description').value = description;
    document.getElementById('amount').value = amount;
    document.getElementById('category').value = category;

    deleteTransaction(null, description, amount); // Temporarily remove the transaction
}

function updateSummary() {
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
    document.getElementById('net-balance').textContent = (totalIncome - totalExpense).toFixed(2);
    updateChart();
}

const ctx = document.getElementById('budget-chart').getContext('2d');
let budgetChart;

function updateChart() {
    if (budgetChart) budgetChart.destroy();

    budgetChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                data: [totalIncome, totalExpense],
                backgroundColor: ['#28a745', '#dc3545']
            }]
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

document.getElementById('add-btn').addEventListener('click', function() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (description && !isNaN(amount)) {
        addTransaction(description, amount, category);
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter valid details.');
    }
});

document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);

loadTransactions();
