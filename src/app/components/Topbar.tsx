"use client";

import { ChangeEvent } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { useInvoiceStore } from "../store/InvoiceStore";

export default function Topbar() {
  const { searchQuery, setSearchQuery } = useInvoiceStore();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices and customers..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-3 py-2 text-sm
                         bg-white text-gray-900
                         border border-gray-300
                         rounded-lg shadow-sm
                         placeholder-gray-400
                         focus:outline-none focus:ring-0 focus:ring-transparent focus:border-gray-300
                         transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="p-1.5 hover:bg-gray-100 rounded-md relative transition-colors">
            <Bell className="w-4 h-4 text-gray-600" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-xs">
              M
            </div>
            <div className="text-left">
              <p className="font-medium text-xs text-gray-900">Merishaw</p>
              <p className="text-[10px] text-gray-500">merishaw@company.com</p>
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}