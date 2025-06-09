# Anti-Money Laundering Web Application

A comprehensive web application for detecting and preventing money laundering through transaction monitoring and machine learning predictions.

![Dashboard Preview](https://i.imgur.com/example1.jpg)

## Features

### 1. User Authentication
- Role-based access control (Admin and Officer roles)
- Secure login system with JWT authentication
- Password encryption using bcrypt

### 2. Admin Dashboard
![Admin Dashboard](https://i.imgur.com/example2.jpg)

- Real-time transaction monitoring
- Interactive charts and statistics
- Transaction status distribution
- Currency distribution analysis
- Transaction timeline visualization

### 3. Officer Dashboard
![Officer Interface](https://i.imgur.com/example3.jpg)

- Transaction investigation tools
- SARS (Suspicious Activity Report) generation
- Risk assessment interface

### 4. ML-Powered Prediction
![Prediction Interface](https://i.imgur.com/example4.jpg)

- Real-time transaction risk assessment
- Machine learning model integration
- Automated flagging of suspicious transactions

## Technology Stack

- **Frontend:**
  - React.js
  - TailwindCSS
  - Chart.js
  - D3.js

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - JWT for authentication

- **Machine Learning:**
  - Python
  - Scikit-learn
  - Flask API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anti-money-laundering-webapp.git
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Set up MongoDB:
- Install MongoDB
- Create a database named 'AML'
- Run the migration script:
```bash
python migrate_transactions.py
```

5. Start the servers:

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm start
```

ML Server:
```bash
python predictor.py
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/AML
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Directory Structure

```
├── admin.html
├── index.html
├── login.html
├── officer.html
├── prediction.html
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── ML/
    ├── predictor.py
    ├── transaction_model.pkl
    └── trained_columns.txt
```

## API Documentation

### Authentication Endpoints
- POST `/login` - User login
- POST `/signup` - User registration
- POST `/approve/:email` - Approve user registration

### Transaction Endpoints
- GET `/transactions` - Get all transactions
- GET `/transaction/:id` - Get specific transaction
- POST `/predict-laundering/:id` - Predict transaction risk

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Chart.js for visualization
- TailwindCSS for styling
- MongoDB for database
- Flask for ML API

