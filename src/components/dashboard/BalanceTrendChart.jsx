import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { SkeletonChart } from '../ui/Skeleton';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p className="chart-tooltip-value">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

export const BalanceTrendChart = () => {
  const { transactions } = useAppContext();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 1500);
    return () => clearTimeout(t);
  }, []);

  // Compute monthly balance for the last 6 months
  const data = React.useMemo(() => {
    const now = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = d.getMonth();
      const year = d.getFullYear();
      const monthLabel = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });

      const monthTxns = transactions.filter((t) => {
        const td = new Date(t.date);
        return td.getMonth() === month && td.getFullYear() === year;
      });

      const income = monthTxns
        .filter((t) => t.type === 'income')
        .reduce((s, t) => s + t.amount, 0);
      const expenses = monthTxns
        .filter((t) => t.type === 'expense')
        .reduce((s, t) => s + t.amount, 0);

      months.push({
        name: monthLabel,
        balance: income - expenses,
      });
    }

    // Cumulative balance
    let cumulative = 0;
    return months.map((m) => {
      cumulative += m.balance;
      return { ...m, balance: cumulative };
    });
  }, [transactions]);

  if (showSkeleton) {
    return <SkeletonChart />;
  }

  return (
    <div className="card-component" style={{ padding: '24px' }}>
      <h3 className="chart-title">Balance Trend</h3>
      <p className="chart-subtitle">Last 6 months cumulative balance</p>
      <div style={{ width: '100%', height: 280, marginTop: '16px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#balanceGradient)"
              isAnimationActive={true}
              animationDuration={1500}
              dot={false}
              activeDot={{
                r: 6,
                fill: '#8b5cf6',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
