import React from 'react';
import { Pill, Send, FileCheck, ShoppingBag } from 'lucide-react';

export const DigitalPrescriptionsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">Digitálne Predpisy a E-shop</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Vystavenie e-receptu na diéty s priamym platobným odkazom do partnerského eshopu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm">
           <h3 className="font-bold text-[#134027] mb-4 flex items-center gap-2">
             <Pill className="w-5 h-5 text-[#D4AF37]" />
             Vystaviť nový predpis
           </h3>
           
           <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Pacient</label>
               <input type="text" placeholder="Vyhľadať pacienta..." className="w-full bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#134027]/20" />
             </div>
             <div>
               <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Produkt / Diéta</label>
               <input type="text" placeholder="Napr. Royal Canin Renal Dog 14kg..." className="w-full bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#134027]/20" />
             </div>
             
             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
               <h4 className="text-sm font-bold text-blue-900 mb-1 flex items-center gap-1"><ShoppingBag className="w-4 h-4"/> E-shop Integrácia</h4>
               <p className="text-xs text-blue-800">Tento produkt bude odoslaný klientovi s platobným odkazom. Klinika obdrží províziu z predaja (Dropshipping model).</p>
             </div>

             <button className="w-full bg-[#134027] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-900 transition-colors">
               <Send className="w-4 h-4" />
               Odoslať klientovi (SMS/Email)
             </button>
           </div>
         </div>

         <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm">
           <h3 className="font-bold text-[#2D3748] mb-4 flex items-center gap-2">
             <FileCheck className="w-5 h-5 text-stone-400" />
             História predpisov
           </h3>
           
           <div className="space-y-3">
             {[
               { client: 'Novák (Bella)', product: 'Hill\'s j/d 12kg', status: 'zaplatené', time: 'Dnes' },
               { client: 'Tóthová (Micko)', product: 'RC Urinary S/O 1.5kg', status: 'čaká na platbu', time: 'Včera' }
             ].map((p, i) => (
                <div key={i} className="p-3 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-[#2D3748]">{p.client}</p>
                    <p className="text-xs text-stone-500">{p.product}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${p.status === 'zaplatené' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {p.status}
                  </span>
                </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );
};
