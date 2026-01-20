
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  customer: string;
  email: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: InvoiceItem[];
  notes?: string;
}

export interface InvoiceFormData {
  customer: string;
  email: string;
  dueDate: string;
  notes: string;
  items: InvoiceItem[];
}

export interface InvoiceStore {
  invoices: Invoice[];
  isDrawerOpen: boolean;
  isPaymentModalOpen: boolean;
  selectedInvoice: Invoice | null;
  searchQuery: string;
  filterStatus: 'All' | 'Paid' | 'Pending' | 'Overdue';
  
  // Actions
  addInvoice: (data: Omit<Invoice, 'id' | 'date' | 'status'>) => void;
  updateInvoice: (id: string, data: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openPaymentModal: (invoice: Invoice) => void;
  closePaymentModal: () => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: 'All' | 'Paid' | 'Pending' | 'Overdue') => void;
}

export interface FormErrors {
  [key: string]: string;
}