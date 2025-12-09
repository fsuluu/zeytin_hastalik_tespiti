import React from 'react';
import { CheckCircle2, AlertOctagon, XCircle, RefreshCw, Thermometer, ArrowRight, Sprout } from 'lucide-react';
import { AnalysisResult } from '../types';

interface Props {
  result: AnalysisResult;
  previewImage: string;
  onReset: () => void;
}

export const AnalysisResultCard: React.FC<Props> = ({ result, previewImage, onReset }) => {
  // Styles based on result
  const isDanger = !result.isOlivePlant || (!result.isHealthy && result.confidenceScore > 50);
  const isSuccess = result.isOlivePlant && result.isHealthy;
  
  let statusColor = "text-slate-600";
  let statusBg = "bg-slate-100";
  let statusBorder = "border-slate-200";
  let Icon = Sprout;

  if (!result.isOlivePlant) {
    statusColor = "text-orange-700";
    statusBg = "bg-orange-50";
    statusBorder = "border-orange-200";
    Icon = AlertOctagon;
  } else if (result.isHealthy) {
    statusColor = "text-emerald-700";
    statusBg = "bg-emerald-50";
    statusBorder = "border-emerald-200";
    Icon = CheckCircle2;
  } else {
    statusColor = "text-rose-700";
    statusBg = "bg-rose-50";
    statusBorder = "border-rose-200";
    Icon = XCircle;
  }

  return (
    <div className="w-full bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Left: Image Section */}
        <div className="lg:col-span-5 relative bg-slate-900 overflow-hidden group">
          <img 
            src={previewImage} 
            alt="Analysis Target" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-xs font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                Analiz Tamamlandı
             </div>
             <p className="text-white/60 text-xs leading-relaxed max-w-sm">
               Yapay zeka modeli görseli işledi ve veri seti ile karşılaştırdı.
             </p>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border ${statusBg} ${statusBorder} ${statusColor}`}>
              <Icon className="w-5 h-5" />
              <span className="font-bold text-sm tracking-wide uppercase">{result.isHealthy ? 'Sağlıklı Durum' : (!result.isOlivePlant ? 'Tanımsız' : 'Hastalık Tespiti')}</span>
            </div>
            <button 
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              title="Yeni Analiz"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Main Result */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
              {result.diseaseName || "Sonuç Belirsiz"}
            </h2>
            <p className="text-slate-500 text-sm font-medium">Tespit Edilen Sınıf</p>
          </div>

          {/* Score Bar */}
          <div className="mb-8">
             <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Eşleşme Güven Skoru</span>
                <span className="text-2xl font-bold text-slate-900 font-mono">%{result.confidenceScore}</span>
             </div>
             <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isSuccess ? 'bg-emerald-500' : (isDanger ? 'bg-rose-500' : 'bg-slate-400')}`}
                  style={{ width: `${result.confidenceScore}%` }}
                >
                  <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]"></div>
                </div>
             </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              Görsel Bulgular
            </h4>
            <p className="text-slate-600 text-sm leading-7">
              {result.description}
            </p>
          </div>

          {/* Suggestions if needed */}
          {result.isOlivePlant && !result.isHealthy && (
            <div className="mt-auto">
               <h4 className="flex items-center gap-2 text-sm font-bold text-olive-800 mb-4 uppercase tracking-wide">
                 <Thermometer className="w-4 h-4" />
                 Mücadele Yöntemleri
               </h4>
               <div className="space-y-3">
                 {result.treatmentSuggestions.map((suggestion, idx) => (
                   <div key={idx} className="flex gap-3 items-start group">
                      <div className="mt-1 w-5 h-5 rounded-full bg-olive-100 text-olive-700 flex items-center justify-center text-[10px] font-bold shrink-0 group-hover:bg-olive-600 group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-600 leading-snug pt-0.5">{suggestion}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* Button for Unknown/Error */}
          {!result.isOlivePlant && (
            <div className="mt-auto">
               <button onClick={onReset} className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  Yeni Görsel Dene
                  <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};