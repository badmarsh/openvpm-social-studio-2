import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MoreVertical, Search, Filter } from 'lucide-react';

export const InboxView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto h-[80vh] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">Omnichannel Inbox</h2>
          <p className="text-sm text-stone-500 font-medium mt-1">Všetka komunikácia na jednom mieste (E-mail, SMS, WhatsApp, FB).</p>
        </div>
      </div>
      
      <div className="flex-1 bg-white rounded-3xl border border-[#E8E1D5] shadow-sm flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-[#E8E1D5] flex flex-col">
          <div className="p-4 border-b border-[#E8E1D5] space-y-3">
             <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Vyhľadať správy..." className="w-full bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#134027]/20" />
             </div>
             <div className="flex gap-2">
               <button className="flex-1 bg-[#1B5E3A] text-white text-xs font-bold py-1.5 rounded-lg">Všetky</button>
               <button className="flex-1 bg-white text-stone-600 border border-[#E8E1D5] text-xs font-bold py-1.5 rounded-lg hover:bg-stone-50">Neprečítané</button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
             {/* Mock Items */}
             {[
               { name: 'Kováčová Mária', msg: 'Dobrý deň, chcela by som sa opýtať...', time: '10:42', type: 'whatsapp', unread: true },
               { name: 'Peter Nagy (Bella)', msg: 'Bella už nezvracala, vyzerá lepšie.', time: 'Včera', type: 'sms', unread: false },
               { name: 'Zuzana (Igor)', msg: 'Máme prísť na očkovanie, kedy máte voľno?', time: 'Včera', type: 'fb', unread: false }
             ].map((msg, i) => (
                <div key={i} className={`p-4 border-b border-[#E8E1D5] cursor-pointer hover:bg-[#FAF8F5] ${msg.unread ? 'bg-emerald-50/30' : ''}`}>
                   <div className="flex justify-between items-start mb-1">
                     <span className="font-bold text-sm text-[#2D3748]">{msg.name}</span>
                     <span className="text-[10px] font-medium text-stone-400">{msg.time}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-4 h-4 rounded bg-[#134027]/10 flex items-center justify-center shrink-0">
                       {msg.type === 'whatsapp' ? <Phone className="w-2.5 h-2.5 text-emerald-600" /> : <MessageSquare className="w-2.5 h-2.5 text-blue-600" />}
                     </div>
                     <p className="text-xs text-stone-500 truncate">{msg.msg}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-[#FAF8F5]">
           <div className="p-4 bg-white border-b border-[#E8E1D5] flex justify-between items-center">
             <div>
               <h3 className="font-bold text-[#2D3748]">Kováčová Mária (Pacient: Rex)</h3>
               <p className="text-xs text-stone-500">Zákazník od 2021 • WhatsApp správa</p>
             </div>
             <button className="p-2 text-stone-400 hover:text-[#134027] rounded-lg hover:bg-stone-100">
               <MoreVertical className="w-5 h-5" />
             </button>
           </div>
           
           <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#E8E1D5] shadow-xs max-w-[80%]">
                  <p className="text-sm text-[#2D3748]">Dobrý deň, chcela by som sa opýtať či má Rex ešte brať tie tabletky od včera, zdá sa mi, že mu po nich nechutí jesť.</p>
                  <p className="text-[9px] text-stone-400 mt-1 text-right">Dnes 10:42</p>
                </div>
              </div>
           </div>
           
           <div className="p-4 bg-white border-t border-[#E8E1D5]">
              <div className="flex items-center gap-3">
                 <input type="text" placeholder="Napíšte odpoveď (bude odoslaná ako WhatsApp správa)..." className="flex-1 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#134027]/20" />
                 <button className="bg-[#134027] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-teal-900 transition-colors">
                   Odoslať
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
