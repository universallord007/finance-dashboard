import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

export const AddTransactionModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimating(true);
      setForm({
        description: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      });
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Amount must be positive';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAdd({
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    });

    handleClose();
  };

  const handleClose = () => {
    setAnimating(false);
    setTimeout(() => onClose(), 200);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${animating ? 'visible' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`modal-container ${animating ? 'visible' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Add Transaction</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              className={`form-input ${errors.description ? 'error' : ''}`}
              placeholder="e.g., Grocery shopping"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input
              type="number"
              className={`form-input ${errors.amount ? 'error' : ''}`}
              placeholder="e.g., 500"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            {errors.amount && <span className="form-error">{errors.amount}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className={`form-input ${errors.category ? 'error' : ''}`}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>

          {/* Type */}
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="form-radio-group">
              <label className={`form-radio ${form.type === 'expense' ? 'active expense' : ''}`}>
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={form.type === 'expense'}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <span>Expense</span>
              </label>
              <label className={`form-radio ${form.type === 'income' ? 'active income' : ''}`}>
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={form.type === 'income'}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <span>Income</span>
              </label>
            </div>
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className={`form-input ${errors.date ? 'error' : ''}`}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          {/* Submit */}
          <button type="submit" className="form-submit-btn">
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};
