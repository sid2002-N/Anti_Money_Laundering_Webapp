import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Add routes for admin and officer dashboards */}
      </Routes>
    </Router>
  );
}

export default App;
