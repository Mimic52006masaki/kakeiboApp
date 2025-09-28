export interface Transaction {
  id: number;
  date: string;
  item: string;
  category: string;
  amount: number;
  method: string;
}

export interface ExpenseFormData {
  amount: string;
  category: string;
  item: string;
  paymentMethod: string;
  memo: string;
}

export interface FinancialSummary {
  totalIncome: number;
  budgetGoal: number;
  currentFixedExpense: number;
  currentVariableExpense: number;
  currentSavings: number;
  totalExpense: number;
  remainingBudget: number;
  fixedRatio: number;
}