import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/login', { email, password });
            localStorage.setItem('token', res.data.token);
            res.data.role === 'admin' ? navigate('/admin-dashboard') : navigate('/officer-dashboard');
        } catch (error) {
            alert('Invalid credentials or not approved');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded" required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded" required />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
            </form>
        </div>
    );
};

export default Login;
