import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import OfficerDashboard from './components/OfficerDashboard';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/admin">Admin Dashboard</Link></li>
          <li><Link to="/officer">Officer Dashboard</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/officer" element={<OfficerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
