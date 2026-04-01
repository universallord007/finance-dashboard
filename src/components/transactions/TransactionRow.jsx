import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Badge } from '../ui/Badge';

export const TransactionRow = ({ transaction, isAdmin, onDelete, index }) => {
  const isIncome = transaction.type === 'income';

  return (
    <tr
      className="transaction-row"
      style={{
        animationDelay: `${index * 40}ms`,
      }}
    >
      <td className="td-date">{formatDate(transaction.date)}</td>
      <td className="td-description">
        <span className="description-text">{transaction.description}</span>
      </td>
      <td className="td-category">
        <Badge category={transaction.category}>{transaction.category}</Badge>
      </td>
      <td className="td-type">
        <span className={`type-badge ${isIncome ? 'income' : 'expense'}`}>
          {isIncome ? 'Income' : 'Expense'}
        </span>
      </td>
      <td className={`td-amount ${isIncome ? 'amount-income' : 'amount-expense'}`}>
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </td>
      {isAdmin && (
        <td className="td-actions">
          <button
            className="delete-btn"
            onClick={() => onDelete(transaction.id)}
            title="Delete transaction"
          >
            <Trash2 size={16} />
          </button>
        </td>
      )}
    </tr>
  );
};
