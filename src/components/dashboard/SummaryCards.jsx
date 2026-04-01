import React, { useEffect, useRef, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUp, ArrowDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { useAppContext } from '../../context/AppContext';
import { SkeletonCard } from '../ui/Skeleton';

const useCountUp = (target, duration = 1200) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        ref.current = requestAnimationFrame(animate);
      }
    };

    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [target, duration]);

  return value;
};

const SummaryCard = ({ title, value, trend, icon: Icon, gradient, delay, isCurrency = true, suffix = '' }) => {
  const animatedValue = useCountUp(Math.abs(value));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const isPositiveTrend = trend >= 0;
  const displayValue = value < 0 ? -animatedValue : animatedValue;

  return (
    <div
      className="summary-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="summary-card-gradient" style={{ background: gradient }} />
      <div className="summary-card-content">
        <div className="summary-card-left">
          <span className="summary-card-title">{title}</span>
          <span className="summary-card-value">
            {isCurrency ? formatCurrency(displayValue) : `${displayValue}${suffix}`}
          </span>
          <div className={`summary-card-trend ${isPositiveTrend ? 'positive' : 'negative'}`}>
            {isPositiveTrend ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            <span>{formatPercentage(trend)} vs last month</span>
          </div>
        </div>
        <div className="summary-card-icon-wrap" style={{ background: gradient }}>
          <Icon size={24} color="white" />
        </div>
      </div>
    </div>
  );
};

export const SummaryCards = () => {
  const { totals } = useAppContext();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 1500);
    return () => clearTimeout(t);
  }, []);

  if (showSkeleton) {
    return (
      <div className="summary-cards-grid">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Balance',
      value: totals.totalBalance,
      trend: totals.monthlyIncome > 0 ? ((totals.monthlyIncome - totals.monthlyExpenses) / totals.monthlyIncome) * 100 : 0,
      icon: Wallet,
      gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    },
    {
      title: 'Monthly Income',
      value: totals.monthlyIncome,
      trend: totals.incomeTrend,
      icon: TrendingUp,
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
      title: 'Monthly Expenses',
      value: totals.monthlyExpenses,
      trend: totals.expenseTrend,
      icon: TrendingDown,
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    },
    {
      title: 'Savings Rate',
      value: Math.round(totals.savingsRate),
      trend: totals.savingsTrend,
      icon: PiggyBank,
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      isCurrency: false,
      suffix: '%',
    },
  ];

  return (
    <div className="summary-cards-grid">
      {cards.map((card, index) => (
        <SummaryCard key={card.title} {...card} delay={index * 100} />
      ))}
    </div>
  );
};
