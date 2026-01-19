"use client";

import { useInvoiceStore } from '../store/InvoiceStore';
import { X, Download, Mail, Printer, Calendar, DollarSign, User, CreditCard } from 'lucide-react';

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
      case 'Paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Overdue': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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
  const tax = subtotal * 0; // No tax for now
  const total = subtotal + tax;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={closePaymentModal}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold">Invoice Details</h2>
              <p className="text-blue-100 text-sm mt-1">{selectedInvoice.id}</p>
            </div>
            <button
              onClick={closePaymentModal}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Status and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(selectedInvoice.status)}`}>
                  {selectedInvoice.status}
                </span>
                
                {selectedInvoice.status === 'Pending' && (
                  <button
                    onClick={() => handleStatusChange('Paid')}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Email">
                  <Mail className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
                  <Printer className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Bill To</h3>
                </div>
                <p className="font-bold text-lg text-gray-900">{selectedInvoice.customer}</p>
                <p className="text-gray-600 text-sm mt-1">{selectedInvoice.email}</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Invoice Dates</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Issue Date:</span>
                    <span className="font-medium text-gray-900">{formatDate(selectedInvoice.date)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium text-gray-900">{formatDate(selectedInvoice.dueDate)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Items Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Price</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedInvoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{item.quantity}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(item.price)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        {formatCurrency(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (0%):</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
            
            {/* Notes */}
            {selectedInvoice.notes && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                <p className="text-gray-700 text-sm">{selectedInvoice.notes}</p>
              </div>
            )}
            
            {/* Payment Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <CreditCard className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
                  <p className="text-sm text-gray-700">
                    Please make payment within the due date. Thank you for your business!
                  </p>
                  <div className="mt-3 text-sm text-gray-600">
                    <p>Bank Transfer: Account #1234567890</p>
                    <p>Or pay online at: quickpay.com/invoice/{selectedInvoice.id}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleDelete}
                className="px-6 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium"
              >
                Delete Invoice
              </button>
              <button
                onClick={closePaymentModal}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
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