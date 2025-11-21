# Expense and Investment Tracker

A MERN stack application to track your expenses and investments (realized and unrealized profits) with a beautiful Violet-themed UI.

## Features
- **Authentication**: Secure Signup (Email + OTP) and Login.
- **Dashboard**: Visual summary of expenses vs investments.
- **Expense Tracking**: Add, view, and delete expenses.
- **Investment Tracking**: Track stocks/assets, update current prices, and see real-time profit/loss.
- **Violet Theme**: A modern, consistent UI design.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally (default port 27017)

## Installation & Run Instructions

### 1. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    - Open `.env` file.
    - Update `EMAIL_USER` and `EMAIL_PASS` with your Gmail credentials (use an App Password if 2FA is on) to enable OTP emails.
    - Ensure `MONGO_URI` points to your local MongoDB instance.
4.  Start the server:
    ```bash
    npm start
    # OR for development with nodemon (if installed)
    # npm run dev
    ```
    Server will run on `http://localhost:5000`.

### 2. Frontend Setup
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:5173` (or similar).

## Usage
1.  **Sign Up**: Enter your email. Check your email (or console if email fails) for OTP. Enter OTP and set a password.
2.  **Login**: Use your email and new password.
3.  **Dashboard**: View your financial overview.
4.  **Expenses**: Add daily expenses.
5.  **Investments**: Add investments. Update "Current Price" to see P/L changes.

## Tech Stack
- **Frontend**: React, Vite, Chart.js, CSS (Violet Theme)
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT, Bcrypt, Nodemailer
