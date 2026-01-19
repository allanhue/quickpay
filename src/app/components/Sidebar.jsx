"use client";

import { useState } from 'react';
import {
  ChevronDown,
  LayoutDashboard,
  Receipt,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('invoices');
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices', icon: Receipt, badge: '12' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <div className="w-[280px] shrink-0 bg-white/80 backdrop-blur border-r border-gray-200 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            Q
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">QuickPay</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`group relative w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid place-items-center w-9 h-9 rounded-lg transition-colors ${
                  isActive ? 'bg-white/70' : 'bg-transparent group-hover:bg-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
              </span>
              <span className={`font-medium text-sm ${isActive ? 'text-blue-700' : ''}`}>{item.label}</span>
            </div>
            {item.badge && (
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                {item.badge}
              </span>
            )}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full transition-opacity ${
                isActive ? 'bg-gradient-to-b from-blue-600 to-purple-600 opacity-100' : 'opacity-0'
              }`}
            />
          </button>
          );
        })}
        </div>
      </nav>
      
      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            JD
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john@company.com</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}