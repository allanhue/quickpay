# QuickPay Invoice Management

A modern invoice management dashboard built with Next.js, React, and Tailwind CSS.

## Project Structure

```
quickpay/
├── app/
│   ├── page.jsx
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation menu
│   │   ├── Topbar.jsx           # Search and user actions
│   │   ├── Payment_table.jsx    # Invoice list with stats
│   │   ├── Invoice_drawer.jsx   # Create invoice form
│   │   └── Payment_modal.jsx    # Invoice details view
│   └── store/
│       └── InvoiceStore.js      # Zustand state management
```

## Features

- Create and manage invoices with multiple line items
- Search and filter by status (Paid, Pending, Overdue)
- Real-time revenue statistics dashboard
- Update invoice status and delete invoices
- Form validation and error handling
- Responsive, professional UI design

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Zustand (State Management)
- Lucide React (Icons)

## Installation

```bash
npm install
npm run dev
```

## Usage

**Create Invoice**: Click "Create Invoice" in sidebar → Fill form → Submit

**Search**: Type in search bar to filter by customer, email, or invoice ID

**Filter**: Click status tabs (All, Paid, Pending, Overdue)

**View Details**: Click any invoice row to see full details

**Update Status**: Open invoice → Click "Mark as Paid"

**Delete**: Open invoice → Click "Delete Invoice"

## Design System

**Colors**: Professional blue and gray palette

**Typography**: 10px - 24px range, clean hierarchy

**Spacing**: Consistent 4px base unit system

**Components**: Compact buttons, refined inputs, subtle shadows

## Data Model

```javascript
Invoice {
  id: string         
  customer: string
  email: string
  amount: number
  date: string
  dueDate: string
  status: "Paid" | "Pending" | "Overdue"
  items: [{ description, quantity, price }]
  notes: string
}
```

## Future Enhancements

- Backend API integration
- PDF generation and export
- Email notifications
- Payment gateway integration
- Multi-currency support
- Analytics and reporting

## License

MIT