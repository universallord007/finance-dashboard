import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Layout } from './components/layout/Layout';
import { useAppContext } from './context/AppContext';
import { useDarkMode } from './hooks/useDarkMode';
import { exportTransactionsAsCSV } from './utils/exportCSV';
import { useTransactions } from './hooks/useTransactions';

// Dashboard Components
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceTrendChart } from './components/dashboard/BalanceTrendChart';
import { SpendingBreakdownChart } from './components/dashboard/SpendingBreakdownChart';

// Transaction Components
import { TransactionFilters } from './components/transactions/TransactionFilters';
import { TransactionsTable } from './components/transactions/TransactionsTable';
import { AddTransactionModal } from './components/transactions/AddTransactionModal';

// Insights Component
import { InsightsSection } from './components/insights/InsightsSection';

// UI Components
import { ToastContainer } from './components/ui/Toast';

function App() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    role,
    currentPage,
    toasts,
    addToast,
    removeToast,
  } = useAppContext();

  const [darkMode, toggleDarkMode] = useDarkMode();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleAddTransaction = (transaction) => {
    addTransaction(transaction);
    setModalOpen(false);
    addToast('Transaction added successfully!', 'success');
  };

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id);
    addToast('Transaction deleted', 'info');
  };

  // Get filtered transactions for CSV export
  const { filtered: filteredForExport } = useTransactions(transactions, {
    searchTerm,
    categoryFilter,
    typeFilter,
    sortBy,
    startDate,
    endDate,
  });

  const handleExportCSV = () => {
    exportTransactionsAsCSV(filteredForExport);
    addToast('CSV exported successfully!', 'success');
  };

  return (
    <Layout darkMode={darkMode} onToggleDarkMode={toggleDarkMode}>
      <div className="page-content">
        {/* DASHBOARD */}
        {currentPage === 'dashboard' && (
          <>
            <div className="section-header">
              <h2 className="section-title">Overview</h2>
              <p className="section-subtitle">Your financial summary at a glance</p>
            </div>
            <SummaryCards />

            <div className="charts-grid">
              <div className="chart-large">
                <BalanceTrendChart />
              </div>
              <div className="chart-small">
                <SpendingBreakdownChart />
              </div>
            </div>
          </>
        )}

        {/* TRANSACTIONS */}
        {currentPage === 'transactions' && (
          <>
            <div className="section-header-row">
              <div>
                <h2 className="section-title">Transactions</h2>
                <p className="section-subtitle">
                  {transactions.length} transactions total
                </p>
              </div>
              <div className="section-actions">
                {role === 'admin' && (
                  <button className="btn-primary" onClick={() => setModalOpen(true)}>
                    <Plus size={16} />
                    <span>Add Transaction</span>
                  </button>
                )}
                <button className="btn-secondary" onClick={handleExportCSV}>
                  <Download size={16} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <TransactionFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              typeFilter={typeFilter}
              onTypeChange={setTypeFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              startDate={startDate}
              onStartDateChange={setStartDate}
              endDate={endDate}
              onEndDateChange={setEndDate}
            />

            <TransactionsTable
              transactions={transactions}
              onDelete={handleDeleteTransaction}
              isAdmin={role === 'admin'}
              searchTerm={searchTerm}
              categoryFilter={categoryFilter}
              typeFilter={typeFilter}
              sortBy={sortBy}
              startDate={startDate}
              endDate={endDate}
            />
          </>
        )}

        {/* INSIGHTS */}
        {currentPage === 'insights' && (
          <>
            <div className="section-header">
              <h2 className="section-title">Analytics & Insights</h2>
              <p className="section-subtitle">Deep dive into your financial patterns</p>
            </div>
            <InsightsSection />
          </>
        )}
      </div>

      {/* Modal */}
      {role === 'admin' && (
        <AddTransactionModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddTransaction}
        />
      )}

      {/* Toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Layout>
  );
}

export default App;
