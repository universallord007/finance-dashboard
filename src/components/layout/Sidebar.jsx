import React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Overview & Charts' },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, desc: 'Manage Payments' },
  { id: 'insights', label: 'Insights', icon: Lightbulb, desc: 'Analytics & Trends' },
];

export const Sidebar = ({ collapsed, onToggleCollapse }) => {
  const { currentPage, setCurrentPage, role } = useAppContext();

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Logo Area */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Wallet size={collapsed ? 20 : 22} />
        </div>
        {!collapsed && (
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">FinanceHub</span>
            <span className="sidebar-logo-subtitle">Smart Analytics</span>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button className="sidebar-collapse-btn" onClick={onToggleCollapse} title={collapsed ? 'Expand' : 'Collapse'}>
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation Label */}
      {!collapsed && <div className="sidebar-section-label">Menu</div>}

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
              title={collapsed ? item.label : undefined}
            >
              {isActive && <div className="sidebar-active-indicator" />}
              <div className={`sidebar-nav-icon-box ${isActive ? 'active' : ''}`}>
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              </div>
              {!collapsed && (
                <div className="sidebar-nav-text">
                  <span className="sidebar-nav-label">{item.label}</span>
                  <span className="sidebar-nav-desc">{item.desc}</span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        {!collapsed ? (
          <div className="sidebar-role-card">
            <div className={`sidebar-role-icon ${role === 'admin' ? 'admin' : 'viewer'}`}>
              {role === 'admin' ? <Shield size={16} /> : <Eye size={16} />}
            </div>
            <div className="sidebar-role-info">
              <span className="sidebar-role-name">{role === 'admin' ? 'Admin' : 'Viewer'}</span>
              <span className="sidebar-role-access">{role === 'admin' ? 'Full Access' : 'Read Only'}</span>
            </div>
          </div>
        ) : (
          <div className={`sidebar-role-dot ${role === 'admin' ? 'admin' : 'viewer'}`} title={role}>
            {role === 'admin' ? <Shield size={14} /> : <Eye size={14} />}
          </div>
        )}
        {!collapsed && <span className="sidebar-version">v1.0.0</span>}
      </div>
    </aside>
  );
};
