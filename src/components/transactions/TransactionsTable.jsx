import React, { useState, useEffect } from 'react';
import { TransactionRow } from './TransactionRow';
import { useTransactions } from '../../hooks/useTransactions';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { SkeletonRow } from '../ui/Skeleton';

export const TransactionsTable = ({
  transactions,
  onDelete,
  isAdmin,
  searchTerm,
  categoryFilter,
  typeFilter,
  sortBy,
  startDate,
  endDate,
}) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const {
    paginated,
    currentPage,
    totalPages,
    goToPage,
    totalFiltered,
  } = useTransactions(transactions, {
    searchTerm,
    categoryFilter,
    typeFilter,
    sortBy,
    startDate,
    endDate,
  });

  if (showSkeleton) {
    return (
      <div className="card-component" style={{ padding: '0', overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (totalFiltered === 0) {
    return (
      <div className="card-component empty-state">
        <div className="empty-state-icon">
          <Inbox size={64} strokeWidth={1} />
        </div>
        <h3 className="empty-state-title">No transactions found</h3>
        <p className="empty-state-text">Try adjusting your filters or add a new transaction.</p>
      </div>
    );
  }

  return (
    <div className="card-component table-card">
      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.map((transaction, index) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                isAdmin={isAdmin}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span className="pagination-info">
          Showing {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalFiltered)} of {totalFiltered}
        </span>
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft size={16} />
            Prev
          </button>
          <span className="pagination-current">
            {currentPage} / {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
