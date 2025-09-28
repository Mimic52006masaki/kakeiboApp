import React, { useState, useMemo } from 'react';
import { X, Save, DollarSign } from 'lucide-react';
import { categories, paymentMethods } from '../utils';
import type { ExpenseFormData } from '../types';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExpenseFormData) => void;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: '',
    category: '変動費',
    item: '食費',
    paymentMethod: '小遣い',
    memo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as keyof typeof categories;
    const items = categories[newCategory] || [];
    setFormData(prev => ({
      ...prev,
      category: newCategory,
      item: items.length > 0 ? items[0] : '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      alert('金額を正しく入力してください。');
      return;
    }
    onSave(formData);
    setFormData({
      amount: '',
      category: '変動費',
      item: '食費',
      paymentMethod: '小遣い',
      memo: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 transition-all duration-300">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg shadow-2xl transform transition-all duration-300 border border-gray-100/50">
        
        {/* ヘッダー */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">支出を記録</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* 金額入力 */}
          <div className="relative">
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
              金額 (¥)
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full border-2 border-indigo-200 rounded-2xl shadow-sm p-4 text-3xl font-black text-indigo-700 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gradient-to-r from-indigo-50 to-purple-50"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-400">
                <span className="text-2xl font-bold">¥</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* カテゴリ選択 */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                大カテゴリ
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full p-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
              >
                {Object.keys(categories).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* 項目選択 */}
            <div>
              <label htmlFor="item" className="block text-sm font-semibold text-gray-700 mb-2">
                項目
              </label>
              <select
                id="item"
                name="item"
                value={formData.item}
                onChange={handleInputChange}
                className="w-full p-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
              >
                {(categories[formData.category as keyof typeof categories] || []).map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

          </div>

          {/* 支払元選択 */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 mb-2">
              支払元/口座
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full p-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
            >
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          {/* メモ */}
          <div>
            <label htmlFor="memo" className="block text-sm font-semibold text-gray-700 mb-2">
              メモ
            </label>
            <input
              type="text"
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleInputChange}
              placeholder="スーパーでの買い物など"
              className="w-full border border-gray-300 rounded-xl shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-2xl shadow-lg text-lg font-bold text-white 
                         bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                         focus:outline-none focus:ring-4 focus:ring-indigo-300 
                         transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Save className="w-5 h-5 mr-3" />
              記録を保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};