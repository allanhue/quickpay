import Sidebar from "../components/Sidebar";
  import Topbar from "../components/Topbar";
import PaymentsTable from "../components/PaymentsTable";
import NewInvoiceDrawer from "../components/NewInvoiceDrawer";
import PaymentModal from "../components/PaymentModal";

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
