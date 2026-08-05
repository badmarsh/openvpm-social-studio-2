import React from 'react';
import { Video, PhoneCall, Calendar } from 'lucide-react';

export const TelemedicineView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">Telemedicína</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Modul pre telemedicínske videohovory a online konzultácie.</p>
      </div>
      
      <div className="bg-white p-12 rounded-3xl border border-[#E8E1D5] text-center max-w-2xl mx-auto mt-12 shadow-sm">
        <Video className="w-16 h-16 text-[#134027]/30 mx-auto mb-6" />
        <h3 className="text-xl font-bold text-[#2D3748] mb-2">Pripravujeme</h3>
        <p className="text-stone-500 text-sm mb-8">
          Tento modul umožní priame bezpečné videohovory s klientmi, zdieľanie obrazovky pre ukážku RTG snímkov a automatický prepis hovoru pomocou AI Scribe.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-stone-100 text-stone-400 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 cursor-not-allowed">
            <PhoneCall className="w-4 h-4" /> Spustiť Testovací Hovor
          </button>
          <button className="bg-[#FAF8F5] border border-[#E8E1D5] text-[#134027] hover:bg-stone-50 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 cursor-pointer transition-colors">
            <Calendar className="w-4 h-4" /> Pozrieť Kalendár
          </button>
        </div>
      </div>
    </div>
  );
};
