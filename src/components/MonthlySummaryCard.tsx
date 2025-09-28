import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils';
import type { FinancialSummary } from '../types';

interface MonthlySummaryCardProps {
  summary: FinancialSummary;
}

export const MonthlySummaryCard: React.FC<MonthlySummaryCardProps> = ({ summary }) => {
  const { totalIncome, budgetGoal, totalExpense, remainingBudget } = summary;
  const isOverBudget = remainingBudget < 0;

  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 space-y-5 border border-blue-100/50">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-700 flex items-center space-x-2">
          <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
          <span>2025年10月度（今月）</span>
        </h2>
        {isOverBudget ? (
          <TrendingDown className="w-5 h-5 text-red-500" />
        ) : (
          <TrendingUp className="w-5 h-5 text-emerald-500" />
        )}
      </div>
      
      {/* 残金表示 */}
      <div className={`text-center py-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
        isOverBudget 
          ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 shadow-red-100' 
          : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 shadow-emerald-100'
      } shadow-lg`}>
        <p className="text-sm font-semibold opacity-80">目標予算の残り</p>
        <p className="text-4xl font-black mt-2 tracking-tight">
          {formatCurrency(Math.abs(remainingBudget))}
        </p>
        <p className="text-xs mt-2 font-medium">
          {isOverBudget ? '⚠️ 目標超過！' : '✨ 予算達成圏内'}
        </p>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-medium text-gray-500 mb-1">手取り収入</p>
          <p className="text-base font-bold text-gray-800">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="text-center p-3 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-medium text-gray-500 mb-1">目標予算</p>
          <p className="text-base font-bold text-gray-800">{formatCurrency(budgetGoal)}</p>
        </div>
        <div className="text-center p-3 bg-white/70 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs font-medium text-gray-500 mb-1">支出実績</p>
          <p className="text-base font-bold text-indigo-600">{formatCurrency(totalExpense)}</p>
        </div>
      </div>
    </section>
  );
};