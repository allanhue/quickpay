"use client";

import { useState } from "react";
import { useInvoiceStore } from "../store/InvoiceStore";


export default function NewInvoiceDrawer() {
  const isOpen = useInvoiceStore((s) => s.isDrawerOpen);
  const closeDrawer = useInvoiceStore((s) => s.closeDrawer);
  const addInvoice = useInvoiceStore((s) => s.addInvoice);

  const [form, setForm] = useState({
    customer: '',
    email: '',
    amount: '',
    status: 'Pending',
  });

  if (!isOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount || '0');
    if (!form.customer || !form.email || !amount) return;
    addInvoice({
      customer: form.customer,
      email: form.email,
      amount,
      status: form.status,
      date: new Date().toISOString().slice(0, 10),
    });
    setForm({ customer: '', email: '', amount: '', status: 'Pending' });
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/20">
      <div className="flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">New Invoice</h2>
          <button
            onClick={closeDrawer}
            className="text-sm text-slate-400 hover:text-slate-600"
          >
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-sm">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Customer
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              value={form.customer}
              onChange={(e) =>
                setForm((f) => ({ ...f, customer: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Status
            </label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value }))
              }
            >
              <option>Pending</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Save Invoice
          </button>
        </form>
      </div>
    </div>
  );
}
