export default function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r bg-white px-4 py-6">
      <div className="mb-8 text-xl font-semibold tracking-tight">
        QuickPay
      </div>

      <nav className="space-y-2 text-sm">
        <button className="flex w-full items-center rounded-lg bg-slate-900 px-3 py-2 text-white">
          <span>Dashboard</span>
        </button>
        <button className="flex w-full items-center rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100">
          <span>Invoices</span>
        </button>
        <button className="flex w-full items-center rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100">
          <span>Clients</span>
        </button>
      </nav>

      <div className="mt-auto pt-6 text-xs text-slate-400">
        © 2026 QuickPay
      </div>
    </aside>
  );
}
