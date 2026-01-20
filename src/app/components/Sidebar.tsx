"use client";

import { useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  Receipt,
  Users,
  BarChart3,
  Settings,
  FilePlus2,
  FileText,
  HelpCircle,
  LucideIcon,
} from "lucide-react";
import { useInvoiceStore } from "../store/InvoiceStore";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>("invoices");
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);
  const { openDrawer } = useInvoiceStore();

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "invoices", label: "Invoices", icon: Receipt },
    { id: "customers", label: "Company", icon: Users },
    { id: "reports", label: "Perks", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-60 shrink-0 bg-white h-screen flex flex-col">
      {/* Logo Section */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold text-xs">
            Q
          </div>
          <h1 className="text-base font-semibold text-gray-900">QuickPay</h1>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        <div className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.id === "invoices") {
              return (
                <div key={item.id}>
                  {/* Parent button */}
                  <button
                    onClick={() => {
                      setIsInvoiceOpen(!isInvoiceOpen);
                      setActiveTab(item.id);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        isInvoiceOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Submenu */}
                  {isInvoiceOpen && (
                    <div className="ml-6 mt-0.5 space-y-0.5">
                      <button
                        onClick={() => setActiveTab("all_invoices")}
                        className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors ${
                          activeTab === "all_invoices"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        All Invoices
                      </button>

                      <button
                        onClick={openDrawer}
                        className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <FilePlus2 className="w-3.5 h-3.5" />
                        Create Invoice
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Help & Contact Section */}
      <div className="px-2 py-3">
        <div className="space-y-0.5">
          <button
            onClick={() => setActiveTab("help")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              activeTab === "help"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="font-medium">Help Center</span>
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-3 px-3 py-2 bg-gray-50 rounded-md">
          <p className="text-[10px] font-medium text-gray-700 mb-1">Need Help?</p>
          <p className="text-[9px] text-gray-500">support@quickpay.com</p>
        </div>
      </div>
    </div>
  );
}