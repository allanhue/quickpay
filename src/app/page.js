"use client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PaymentsTable from "./components/Payment_table";
import NewInvoiceDrawer from "./components/Invoice_drawer";
import PaymentModal from "./components/Payment_modal";

export default function Page() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <PaymentsTable />
        </main>
      </div>

      {/* Modals and Drawers */}
      <NewInvoiceDrawer />
      <PaymentModal />
    </div>
  );
}