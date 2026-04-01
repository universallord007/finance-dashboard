# 💰 FinanceHub — Premium Finance Dashboard

A production-quality, fully responsive Finance Dashboard built with React, Recharts, and Lucide Icons. Features real-time analytics, transaction management, role-based access control, dark/light mode, and a premium glassmorphism UI.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework with hooks & context API |
| **Vite 5** | Lightning-fast build tool & dev server |
| **Recharts** | Composable charting library (Area, Pie, Bar) |
| **Lucide React** | Beautiful, consistent icon set |
| **Vanilla CSS** | Custom design system with CSS variables |
| **LocalStorage** | Client-side data persistence |

---

## 📦 Setup & Installation

```bash
# 1. Clone the repository
git clone https://github.com/universallord007/finance-dashboard.git
cd Zoryn_intern

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## ✨ Features

### 📊 Dashboard
- **Summary Cards** — Total Balance, Monthly Income, Monthly Expenses, Savings Rate with animated count-up numbers
- **Balance Trend Chart** — 6-month cumulative balance area chart with gradient fill and custom tooltips
- **Spending Breakdown** — Donut chart with category colors, center total label, and interactive legend

### 💳 Transactions
- **Full CRUD** — Add (Admin only) and Delete (Admin only) transactions
- **Advanced Filters** — Search, category filter, type filter, sort options, and date range picker
- **Paginated Table** — 10 rows per page with prev/next controls and page indicator
- **Zebra Striping** — Alternating row backgrounds for readability
- **Staggered Animations** — Rows fade in with staggered delays
- **Empty State** — Centered icon and message when no results match filters
- **CSV Export** — Export currently filtered transactions as `transactions-YYYY-MM-DD.csv`

### 📈 Insights & Analytics
- **Top Spending Category** — With visual progress bar showing percentage of total
- **Month over Month** — Spending comparison with percentage change indicator
- **Biggest Single Expense** — Transaction details for the largest expense
- **Average Daily Spending** — Calculated from current month data
- **Income vs Expenses Chart** — 6-month grouped bar chart comparison

### 🎨 Design System
- **Glassmorphism** — `backdrop-filter: blur()` with semi-transparent backgrounds
- **CSS Custom Properties** — Full theming via CSS variables for instant dark/light switching
- **Gradient Accents** — Purple (#8b5cf6), Blue (#3b82f6), Green (#10b981), Red (#ef4444)
- **Inter Font** — Modern typography imported from Google Fonts
- **Consistent Radii** — 16px cards, 10px inputs, 8px small elements
- **Subtle Borders** — `1px solid rgba(255,255,255,0.06)` for depth
- **Premium Shadows** — `0 4px 24px rgba(0,0,0,0.5)` with hover enhancements
- **Micro-animations** — Hover scales, glow effects, gradient shifts, and floating elements

### 🔐 Role-Based UI
- **Admin Role** — Full access: add transactions, delete transactions, export CSV
- **Viewer Role** — Read-only: view dashboard, view transactions, export CSV
- **Role Switcher** — Pill-style dropdown in navbar with color-coded indicators
- **Persisted Role** — Role selection saved to localStorage

### 🌓 Dark / Light Mode
- **Full Theme Support** — Every component adapts to both themes
- **Smooth Transitions** — 0.4s ease transitions on theme switch
- **localStorage Persistence** — Theme preference remembered across sessions
- **CSS Variable Architecture** — Single source of truth for all colors

### 📱 Responsiveness
- **Desktop (>1024px)** — Full sidebar (264px) + content area
- **Tablet (768-1024px)** — Icon-only sidebar (76px) + content
- **Mobile (<768px)** — No sidebar, bottom tab navigation with 3 tabs
- **ResponsiveContainer** — All charts resize properly
- **Stacked Layouts** — Cards and grids adapt to available space

### 🔔 Toast Notifications
- **Stacked Toasts** — Multiple toasts stack in bottom-right corner
- **Three Types** — Success (green), Error (red), Info (blue)
- **Auto-dismiss** — 3-second timer with animated progress bar
- **Slide Animation** — Smooth slide-in from right

### ⏳ Skeleton Loading
- **Shimmer Effect** — Purple-tinted shimmer animation on initial load
- **1.5s Reveal** — Skeleton placeholders shown for 1.5 seconds then content fades in
- **Component Skeletons** — Cards, table rows, and chart placeholders

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Fixed left sidebar with nav & role badge
│   │   ├── Navbar.jsx           # Top bar with breadcrumb, dark mode, role switcher
│   │   └── Layout.jsx           # Shell combining sidebar + navbar + content
│   ├── dashboard/
│   │   ├── SummaryCards.jsx      # 4 animated summary cards with count-up
│   │   ├── BalanceTrendChart.jsx # 6-month area chart with gradient fill
│   │   └── SpendingBreakdownChart.jsx # Donut chart with custom legend
│   ├── transactions/
│   │   ├── TransactionsTable.jsx # Paginated table with skeleton loading
│   │   ├── TransactionRow.jsx    # Individual row with staggered animation
│   │   ├── TransactionFilters.jsx # Search, dropdowns, date range
│   │   └── AddTransactionModal.jsx # Glassmorphism modal with validation
│   ├── insights/
│   │   └── InsightsSection.jsx   # 4 insight cards + income vs expenses bar chart
│   └── ui/
│       ├── Badge.jsx             # Category-colored pill badges
│       ├── Card.jsx              # Glassmorphism card wrapper
│       ├── Toast.jsx             # Toast notification system
│       └── Skeleton.jsx          # Shimmer loading placeholders
├── context/
│   └── AppContext.jsx            # Global state: transactions, role, toasts, totals
├── data/
│   └── mockData.js               # 40 realistic INR transactions across 8 categories
├── hooks/
│   ├── useTransactions.js        # Filtering, sorting, pagination logic
│   └── useDarkMode.js            # Dark mode toggle with localStorage sync
├── utils/
│   ├── formatters.js             # formatCurrency (₹), formatDate, getCategoryColor
│   └── exportCSV.js              # CSV generation and download trigger
├── App.jsx                       # Main app orchestrating all sections
├── main.jsx                      # Entry point with AppProvider
└── index.css                     # Complete design system (1900+ lines)
```

