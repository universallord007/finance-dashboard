import React, { useState, useEffect } from 'react';

const SkeletonPulse = ({ width = '100%', height = '20px', borderRadius = '8px', style = {} }) => (
  <div
    className="skeleton-shimmer"
    style={{
      width,
      height,
      borderRadius,
      ...style,
    }}
  />
);

export const SkeletonCard = () => (
  <div className="card-component" style={{ padding: '24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div>
        <SkeletonPulse width="100px" height="12px" style={{ marginBottom: '12px' }} />
        <SkeletonPulse width="140px" height="28px" style={{ marginBottom: '8px' }} />
        <SkeletonPulse width="80px" height="14px" />
      </div>
      <SkeletonPulse width="48px" height="48px" borderRadius="12px" />
    </div>
  </div>
);

export const SkeletonRow = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
    <SkeletonPulse width="90px" height="14px" />
    <SkeletonPulse width="180px" height="14px" />
    <SkeletonPulse width="80px" height="24px" borderRadius="9999px" />
    <SkeletonPulse width="60px" height="14px" />
    <SkeletonPulse width="80px" height="14px" />
  </div>
);

export const SkeletonChart = () => (
  <div className="card-component" style={{ padding: '24px' }}>
    <SkeletonPulse width="140px" height="16px" style={{ marginBottom: '24px' }} />
    <SkeletonPulse width="100%" height="250px" borderRadius="12px" />
  </div>
);

export const Skeleton = ({ children, loading, delay = 1500 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (loading !== undefined ? loading : isLoading) {
    return children;
  }

  return null;
};

export default Skeleton;
