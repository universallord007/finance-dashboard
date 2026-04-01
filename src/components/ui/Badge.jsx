import React from 'react';
import { getCategoryColor } from '../../utils/formatters';

export const Badge = ({ children, category, variant = 'default', className = '' }) => {
  const color = category ? getCategoryColor(category) : null;

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.025em',
    transition: 'all 0.2s ease',
  };

  if (category && color) {
    return (
      <span
        className={className}
        style={{
          ...baseStyle,
          backgroundColor: `${color}20`,
          color: color,
          border: `1px solid ${color}30`,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: color,
            marginRight: 6,
            flexShrink: 0,
          }}
        />
        {children}
      </span>
    );
  }

  const variants = {
    default: {
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      color: '#8b5cf6',
      border: '1px solid rgba(139, 92, 246, 0.3)',
    },
    success: {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
    },
    danger: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
    gray: {
      backgroundColor: 'rgba(107, 114, 128, 0.15)',
      color: '#9ca3af',
      border: '1px solid rgba(107, 114, 128, 0.3)',
    },
  };

  return (
    <span className={className} style={{ ...baseStyle, ...(variants[variant] || variants.default) }}>
      {children}
    </span>
  );
};
