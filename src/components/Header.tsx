import React from 'react';
import { Home, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-4 rounded-b-2xl shadow-2xl backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">家計管理</h1>
            <p className="text-indigo-100 text-sm font-medium">ダッシュボード</p>
          </div>
        </div>
        <button className="p-3 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};