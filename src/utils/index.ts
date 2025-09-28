export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', { 
    style: 'currency', 
    currency: 'JPY' 
  }).format(amount);
};

export const getRatioColor = (ratio: number): string => {
  if (ratio < 20) return 'text-emerald-500';
  if (ratio < 30) return 'text-yellow-500';
  return 'text-red-500';
};

export const categories = {
  '固定費': ['住宅ローン', '保険', '通信費', '教育費(固定)', 'ローン返済'],
  '変動費': ['食費', '日用品費', 'ガソリン費', '被服費', 'その他変動費'],
  '貯蓄/投資': ['積立', '投資信託'],
} as const;

export const paymentMethods = [
  '労働金庫', 
  '住信SBI', 
  'ファミマTカード', 
  '楽天カード', 
  '小遣い', 
  'PayPay'
] as const;