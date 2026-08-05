import React, { useState } from 'react';
import { Package, Search, ExternalLink, Filter, TrendingUp, Tag, PlusCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface Supplier {
  id: string;
  name: string;
  productType: string;
  moq: string;
  margin: string;
  location: string;
  description: string;
  tags: string[];
}

const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 's1',
    name: 'PharmaVet SK',
    productType: 'Kĺbová výživa',
    moq: '50 ks',
    margin: '180%',
    location: 'Slovensko',
    description: 'Lokálny výrobca certifikovaných kĺbových prípravkov (kolagén, MSM) s možnosťou vlastnej etikety.',
    tags: ['White-label', 'Vysoká marža', 'Seniori']
  },
  {
    id: 's2',
    name: 'NaturePet Co.',
    productType: 'CBD & Upokojujúce oleje',
    moq: '20 ks',
    margin: '150%',
    location: 'Česká republika',
    description: 'CBD kvapky a konopné oleje pre zvieratá. Certifikované, bez THC. Výborné pre Fear-Free kliniky.',
    tags: ['Fear-Free', 'CBD', 'Rýchle dodanie']
  },
  {
    id: 's3',
    name: 'EcoPaw Supplies',
    productType: 'Ochranný vosk na labky',
    moq: '100 ks',
    margin: '250%',
    location: 'Poľsko',
    description: 'Prírodný vosk na labky chrániaci pred posypovou soľou v zime a horúcim asfaltom v lete.',
    tags: ['Sezónne', 'Upsell', 'Prírodné']
  }
];

export const SuppliersView: React.FC = () => {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      showToast('Vyhľadávanie dokončené', 'Našli sme 12 nových potenciálnych dodávateľov.');
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-stone-50 overflow-hidden">
      <div className="p-6 sm:p-8 shrink-0 bg-white border-b border-[#E8E1D5]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#134027] uppercase tracking-wider">
              <Package className="w-4 h-4 text-[#D4AF37]" />
              Obchodný Modul
            </div>
            <h2 className="text-2xl font-bold text-[#2D3748] mt-1">
              Produkty & Dodávatelia
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Vyhľadávanie a správa white-label produktov pre zvýšenie ziskovosti (Zóna 1).
            </p>
          </div>
          
          <div className="flex gap-2">
             <button className="bg-white hover:bg-stone-100 text-[#2D3748] border border-[#E8E1D5] px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-xs">
              <Filter className="w-4 h-4" /> Filtre
            </button>
            <button className="bg-[#134027] hover:bg-teal-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-xs">
              <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
              Pridať Dodávateľa
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text"
              placeholder="Hľadať produkt (napr. probiotiká, šampón, CBD...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="bg-[#3D8D95] hover:bg-[#347A81] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            {isSearching ? <span className="animate-spin text-xl leading-none">⟳</span> : 'Vyhľadať v sieti'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 sm:p-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#2D3748]">
              Odporúčaní dodávatelia pre Vašu kliniku
            </h3>
            <span className="text-xs font-semibold text-stone-500 bg-[#E8E1D5] px-2 py-1 rounded-md">Na základe trendov 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOCK_SUPPLIERS.map(supplier => (
              <div key={supplier.id} className="bg-white p-5 rounded-2xl border border-[#E8E1D5] hover:border-[#3D8D95] transition-all shadow-sm flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-[#2D3748] text-base">{supplier.name}</h4>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                       {supplier.location}
                    </p>
                  </div>
                  <button className="text-stone-400 hover:text-[#3D8D95]">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-[#FAF8F5] px-3 py-2 rounded-lg border border-[#E8E1D5] inline-block w-fit mb-3">
                  <span className="text-xs font-bold text-[#134027]">{supplier.productType}</span>
                </div>

                <p className="text-sm text-stone-600 mb-4 flex-1">
                  {supplier.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {supplier.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" /> {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto border-t border-[#F5F1EB] pt-3">
                  <div className="bg-stone-50 p-2 rounded-lg text-center">
                    <p className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">MOQ</p>
                    <p className="text-sm font-semibold text-[#2D3748]">{supplier.moq}</p>
                  </div>
                  <div className="bg-[#F4F9F6] p-2 rounded-lg text-center">
                    <p className="text-[10px] text-[#134027] uppercase tracking-wider font-bold">Marža</p>
                    <p className="text-sm font-bold text-[#134027] flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {supplier.margin}
                    </p>
                  </div>
                </div>

                <button className="w-full mt-4 bg-white border border-[#3D8D95] text-[#3D8D95] hover:bg-[#F4F9F6] font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer">
                  Zistiť veľkoobchodné ceny
                </button>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
