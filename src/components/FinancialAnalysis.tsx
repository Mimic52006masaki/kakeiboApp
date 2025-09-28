import React from 'react';
import { PieChart, TrendingUp, Wallet, Target } from 'lucide-react';
import { ProgressRing } from './ui/ProgressRing';
import { formatCurrency, getRatioColor } from '../utils';
import type { FinancialSummary } from '../types';

interface FinancialAnalysisProps {
  summary: FinancialSummary;
}

export const FinancialAnalysis: React.FC<FinancialAnalysisProps> = ({ summary }) => {
  const { currentFixedExpense, currentVariableExpense, currentSavings, budgetGoal, fixedRatio } = summary;

  return (
    <section className="space-y-5">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">あなたの家計管理分析</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        
        {/* 固定費の割合 */}
        <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 border border-indigo-100/50">
          <div className="flex items-start justify-between h-full">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="w-4 h-4 text-indigo-500" />
                <p className="text-xs font-semibold text-gray-600">固定費/収入割合</p>
              </div>
              <p className={`text-3xl font-black ${getRatioColor(fixedRatio)} mb-1`}>
                {fixedRatio}%
              </p>
              <p className="text-xs text-gray-400">推奨: 25%以下</p>
            </div>
            <ProgressRing percentage={fixedRatio} color="text-indigo-500" size={60} strokeWidth={6} />
          </div>
        </div>
        
        {/* 変動費の進捗 */}
        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 border border-yellow-100/50">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-4 h-4 text-yellow-500" />
            <p className="text-xs font-semibold text-gray-600">変動費の進捗</p>
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-3">
            {formatCurrency(currentVariableExpense)}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm" 
              style={{ width: `${Math.min(100, (currentVariableExpense / (budgetGoal * 0.4)) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">目標 120,000円 に対し</p>
        </div>

        {/* 貯蓄/投資実績 */}
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 col-span-2 border border-emerald-100/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-4 h-4 text-emerald-500" />
                <p className="text-sm font-semibold text-gray-600">貯蓄/投資実績</p>
              </div>
              <p className="text-3xl font-bold text-gray-800 mb-3">
                {formatCurrency(currentSavings)}
              </p>
              <button className="text-xs text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 hover:underline">
                詳細レポートを見る →
              </button>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-black text-emerald-600">¥</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};