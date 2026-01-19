"use client";

import { Search, Bell, Plus } from 'lucide-react';
import { useInvoiceStore } from '../store/InvoiceStore';

export default function Topbar() {
  const { openDrawer, searchQuery, setSearchQuery } = useInvoiceStore();
  
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* New Invoice Button */}
          <button
            onClick={openDrawer}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            <Plus className="w-5 h-5" />
            New Invoice
          </button>
        </div>
      </div>
    </div>
  );
}