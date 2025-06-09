import joblib
import pandas as pd

model = joblib.load('transaction_model.pkl')

data = {
    "payment_currency": "USD",
    "received_currency": "INR",
    "sender_bank_location": "USA",
    "receiver_bank_location": "India",
    "payment_type": "Credit Card",
    "amount": 5000
}

df = pd.DataFrame([data])
prediction = model.predict(df)[0]
print("Prediction:", "Laundering" if prediction == 1 else "Not Laundering")