---

## 🎭 Role-Based UI Explanation

The app supports two roles that can be switched via the dropdown in the navbar:

| Feature | Admin | Viewer |
|---|:---:|:---:|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| View Insights | ✅ | ✅ |
| Add Transaction | ✅ | ❌ |
| Delete Transaction | ✅ | ❌ |
| Export CSV | ✅ | ✅ |
| Switch Role | ✅ | ✅ |
| Toggle Dark Mode | ✅ | ✅ |

> The **Admin** role shows the "Add Transaction" button and delete icons on each row.  
> The **Viewer** role hides all write operations but retains full read access and CSV export.

---

## 💾 State Management

All state is managed through a single React Context (`AppContext`):

- **Transactions** — Stored in `useReducer`, persisted to `localStorage`
- **Role** — `admin` or `viewer`, persisted to `localStorage`
- **Dark Mode** — Managed by `useDarkMode` hook, persisted to `localStorage`
- **Toasts** — Array of toast objects with auto-dismiss timers
- **Computed Totals** — Derived values: total balance, monthly income/expenses, savings rate, trends

---

## 📸 Screenshots

### Dark Mode — Dashboard
> *Dashboard view with summary cards, balance trend chart, and spending breakdown*

### Light Mode — Dashboard
> *Light theme with adapted colors and shadows*

### Transactions Page
> *Filterable, sortable, paginated transaction table with admin controls*

### Insights Page
> *Analytics cards and income vs expenses comparison chart*

### Mobile View
> *Responsive layout with bottom tab navigation*

---

## 🛠 Development Notes

- **No external CSS framework** — Pure vanilla CSS with custom properties for maximum control
- **No routing library** — Navigation managed via context state (`currentPage`)
- **All data is mock** — 40 realistic transactions generated relative to current date
- **Currency format** — Indian Rupees (₹) via `Intl.NumberFormat('en-IN')`
- **Date format** — Indian locale via `toLocaleDateString('en-IN')`

---

## 📄 License

This project was built as part of an internship assessment. All rights reserved.
