import React from 'react';
import { Bot, MessageSquare } from 'lucide-react';

export const ChatbotView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">AI Chatbot & Triage</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Automatizované vybavovanie dopytov a triage pacientov na webe kliniky.</p>
      </div>
      
      <div className="bg-white p-12 rounded-3xl border border-[#E8E1D5] text-center max-w-2xl mx-auto mt-12 shadow-sm">
        <Bot className="w-16 h-16 text-[#134027]/30 mx-auto mb-6" />
        <h3 className="text-xl font-bold text-[#2D3748] mb-2">Inteligentný Triage Assistent</h3>
        <p className="text-stone-500 text-sm mb-8">
          AI Chatbot vyškolený na dátach vašej ambulancie (Brand Kit, SOP z AI Canvas). Dokáže rozpoznať urgentné prípady a upozorniť recepciu, kým bežné dotazy vybaví sám.
        </p>
        <button className="bg-[#134027] text-[#D4AF37] font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer mx-auto transition-all">
          <MessageSquare className="w-5 h-5" /> Konfigurovať Bota
        </button>
      </div>
    </div>
  );
};
