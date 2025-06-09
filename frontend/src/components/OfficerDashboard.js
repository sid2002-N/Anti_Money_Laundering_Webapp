import React, { useState, useEffect } from 'react';
import '../styles/officerdashboard.css';
 // Importing OfficerDashboard CSS
const OfficerDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Officer Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => alert('Logging out')}>Logout</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2>Sankey Diagram</h2>
          <div id="sankeyChart"></div>
        </div>
        <div className="card p-6">
          <h2>Heatmap</h2>
          <canvas id="heatmapChart"></canvas>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card p-6">
        <h2>Recent Transactions</h2>
        <table id="transactionTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Status</th>
              <th>SARS Report</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.transaction_date}</td>
                <td>{transaction.sender_name}</td>
                <td>{transaction.receiver_name}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.status}</td>
                <td>
                  <button onClick={() => alert('Generating SARS Report')}>Generate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerDashboard;
