import React from 'react';
import { CreditCard, Smartphone, CheckCircle2, AlertTriangle, Search, Clock } from 'lucide-react';

export const PaymentsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">Smart Payments & Card-on-File</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Uložené karty klientov, tap-to-pay a automatické platby za predplatné.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2 bg-white rounded-3xl border border-[#E8E1D5] shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
             <h3 className="font-bold text-[#2D3748]">Nedávne Transakcie</h3>
             <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Hľadať platbu..." className="bg-[#FAF8F5] border border-[#E8E1D5] rounded-lg py-1.5 pl-9 pr-3 text-xs focus:outline-none" />
             </div>
          </div>
          
          <div className="space-y-3">
            {[
              { client: 'Peter Nagy', type: 'Card-on-File (Wellness Plán)', amount: '35.00 €', status: 'success', time: 'Dnes 09:15' },
              { client: 'Zuzana K.', type: 'Tap-to-Pay (Terminál)', amount: '124.50 €', status: 'success', time: 'Dnes 08:30' },
              { client: 'Mária B.', type: 'SMS Payment Link', amount: '45.00 €', status: 'pending', time: 'Včera 16:45' }
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5]">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {tx.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3748] text-sm">{tx.client}</p>
                    <p className="text-xs text-stone-500">{tx.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#2D3748]">{tx.amount}</p>
                  <p className="text-[10px] text-stone-400 font-medium">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#134027] to-[#1B5E3A] p-6 rounded-3xl shadow-sm text-white">
             <div className="flex justify-between items-start mb-6">
               <CreditCard className="w-8 h-8 text-[#D4AF37]" />
               <Smartphone className="w-6 h-6 text-emerald-200/50" />
             </div>
             <p className="text-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-1">Požiadať o platbu</p>
             <h3 className="text-xl font-extrabold mb-4">Odoslať Pay-Link</h3>
             <button className="w-full bg-[#D4AF37] text-slate-900 font-bold py-2.5 rounded-xl hover:bg-amber-400 transition-colors shadow-xs">
               Generovať SMS Link
             </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm">
             <h3 className="font-bold text-[#2D3748] mb-4">Uložené Karty (Vault)</h3>
             <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
               <AlertTriangle className="w-5 h-5 shrink-0" />
               <p>Tokenizácia kariet je zabezpečená cez Stripe. Klinika nemá prístup k úplným číslam kariet.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
