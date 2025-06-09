import React, { useState, useEffect } from 'react';
import '../styles/admindashboard.css';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, amount: 0 });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/transactions');
      const data = await response.json();
      setTransactions(data);
      updateStats(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const updateStats = (data) => {
    const total = data.length;
    const pending = data.filter(t => t.status === 'Pending').length;
    const completed = data.filter(t => t.status === 'Completed').length;
    const amount = data.reduce((sum, t) => sum + t.amount, 0);

    setStats({ total, pending, completed, amount });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-400">{new Date().toLocaleString()}</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={fetchTransactions}>Refresh</button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">Prediction</button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-gray-800 p-6 rounded-xl text-center shadow-lg">
            <h3 className="text-lg capitalize">{key.replace(/_/g, ' ')}</h3>
            <p className="text-2xl font-bold">{key === 'amount' ? `$${value}` : value}</p>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-2">Transaction Status Distribution</h2>
          <canvas id="transactionPieChart"></canvas>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-bold mb-2">Currency Distribution</h2>
          <canvas id="currencyBarChart"></canvas>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg col-span-2">
          <h2 className="text-lg font-bold mb-2">Transactions Over Time</h2>
          <canvas id="transactionsLineChart"></canvas>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Sender</th>
              <th className="p-3">Receiver</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map(transaction => (
                <tr key={transaction._id} className="border-b border-gray-700">
                  <td className="p-3">{transaction._id}</td>
                  <td className="p-3">{transaction.transaction_date}</td>
                  <td className="p-3">{transaction.sender_name}</td>
                  <td className="p-3">{transaction.receiver_name}</td>
                  <td className="p-3">${transaction.amount}</td>
                  <td className="p-3">{transaction.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No transactions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
