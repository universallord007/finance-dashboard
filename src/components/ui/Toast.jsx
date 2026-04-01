import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', text: '#10b981', bar: '#10b981' },
  error: { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#ef4444', bar: '#ef4444' },
  info: { bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', text: '#3b82f6', bar: '#3b82f6' },
};

export const Toast = ({ message, type = 'success', onClose, id }) => {
  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(false);

  const Icon = icons[type] || icons.info;
  const color = colors[type] || colors.info;

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const duration = 3000;
    const interval = 30;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setVisible(false);
          setTimeout(() => onClose && onClose(id), 300);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [id, onClose]);

  return (
    <div
      style={{
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: color.bg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${color.border}40`,
        borderRadius: '12px',
        padding: '14px 16px',
        marginBottom: '8px',
        minWidth: '300px',
        maxWidth: '400px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Icon size={18} style={{ color: color.text, flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: '13px', fontWeight: 500, color: color.text }}>
          {message}
        </span>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose && onClose(id), 300);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: color.text,
            opacity: 0.6,
            padding: '2px',
            display: 'flex',
            flexShrink: 0,
          }}
        >
          <X size={14} />
        </button>
      </div>
      {/* Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          width: `${progress}%`,
          backgroundColor: color.bar,
          transition: 'width 30ms linear',
          borderRadius: '0 0 12px 12px',
        }}
      />
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column-reverse',
      }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};
