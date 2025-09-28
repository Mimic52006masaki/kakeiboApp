import React from 'react';
import { Clock, CreditCard } from 'lucide-react';
import { formatCurrency } from '../utils';
import type { Transaction } from '../types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">最近の記録</h2>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/50">
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id} 
            className={`flex justify-between items-center p-4 hover:bg-gray-50 transition-all duration-200 group ${
              index !== transactions.length - 1 ? 'border-b border-gray-100/50' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-2 group-hover:from-indigo-100 group-hover:to-indigo-200 transition-all duration-200">
                <CreditCard className="w-4 h-4 text-gray-600 group-hover:text-indigo-600" />
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg min-w-[40px] text-center">
                  {transaction.date}
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                    {transaction.item}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    {transaction.category} • {transaction.method}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-500">
                -{formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};