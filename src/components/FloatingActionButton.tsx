import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 
                 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-full 
                 shadow-2xl hover:shadow-pink-500/25 hover:from-pink-600 hover:to-rose-600 
                 transition-all duration-300 transform hover:scale-110 active:scale-95
                 focus:outline-none focus:ring-4 focus:ring-pink-300 z-40
                 backdrop-blur-sm border-2 border-white/20"
      aria-label="支出を追加"
    >
      <Plus className="w-7 h-7 drop-shadow-sm" />
    </button>
  );
};