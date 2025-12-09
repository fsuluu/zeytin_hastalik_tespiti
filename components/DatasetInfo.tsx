import React from 'react';
import { Database, ShieldCheck, Bug, Activity } from 'lucide-react';

export const DatasetInfo: React.FC = () => {
  const classes = [
    {
      name: "Olive Peacock Spot",
      trName: "Halkalı Leke",
      desc: "Spilocaea oleaginea kaynaklı mantari hastalık.",
      icon: Activity,
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    {
      name: "Aculus olearius",
      trName: "Tomurcuk Akarı",
      desc: "Yaprakta pas rengi deformasyonlar.",
      icon: Bug,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      name: "Healthy",
      trName: "Sağlıklı",
      desc: "Hastalık belirtisi gözlenmeyen temiz doku.",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-5 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 shadow-sm">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Dataset Bilgisi</h3>
          <p className="text-xs text-slate-500 font-medium">Model Sınıflandırma Kapsamı</p>
        </div>
      </div>
      
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4">
        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          Bu yapay zeka modeli, <strong>Zeytin Hastalıkları Veri Seti</strong> kullanılarak eğitilmiş mimariyi simüle eder ve aşağıdaki 3 sınıfı ayırt edebilir.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 flex-1">
        {classes.map((cls, idx) => (
          <div 
            key={idx} 
            className="group relative border border-slate-100 bg-white p-3.5 rounded-xl hover:border-olive-200 hover:shadow-md transition-all duration-300 ease-out cursor-default overflow-hidden"
          >
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity ${cls.color}`}>
              <cls.icon className="w-12 h-12 rotate-12" />
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className={`p-2.5 rounded-lg ${cls.bg} ${cls.color} shrink-0 shadow-sm`}>
                <cls.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                   <span className="font-bold text-slate-900 text-base leading-tight">{cls.trName}</span>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sınıf 0{idx + 1}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5 opacity-80">{cls.name}</div>
                <p className="text-xs text-slate-600 mt-1 leading-snug line-clamp-1">{cls.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};