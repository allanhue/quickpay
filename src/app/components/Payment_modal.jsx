"use client";

import { useInvoiceStore } from '../store/InvoiceStore';
import { X, Download, Mail, Printer, Calendar, User, CreditCard } from 'lucide-react';

export default function PaymentModal() {
  const { 
    isPaymentModalOpen, 
    closePaymentModal, 
    selectedInvoice,
    updateInvoice,
    deleteInvoice 
  } = useInvoiceStore();
  
  if (!isPaymentModalOpen || !selectedInvoice) return null;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Overdue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const handleStatusChange = (newStatus) => {
    updateInvoice(selectedInvoice.id, { status: newStatus });
  };
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoice(selectedInvoice.id);
    }
  };
  
  const subtotal = selectedInvoice.items.reduce((sum, item) => 
    sum + (item.quantity * item.price), 0
  );
  const tax = subtotal * 0;
  const total = subtotal + tax;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-50"
        onClick={closePaymentModal}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-lg">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Invoice Details</h2>
              <p className="text-xs text-gray-500 mt-0.5">{selectedInvoice.id}</p>
            </div>
            <button
              onClick={closePaymentModal}
              className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* Content - PDF Style */}
          <div className="p-8 space-y-6">
            {/* Invoice Header */}
            <div className="flex justify-between items-start pb-5 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">QuickPay</h1>
                <p className="text-xs text-gray-500 mt-0.5">Professional Invoicing</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">INVOICE</p>
                <p className="text-xs text-gray-500 mt-1">{selectedInvoice.id}</p>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(selectedInvoice.status)}`}>
                  {selectedInvoice.status}
                </span>
                
                {selectedInvoice.status === 'Pending' && (
                  <button
                    onClick={() => handleStatusChange('Paid')}
                    className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition-colors text-xs font-medium"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
              
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors" title="Download">
                  <Download className="w-3.5 h-3.5 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors" title="Email">
                  <Mail className="w-3.5 h-3.5 text-gray-600" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors" title="Print">
                  <Printer className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-md">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-sm text-gray-900">Bill To</h3>
                </div>
                <p className="font-semibold text-base text-gray-900">{selectedInvoice.customer}</p>
                <p className="text-xs text-gray-600 mt-1">{selectedInvoice.email}</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-md">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <h3 className="font-semibold text-sm text-gray-900">Invoice Dates</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Issue Date:</span>
                    <span className="font-medium text-gray-900">{formatDate(selectedInvoice.date)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium text-gray-900">{formatDate(selectedInvoice.dueDate)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Items Table */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-[10px] font-semibold text-gray-600 uppercase">Description</th>
                    <th className="px-5 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase">Quantity</th>
                    <th className="px-5 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase">Price</th>
                    <th className="px-5 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedInvoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-5 py-3 text-sm text-gray-900">{item.description}</td>
                      <td className="px-5 py-3 text-right text-sm text-gray-600">{item.quantity}</td>
                      <td className="px-5 py-3 text-right text-sm text-gray-600">{formatCurrency(item.price)}</td>
                      <td className="px-5 py-3 text-right font-medium text-sm text-gray-900">
                        {formatCurrency(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-72 space-y-2 bg-gray-50 border border-gray-200 rounded-md p-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 pb-2 border-b border-gray-200">
                  <span>Tax (0%):</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-gray-900">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
            
            {/* Notes */}
            {selectedInvoice.notes && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-1">Notes</h3>
                <p className="text-xs text-gray-700">{selectedInvoice.notes}</p>
              </div>
            )}
            
            {/* Payment Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
              <div className="flex items-start gap-2">
                <CreditCard className="w-4 h-4 text-gray-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">Payment Information</h3>
                  <p className="text-xs text-gray-700">
                    Please make payment within the due date , Thank you
                  </p>
                  <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                    <p>Bank Transfer: Account #1234567890</p>
                    <p>Online: quickpay.com/invoice/{selectedInvoice.id}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
              >
                Delete Invoice
              </button>
              <button
                onClick={closePaymentModal}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}