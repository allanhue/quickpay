"use client";

import { useState, useMemo } from 'react';
import { useInvoiceStore } from '../store/InvoiceStore';
import { Eye, Download, MoreVertical, TrendingUp, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { Invoice } from '@/types/invoice';

type SortBy = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

export default function PaymentsTable() {
  const { 
    invoices, 
    openPaymentModal, 
    searchQuery, 
    filterStatus, 
    setFilterStatus 
  } = useInvoiceStore();
  
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  // Filter and search logic
  const filteredInvoices = useMemo(() => {
    let filtered = invoices;
    
    if (filterStatus !== 'All') {
      filtered = filtered.filter(inv => inv.status === filterStatus);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(inv => 
        inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
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
  
  const getStatusColor = (status: Invoice['status']): string => {
    switch(status) {
      case 'Paid': return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Overdue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="p-6 space-y-5 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <TrendingUp className="w-3.5 h-3.5 text-green-500" />
          </div>
          <h3 className="text-gray-500 text-xs font-medium mb-0.5">Total Revenue</h3>
          <p className="text-xl font-semibold text-gray-900">{formatCurrency(stats.total)}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-md bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-xs font-medium mb-0.5">Paid</h3>
          <p className="text-xl font-semibold text-gray-900">{formatCurrency(stats.paid)}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-md bg-amber-50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-xs font-medium mb-0.5">Pending</h3>
          <p className="text-xl font-semibold text-gray-900">{formatCurrency(stats.pending)}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-md bg-red-50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <h3 className="text-gray-500 text-xs font-medium mb-0.5">Overdue</h3>
          <p className="text-xl font-semibold text-gray-900">{formatCurrency(stats.overdue)}</p>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Recent Invoices</h2>
            
            {/* Filter Tabs */}
            <div className="flex gap-1">
              {(['All', 'Paid', 'Pending', 'Overdue'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                  Invoice ID
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((invoice) => (
                <tr 
                  key={invoice.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => openPaymentModal(invoice)}
                >
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="font-medium text-sm text-gray-900">{invoice.id}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-sm text-gray-900">{invoice.customer}</p>
                      <p className="text-xs text-gray-500">{invoice.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className="font-semibold text-sm text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-medium border ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPaymentModal(invoice);
                        }}
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                        <Download className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                        <MoreVertical className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No invoices found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}