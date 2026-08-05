import React, { useState } from 'react';
import { Map, Loader2, Sparkles, Navigation } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { marked } from 'marked';

export const CompetitorAnalysisView: React.FC = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { showToast } = useToast();

  const handleAnalyze = async () => {
    if (!location.trim()) return;
    setLoading(true);
    setAnalysis('');
    setSources([]);

    try {
      const res = await fetch('/api/maps-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location })
      });
      const data = await res.json();
      
      if (data.text) {
        setAnalysis(data.text);
        if (data.groundingUrls) {
          setSources(data.groundingUrls);
        }
        showToast('Analýza hotová', 'Dáta z Google Máp boli úspešne spracované.');
      }
    } catch (e) {
      showToast('Chyba', 'Analýza zlyhala. Skúste znova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">Analýza Konkurencie</h2>
        <p className="text-sm text-stone-500 font-medium mt-1">Identifikujte okolité kliniky a objavte príležitosti na trhu pomocou Google Máp a AI.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-bold text-[#2D3748] mb-2">Lokalita (Mesto, mestská časť)</label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Map className="h-5 w-5 text-stone-400" />
              </div>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Napr. Bratislava Ružinov, Košice Juh..."
                className="pl-10 w-full bg-[#FAF8F5] border border-[#E8E1D5] rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#134027] outline-none"
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading || !location.trim()}
              className="bg-[#134027] hover:bg-teal-900 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5 text-[#D4AF37]" />}
              Analyzovať trh
            </button>
          </div>
        </div>

        {loading && (
          <div className="py-12 flex flex-col items-center justify-center text-stone-500 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#134027]" />
            <p className="font-bold text-sm text-[#134027] animate-pulse">Sťahujem dáta z Google Máp a generujem strategickú analýzu...</p>
          </div>
        )}

        {analysis && !loading && (
          <div className="pt-6 border-t border-[#E8E1D5]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-lg font-bold text-[#2D3748]">Strategická Analýza</h3>
              </div>
              <label className="flex items-center gap-2 cursor-pointer bg-[#FAF8F5] p-2 rounded-lg border border-[#E8E1D5]">
                <input 
                  type="checkbox" 
                  checked={isMonitoring} 
                  onChange={(e) => {
                    setIsMonitoring(e.target.checked);
                    showToast(
                      e.target.checked ? 'Monitoring zapnutý' : 'Monitoring vypnutý',
                      e.target.checked ? 'Budete dostávať týždenné upozornenia o zmenách konkurencie.' : 'Priebežný monitoring bol pozastavený.'
                    );
                  }}
                  className="w-4 h-4 text-[#134027] rounded focus:ring-[#134027]" 
                />
                <span className="text-xs font-bold text-[#2D3748]">Priebežný monitoring (Týždenný report)</span>
              </label>
            </div>
            
            <div className="prose prose-sm max-w-none text-stone-700 bg-[#FAF8F5] p-6 rounded-2xl border border-[#E8E1D5]"
                 dangerouslySetInnerHTML={{ __html: marked(analysis) as string }} />

            {sources.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Zdroje (Google Maps Grounding)</h4>
                <ul className="space-y-1">
                  {sources.map((url, i) => (
                    <li key={i}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-xs break-all">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
