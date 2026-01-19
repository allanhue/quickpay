"use client";

import { useState, useMemo } from 'react';
import { useInvoiceStore } from '../store/InvoiceStore';
import { Eye, Download, MoreVertical, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';

export default function PaymentsTable() {
  const { 
    invoices, 
    openPaymentModal, 
    searchQuery, 
    filterStatus, 
    setFilterStatus 
  } = useInvoiceStore();
  
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Filter and search logic
  const filteredInvoices = useMemo(() => {
    let filtered = invoices;
    
    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter(inv => inv.status === filterStatus);
    }
    
    // Search
    if (searchQuery) {
      filtered = filtered.filter(inv => 
        inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'amount') {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
      return 0;
    });
    
    return filtered;
  }, [invoices, filterStatus, searchQuery, sortBy, sortOrder]);
  
  // Calculate stats
  const stats = useMemo(() => {
    const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paid = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
    const pending = invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);
    const overdue = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);
    
    return { total, paid, pending, overdue };
  }, [invoices]);
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="p-8 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total)}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Paid</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.paid)}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Pending</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.pending)}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Overdue</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.overdue)}</p>
        </div>
      </div>
      
      {/* Table Header */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
            
            {/* Filter Tabs */}
            <div className="flex gap-2">
              {['All', 'Paid', 'Pending', 'Overdue'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr 
                  key={invoice.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => openPaymentModal(invoice)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">{invoice.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.customer}</p>
                      <p className="text-sm text-gray-500">{invoice.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPaymentModal(invoice);
                        }}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No invoices found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}