import React from 'react';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

export const TransactionFilters = ({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  typeFilter,
  onTypeChange,
  sortBy,
  onSortChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}) => {
  return (
    <div className="filters-container">
      {/* Search */}
      <div className="filter-search">
        <Search size={16} className="filter-search-icon" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="filter-input filter-search-input"
        />
      </div>

      {/* Category */}
      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="filter-input filter-select"
      >
        <option value="All">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Type */}
      <select
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value)}
        className="filter-input filter-select"
      >
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="filter-input filter-select"
      >
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
      </select>

      {/* Date Range */}
      <div className="filter-date-range">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="filter-input filter-date"
          placeholder="From"
        />
        <span className="filter-date-sep">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="filter-input filter-date"
          placeholder="To"
        />
      </div>
    </div>
  );
};
