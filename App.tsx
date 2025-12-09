import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadArea } from './components/UploadArea';
import { AnalysisResultCard } from './components/AnalysisResultCard';
import { DatasetInfo } from './components/DatasetInfo';
import { analyzeOliveImage } from './services/geminiService';
import { AnalysisResult, UploadStatus } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleImageSelected = async (base64: string, mimeType: string, previewUrl: string) => {
    try {
      setPreview(previewUrl);
      setStatus(UploadStatus.LOADING);
      setErrorMsg(null);
      const analysisResult = await analyzeOliveImage(base64, mimeType);
      setResult(analysisResult);
      setStatus(UploadStatus.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setStatus(UploadStatus.ERROR);
      setErrorMsg(error.message || "Bir hata oluştu.");
    }
  };

  const resetAnalysis = () => {
    setStatus(UploadStatus.IDLE);
    setResult(null);
    setPreview(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-olive-200 selection:text-olive-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        
        {status === UploadStatus.IDLE && (
           <div className="mb-6 pl-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hastalık Analizi</h2>
             <p className="text-slate-500 mt-1 max-w-xl text-base">
               Yapay zeka destekli modelimiz ile zeytin ağaçlarınızdaki hastalıkları saniyeler içinde teşhis edin.
             </p>
           </div>
        )}

        {status === UploadStatus.IDLE ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Dataset Info (5 cols) */}
            <div className="lg:col-span-5 w-full order-2 lg:order-1">
              <DatasetInfo />
            </div>
            
            {/* Right Column: Upload Area (7 cols) */}
            <div className="lg:col-span-7 w-full order-1 lg:order-2 h-full">
              <UploadArea onImageSelected={handleImageSelected} isAnalyzing={false} />
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {status === UploadStatus.LOADING && (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in duration-500">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-olive-300/30 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                     <Loader2 className="w-12 h-12 text-olive-600 animate-spin" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Görüntü Analiz Ediliyor</h3>
                <p className="text-slate-500 mt-2 text-lg">Dataset karşılaştırması yapılıyor...</p>
                <div className="mt-8 w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-olive-400 to-olive-600 animate-progress origin-left w-full rounded-full"></div>
                </div>
              </div>
            )}

            {status === UploadStatus.ERROR && (
              <div className="max-w-md mx-auto bg-white border border-red-100 rounded-3xl p-8 text-center shadow-2xl shadow-red-100/50 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                  <Loader2 className="w-8 h-8" /> 
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Analiz Başarısız</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">{errorMsg}</p>
                <button 
                  onClick={resetAnalysis}
                  className="w-full py-3.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                  Tekrar Dene
                </button>
              </div>
            )}

            {status === UploadStatus.SUCCESS && result && preview && (
              <AnalysisResultCard 
                result={result} 
                previewImage={preview} 
                onReset={resetAnalysis} 
              />
            )}
          </div>
        )}
      </main>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(-30%); }
          100% { transform: translateX(0%); }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;