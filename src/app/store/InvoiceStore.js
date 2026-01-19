import { create } from 'zustand';

const mockInvoices = [
    {
        id: 'INV-001',
        customer: 'Acme Inc.',
        email: 'billing@acme.com',
        amount: 2450.00,
        status: 'Paid',
        date: '2025-01-10',
        dueDate: '2025-01-25',
        items: [
            { description: 'Web Design Services', quantity: 1, price: 1500 },
            { description: 'Monthly Hosting', quantity: 1, price: 950 }
        ],
        notes: 'Payment received via bank transfer'
    },
    {
        id: 'INV-002',
        customer: 'Globex Corporation',
        email: 'finance@globex.com',
        amount: 1850.00,
        status: 'Pending',
        date: '2025-01-12',
        dueDate: '2025-01-27',
        items: [
            { description: 'Consulting Services', quantity: 10, price: 185 }
        ]
    },
    {
        id: 'INV-003',
        customer: 'Initech LLC',
        email: 'accounts@initech.com',
        amount: 3200.00,
        status: 'Overdue',
        date: '2024-12-20',
        dueDate: '2025-01-05',
        items: [
            { description: 'Software Development', quantity: 20, price: 160 }
        ],
        notes: 'Follow up required'
    },
    {
        id: 'INV-004',
        customer: 'Umbrella Corp',
        email: 'billing@umbrella.com',
        amount: 5500.00,
        status: 'Paid',
        date: '2025-01-08',
        dueDate: '2025-01-23',
        items: [
            { description: 'Enterprise Support', quantity: 1, price: 5500 }
        ]
    },
    {
        id: 'INV-005',
        customer: 'Stark Industries',
        email: 'pepper@stark.com',
        amount: 8900.00,
        status: 'Pending',
        date: '2025-01-15',
        dueDate: '2025-01-30',
        items: [
            { description: 'Custom Development', quantity: 1, price: 8900 }
        ]
    },
];

export const useInvoiceStore = create((set) => ({
    invoices: mockInvoices,
    selectedInvoice: null,
    isDrawerOpen: false,
    isPaymentModalOpen: false,
    searchQuery: '',
    filterStatus: 'All',

    // Actions
    setSearchQuery: (query) => set({ searchQuery: query }),
    setFilterStatus: (status) => set({ filterStatus: status }),
    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false }),
    openPaymentModal: (invoice) => set({
        selectedInvoice: invoice,
        isPaymentModalOpen: true
    }),
    closePaymentModal: () => set({
        selectedInvoice: null,
        isPaymentModalOpen: false
    }),
    addInvoice: (invoice) => set((state) => ({
        invoices: [{
            ...invoice,
            id: `INV-${String(state.invoices.length + 1).padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending'
        }, ...state.invoices],
        isDrawerOpen: false,
    })),
    updateInvoice: (id, updates) => set((state) => ({
        invoices: state.invoices.map(inv =>
            inv.id === id ? { ...inv, ...updates } : inv
        ),
        selectedInvoice: state.selectedInvoice?.id === id
            ? { ...state.selectedInvoice, ...updates }
            : state.selectedInvoice
    })),
    deleteInvoice: (id) => set((state) => ({
        invoices: state.invoices.filter(inv => inv.id !== id),
        isPaymentModalOpen: false,
        selectedInvoice: null
    })),
}));