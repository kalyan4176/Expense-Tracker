import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUserCircle, FaArrowRight } from 'react-icons/fa';
import api from '../utils/api';
import { useToast } from '../context/ToastContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const { name, mobile, email, username, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        // Validation
        if (password !== confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }

        const strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])");

        if (password.length < 6) {
            showToast("Password must be at least 6 characters", "error");
            return;
        }
        if (!strongRegex.test(password)) {
            showToast("Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)", "error");
            return;
        }

        if (username.length < 3) {
            showToast("Username must be at least 3 characters", "error");
            return;
        }
        if (!strongRegex.test(username)) {
            showToast("Username must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)", "error");
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post('/auth/signup', { name, mobile, email, username, password });
            // localStorage.setItem('token', res.data.token); // Usually signup redirects to login, not auto-login, but let's follow previous flow if it was auto-login. 
            // Previous flow was navigate('/login') after alert.
            showToast("Signup Successful! Please login.", "success");
            navigate('/login');
        } catch (err) {
            console.error(err.response?.data);
            showToast(err.response?.data?.msg || 'Signup Failed', "error");
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
                staggerChildren: 0.08
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
                    top: '5%',
                    right: '15%',
                    width: '350px',
                    height: '350px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    zIndex: 0
                }}
            />
            <motion.div
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1.5 }}
                style={{
                    position: 'absolute',
                    bottom: '5%',
                    left: '15%',
                    width: '300px',
                    height: '300px',
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
                style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '520px' }}
            >
                <motion.div
                    className="card"
                    style={{ padding: '48px', position: 'relative', overflow: 'visible' }}
                    whileHover={{ scale: 1.01 }}
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
                            Create Account
                        </h1>
                        <p style={{
                            textAlign: 'center',
                            color: 'var(--text-secondary)',
                            marginBottom: '36px',
                            fontSize: '0.95rem'
                        }}>
                            Join ExpenseTracker and start managing your finances
                        </p>
                    </motion.div>

                    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '18px' }}>
                        <motion.div variants={itemVariants} className="form-group" style={{ margin: 0 }}>
                            <label>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <FaUserCircle style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.1rem'
                                }} />
                                <motion.input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                    placeholder="Enter your full name"
                                    style={{ paddingLeft: '50px' }}
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-group" style={{ margin: 0 }}>
                            <label>Mobile Number</label>
                            <div style={{ position: 'relative' }}>
                                <FaPhone style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.1rem'
                                }} />
                                <motion.input
                                    type="text"
                                    name="mobile"
                                    value={mobile}
                                    onChange={onChange}
                                    required
                                    placeholder="+91 ----- -----"
                                    style={{ paddingLeft: '50px' }}
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-group" style={{ margin: 0 }}>
                            <label>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope style={{
                                    position: 'absolute',
                                    left: '18px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1.1rem'
                                }} />
                                <motion.input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                    placeholder="Enter a valid email"
                                    style={{ paddingLeft: '50px' }}
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-group" style={{ margin: 0 }}>
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
                                    placeholder="Enter Username"
                                    style={{ paddingLeft: '50px' }}
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-group" style={{ margin: 0 }}>
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
                                    placeholder="Enter Password"
                                    style={{ paddingLeft: '50px' }}
                                    whileFocus={{ scale: 1.01 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-group" style={{ margin: 0 }}>
                            <label>Confirm Password</label>
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
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChange}
                                    required
                                    placeholder="Re-enter password"
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
                                marginTop: '12px',
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
                                    Create Account
                                    <FaArrowRight />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <motion.p
                        variants={itemVariants}
                        style={{
                            marginTop: '28px',
                            textAlign: 'center',
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem'
                        }}
                    >
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            style={{
                                color: 'var(--accent-primary)',
                                fontWeight: 600,
                                textDecoration: 'none',
                                transition: 'color 0.3s'
                            }}
                        >
                            Login
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

export default Signup;
