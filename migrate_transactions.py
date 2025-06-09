import pymongo
import random
from faker import Faker
from datetime import datetime, timedelta

# Initialize Faker for random names
fake = Faker()

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["AML"]  # Connect to AML database
transactions_collection = db["transactions"]  # Use transactions collection

# Sample data lists
currencies = ['US dollar', 'Euro', 'Indian rupee', 'UK pounds', 'Dirham']
locations = ['USA', 'Germany', 'India', 'UK', 'UAE']
payment_types = ['ACH', 'Cash Deposit', 'Cash Withdrawal', 'Credit card', 'Debit card']

# Function to generate a random date
def random_date():
    start_date = datetime(2023, 1, 1)
    end_date = datetime(2025, 1, 1)
    return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

# Generate 100 fake transactions
transactions = []
for _ in range(100):
    transactions.append({
        "amount": round(random.uniform(100, 10000), 2),
        "payment_currency": random.choice(currencies),
        "received_currency": random.choice(currencies),
        "sender_bank_location": random.choice(locations),
        "receiver_bank_location": random.choice(locations),
        "payment_type": random.choice(payment_types),
        "transaction_date": random_date().strftime("%Y-%m-%d"),
        "sender_name": fake.name(),
        "receiver_name": fake.name()
    })

# Insert transactions into MongoDB
transactions_collection.insert_many(transactions)
print(f"Inserted {len(transactions)} transactions into MongoDB AML database.")
