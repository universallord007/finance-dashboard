import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../data/mockData';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import { SkeletonChart, SkeletonCard } from '../ui/Skeleton';

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.fill, fontSize: '13px', margin: '4px 0' }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

const InsightCard = ({ title, value, subtitle, icon: Icon, color, children }) => (
  <div className="insight-card" style={{ borderLeftColor: color }}>
    <div className="insight-card-header">
      <div className="insight-card-icon" style={{ backgroundColor: `${color}20`, color }}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="insight-card-title">{title}</h4>
        <p className="insight-card-value" style={{ color }}>{value}</p>
        {subtitle && <p className="insight-card-subtitle">{subtitle}</p>}
      </div>
    </div>
    {children}
  </div>
);

export const InsightsSection = () => {
  const { transactions } = useAppContext();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Compute insights
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthExpenses = transactions.filter((t) => {
    const d = new Date(t.date);
    return t.type === 'expense' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const lastMonthExpenses = transactions.filter((t) => {
    const d = new Date(t.date);
    return t.type === 'expense' && d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });

  // 1. Highest Spending Category
  const categorySpending = {};
  const allExpenses = transactions.filter((t) => t.type === 'expense');
  allExpenses.forEach((t) => {
    categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
  });
  const totalExpenseAmount = allExpenses.reduce((s, t) => s + t.amount, 0);
  const sortedCategories = Object.entries(categorySpending).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCategories[0] || ['None', 0];
  const topCategoryPercent = totalExpenseAmount > 0 ? (topCategory[1] / totalExpenseAmount) * 100 : 0;

  // 2. Month over Month
  const thisMonthTotal = currentMonthExpenses.reduce((s, t) => s + t.amount, 0);
  const lastMonthTotal = lastMonthExpenses.reduce((s, t) => s + t.amount, 0);
  const momChange = lastMonthTotal > 0 ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;

  // 3. Biggest Single Expense
  const biggestExpense = allExpenses.length > 0
    ? allExpenses.reduce((max, t) => (t.amount > max.amount ? t : max), allExpenses[0])
    : null;

  // 4. Average Daily Spending
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysPassed = Math.min(now.getDate(), daysInMonth);
  const avgDaily = daysPassed > 0 ? thisMonthTotal / daysPassed : 0;

  // Bar chart data: monthly income vs expenses for last 6 months
  const barData = React.useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = d.getMonth();
      const year = d.getFullYear();
      const label = d.toLocaleDateString('en-IN', { month: 'short' });

      const monthTxns = transactions.filter((t) => {
        const td = new Date(t.date);
        return td.getMonth() === month && td.getFullYear() === year;
      });

      const income = monthTxns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
      const expenses = monthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

      months.push({ name: label, Income: income, Expenses: expenses });
    }
    return months;
  }, [transactions]);

  if (showSkeleton) {
    return (
      <div>
        <div className="insights-grid">
          {[0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
        <div style={{ marginTop: '32px' }}><SkeletonChart /></div>
      </div>
    );
  }

  return (
    <div>
      {/* Insight Cards */}
      <div className="insights-grid">
        <InsightCard
          title="Top Spending Category"
          value={topCategory[0]}
          subtitle={formatCurrency(topCategory[1])}
          icon={TrendingUp}
          color={CATEGORY_COLORS[topCategory[0]] || '#8b5cf6'}
        >
          <div className="insight-bar-container">
            <div
              className="insight-bar-fill"
              style={{
                width: `${topCategoryPercent}%`,
                backgroundColor: CATEGORY_COLORS[topCategory[0]] || '#8b5cf6',
              }}
            />
            <span className="insight-bar-label">{topCategoryPercent.toFixed(1)}% of total</span>
          </div>
        </InsightCard>

        <InsightCard
          title="Month over Month"
          value={`${momChange >= 0 ? '+' : ''}${momChange.toFixed(1)}%`}
          subtitle={`This: ${formatCurrency(thisMonthTotal)} vs Last: ${formatCurrency(lastMonthTotal)}`}
          icon={momChange >= 0 ? TrendingUp : TrendingDown}
          color={momChange >= 0 ? '#ef4444' : '#10b981'}
        />

        <InsightCard
          title="Biggest Expense"
          value={biggestExpense ? formatCurrency(biggestExpense.amount) : '₹0'}
          subtitle={biggestExpense ? `${biggestExpense.description} · ${biggestExpense.category}` : 'No expenses'}
          icon={DollarSign}
          color="#f59e0b"
        />

        <InsightCard
          title="Avg. Daily Spending"
          value={formatCurrency(avgDaily)}
          subtitle={`Based on ${daysPassed} days this month`}
          icon={Calendar}
          color="#3b82f6"
        />
      </div>

      {/* Income vs Expenses Bar Chart */}
      <div className="card-component" style={{ padding: '24px', marginTop: '32px' }}>
        <h3 className="chart-title">Income vs Expenses</h3>
        <p className="chart-subtitle">Monthly comparison over 6 months</p>
        <div style={{ width: '100%', height: 320, marginTop: '16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.3)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.3)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
              />
              <Bar
                dataKey="Income"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                isAnimationActive={true}
                animationDuration={1200}
              />
              <Bar
                dataKey="Expenses"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
                isAnimationActive={true}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
