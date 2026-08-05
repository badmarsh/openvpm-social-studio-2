import React, { useState } from 'react';
import { Template } from '../types';
import { Sparkles, ArrowRight, BookTemplate, Info, Image as ImageIcon, X, Eye, Wand2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface TemplateLibraryProps {
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ templates, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Všetky');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const { showToast } = useToast();

  const categories = ['Všetky', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = selectedCategory === 'Všetky'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  const handleChooseTemplate = (tpl: Template) => {
    onSelectTemplate(tpl);
    showToast('Šablóna Vybraná', `Generujem návrh na základe "${tpl.name}"`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E8E1D5] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#134027] uppercase tracking-wider">
            <BookTemplate className="w-4 h-4 text-[#D4AF37]" />
            Overené Príspevkové Rámce
          </div>
          <h2 className="text-2xl font-bold text-[#2D3748] mt-1">
            Knižnica Šablón pre Ambulanciu
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Vyberte si pripravenú veterinárnu šablónu pre prevenciu, stretnutie tímu, akútne prípady alebo vzdelávanie.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#134027] text-white shadow-xs border border-[#D4AF37]/30'
                  : 'bg-[#F5F1EB] text-stone-600 border border-[#E8E1D5] hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates with Glassmorphism Overlays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(tpl => (
          <div
            key={tpl.id}
            className="group relative bg-white rounded-2xl shadow-xs border border-[#E8E1D5] hover:border-[#134027] hover:shadow-md transition-all flex flex-col h-full overflow-hidden"
          >
            {/* Card Header / Image Container */}
            <div className="h-44 bg-[#F5F1EB] relative overflow-hidden shrink-0">
              {tpl.imageUrl ? (
                <img
                  src={tpl.imageUrl}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-[#FAF8F5] flex items-center justify-center text-stone-400">
                  <ImageIcon className="w-10 h-10" />
                </div>
              )}

              {/* Glassmorphic Overlay on Hover */}
              <div className="absolute inset-0 bg-[#134027]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 gap-3">
                <button
                  onClick={() => handleChooseTemplate(tpl)}
                  className="w-full max-w-[200px] bg-[#D4AF37] hover:bg-[#c5a028] text-slate-950 font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  <Wand2 className="w-4 h-4" />
                  Použiť šablónu
                </button>

                <button
                  onClick={() => setPreviewTemplate(tpl)}
                  className="w-full max-w-[200px] bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-white/30 backdrop-blur-md cursor-pointer transition-colors"
                >
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                  Rýchly náhľad
                </button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-[#134027]/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#D4AF37]/40 shadow-xs">
                {tpl.category}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-[#2D3748] text-base group-hover:text-[#134027] transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex gap-1.5">
                  {tpl.platforms.map(p => (
                    <span key={p} className="text-[10px] font-bold bg-[#F5F1EB] text-stone-600 px-2 py-0.5 rounded-md">
                      {p}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleChooseTemplate(tpl)}
                  className="text-xs font-bold text-[#134027] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Použiť <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-[#E8E1D5] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start pb-4 border-b border-[#E8E1D5]">
              <div>
                <span className="text-[10px] font-bold bg-[#134027]/10 text-[#134027] px-2.5 py-0.5 rounded uppercase">
                  {previewTemplate.category}
                </span>
                <h3 className="font-extrabold text-xl text-[#2D3748] mt-1">{previewTemplate.name}</h3>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="aspect-video bg-[#F5F1EB] rounded-xl overflow-hidden border border-[#E8E1D5]">
                {previewTemplate.imageUrl ? (
                  <img src={previewTemplate.imageUrl} alt={previewTemplate.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E1D5] space-y-1">
                <div className="text-[11px] font-bold text-stone-400 uppercase">Ukážkový štýl textu:</div>
                <p className="text-xs text-stone-700 italic leading-relaxed">
                  "{previewTemplate.exampleCaption || previewTemplate.description}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Zatvoriť
              </button>
              <button
                onClick={() => {
                  const tpl = previewTemplate;
                  setPreviewTemplate(null);
                  handleChooseTemplate(tpl);
                }}
                className="px-5 py-2.5 bg-[#134027] hover:bg-teal-900 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Použiť túto šablónu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
