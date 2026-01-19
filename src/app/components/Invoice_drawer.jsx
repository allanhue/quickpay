"use client";

import { useState } from 'react';
import { useInvoiceStore } from '../store/InvoiceStore';
import { X, Plus, Trash2 } from 'lucide-react';

export default function NewInvoiceDrawer() {
  const { isDrawerOpen, closeDrawer, addInvoice } = useInvoiceStore();
  
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    dueDate: '',
    notes: '',
    items: [{ description: '', quantity: 1, price: 0 }]
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };
  
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, price: 0 }]
    }));
  };
  
  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };
  
  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => 
      sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0), 0
    );
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customer.trim()) {
      newErrors.customer = 'Customer name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    formData.items.forEach((item, index) => {
      if (!item.description.trim()) {
        newErrors[`item_${index}_description`] = 'Description is required';
      }
      if (!item.price || parseFloat(item.price) <= 0) {
        newErrors[`item_${index}_price`] = 'Price must be greater than 0';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const invoice = {
        customer: formData.customer,
        email: formData.email,
        amount: calculateTotal(),
        dueDate: formData.dueDate,
        items: formData.items,
        notes: formData.notes
      };
      
      addInvoice(invoice);
      
      // Reset form
      setFormData({
        customer: '',
        email: '',
        dueDate: '',
        notes: '',
        items: [{ description: '', quantity: 1, price: 0 }]
      });
      setErrors({});
    }
  };
  
  const handleClose = () => {
    closeDrawer();
    setFormData({
      customer: '',
      email: '',
      dueDate: '',
      notes: '',
      items: [{ description: '', quantity: 1, price: 0 }]
    });
    setErrors({});
  };
  
  if (!isDrawerOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Invoice</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details below</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Customer Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) => handleInputChange('customer', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.customer ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Acme Inc."
              />
              {errors.customer && (
                <p className="mt-1 text-sm text-red-600">{errors.customer}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="billing@acme.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
              )}
            </div>
          </div>
          
          {/* Invoice Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Invoice Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium text-gray-700">Item {index + 1}</span>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  )}
                </div>
                
                <div>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors[`item_${index}_description`] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Description"
                  />
                  {errors[`item_${index}_description`] && (
                    <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_description`]}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Qty"
                      min="1"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`item_${index}_price`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Price"
                      min="0"
                      step="0.01"
                    />
                    {errors[`item_${index}_price`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_price`]}</p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-sm text-gray-600">Subtotal: </span>
                  <span className="font-semibold text-gray-900">
                    ${((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any additional notes..."
            />
          </div>
          
          {/* Total */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <span className="text-3xl font-bold text-blue-600">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </>
  );
}