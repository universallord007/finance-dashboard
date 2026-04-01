import React, { createContext, useState, useContext, useReducer, useEffect, useCallback } from 'react';
import { MOCK_TRANSACTIONS } from '../data/mockData';

const AppContext = createContext(null);

const transactionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [{ ...action.payload, id: Math.max(...state.map((t) => t.id), 0) + 1 }, ...state];
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
};

const loadTransactions = () => {
  try {
    const saved = localStorage.getItem('finance-transactions');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { /* ignore */ }
  return MOCK_TRANSACTIONS;
};

export const AppProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(transactionsReducer, null, loadTransactions);
  const [role, setRole] = useState(() => localStorage.getItem('finance-role') || 'admin');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [toasts, setToasts] = useState([]);

  // Persist transactions
  useEffect(() => {
    localStorage.setItem('finance-transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Persist role
  useEffect(() => {
    localStorage.setItem('finance-role', role);
  }, [role]);

  const addTransaction = useCallback((transaction) => {
    dispatch({ type: 'ADD', payload: transaction });
  }, []);

  const deleteTransaction = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Computed totals
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthTxns = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const lastMonthTxns = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  const monthlyIncome = currentMonthTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const monthlyExpenses = currentMonthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

  const lastMonthIncome = lastMonthTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const lastMonthExpenses = lastMonthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const lastMonthSavingsRate = lastMonthIncome > 0 ? ((lastMonthIncome - lastMonthExpenses) / lastMonthIncome) * 100 : 0;

  const incomeTrend = lastMonthIncome > 0 ? ((monthlyIncome - lastMonthIncome) / lastMonthIncome) * 100 : 0;
  const expenseTrend = lastMonthExpenses > 0 ? ((monthlyExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 : 0;
  const savingsTrend = savingsRate - lastMonthSavingsRate;

  const totals = {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    incomeTrend,
    expenseTrend,
    savingsTrend,
  };

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    role,
    setRole,
    currentPage,
    setCurrentPage,
    toasts,
    addToast,
    removeToast,
    totals,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
