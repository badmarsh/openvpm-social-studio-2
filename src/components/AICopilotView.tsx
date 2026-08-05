import React, { useState } from 'react';
import { Brain, FileText, PlusCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const AICopilotView: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [data, setData] = useState<any>(null);
  const { showToast } = useToast();

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setData({
        missedCharges: [
          { item: 'Podanie injekcie (IV)', price: '12.00 €', reason: 'Spomenuté v zázname, chýba na účte.' },
          { item: 'Čistenie uší - špeciálne', price: '8.50 €', reason: 'V texte sa spomína aplikácia ušných kvapiek Oti-Clean.' }
        ],
        clinicalAlerts: [
          { text: 'Pozor: Pacient má v histórii alergickú reakciu na Penicilín. (Zistené z OpenVPM histórie)' }
        ]
      });
      setAnalyzing(false);
      showToast('Kontrola ukončená', 'AI identifikovala nezúčtované položky.');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">AI Copilot pre Účtovanie</h2>
          <p className="text-sm text-stone-500 font-medium mt-1">Automatická analýza medicínskych záznamov voči fakturácii.</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="bg-[#134027] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-900 transition-colors disabled:opacity-50"
        >
          {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
          Spustiť analýzu
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm">
          <h3 className="font-bold text-[#134027] flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            Aktuálny Klinický Záznam
          </h3>
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E1D5] text-sm text-stone-600 font-mono">
            Pacient: Max (Zlatý retriever, 4r.)<br/><br/>
            Anamnéza: Majiteľ hlási škrabanie uší posledné 3 dni. Uši mierne začervenané, prítomný tmavý sekrét.<br/><br/>
            Terapia: Vyčistenie uší prípravkom Oti-Clean. Aplikovaná liečba - Cefovecin IV injekcia. Odporúčaná kontrola o 7 dní.
          </div>
          
          <div className="mt-4 p-4 border border-[#E8E1D5] rounded-xl">
            <h4 className="text-xs font-bold uppercase text-stone-500 mb-2">Aktuálny účet</h4>
            <div className="flex justify-between text-sm py-1 border-b border-stone-100">
              <span>Základné vyšetrenie</span>
              <span>25.00 €</span>
            </div>
            <div className="flex justify-between text-sm py-1 font-bold mt-2">
              <span>Spolu:</span>
              <span>25.00 €</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {data ? (
            <>
              <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm">
                <h3 className="font-bold text-amber-900 flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Nezúčtované položky (Missed Charges)
                </h3>
                <div className="space-y-3">
                  {data.missedCharges.map((c: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <div>
                        <p className="font-bold text-amber-900 text-sm">{c.item}</p>
                        <p className="text-[10px] text-amber-700">{c.reason}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-amber-900">{c.price}</span>
                        <button className="p-1.5 bg-white rounded-lg text-[#134027] hover:bg-teal-50 border border-amber-200 shadow-xs" title="Pridať na účet">
                          <PlusCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-red-200 shadow-sm">
                <h3 className="font-bold text-red-900 flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-red-600" />
                  Klinické Upozornenia
                </h3>
                {data.clinicalAlerts.map((a: any, i: number) => (
                  <div key={i} className="p-3 bg-red-50 text-red-800 text-sm rounded-xl border border-red-100 font-medium">
                    {a.text}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full bg-[#FAF8F5] rounded-3xl border border-[#E8E1D5] flex items-center justify-center p-8 text-center">
              <div>
                <Brain className="w-12 h-12 text-[#134027]/20 mx-auto mb-4" />
                <p className="text-sm font-bold text-stone-400">Spustite analýzu pre kontrolu záznamu a účtovania.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
