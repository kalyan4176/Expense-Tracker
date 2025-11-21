import React, { useEffect, useState } from 'react';
import { FaWallet, FaMoneyBillWave, FaPiggyBank } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useCurrency } from '../context/CurrencyContext';
import { motion } from 'framer-motion';
import api from '../utils/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const { formatCurrency } = useCurrency();
    const [summary, setSummary] = useState({
        totalExpenses: 0,
        salary: 0
    });
    const [expenseData, setExpenseData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expensesRes = await api.get('/expenses');
                const userRes = await api.get('/user/profile');

                const totalExp = expensesRes.data.reduce((acc, curr) => acc + curr.amount, 0);

                setSummary({
                    totalExpenses: totalExp,
                    salary: userRes.data.salary || 0
                });

                // Chart Data Logic
                const categories = {};
                expensesRes.data.forEach(exp => {
                    categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
                });

                setExpenseData({
                    labels: Object.keys(categories),
                    datasets: [{
                        data: Object.values(categories),
                        backgroundColor: ['#8b5cf6', '#d946ef', '#34d399', '#fbbf24', '#22d3ee'],
                        borderWidth: 0
                    }]
                });

            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const remainingBudget = summary.salary - summary.totalExpenses;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
        >
            <h2 style={{ marginBottom: '24px', fontSize: '2rem' }}>Financial Overview</h2>

            <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <motion.div className="card" variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '16px', background: 'rgba(52, 211, 153, 0.15)', borderRadius: '16px', color: '#34d399' }}>
                            <FaMoneyBillWave size={28} />
                        </div>
                        <div>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>Monthly Income</p>
                            <h3 style={{ margin: '4px 0 0', fontSize: '1.75rem' }}>{formatCurrency(summary.salary)}</h3>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="card" variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '16px', background: 'rgba(217, 70, 239, 0.15)', borderRadius: '16px', color: '#d946ef' }}>
                            <FaWallet size={28} />
                        </div>
                        <div>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>Total Expenses</p>
                            <h3 style={{ margin: '4px 0 0', fontSize: '1.75rem' }}>{formatCurrency(summary.totalExpenses)}</h3>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="card" variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '16px', background: remainingBudget >= 0 ? 'rgba(52, 211, 153, 0.15)' : 'rgba(239, 68, 68, 0.15)', borderRadius: '16px', color: remainingBudget >= 0 ? '#34d399' : '#ef4444' }}>
                            <FaPiggyBank size={28} />
                        </div>
                        <div>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>Remaining Budget</p>
                            <h3 style={{ margin: '4px 0 0', fontSize: '1.75rem' }}>{formatCurrency(remainingBudget)}</h3>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                <motion.div className="card" variants={itemVariants}>
                    <h3 style={{ marginBottom: '24px' }}>Expense Breakdown</h3>
                    <div style={{ height: '320px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        {expenseData.labels.length > 0 ? <Doughnut data={expenseData} options={{ maintainAspectRatio: false, cutout: '70%' }} /> : <p style={{ color: 'var(--text-muted)' }}>No expense data available</p>}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
