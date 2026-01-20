"use client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PaymentsTable from "./components/Payment_table";
import NewInvoiceDrawer from "./components/Invoice_drawer";
import PaymentModal from "./components/Payment_modal";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <PaymentsTable />
        </main>
      </div>
      
      {/* Modals/Drawers */}
      <NewInvoiceDrawer />
      <PaymentModal />
    </div>
  );
}