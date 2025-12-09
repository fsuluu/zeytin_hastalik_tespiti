import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Scan } from 'lucide-react';

interface UploadAreaProps {
  onImageSelected: (base64: string, mimeType: string, preview: string) => void;
  isAnalyzing: boolean;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onImageSelected, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert("Lütfen geçerli bir resim dosyası yükleyin.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("Dosya boyutu çok büyük (Max 10MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const base64Data = result.split(',')[1];
      onImageSelected(base64Data, file.type, result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [onImageSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-full min-h-[300px]">
      <div 
        className={`relative h-full group border-3 border-dashed rounded-3xl transition-all duration-500 ease-out flex flex-col items-center justify-center text-center p-6 overflow-hidden
          ${dragActive 
            ? 'border-olive-500 bg-olive-50/50 scale-[0.99] shadow-inner' 
            : 'border-slate-200 bg-white hover:border-olive-400 hover:shadow-xl hover:shadow-olive-100/20'
          } ${isAnalyzing ? 'opacity-50 grayscale cursor-wait' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          accept="image/*"
          onChange={handleChange}
          disabled={isAnalyzing}
        />

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
           <div className="absolute top-10 right-10 w-24 h-24 bg-olive-200/20 rounded-full blur-2xl"></div>
           <div className="absolute bottom-10 left-10 w-32 h-32 bg-olive-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <label 
          htmlFor="file-upload" 
          className="relative z-10 flex flex-col items-center justify-center cursor-pointer w-full h-full"
        >
          <div className={`
            w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 shadow-lg
            ${dragActive 
              ? 'bg-olive-600 text-white rotate-6 scale-110 shadow-olive-300' 
              : 'bg-white text-olive-600 shadow-slate-100 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-olive-200 group-hover:bg-gradient-to-br group-hover:from-olive-500 group-hover:to-olive-600 group-hover:text-white'
            }
          `}>
             {dragActive ? <Scan className="w-7 h-7 animate-pulse" /> : <UploadCloud className="w-7 h-7" />}
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-olive-700 transition-colors">
            {dragActive ? 'Fotoğrafı Bırak' : 'Fotoğraf Yükle'}
          </h3>
          <p className="text-slate-500 mb-6 max-w-xs mx-auto text-sm leading-relaxed">
            Hastalık tespiti için buraya sürükleyin.
          </p>
          
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <span className="w-full py-3 px-6 bg-slate-900 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-slate-200 hover:shadow-xl hover:bg-olive-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Dosya Seçin
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-full">
              JPG, PNG • MAX 10MB
            </span>
          </div>
        </label>
      </div>
    </div>
  );
};