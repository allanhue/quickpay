# QuickPay Invoice Dashboard

A modern, feature-rich invoice management dashboard built with Next.js, React, and Tailwind CSS.

## Project Structure

```
your-project/
├── app/
│   ├── page.jsx                    # Main page component
│   ├── components/
│   │   ├── Sidebar.jsx             # Left navigation sidebar
│   │   ├── Topbar.jsx              # Top header with search and actions
│   │   ├── Payment_table.jsx       # Invoice list/table view
│   │   ├── Invoice_drawer.jsx      # Slide-out form for new invoices
│   │   └── Payment_modal.jsx       # Modal for invoice details
│   └── store/
│       └── invoiceStore.js         # Zustand state management
├── package.json
└── tailwind.config.js
```

## Features Implemented

### Core Requirements

- **Dashboard Layout**: Complete navigation with sidebar and topbar
- **Payments Table**: Sortable, filterable invoice list with stats
- **New Invoice Drawer**: Slide-out form with validation
- **Payment Modal**: Detailed invoice view with actions
- **State Management**: Zustand for global state
- **Responsive Design**: Modern UI with Tailwind CSS

### ✨ Enhanced Features

- **Stats Dashboard**: Real-time revenue, paid, pending, and overdue totals
- **Search & Filter**: Live search and status-based filtering
- **Form Validation**: Client-side validation for invoice creation
- **Dynamic Items**: Add/remove invoice line items
- **Status Management**: Update invoice status (Pending → Paid)
- **Delete Functionality**: Remove invoices with confirmation
- **Date Formatting**: Proper date display throughout
- **Currency Formatting**: USD formatting for all amounts

## 🎨 Component Details

### 1. **Sidebar.jsx**

- Navigation menu with active state
- User profile section
- Badge indicators
- Gradient logo design

### 2. **Topbar.jsx**

- Global search functionality
- Notification bell with indicator
- "New Invoice" action button
- Connected to Zustand store

### 3. **Payment_table.jsx**

- 4 stat cards (Total, Paid, Pending, Overdue)
- Filterable table by status
- Sortable columns
- Search integration
- Click to view details
- Quick actions (View, Download, More)

### 4. **Invoice_drawer.jsx**

- Slide-in animation from right
- Customer information form
- Dynamic line items with add/remove
- Real-time total calculation
- Form validation with error messages
- Backdrop overlay

### 5. **Payment_modal.jsx**

- Centered modal overlay
- Complete invoice details
- Item breakdown table
- Status change functionality
- Action buttons (Download, Email, Print)
- Delete with confirmation
- Payment information section

### 6. **invoiceStore.js** (Zustand)

State includes:

- `invoices`: Array of all invoices
- `selectedInvoice`: Currently viewed invoice
- `isDrawerOpen`: Drawer visibility
- `isPaymentModalOpen`: Modal visibility
- `searchQuery`: Current search term
- `filterStatus`: Active filter

Actions:

- `addInvoice()`: Create new invoice
- `updateInvoice()`: Modify existing invoice
- `deleteInvoice()`: Remove invoice
- `openDrawer()`, `closeDrawer()`
- `openPaymentModal()`, `closePaymentModal()`
- `setSearchQuery()`, `setFilterStatus()`

## 📦 Installation

```bash
# Install dependencies
npm install zustand lucide-react

# Run development server
npm run dev
```

##  Usage

1. **View Invoices**: See all invoices in the table with stats
2. **Search**: Type in the search bar to filter by customer, email, or ID
3. **Filter**: Click status tabs (All, Paid, Pending, Overdue)
4. **Create Invoice**: Click "New Invoice" button → Fill form → Submit
5. **View Details**: Click any invoice row to open detail modal
6. **Update Status**: In modal, click "Mark as Paid" for pending invoices
7. **Delete**: Click delete button in modal (with confirmation)

##  Design Highlights

- **Color Scheme**: Blue to purple gradients
- **Modern UI**: Rounded corners, shadows, smooth transitions
- **Responsive**: Works on desktop (optimized for larger screens)
- **Icons**: Lucide React for consistent iconography
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent padding and margins

##  State Flow

```
User Action → Component Event → Zustand Action → State Update → UI Re-render
```

Example: Creating an invoice

1. User clicks "New Invoice" → `openDrawer()`
2. User fills form and submits → `addInvoice(invoice)`
3. Store adds invoice to array → `isDrawerOpen = false`
4. Table re-renders with new invoice → Drawer closes

## 🚀 Next Steps (Bonus Features)

To extend this project, consider adding:

1. **Backend Integration**:

   - Supabase for data persistence
   - API routes for CRUD operations
   - Authentication

2. **Form Validation**:

   - Integrate Zod schema validation
   - More robust error handling

3. **Invoice Preview**:

   - Printable invoice template
   - PDF generation

4. **Advanced Features**:
   - Recurring invoices
   - Payment tracking
   - Customer management
   - Analytics dashboard
   - Email notifications

## 📝 Notes

- All components use "use client" directive (Next.js App Router)
- Mock data included in store for demo purposes
- Tailwind CSS classes used throughout
- No external UI libraries needed
- State persists during session (reset on refresh)

## 🎯 Key Improvements from Original

1. **Enhanced Store**: More actions, search/filter state
2. **Stats Dashboard**: Real-time calculations
3. **Better Validation**: Form error handling
4. **Status Management**: Update invoice status
5. **Delete Functionality**: Remove unwanted invoices
6. **Improved UX**: Transitions, hover states, loading states
7. **Professional Design**: Matches modern dashboard standards

---

