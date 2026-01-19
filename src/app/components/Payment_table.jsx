"use client";

import { useInvoiceStore } from "../store/InvoiceStore";

export default function PaymentsTable() {
  const invoices = useInvoiceStore((s) => s.invoices);
  const openDrawer = useInvoiceStore((s) => s.openDrawer);
  const openPaymentModal = useInvoiceStore((s) => s.openPaymentModal);

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">
          Recent Payments
        </h2>
        <button
          onClick={openDrawer}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
        >
          New Invoice
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-2 text-left">Invoice</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => openPaymentModal(inv)}
              >
                <td className="px-4 py-2 font-medium text-slate-900">
                  {inv.id}
                </td>
                <td className="px-4 py-2">
                  <div className="text-slate-900">{inv.customer}</div>
                  <div className="text-xs text-slate-400">{inv.email}</div>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right text-slate-900">
                  ${inv.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-slate-500">
                  {inv.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
