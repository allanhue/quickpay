# QuickPay Invoice Management

A modern invoice management dashboard built with Next.js, React, TypeScript, and Tailwind CSS.

## Project Overview

QuickPay is a professional invoice management system that allows users to create, track, and manage invoices with an intuitive interface and robust TypeScript type safety.

## Project Structure

```
quickpay/
├── app/
│   ├── page.tsx                 # Main application page
│   ├── components/
│   │   ├── Sidebar.tsx          # Navigation menu
│   │   ├── Topbar.tsx           # Search and user actions
│   │   ├── Payment_table.tsx    # Invoice list with stats
│   │   ├── Invoice_drawer.tsx   # Create invoice drawer (slides from right)
│   │   └── Payment_modal.tsx    # Invoice details modal
│   └── store/
│       └── InvoiceStore.ts      # Zustand state management (typed)
├── types/
│   └── invoice.ts               # TypeScript type definitions
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## Features

**Core Requirements Implemented**
- Dashboard Layout: Complete navigation and structural layout with sidebar and topbar
- Payments Table: Full invoice list view with search, filtering, and statistics
- New Invoice Drawer: Right-sliding drawer form for creating invoices
- Payment Modal: Detailed invoice view with status updates and actions
- State Management: Zustand for global state management
- TypeScript: Full type safety with comprehensive type definitions
- Form Validation: Client-side validation with error handling

**Additional Features**
- Create and manage invoices with multiple line items
- Search invoices by customer name, email, or invoice ID
- Filter by status (All, Paid, Pending, Overdue)
- Real-time revenue statistics dashboard
- Update invoice status (Mark as Paid)
- Delete invoices with confirmation
- Responsive, professional UI design
- Success notifications on invoice creation

## Tech Stack

- Next.js 14 (App Router)
- TypeScript 5
- React 18
- Tailwind CSS
- Zustand (State Management)
- Lucide React (Icons)

## Installation

**Prerequisites**
- Node.js 18+ 
- npm or yarn

**Setup**

```bash
# Clone the repository
git clone <your-repo-url>
cd quickpay

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

**Creating an Invoice**

1. Click "Create Invoice" in sidebar
2. Fill form with customer details and line items
3. Click "Save Invoice"

**Managing Invoices**

- Search: Type in search bar to filter by customer, email, or invoice ID
- Filter: Click status tabs (All, Paid, Pending, Overdue)
- View Details: Click any invoice row to see full details
- Update Status: Open invoice and click "Mark as Paid"
- Delete: Open invoice and click "Delete Invoice"

## Design System

**Colors**
- Primary: Blue (#2563EB)
- Success: Green (#059669)
- Warning: Amber (#D97706)
- Danger: Red (#DC2626)
- Neutral: Gray scales

**Typography**
- Font sizes: 10px - 24px
- Font weights: Medium (500), Semibold (600), Bold (700)

**Components**
- Compact buttons with hover states
- Refined input fields with focus states
- Subtle shadows and borders
- Smooth transitions

## Data Model

```typescript
interface Invoice {
  id: string;                    //id
  customer: string;              // Customer name
  email: string;                 // Customer email
  amount: number;                // Total amount
  date: string;                  // Issue date (ISO format)
  dueDate: string;              // Due date (ISO format)
  status: 'Paid' | 'Pending' | 'Overdue';
  items: InvoiceItem[];         // Line items
  notes?: string;               // Optional notes
}

interface InvoiceItem {
  description: string;          // Item description
  quantity: number;             // Quantity
  price: number;                // Unit price
}
```






## Type Checking

```bash
# Run TypeScript compiler check
npm run type-check

# Build the project (includes type checking)
npm run build
```


## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
