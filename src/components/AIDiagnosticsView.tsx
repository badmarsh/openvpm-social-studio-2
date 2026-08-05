import React, { useState } from 'react';
import { Microscope, UploadCloud, AlertTriangle, CheckCircle2, FileText, Activity } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const AIDiagnosticsView: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { showToast } = useToast();

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        findings: [
          { type: 'warning', text: 'Zvýšený tieň v oblasti pľúc', confidence: 87 },
          { type: 'info', text: 'Bez známok fraktúr v zobrazenej oblasti', confidence: 95 }
        ],
        summary: 'Možný zápal alebo prítomnosť tekutiny. Odporúča sa ďalšie vyšetrenie.'
      });
      setAnalyzing(false);
      showToast('Analýza hotová', 'Dáta z RTG boli úspešne spracované.');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">AI Diagnostika (Klinický asistent)</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Nahrajte RTG snímky alebo laboratórne výsledky pre okamžitú analýzu "druhého názoru".</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm space-y-6">
          <div className="border-2 border-dashed border-[#E8E1D5] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FAF8F5] transition-colors" onClick={handleUpload}>
            <UploadCloud className="w-12 h-12 text-[#134027] mb-4" />
            <p className="font-bold text-[#2D3748]">Nahrať súbor pre analýzu</p>
            <p className="text-xs text-stone-500 mt-1">Podporované: JPEG, PNG, DICOM, PDF (max 50MB)</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm flex flex-col">
          <h3 className="font-bold text-[#134027] text-lg mb-4 flex items-center gap-2">
            <Microscope className="w-5 h-5 text-[#D4AF37]" />
            Výsledky Analýzy
          </h3>
          
          {analyzing ? (
            <div className="flex-1 flex flex-col items-center justify-center py-8">
              <div className="w-10 h-10 border-4 border-[#134027] border-t-[#D4AF37] rounded-full animate-spin mb-4" />
              <p className="text-sm font-bold text-[#2D3748] animate-pulse">Spracovávam obrazové dáta...</p>
            </div>
          ) : result ? (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="font-bold text-amber-900 text-sm">Zhrnutie AI:</p>
                <p className="text-sm text-amber-800 mt-1">{result.summary}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Detaily:</p>
                {result.findings.map((f: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5]">
                    {f.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    <div>
                      <p className="text-sm font-bold text-[#2D3748]">{f.text}</p>
                      <p className="text-[10px] font-bold text-stone-400">Istota AI: {f.confidence}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-8 text-stone-400">
              <Activity className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm font-medium">Zatiaľ žiadne dáta na analýzu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
