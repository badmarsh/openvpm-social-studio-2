import React, { useState } from 'react';
import { Beaker, BookOpen, Star, RefreshCw, FileText, ChevronRight, ExternalLink } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface ResearchItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  date: string;
  actionable: string;
}

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  roi: string;
}

const MOCK_RESEARCH: ResearchItem[] = [
  {
    id: 'r1',
    title: 'Vplyv Fear-Free prístupu na retenciu klientov',
    summary: 'Štúdia z roku 2025 ukazuje, že kliniky aplikujúce Fear-Free protokoly majú o 24 % vyššiu retenciu a o 18 % vyšší ATC (Average Transaction Charge).',
    category: 'Manažment praxe',
    source: 'Veterinary Evidence Journal',
    date: 'Júl 2026',
    actionable: 'Prehodnoťte rozloženie čakárne a pridajte vizuálne bariéry medzi psov a mačky.'
  },
  {
    id: 'r2',
    title: 'Prediktívna diagnostika chronického ochorenia obličiek',
    summary: 'Nové AI modely dokážu z bežného panelu krvi a moču predikovať ochorenie u mačiek až 2 roky pred klinickým prejavom s 92% presnosťou.',
    category: 'Klinická medicína',
    source: 'Argus.vet Research',
    date: 'August 2026',
    actionable: 'Doplňte tento test do Senior Wellness Plánu ako kľúčovú hodnotu.'
  }
];

const MOCK_AI_TOOLS: AITool[] = [
  {
    id: 'ai1',
    name: 'ScribbleVet',
    description: 'AI Scribe, ktorý priamo generuje SOAP záznam a identifikuje "care gaps" (chýbajúce preventívne úkony) pre upsell.',
    category: 'Administratíva',
    price: '~55 € / mesiac',
    roi: 'Úspora 1,5h denne, automatický upsell.'
  },
  {
    id: 'ai2',
    name: 'Picoxia',
    description: 'Európska platforma pre AI rádiológiu. Deteguje 34+ lézií za 10-20 sekúnd. GDPR compliant.',
    category: 'Diagnostika',
    price: 'Pay-per-study',
    roi: 'Druhý názor do minúty, znižuje chyby z únavy.'
  },
  {
    id: 'ai3',
    name: 'GREENIES Canine Dental Check',
    description: 'Bezplatná mobilná aplikácia pre klientov, ktorá AI analýzou zistí zubný kameň z fotky.',
    category: 'Lead Generation',
    price: 'Zadarmo',
    roi: 'Generuje leady pre dentálne čistenie na klinike.'
  }
];

export const InnovationsView: React.FC = () => {
  const { showToast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Výskum aktualizovaný', 'Boli stiahnuté najnovšie dáta a nástroje z Argus.vet.');
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-stone-50 overflow-hidden">
      <div className="p-6 sm:p-8 shrink-0 bg-white border-b border-[#E8E1D5]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#134027] uppercase tracking-wider">
              <Beaker className="w-4 h-4 text-[#D4AF37]" />
              R&D Modul
            </div>
            <h2 className="text-2xl font-bold text-[#2D3748] mt-1">
              Inovácie & Mesačný Výskum
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Aktualizovaný prehľad najnovších AI nástrojov a výskumu zameraného na veterinárnu prax.
            </p>
          </div>
          
          <button 
            onClick={handleRefresh}
            className="bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[#2D3748] border border-[#E8E1D5] px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Ingestovať nové dáta (Argus.vet)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* AI Tools Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#2D3748] flex items-center gap-2">
                <Star className="w-5 h-5 text-[#D4AF37]" />
                Odporúčané AI Nástroje na Implementáciu
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {MOCK_AI_TOOLS.map(tool => (
                <div key={tool.id} className="bg-white p-5 rounded-2xl border border-[#E8E1D5] hover:border-[#134027] transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-[#2D3748]">{tool.name}</h4>
                    <span className="bg-[#F5F1EB] text-[#8C6D23] text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mb-4 h-12 overflow-hidden">{tool.description}</p>
                  
                  <div className="bg-[#FAF8F5] p-3 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-500">Cena:</span>
                      <span className="font-semibold text-[#2D3748]">{tool.price}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-500">Hodnota/ROI:</span>
                      <span className="font-bold text-[#134027] text-right ml-2">{tool.roi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Research Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#2D3748] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#3D8D95]" />
                Mesačný Výskumný Digest (Actionable)
              </h3>
            </div>
            
            <div className="space-y-4">
              {MOCK_RESEARCH.map(item => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-sm flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">{item.category}</span>
                      <span className="text-[10px] text-stone-400">• {item.date}</span>
                    </div>
                    <h4 className="font-bold text-[#2D3748] text-base mb-2">{item.title}</h4>
                    <p className="text-sm text-stone-600 mb-3">{item.summary}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#134027]">
                      <FileText className="w-3.5 h-3.5" />
                      Zdroj: {item.source}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/3 bg-[#F4F9F6] p-4 rounded-xl border border-[#D1E5D9] flex flex-col justify-center">
                    <h5 className="text-xs font-bold text-[#134027] mb-1 uppercase tracking-wider">Aplikácia v praxi</h5>
                    <p className="text-xs text-stone-700 font-medium">
                      {item.actionable}
                    </p>
                    <button className="mt-3 text-xs font-bold text-[#134027] flex items-center gap-1 hover:underline">
                      Pridať ako úlohu <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
