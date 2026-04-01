import { useMemo, useState } from 'react';

export const useTransactions = (transactions, filters = {}) => {
  const {
    searchTerm = '',
    categoryFilter = 'All',
    typeFilter = 'All',
    sortBy = 'date-desc',
    startDate = '',
    endDate = '',
  } = filters;

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (categoryFilter && categoryFilter !== 'All') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // Type filter
    if (typeFilter && typeFilter !== 'All') {
      result = result.filter((t) => t.type === typeFilter);
    }

    // Date range filter
    if (startDate) {
      result = result.filter((t) => t.date >= startDate);
    }
    if (endDate) {
      result = result.filter((t) => t.date <= endDate);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'amount-asc':
          return a.amount - b.amount;
        case 'amount-desc':
          return b.amount - a.amount;
        case 'name-asc':
          return a.description.localeCompare(b.description);
        case 'name-desc':
          return b.description.localeCompare(a.description);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return result;
  }, [transactions, searchTerm, categoryFilter, typeFilter, sortBy, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginated = useMemo(() => {
    const start = (safeCurrentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, safeCurrentPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return {
    filtered,
    paginated,
    currentPage: safeCurrentPage,
    totalPages,
    goToPage,
    totalFiltered: filtered.length,
  };
};
