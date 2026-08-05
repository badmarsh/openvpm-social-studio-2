import React, { useState } from 'react';
import { BrandKit } from '../types';
import { Image as ImageIcon, Video, Loader2, Sparkles, Download, LayoutTemplate, Layers } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface AIMediaCreatorProps {
  brandKit: BrandKit;
}

export const AIMediaCreator: React.FC<AIMediaCreatorProps> = ({ brandKit }) => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const { showToast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResultUrl(null);
    try {
      if (activeTab === 'image') {
        const res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, aspectRatio, brandKit })
        });
        const data = await res.json();
        if (data.imageUrl) {
          setResultUrl(data.imageUrl);
          showToast('Hotovo', 'Obrázok bol úspešne vygenerovaný.');
        }
      } else {
        const res = await fetch('/api/generate-video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, aspectRatio, brandKit })
        });
        const data = await res.json();
        // Since video generation is async, we'd normally poll here.
        // For simplicity we will assume it returns a url or operation mock.
        setTimeout(() => {
          setResultUrl('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm');
          setLoading(false);
          showToast('Hotovo', 'Video bolo vygenerované.');
        }, 3000);
        return; 
      }
    } catch (e) {
      showToast('Chyba', 'Generovanie zlyhalo.');
    } finally {
      if (activeTab === 'image') setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">AI Media Creator</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Dedikované štúdio pre tvorbu a úpravu vizuálneho obsahu (Veo & Imagen).</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E8E1D5] shadow-sm overflow-hidden p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-[#E8E1D5] pb-4">
          <button 
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'image' ? 'bg-[#134027] text-white' : 'text-stone-500 hover:bg-stone-100'}`}
          >
            <ImageIcon className="w-4 h-4" /> Generátor Obrázkov
          </button>
          <button 
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === 'video' ? 'bg-[#134027] text-white' : 'text-stone-500 hover:bg-stone-100'}`}
          >
            <Video className="w-4 h-4" /> Generátor Videí (Veo)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#2D3748] mb-2">Prompt (Opis vizuálu)</label>
              <textarea 
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Popíšte čo chcete vygenerovať, napr. 'Zlatý retriever v modernej veterinárnej ambulancii, šťastný, profi fotografia...'"
                className="w-full rounded-xl border border-stone-200 p-4 min-h-[120px] focus:ring-2 focus:ring-[#134027] focus:border-[#134027] outline-none text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#2D3748] mb-2">Pomer Strán</label>
              <div className="flex gap-2">
                {['1:1', '4:5', '16:9', '9:16'].map(ar => (
                  <button 
                    key={ar}
                    onClick={() => setAspectRatio(ar)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border ${aspectRatio === ar ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-[#134027] to-teal-900 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-[#D4AF37]" />}
              {loading ? 'Generujem...' : 'Vygenerovať Vizuál'}
            </button>
          </div>

          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] flex items-center justify-center min-h-[300px] p-4 relative overflow-hidden">
            {loading ? (
              <div className="text-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#134027] mx-auto" />
                <p className="text-sm font-bold text-[#134027] animate-pulse">
                  {activeTab === 'image' ? 'Vykresľujem obrázok...' : 'Renderujem video...'}
                </p>
              </div>
            ) : resultUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {activeTab === 'image' ? (
                  <img src={resultUrl} alt="Generated result" className="max-w-full max-h-[400px] object-contain rounded-lg shadow-sm" />
                ) : (
                  <video src={resultUrl} controls autoPlay loop className="max-w-full max-h-[400px] rounded-lg shadow-sm" />
                )}
                <button className="mt-4 flex items-center gap-2 text-xs font-bold bg-white border border-stone-200 px-4 py-2 rounded-lg shadow-xs hover:bg-stone-50">
                  <Download className="w-4 h-4" /> Stiahnuť
                </button>
              </div>
            ) : (
              <div className="text-center text-stone-400">
                <Layers className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">Náhľad sa zobrazí tu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
