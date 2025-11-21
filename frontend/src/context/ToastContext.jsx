import React, { createContext, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 4000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 50, scale: 0.9 }}
                            layout
                            style={{
                                background: 'rgba(30, 41, 59, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                padding: '16px 20px',
                                minWidth: '300px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                                color: 'white'
                            }}
                        >
                            {toast.type === 'success' && <FaCheckCircle style={{ color: '#4ade80', fontSize: '1.2rem' }} />}
                            {toast.type === 'error' && <FaExclamationCircle style={{ color: '#f87171', fontSize: '1.2rem' }} />}
                            {toast.type === 'info' && <FaInfoCircle style={{ color: '#60a5fa', fontSize: '1.2rem' }} />}

                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 500 }}>{toast.message}</p>
                            </div>

                            <button
                                onClick={() => removeToast(toast.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    padding: '4px'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
