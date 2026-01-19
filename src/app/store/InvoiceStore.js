import { create } from 'zustand';

const mockInvoices = [
    {
        id: 'INV-001',
        customer: 'Acme Inc.',
        email: 'billing@acme.com',
        amount: 420.5,
        status: 'Paid',
        date: '2025-01-10',
    },
    {
        id: 'INV-002',
        customer: 'Globex Corp.',
        email: 'finance@globex.com',
        amount: 180.0,
        status: 'Pending',
        date: '2025-01-12',
    },
];

export const useInvoiceStore = create((set) => ({
    invoices: mockInvoices,
    selectedInvoice: null,
    isDrawerOpen: false,
    isPaymentModalOpen: false,

    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false }),

    openPaymentModal: (invoice) =>
        set({ selectedInvoice: invoice, isPaymentModalOpen: true }),
    closePaymentModal: () =>
        set({ selectedInvoice: null, isPaymentModalOpen: false }),

    addInvoice: (invoice) =>
        set((state) => ({
            invoices: [{ ...invoice, id: `INV-${state.invoices.length + 1}` }, ...state.invoices],
            isDrawerOpen: false,
        })),
}));
