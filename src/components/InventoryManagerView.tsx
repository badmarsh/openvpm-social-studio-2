import React from 'react';
import { Package, TrendingUp, AlertCircle, ShoppingCart, Search, RefreshCw } from 'lucide-react';

export const InventoryManagerView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">AI Sklad a Objednávky</h2>
          <p className="text-sm text-stone-500 font-medium mt-1">Automatické predikcie a generovanie nákupných objednávok (PO).</p>
        </div>
        <button className="bg-[#134027] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-900 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Aktualizovať predikcie
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm">
             <h3 className="font-bold text-[#2D3748] mb-4 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
               AI Navrhované Objednávky (Sezónny trend)
             </h3>
             
             <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-emerald-900">Bravecto (Psy 10-20kg)</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Sezóna kliešťov</span>
                    </div>
                    <p className="text-xs text-emerald-700">Na sklade: 5 ks | Predikcia dopytu na 30 dní: 45 ks</p>
                  </div>
                  <button className="bg-white text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors">
                    Pridať do PO (+40 ks)
                  </button>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-[#2D3748]">Meloxidyl 1.5mg/ml</span>
                    </div>
                    <p className="text-xs text-stone-500">Na sklade: 2 ks | Minimum: 5 ks</p>
                  </div>
                  <button className="bg-white text-stone-700 border border-stone-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-stone-50 transition-colors">
                    Pridať do PO (+3 ks)
                  </button>
                </div>
             </div>
          </div>
        </div>

        <div className="col-span-1 space-y-6">
           <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-sm">
             <h3 className="font-bold text-rose-900 mb-4 flex items-center gap-2">
               <AlertCircle className="w-5 h-5 text-rose-600" />
               Exspirácie & Upozornenia
             </h3>
             <div className="space-y-3">
               <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                 <p className="font-bold text-rose-900 text-sm">Vaccine DHPPi</p>
                 <p className="text-xs text-rose-700 mt-1">Šarža #A98213 exspiruje za 14 dní (12 ks).</p>
               </div>
             </div>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm">
             <h3 className="font-bold text-[#134027] mb-4 flex items-center gap-2">
               <ShoppingCart className="w-5 h-5 text-[#D4AF37]" />
               Aktívne PO (Drafty)
             </h3>
             <div className="flex justify-between items-center py-2 border-b border-stone-100">
               <span className="text-sm font-bold text-[#2D3748]">Dodávateľ: Covetrus</span>
               <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Draft (12 pol.)</span>
             </div>
             <button className="w-full mt-4 bg-[#FAF8F5] text-[#134027] border border-[#E8E1D5] py-2 rounded-xl text-sm font-bold hover:bg-stone-100 transition-colors">
               Zobraziť všetky PO
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
