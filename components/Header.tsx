import React from 'react';
import { Leaf, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-olive-500 to-olive-700 p-2.5 rounded-xl shadow-lg shadow-olive-200">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">ZeytinAI</h1>
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">Akıllı Tarım Asistanı</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="hidden sm:flex items-center gap-2 bg-olive-50/50 px-3 py-1.5 rounded-full border border-olive-100/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-olive-500"></span>
            </span>
            <span className="text-xs font-semibold text-olive-800">Sistem Çevrimiçi</span>
          </div>
        </div>
      </div>
    </header>
  );
};