import React from 'react';
import { Activity, Heart, Moon, Battery, Watch, Search } from 'lucide-react';

export const PetWearablesView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">Smart Zariadenia (Pet Wearables)</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Integrácia inteligentných obojkov a kontinuálny zber zdravotných dát pacientov.</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E8E1D5] flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Vyhľadať pacienta..."
              className="pl-9 w-full bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl py-2 px-3 text-sm focus:ring-2 focus:ring-[#134027] outline-none"
            />
          </div>
          <button className="bg-[#134027] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-teal-900 transition-colors">
            <Watch className="w-4 h-4 text-[#D4AF37]" />
            Spárovať nové zariadenie
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patient Card */}
          <div className="col-span-1 bg-[#FAF8F5] rounded-2xl p-5 border border-[#E8E1D5]">
            <div className="flex items-center gap-4 mb-6">
              <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&q=80" alt="Dog" className="w-16 h-16 rounded-full object-cover shadow-sm border-2 border-white" />
              <div>
                <h3 className="font-extrabold text-lg text-[#2D3748]">Max</h3>
                <p className="text-xs text-stone-500">Bígl, 5 rokov</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 inline-flex">
                  <Activity className="w-3 h-3" /> Zariadenie pripojené
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm p-3 bg-white rounded-xl border border-[#E8E1D5]">
                <span className="text-stone-500 flex items-center gap-2"><Watch className="w-4 h-4 text-stone-400"/> Model</span>
                <span className="font-bold text-[#2D3748]">Fi Collar Gen 3</span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-white rounded-xl border border-[#E8E1D5]">
                <span className="text-stone-500 flex items-center gap-2"><Battery className="w-4 h-4 text-emerald-500"/> Batéria</span>
                <span className="font-bold text-emerald-600">84%</span>
              </div>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="font-bold text-[#134027]">Týždenný report zdravia</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-xs">
                <div className="flex items-center gap-2 text-stone-500 mb-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Aktivita</span>
                </div>
                <p className="text-2xl font-extrabold text-[#2D3748]">1.2 <span className="text-sm font-medium text-stone-400">hod/deň</span></p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">↑ 15% oproti min. týždňu</p>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-xs">
                <div className="flex items-center gap-2 text-stone-500 mb-2">
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Spánok</span>
                </div>
                <p className="text-2xl font-extrabold text-[#2D3748]">14.5 <span className="text-sm font-medium text-stone-400">hod/deň</span></p>
                <p className="text-[10px] text-stone-400 font-medium mt-1">Normálne hodnoty</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-xs col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-stone-500">
                    <Activity className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">Frekvencia škrabania (Alergie)</span>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded font-bold border border-amber-100">Potenciálny problém</span>
                </div>
                
                {/* Mock Chart Area */}
                <div className="h-24 w-full flex items-end gap-2 px-2">
                  {[3, 4, 3, 5, 8, 12, 10].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className={`w-full rounded-t-sm transition-all ${val > 6 ? 'bg-amber-400' : 'bg-emerald-200'}`} style={{ height: `${val * 8}px` }} />
                      <span className="text-[9px] text-stone-400 font-medium">{['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'][idx]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
