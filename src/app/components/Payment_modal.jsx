"use client";

import { useInvoiceStore } from "../store/InvoiceStore";

export default function PaymentModal() {
  const selected = useInvoiceStore((s) => s.selectedInvoice);
  const isOpen = useInvoiceStore((s) => s.isPaymentModalOpen);
  const close = useInvoiceStore((s) => s.closePaymentModal);

  if (!isOpen || !selected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Payment Details</h2>
          <button
            onClick={close}
            className="text-sm text-slate-400 hover:text-slate-600"
          >
            Close
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Invoice ID</span>
            <span className="font-medium">{selected.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Customer</span>
            <span className="font-medium">{selected.customer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Email</span>
            <span className="font-medium">{selected.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount</span>
            <span className="font-medium">
              ${selected.amount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Status</span>
            <span className="font-medium">{selected.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date</span>
            <span className="font-medium">{selected.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
