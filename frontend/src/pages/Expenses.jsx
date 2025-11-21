import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaReceipt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import BillScanner from '../components/BillScanner';
import { useCurrency } from '../context/CurrencyContext';
import api from '../utils/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Expenses = () => {
    const { formatCurrency } = useCurrency();
    const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0]
    });
    const [showScanner, setShowScanner] = useState(false);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await api.get('/expenses');
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await api.post('/expenses', formData);
            fetchExpenses();
            setFormData({
                title: '',
                amount: '',
                category: 'Food',
                date: new Date().toISOString().split('T')[0]
            });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await api.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (err) {
            console.error(err);
        }
    };

    const handleScanComplete = (data) => {
        setFormData({
            ...formData,
            amount: data.amount,
            date: data.date.toISOString().split('T')[0],
            title: data.description
        });
        setShowScanner(false);
    };

    // Chart Data
    const categories = {};
    expenses.forEach(exp => {
        categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });

    const categoryData = {
        labels: Object.keys(categories),
        datasets: [{
            data: Object.values(categories),
            backgroundColor: ['#8b5cf6', '#d946ef', '#34d399', '#fbbf24', '#22d3ee', '#f472b6'],
            borderWidth: 0
        }]
    };

    const lineData = {
        labels: expenses.map(e => new Date(e.date).toLocaleDateString()).reverse(),
        datasets: [{
            label: 'Spending',
            data: expenses.map(e => e.amount).reverse(),
            borderColor: '#8b5cf6',
            tension: 0.4
        }]
    };

    return (
        <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2 style={{ marginBottom: '24px' }}>Expenses</h2>

            <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>Add Expense</h3>
                        <button onClick={() => setShowScanner(!showScanner)} className="btn" style={{ background: 'rgba(255,255,255,0.1)', padding: '8px' }}>
                            <FaReceipt />
                        </button>
                    </div>

                    <AnimatePresence>
                        {showScanner && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <BillScanner onScanComplete={handleScanComplete} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" value={formData.title} onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="number" name="amount" value={formData.amount} onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={onChange}>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Health">Health</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="date" value={formData.date} onChange={onChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            <FaPlus /> Add Expense
                        </button>
                    </form>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '20px' }}>Spending by Category</h3>
                    <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
                        {expenses.length > 0 ? <Doughnut data={categoryData} options={{ maintainAspectRatio: false, cutout: '70%' }} /> : <p style={{ color: 'var(--text-muted)' }}>No data</p>}
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '20px' }}>Spending Trend</h3>
                <div style={{ height: '300px' }}>
                    {expenses.length > 0 ? <Line data={lineData} options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }} /> : <p style={{ color: 'var(--text-muted)' }}>No data</p>}
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '20px' }}>Recent Expenses</h3>
                <ul style={{ listStyle: 'none' }}>
                    <AnimatePresence>
                        {expenses.map(expense => (
                            <motion.li
                                key={expense._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    borderBottom: '1px solid var(--glass-border)',
                                    marginBottom: '8px'
                                }}
                            >
                                <div>
                                    <h4 style={{ marginBottom: '4px' }}>{expense.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {new Date(expense.date).toLocaleDateString()} • {expense.category}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>
                                        {formatCurrency(expense.amount)}
                                    </span>
                                    <button
                                        onClick={() => deleteExpense(expense._id)}
                                        className="btn btn-danger"
                                        style={{ padding: '8px', borderRadius: '8px' }}
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                    {expenses.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>No expenses found</p>}
                </ul>
            </div>
        </motion.div>
    );
};

export default Expenses;
