import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartPie, FaWallet, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', icon: <FaChartPie />, label: 'Dashboard' },
        { path: '/expenses', icon: <FaWallet />, label: 'Expenses' },
        { path: '/settings', icon: <FaCog />, label: 'Settings' },
    ];

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="navbar desktop-only" style={{
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--glass-border)',
                padding: '16px 0',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div className="container" style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1 className="text-gradient" style={{ margin: 0, fontSize: '1.8rem' }}>
                            ExpenseTracker
                        </h1>
                    </Link>

                    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    color: isActive(link.path) ? 'white' : 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontWeight: isActive(link.path) ? '600' : '500',
                                    position: 'relative',
                                    transition: 'color 0.3s'
                                }}
                            >
                                {link.icon} {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="desktop-nav-indicator"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-24px',
                                            left: 0,
                                            right: 0,
                                            height: '3px',
                                            background: 'var(--gradient-primary)',
                                            borderRadius: '4px 4px 0 0'
                                        }}
                                    />
                                )}
                            </Link>
                        ))}
                        <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-bottom-nav" style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid var(--glass-border)',
                padding: '12px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                paddingBottom: 'max(12px, env(safe-area-inset-bottom))'
            }}>
                {navLinks.map(link => (
                    <Link
                        key={link.path}
                        to={link.path}
                        style={{
                            color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-secondary)',
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            position: 'relative',
                            width: '60px'
                        }}
                    >
                        <div style={{
                            fontSize: '1.4rem',
                            padding: '8px',
                            borderRadius: '12px',
                            background: isActive(link.path) ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                            transition: 'all 0.3s'
                        }}>
                            {link.icon}
                        </div>
                        <span style={{ opacity: isActive(link.path) ? 1 : 0.7 }}>{link.label}</span>
                        {isActive(link.path) && (
                            <motion.div
                                layoutId="mobile-nav-indicator"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '40px',
                                    height: '4px',
                                    background: 'var(--accent-primary)',
                                    borderRadius: '0 0 4px 4px',
                                    marginTop: '-13px'
                                }}
                            />
                        )}
                    </Link>
                ))}

                {/* Logout Button for Mobile */}
                <div
                    onClick={handleLogout}
                    style={{
                        color: 'var(--accent-danger)',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        width: '60px'
                    }}
                >
                    <div style={{
                        fontSize: '1.4rem',
                        padding: '8px',
                        borderRadius: '12px',
                        transition: 'all 0.3s'
                    }}>
                        <FaSignOutAlt />
                    </div>
                    <span style={{ opacity: 0.7 }}>Logout</span>
                </div>
            </nav>

            <style>{`
                @media (min-width: 769px) {
                    .mobile-bottom-nav { display: none !important; }
                }
                @media (max-width: 768px) {
                    .desktop-only { display: none !important; }
                }
            `}</style>
        </>
    );
};

export default Navbar;

