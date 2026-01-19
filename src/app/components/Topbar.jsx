export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          Payments
        </h1>
        <p className="text-xs text-slate-500">
          Overview of your recent invoices
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          className="rounded-md border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-slate-900/10"
          placeholder="Search invoices..."
        />
        <div className="h-8 w-8 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}
