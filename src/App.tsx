import React, { useState } from 'react';
import { Header } from './components/Header';
import { MonthlySummaryCard } from './components/MonthlySummaryCard';
import { FinancialAnalysis } from './components/FinancialAnalysis';
import { RecentTransactions } from './components/RecentTransactions';
import { FloatingActionButton } from './components/FloatingActionButton';
import { ExpenseModal } from './components/ExpenseModal';
import type { Transaction, ExpenseFormData, FinancialSummary } from './types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '10/01', item: '食料品', category: '変動費', amount: 5480, method: '小遣い' },
    { id: 2, date: '10/01', item: '住宅ローン', category: '固定費', amount: 65523, method: '労働金庫' },
    { id: 3, date: '09/30', item: 'ガソリン費', category: '変動費', amount: 8900, method: '楽天カード' },
    { id: 4, date: '09/27', item: '書道代', category: '教育費', amount: 14400, method: '労働金庫(振込)' },
  ]);

  // ダミーデータに基づく財務サマリー
  const totalIncome = 336872;
  const budgetGoal = 300000;
  const currentFixedExpense = 110000;
  const currentVariableExpense = transactions.filter(t => t.category === '変動費').reduce((sum, t) => sum + t.amount, 0) + 10000;
  const currentSavings = 30000;
  const totalExpense = currentFixedExpense + currentVariableExpense;
  const remainingBudget = budgetGoal - totalExpense;
  const fixedRatio = Math.round((currentFixedExpense / totalIncome) * 100);

  const financialSummary: FinancialSummary = {
    totalIncome,
    budgetGoal,
    currentFixedExpense,
    currentVariableExpense,
    currentSavings,
    totalExpense,
    remainingBudget,
    fixedRatio,
  };

  const handleSaveTransaction = (data: ExpenseFormData) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' }).replace(/\//g, '/'),
      item: data.item,
      category: data.category,
      amount: parseInt(data.amount, 10),
      method: data.paymentMethod,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex flex-col font-sans max-w-lg mx-auto shadow-2xl">
      
      <Header />

      <main className="flex-grow p-6 space-y-8 overflow-y-auto pb-24">
        <MonthlySummaryCard summary={financialSummary} />
        <FinancialAnalysis summary={financialSummary} />
        <RecentTransactions transactions={transactions} />
      </main>

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
};

export default App;