const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const axios = require('axios'); // Needed to communicate with the ML model

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/AML', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
    amount: Number,
    payment_currency: String,
    received_currency: String,
    sender_bank_location: String,
    receiver_bank_location: String,
    payment_type: String,
    transaction_date: String,
    sender_name: String,
    receiver_name: String,
    status: { type: String, default: "Unknown" } // Default status unknown
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'officer'], required: true },
    approved: { type: Boolean, default: false }
});

const User = mongoose.model('User', UserSchema);

// ========================== User Routes ========================== //

// Signup Route (Pending Approval)
app.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role, approved: false });
    await newUser.save();
    res.json({ message: 'Signup request sent. Await admin approval.' });
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    const user = await User.findOne({ email, approved: true });
    if (!user) {
        console.log("User not found or not approved.");
        return res.status(401).json({ message: 'User not found or not approved' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        console.log("Password mismatch.");
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log("Login successful!");
    const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token, role: user.role });
});

// Admin Approve Users
app.post('/approve/:email', async (req, res) => {
    const user = await User.findOneAndUpdate({ email: req.params.email }, { approved: true });
    if (user) {
        res.json({ message: 'User approved successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// ========================== Transactions Routes ========================== //

// Fetch All Transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error('❌ Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch Single Transaction
app.get('/transaction/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        console.error('❌ Error fetching transaction:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});

// Fetch All Transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ========================== ML Prediction Routes ========================== //

// Predict Laundering Using Machine Learning Model
app.post('/predict-laundering/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        // Send transaction details to ML model
        const response = await axios.post('http://127.0.0.1:5001/predict', {
            payment_currency: transaction.payment_currency,
            received_currency: transaction.received_currency,
            sender_bank_location: transaction.sender_bank_location,
            receiver_bank_location: transaction.receiver_bank_location,
            payment_type: transaction.payment_type,
            amount: transaction.amount
        });

        transaction.status = response.data.status; // Update laundering status
        await transaction.save();

        res.json({ message: 'Prediction updated', status: transaction.status });
    } catch (error) {
        console.error('❌ Prediction error:', error.response ? error.response.data : error);
        res.status(500).json({ message: 'Prediction error', error: error.message });
    }
});

// ========================== Start Server ========================== //
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
