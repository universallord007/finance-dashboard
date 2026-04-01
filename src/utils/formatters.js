import { CATEGORY_COLORS } from '../data/mockData';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatPercentage = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return '0%';
  return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
};

export const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || '#6b7280';
};

export const getMonthName = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
};

export const getMonthShort = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', { month: 'short' });
};
