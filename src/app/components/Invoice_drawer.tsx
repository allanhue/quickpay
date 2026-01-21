"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useInvoiceStore } from "../store/InvoiceStore";
import { X, Plus, Trash2, CheckCircle } from "lucide-react";
import { InvoiceFormData, InvoiceItem, FormErrors } from "@/types/invoice";

export default function NewInvoiceDrawer() {
  const { isDrawerOpen, closeDrawer, addInvoice } = useInvoiceStore();

  const [formData, setFormData] = useState<InvoiceFormData>({
    customer: "",
    email: "",
    dueDate: "",
    notes: "",
    items: [{ description: "", quantity: 1, price: 0 }],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleInputChange = (field: keyof InvoiceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index),
      }));
    }
  };

  const calculateTotal = (): number => {
    return formData.items.reduce(
      (sum, item) =>
        sum + (parseFloat(String(item.quantity)) || 0) * (parseFloat(String(item.price)) || 0),
      0
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.customer.trim()) newErrors.customer = "Customer name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";

    formData.items.forEach((item, index) => {
      if (!item.description.trim())
        newErrors[`item_${index}_description`] = "Description required";
      if (!item.price || parseFloat(String(item.price)) <= 0)
        newErrors[`item_${index}_price`] = "Price must be > 0";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      addInvoice({
        customer: formData.customer,
        email: formData.email,
        amount: calculateTotal(),
        dueDate: formData.dueDate,
        items: formData.items,
        notes: formData.notes,
      });
      
      setShowSuccessToast(true);
      
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
      
      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  };

  const handleClose = () => {
    closeDrawer();
    setFormData({
      customer: "",
      email: "",
      dueDate: "",
      notes: "",
      items: [{ description: "", quantity: 1, price: 0 }],
    });
    setErrors({});
    setShowSuccessToast(false);
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-[60] animate-slide-in">
          <div className="bg-white border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[320px]">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Invoice Created!</p>
              <p className="text-xs text-gray-600 mt-0.5">Your invoice has been saved successfully.</p>
            </div>
            <button 
              onClick={() => setShowSuccessToast(false)}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Drawer - Slides from Right */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-3xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-base font-semibold text-gray-900">New Invoice</h2>
          <button onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* PDF-Style Form */}
        <form onSubmit={handleSubmit} className="p-8 bg-gray-50">
          <div className="bg-white shadow-sm rounded-lg p-8 space-y-6 border border-gray-200">
            {/* Company Header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">QuickPay</h1>
                {/* <p className="text-xs text-gray-500 mt-0.5">Professional Invoicing</p> */}
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">INVOICE</p>
                <p className="text-xs text-gray-500 mt-1">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-semibold text-gray-700 uppercase mb-3 tracking-wide">
                  Bill To
                </h3>
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={formData.customer}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("customer", e.target.value)}
                  className={`w-full px-0 py-2 border-0 border-b ${
                    errors.customer ? "border-red-500" : "border-gray-300"
                  } focus:border-gray-400 focus:ring-0 outline-none text-sm text-gray-900 placeholder-gray-400`}
                />
                {errors.customer && (
                  <p className="text-[10px] text-red-600 mt-1">{errors.customer}</p>
                )}
                <input
                  type="email"
                  placeholder="Customer Email"
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                  className={`mt-3 w-full px-0 py-2 border-0 border-b ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-gray-400 focus:ring-0 outline-none text-sm text-gray-900 placeholder-gray-400`}
                />
                {errors.email && (
                  <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gray-800 uppercase mb-3 tracking-wide">
                  Invoice Details
                </h3>
                <label className="block text-[11px] text-gray-500 mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("dueDate", e.target.value)}
                  className={`w-full px-1 py-2 border-0 border-b ${
                    errors.dueDate ? "border-red-500" : "border-gray-300"
                  } focus:border-gray-400 focus:ring-0 outline-none text-sm text-gray-800`}
                />
                {errors.dueDate && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.dueDate}</p>
                )}
              </div>
            </div>

            {/* Line Items */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold text-gray-800 uppercase mb-3 tracking-wide">
                Line Items
              </h3>

              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-[11px] font-semibold text-gray-700 uppercase tracking-wide">
                        Description
                      </th>
                      <th className="px-4 py-2 text-center text-[11px] font-semibold text-gray-700 uppercase tracking-wide">
                        Qty
                      </th>
                      <th className="px-4 py-2 text-center text-[11px] font-semibold text-gray-700 uppercase tracking-wide">
                        Price
                      </th>
                      <th className="px-4 py-2 text-right text-[11px] font-semibold text-gray-700 uppercase tracking-wide">
                        Total
                      </th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item: InvoiceItem, index: number) => (
                      <tr key={index} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleItemChange(index, "description", e.target.value)
                            }
                            placeholder="Item description"
                            className={`w-full bg-transparent px-0 py-1 border-0 border-b ${
                              errors[`item_${index}_description`]
                                ? "border-red-500"
                                : "border-transparent"
                            } focus:border-gray-400 focus:ring-0 outline-none text-sm text-gray-800 placeholder-gray-400`}
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleItemChange(index, "quantity", parseFloat(e.target.value))
                            }
                            className="w-14 text-center bg-transparent px-0 py-1 border-0 border-b border-transparent focus:border-gray-400 focus:ring-0 outline-none text-sm text-gray-800"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            value={item.price}
                            min="0"
                            step="0.01"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleItemChange(index, "price", parseFloat(e.target.value))
                            }
                            className={`w-20 text-center bg-transparent px-0 py-1 border-0 border-b ${
                              errors[`item_${index}_price`] ? "border-red-500" : "border-transparent"
                            } focus:border-gray-400 focus:ring-0 outline-none text-sm text-gray-800`}
                          />
                        </td>
                        <td className="px-4 py-2 text-right font-medium text-gray-900 text-sm">
                          $
                          {(
                            (parseFloat(String(item.quantity)) || 0) *
                            (parseFloat(String(item.price)) || 0)
                          ).toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="p-1 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={addItem}
                className="mt-3 flex items-center gap-1.5 text-blue-600 text-xs font-medium hover:text-blue-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Line Item
              </button>
            </div>

            {/* Notes and Summary */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div>
                <h3 className="text-xs font-semibold text-gray-800 uppercase mb-2 tracking-wide">
                  Notes
                </h3>
                <textarea
                  rows={4}
                  placeholder="payment terms..."
                  value={formData.notes}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange("notes", e.target.value)}
                  className="w-full border border-gray-200 rounded-md p-3 text-sm focus:border-gray-400 focus:ring-0 outline-none placeholder-gray-400 text-gray-800 resize-none shadow-sm"
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-md p-5 shadow-sm">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3 pb-3 border-b border-gray-200">
                  <span>Tax (0%)</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
              >
                Save Invoice
              </button>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}