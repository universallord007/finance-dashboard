import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Sun, Moon, ChevronDown, User, Menu } from 'lucide-react';

const pageLabels = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export const Navbar = ({ darkMode, onToggleDarkMode, onMenuToggle }) => {
  const { currentPage, role, setRole } = useAppContext();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = role === 'admin' ? 'AD' : 'VW';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="navbar-menu-btn" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
        <div className="navbar-breadcrumb">
          <span className="navbar-breadcrumb-base">FinanceHub</span>
          <span className="navbar-breadcrumb-sep">/</span>
          <span className="navbar-breadcrumb-current">{pageLabels[currentPage] || 'Dashboard'}</span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Dark mode toggle */}
        <button
          className="navbar-icon-btn"
          onClick={onToggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <div className="dark-mode-toggle-icon">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </div>
        </button>

        {/* Role Switcher + Avatar */}
        <div className="role-switcher" ref={dropdownRef}>
          <button
            className={`role-switcher-btn ${role === 'admin' ? 'role-admin' : 'role-viewer'}`}
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
          >
            <span className="role-dot" />
            <span>{role === 'admin' ? 'Admin' : 'Viewer'}</span>
            <ChevronDown size={14} className={`role-chevron ${roleDropdownOpen ? 'open' : ''}`} />
          </button>

          {/* Avatar - also toggles role dropdown */}
          <button
            className="navbar-avatar"
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            title="Click to switch role"
          >
            <span>{initials}</span>
          </button>

          {roleDropdownOpen && (
            <div className="role-dropdown">
              <div className="role-dropdown-header">Switch Role</div>
              <button
                className={`role-dropdown-item ${role === 'admin' ? 'active' : ''}`}
                onClick={() => { setRole('admin'); setRoleDropdownOpen(false); }}
              >
                <span className="role-dot-purple" />
                Admin
                {role === 'admin' && <span className="role-check">✓</span>}
              </button>
              <button
                className={`role-dropdown-item ${role === 'viewer' ? 'active' : ''}`}
                onClick={() => { setRole('viewer'); setRoleDropdownOpen(false); }}
              >
                <span className="role-dot-gray" />
                Viewer
                {role === 'viewer' && <span className="role-check">✓</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
