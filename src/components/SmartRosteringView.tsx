import React from 'react';
import { Calendar, Users, BarChart3, Clock, AlertTriangle } from 'lucide-react';

export const SmartRosteringView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">AI Plánovanie Zmien (Rostering)</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Optimalizácia služieb personálu na základe predikcie vyťaženosti ambulancie.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-[#2D3748] flex items-center gap-2">
               <Calendar className="w-5 h-5 text-[#D4AF37]" />
               Týždenný Rozpis (Generovaný AI)
             </h3>
             <div className="flex gap-2">
               <button className="px-3 py-1.5 text-xs font-bold bg-[#FAF8F5] border border-[#E8E1D5] rounded-lg">Predchádzajúci</button>
               <button className="px-3 py-1.5 text-xs font-bold bg-[#FAF8F5] border border-[#E8E1D5] rounded-lg">Ďalší</button>
             </div>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-stone-500 bg-[#FAF8F5] uppercase border-y border-[#E8E1D5]">
                  <tr>
                    <th className="px-4 py-3 font-bold">Personál</th>
                    <th className="px-4 py-3 font-bold">Po (12.8.)</th>
                    <th className="px-4 py-3 font-bold">Ut (13.8.)</th>
                    <th className="px-4 py-3 font-bold">St (14.8.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="px-4 py-3 font-bold text-[#2D3748]"><span className="text-[#134027]">MVDr. Horský</span><br/><span className="text-[10px] text-stone-400 font-normal">Chirurg</span></td>
                    <td className="px-4 py-3"><div className="bg-emerald-50 text-emerald-800 text-xs px-2 py-1 rounded font-medium text-center border border-emerald-100">08:00 - 16:00</div></td>
                    <td className="px-4 py-3"><div className="bg-emerald-50 text-emerald-800 text-xs px-2 py-1 rounded font-medium text-center border border-emerald-100">08:00 - 16:00</div></td>
                    <td className="px-4 py-3"><div className="bg-stone-50 text-stone-500 text-xs px-2 py-1 rounded font-medium text-center border border-stone-200">Voľno</div></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-[#2D3748]"><span className="text-[#134027]">Bc. Malá</span><br/><span className="text-[10px] text-stone-400 font-normal">Sestra</span></td>
                    <td className="px-4 py-3"><div className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded font-medium text-center border border-blue-100">07:30 - 15:30</div></td>
                    <td className="px-4 py-3"><div className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded font-medium text-center border border-amber-100 flex flex-col items-center gap-1">10:00 - 18:00 <AlertTriangle className="w-3 h-3 text-amber-600"/></div></td>
                    <td className="px-4 py-3"><div className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded font-medium text-center border border-blue-100">07:30 - 15:30</div></td>
                  </tr>
                </tbody>
             </table>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-[#134027] p-6 rounded-3xl shadow-sm text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
                AI Predikcia
              </h3>
              <p className="text-sm text-emerald-100 mb-4">Na utorok (13.8.) očakávame <span className="font-bold text-white">zvýšený počet pacientov</span> (sezónny vplyv / počasie). Systém navrhol posunúť zmenu sestry na neskôr.</p>
              <button className="w-full bg-[#D4AF37] text-slate-900 font-bold py-2 rounded-xl text-sm hover:bg-amber-400 transition-colors">
                Prijať rozvrh
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
