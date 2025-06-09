// Sample transaction data
const transactions = [
    { id: 1, date: '2023-10-01', amount: 1000, status: 'Normal' },
    { id: 2, date: '2023-10-02', amount: 50000, status: 'Suspicious' },
    { id: 3, date: '2023-10-03', amount: 2000, status: 'Normal' },
    { id: 4, date: '2023-10-04', amount: 75000, status: 'Suspicious' },
    { id: 5, date: '2023-10-05', amount: 3000, status: 'Normal' },
];

// Function to populate the table with transactions
function populateTable(data) {
    const tbody = document.querySelector('#transactionTable tbody');
    tbody.innerHTML = '';
    data.forEach(transaction => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="p-3">${transaction.id}</td>
            <td class="p-3">${transaction.date}</td>
            <td class="p-3">$${transaction.amount.toLocaleString()}</td>
            <td class="p-3 ${transaction.status.toLowerCase()}">${transaction.status}</td>
        `;
        tbody.appendChild(row);
    });
}

// Function to update stats
function updateStats(data) {
    const totalTransactions = data.length;
    const suspiciousTransactions = data.filter(t => t.status === 'Suspicious').length;
    const totalAmount = data.reduce((sum, t) => sum + t.amount, 0);

    document.getElementById('totalTransactions').textContent = totalTransactions;
    document.getElementById('suspiciousTransactions').textContent = suspiciousTransactions;
    document.getElementById('totalAmount').textContent = `$${totalAmount.toLocaleString()}`;
}

// Function to filter transactions
function filterTransactions() {
    const amountFilter = document.getElementById('amountFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    let filteredTransactions = transactions;

    if (amountFilter) {
        filteredTransactions = filteredTransactions.filter(t => t.amount >= amountFilter);
    }

    if (statusFilter !== 'all') {
        filteredTransactions = filteredTransactions.filter(t => t.status.toLowerCase() === statusFilter);
    }

    populateTable(filteredTransactions);
    updateStats(filteredTransactions);
    updateChart(filteredTransactions);
}

// Function to update the chart
function updateChart(data) {
    const labels = data.map(t => t.date);
    const amounts = data.map(t => t.amount);

    const ctx = document.getElementById('amlChart').getContext('2d');
    if (window.amlChart) {
        window.amlChart.destroy();
    }
    window.amlChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Transaction Amount',
                data: amounts,
                borderColor: '#3b82f6',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initial load
populateTable(transactions);
updateStats(transactions);
updateChart(transactions);