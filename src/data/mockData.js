// Generate dates spread across the last 6 months
const now = new Date();
const monthOffset = (m) => {
  const d = new Date(now.getFullYear(), now.getMonth() - m, 1);
  return d;
};

const makeDate = (monthsAgo, day) => {
  const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, day);
  return d.toISOString().split('T')[0];
};

export const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Salary', 'Freelance', 'Utilities'];

export const CATEGORY_COLORS = {
  Food: '#ef4444',
  Transport: '#f59e0b',
  Shopping: '#ec4899',
  Entertainment: '#8b5cf6',
  Health: '#10b981',
  Salary: '#3b82f6',
  Freelance: '#06b6d4',
  Utilities: '#6366f1',
};

export const MOCK_TRANSACTIONS = [
  // Month 0 (current month)
  { id: 1, date: makeDate(0, 1), description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000 },
  { id: 2, date: makeDate(0, 2), description: 'Swiggy Food Order', category: 'Food', type: 'expense', amount: 450 },
  { id: 3, date: makeDate(0, 3), description: 'Uber Cab to Office', category: 'Transport', type: 'expense', amount: 320 },
  { id: 4, date: makeDate(0, 5), description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 649 },
  { id: 5, date: makeDate(0, 7), description: 'Freelance Web Project', category: 'Freelance', type: 'income', amount: 15000 },
  { id: 6, date: makeDate(0, 8), description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 2200 },
  { id: 7, date: makeDate(0, 10), description: 'Amazon Shopping', category: 'Shopping', type: 'expense', amount: 3500 },
  { id: 8, date: makeDate(0, 12), description: 'Apollo Pharmacy', category: 'Health', type: 'expense', amount: 850 },
  { id: 9, date: makeDate(0, 14), description: 'Zomato Dinner', category: 'Food', type: 'expense', amount: 780 },
  { id: 10, date: makeDate(0, 18), description: 'Metro Card Recharge', category: 'Transport', type: 'expense', amount: 500 },

  // Month 1
  { id: 11, date: makeDate(1, 1), description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000 },
  { id: 12, date: makeDate(1, 3), description: 'Grocery Store', category: 'Food', type: 'expense', amount: 2800 },
  { id: 13, date: makeDate(1, 5), description: 'Ola Cab Ride', category: 'Transport', type: 'expense', amount: 250 },
  { id: 14, date: makeDate(1, 7), description: 'Myntra Clothing', category: 'Shopping', type: 'expense', amount: 4200 },
  { id: 15, date: makeDate(1, 10), description: 'Movie Tickets PVR', category: 'Entertainment', type: 'expense', amount: 900 },
  { id: 16, date: makeDate(1, 12), description: 'Gym Membership', category: 'Health', type: 'expense', amount: 2500 },
  { id: 17, date: makeDate(1, 15), description: 'Freelance Logo Design', category: 'Freelance', type: 'income', amount: 8000 },
  { id: 18, date: makeDate(1, 18), description: 'Water Bill', category: 'Utilities', type: 'expense', amount: 600 },

  // Month 2
  { id: 19, date: makeDate(2, 1), description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 82000 },
  { id: 20, date: makeDate(2, 4), description: 'Restaurant Dinner', category: 'Food', type: 'expense', amount: 1500 },
  { id: 21, date: makeDate(2, 6), description: 'Petrol Fill-Up', category: 'Transport', type: 'expense', amount: 3000 },
  { id: 22, date: makeDate(2, 9), description: 'Flipkart Electronics', category: 'Shopping', type: 'expense', amount: 12000 },
  { id: 23, date: makeDate(2, 11), description: 'Spotify Premium', category: 'Entertainment', type: 'expense', amount: 119 },
  { id: 24, date: makeDate(2, 14), description: 'Doctor Consultation', category: 'Health', type: 'expense', amount: 1000 },

  // Month 3
  { id: 25, date: makeDate(3, 1), description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 82000 },
  { id: 26, date: makeDate(3, 5), description: 'Street Food Weekend', category: 'Food', type: 'expense', amount: 350 },
  { id: 27, date: makeDate(3, 8), description: 'Freelance App Dev', category: 'Freelance', type: 'income', amount: 25000 },
  { id: 28, date: makeDate(3, 12), description: 'Internet Bill', category: 'Utilities', type: 'expense', amount: 1100 },
  { id: 29, date: makeDate(3, 15), description: 'Shoes Online', category: 'Shopping', type: 'expense', amount: 2800 },

  // Month 4
  { id: 30, date: makeDate(4, 1), description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 80000 },
  { id: 31, date: makeDate(4, 3), description: 'Dominos Pizza', category: 'Food', type: 'expense', amount: 650 },
  { id: 32, date: makeDate(4, 7), description: 'Auto Rickshaw Rides', category: 'Transport', type: 'expense', amount: 180 },
  { id: 33, date: makeDate(4, 10), description: 'Amazon Prime Annual', category: 'Entertainment', type: 'expense', amount: 1499 },
  { id: 34, date: makeDate(4, 14), description: 'Medicine Purchase', category: 'Health', type: 'expense', amount: 1200 },
  { id: 35, date: makeDate(4, 18), description: 'Gas Pipeline Bill', category: 'Utilities', type: 'expense', amount: 800 },

  // Month 5
  { id: 36, date: makeDate(5, 1), description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 80000 },
  { id: 37, date: makeDate(5, 4), description: 'Cafe Coffee Day', category: 'Food', type: 'expense', amount: 420 },
  { id: 38, date: makeDate(5, 8), description: 'Train Tickets', category: 'Transport', type: 'expense', amount: 1200 },
  { id: 39, date: makeDate(5, 11), description: 'Freelance Consulting', category: 'Freelance', type: 'income', amount: 12000 },
  { id: 40, date: makeDate(5, 15), description: 'Reliance Smart Shopping', category: 'Shopping', type: 'expense', amount: 5600 },
];
