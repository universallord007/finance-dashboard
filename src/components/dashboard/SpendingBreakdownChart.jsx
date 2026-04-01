import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { CATEGORY_COLORS } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import { SkeletonChart } from '../ui/Skeleton';

const COLORS = [
  '#ef4444', '#f59e0b', '#ec4899', '#8b5cf6',
  '#10b981', '#3b82f6', '#06b6d4', '#6366f1',
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{payload[0].name}</p>
      <p className="chart-tooltip-value">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

export const SpendingBreakdownChart = () => {
  const { transactions } = useAppContext();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const data = React.useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const categoryMap = {};

    expenses.forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    return Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const totalExpenses = data.reduce((sum, d) => sum + d.value, 0);

  if (showSkeleton) {
    return <SkeletonChart />;
  }

  return (
    <div className="card-component" style={{ padding: '24px' }}>
      <h3 className="chart-title">Spending Breakdown</h3>
      <p className="chart-subtitle">By category</p>

      <div style={{ width: '100%', height: 220, position: 'relative', marginTop: '8px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={1200}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CATEGORY_COLORS[entry.name] || COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="donut-center-label">
          <span className="donut-center-amount">{formatCurrency(totalExpenses)}</span>
          <span className="donut-center-text">Total Spent</span>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="pie-legend">
        {data.map((entry) => (
          <div key={entry.name} className="pie-legend-item">
            <span
              className="pie-legend-dot"
              style={{ backgroundColor: CATEGORY_COLORS[entry.name] || '#6b7280' }}
            />
            <span className="pie-legend-label">{entry.name}</span>
            <span className="pie-legend-value">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
