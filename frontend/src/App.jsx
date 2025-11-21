import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import PrivateRoute from './components/PrivateRoute';

import { CurrencyProvider } from './context/CurrencyContext';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/expenses" element={
          <PrivateRoute>
            <Expenses />
          </PrivateRoute>
        } />
        <Route path="/settings" element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        } />
        <Route path="/contact" element={
          <PrivateRoute>
            <ContactUs />
          </PrivateRoute>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <AnimatedRoutes />
    </div>
  );
};

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <CurrencyProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </CurrencyProvider>
  );
}

export default App;
