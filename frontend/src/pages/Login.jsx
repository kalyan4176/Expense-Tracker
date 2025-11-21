import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';
import api from '../utils/api';
import { useToast } from '../context/ToastContext';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            showToast("Login Successful!", "success");
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response?.data);
            showToast(err.response?.data?.msg || 'Login Failed', "error");
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
            }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px'
        }}>
            {/* Animated Background Elements */}
            <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    zIndex: 0
                }}
            />
            <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1 }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    zIndex: 0
                }}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '450px' }}
            >
                <motion.div
                    className="card"
                    style={{ padding: '48px', position: 'relative', overflow: 'visible' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {/* Glow effect on hover */}
                    <div style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '-2px',
                        right: '-2px',
                        bottom: '-2px',
                        background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                        borderRadius: '24px',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        zIndex: -1
                    }} className="card-glow" />

                    <motion.div variants={itemVariants}>
                        <h1 className="text-gradient" style={{
                            textAlign: 'center',
                            marginBottom: '12px',
                            fontSize: '2.5rem',
                            fontWeight: 700
                        }}>
                            Welcome Back
                        </h1>
                        <p style={{
                            textAlign: 'center',
                            color: 'var(--text-secondary)',
                            marginBottom: '40px',
                            fontSize: '0.95rem'
                        }}>
                            Sign in to continue to ExpenseTracker
                        </p>
                    </motion.div>

                    <form onSubmit={onSubmit}>
                        <motion.div variants={itemVariants} className="form-group">
                            <label>Username</label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.1rem'
                                }} />
                                <motion.input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={onChange}
                                    required
                                    placeholder="Enter your username"
                                    style={{ paddingLeft: '50px' }}
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-group">
                            <label>Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.1rem'
                                }} />
                                <motion.input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                    placeholder="Enter your password"
                                    style={{ paddingLeft: '50px' }}
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            variants={itemVariants}
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                marginTop: '24px',
                                height: '52px',
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px'
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid white',
                                        borderTopColor: 'transparent',
                                        borderRadius: '50%'
                                    }}
                                />
                            ) : (
                                <>
                                    Login
                                    <FaArrowRight />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <motion.p
                        variants={itemVariants}
                        style={{
                            marginTop: '24px',
                            textAlign: 'center',
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem'
                        }}
                    >
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            style={{
                                color: 'var(--accent-primary)',
                                fontWeight: 600,
                                textDecoration: 'none',
                                transition: 'color 0.3s'
                            }}
                        >
                            Sign Up
                        </Link>
                    </motion.p>
                </motion.div>
            </motion.div>

            <style>{`
                .card:hover .card-glow {
                    opacity: 0.5;
                }
            `}</style>
        </div>
    );
};

export default Login;
