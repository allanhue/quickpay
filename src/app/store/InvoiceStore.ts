//InvoiceStore.ts as react redux
"use client";

import { create } from 'zustand';
import { Invoice, InvoiceStore } from '@/types/invoice';

const generateId = (): string => {
  return `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

const calculateStatus = (dueDate: string): 'Paid' | 'Pending' | 'Overdue' => {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (due < today) {
    return 'Overdue';
  }
  return 'Pending';
};

// Sample data
const sampleInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    customer: 'Acme Corporation',
    email: 'billing@acme.com',
    amount: 5420.00,
    date: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'Paid',
    items: [
      { description: 'Web Development Services', quantity: 40, price: 125.00 },
      { description: 'UI/UX Design', quantity: 12, price: 85.00 }
    ],
    notes: 'Thank you for your business'
  },
  {
    id: 'INV-2024-002',
    customer: 'TechStart Inc',
    email: 'finance@techstart.io',
    amount: 3250.00,
    date: '2024-01-18',
    dueDate: '2024-02-18',
    status: 'Pending',
    items: [
      { description: 'Monthly Retainer - January', quantity: 1, price: 3250.00 }
    ],
    notes: 'Net 30 payment terms for the month of January'
  },
  {
    id: 'INV-2024-003',
    customer: 'Global Solutions Ltd',
    email: 'safaricom@globalsolutions.com',
    amount: 1850.00,
    date: '2024-01-10',
    dueDate: '2024-01-25',
    status: 'Overdue',
    items: [
      { description: 'Consulting Services', quantity: 10, price: 150.00 },
      { description: 'Documentation', quantity: 7, price: 50.00 }
    ],
    notes: 'Please remit payment as soon as possible'
  }
];

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: sampleInvoices,
  isDrawerOpen: false,
  isPaymentModalOpen: false,
  selectedInvoice: null,
  searchQuery: '',
  filterStatus: 'All',
  
  addInvoice: (data) => {
    const newInvoice: Invoice = {
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      status: calculateStatus(data.dueDate),
      ...data,
    };
    
    set((state) => ({
      invoices: [newInvoice, ...state.invoices],
      isDrawerOpen: false,
    }));
  },
  
  updateInvoice: (id, data) => {
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === id ? { ...inv, ...data } : inv
      ),
      selectedInvoice: state.selectedInvoice?.id === id
        ? { ...state.selectedInvoice, ...data }
        : state.selectedInvoice,
    }));
  },
  
  deleteInvoice: (id) => {
    set((state) => ({
      invoices: state.invoices.filter((inv) => inv.id !== id),
      isPaymentModalOpen: false,
      selectedInvoice: null,
    }));
  },
  
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  
  openPaymentModal: (invoice) => {
    set({ isPaymentModalOpen: true, selectedInvoice: invoice });
  },
  
  closePaymentModal: () => {
    set({ isPaymentModalOpen: false, selectedInvoice: null });
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),
}));