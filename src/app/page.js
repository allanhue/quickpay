"use client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PaymentsTable from "./components/Payment_table";
import NewInvoiceDrawer from "./components/Invoice_drawer";
import PaymentModal from "./components/Payment_modal";

export default function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <PaymentsTable />
        <NewInvoiceDrawer />
        <PaymentModal />
      </div>
    </div>
  );
}
