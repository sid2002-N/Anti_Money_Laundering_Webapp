from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests (needed for frontend access)

# Load the trained model
model = joblib.load('transaction_model.pkl')

# Load trained feature names
with open('trained_columns.txt', 'r') as f:
    trained_columns = [line.strip() for line in f]

@app.route('/')
def home():
    return "Server is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Convert input to DataFrame
        input_df = pd.DataFrame([data])

        # One-hot encode categorical variables
        categorical_columns = ['payment_currency', 'received_currency', 'sender_bank_location',
                               'receiver_bank_location', 'payment_type']
        input_encoded = pd.get_dummies(input_df, columns=categorical_columns)

        # Add missing columns (fill with 0)
        for col in trained_columns:
            if col not in input_encoded.columns:
                input_encoded[col] = 0

        # Ensure column order matches training data
        input_encoded = input_encoded[trained_columns]

        # Make prediction
        prediction = model.predict(input_encoded)[0]
        result = "Laundering" if prediction == 1 else "Not Laundering"

        return jsonify({'status': result})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
