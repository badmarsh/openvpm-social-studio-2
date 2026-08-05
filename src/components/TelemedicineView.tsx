import React, { useState } from 'react';
import { Video, PhoneCall, Calendar, MessageSquare, CheckCircle2, Clock, ShieldCheck, Crown, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface Request {
  id: string;
  client: string;
  pet: string;
  tier: 'Tier 1' | 'Tier 2 (Gold)' | 'Tier 3 (VIP)';
  time: string;
  message: string;
  status: 'pending' | 'resolved';
}

const MOCK_REQUESTS: Request[] = [
  {
    id: 'req1',
    client: 'Jana Kováčová',
    pet: 'Luna (Pes)',
    tier: 'Tier 3 (VIP)',
    time: 'Pred 1 hodinou',
    message: 'Dobrý deň, Luna si začala intenzívne lízať labku po prechádzke. Mohli by sme sa rýchlo spojiť cez video?',
    status: 'pending'
  },
  {
    id: 'req2',
    client: 'Peter Nagy',
    pet: 'Micko (Mačka)',
    tier: 'Tier 2 (Gold)',
    time: 'Pred 4 hodinami',
    message: 'Micko vracal po tom, čo zjedol novú konzervu. Posielam fotku zvratkov (vyzerá to len ako nestrávené jedlo).',
    status: 'pending'
  }
];

export const TelemedicineView: React.FC = () => {
  const { showToast } = useToast();
  const [requests, setRequests] = useState<Request[]>(MOCK_REQUESTS);
  const [activeTab, setActiveTab] = useState<'requests' | 'plans'>('requests');

  const handleResolve = (id: string) => {
    setRequests(reqs => reqs.filter(r => r.id !== id));
    showToast('Požiadavka vybavená', 'Odpoveď bola odoslaná klientovi na portál.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">Telemedicína & Wellness</h2>
          <p className="text-sm text-stone-500 font-medium mt-1">
            Modul pre asynchrónne správy, videohovory a správu preventívnych plánov.
          </p>
        </div>
        
        <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E1D5]">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'requests' ? 'bg-white text-[#134027] shadow-sm border border-[#E8E1D5]' : 'text-stone-500 hover:text-stone-700'}`}
          >
            Aktívne dopyty ({requests.length})
          </button>
          <button 
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === 'plans' ? 'bg-white text-[#134027] shadow-sm border border-[#E8E1D5]' : 'text-stone-500 hover:text-stone-700'}`}
          >
            Cenová Pyramída
          </button>
        </div>
      </div>
      
      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-[#2D3748] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
              Čakajúce konzultácie
            </h3>
            
            {requests.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-[#E8E1D5] text-center">
                <CheckCircle2 className="w-12 h-12 text-[#134027]/40 mx-auto mb-3" />
                <h4 className="font-bold text-[#2D3748]">Všetko je vybavené</h4>
                <p className="text-xs text-stone-500">Nemáte žiadne čakajúce dopyty z klientskeho portálu.</p>
              </div>
            ) : (
              requests.map(req => (
                <div key={req.id} className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          req.tier === 'Tier 3 (VIP)' ? 'bg-purple-100 text-purple-700' : 
                          req.tier === 'Tier 2 (Gold)' ? 'bg-[#F5F1EB] text-[#8C6D23]' : 
                          'bg-stone-100 text-stone-600'
                        }`}>
                          {req.tier}
                        </span>
                        <span className="text-xs text-stone-400">{req.time}</span>
                      </div>
                      <h4 className="font-bold text-[#2D3748] text-base">{req.client} <span className="text-sm font-normal text-stone-500">({req.pet})</span></h4>
                    </div>
                  </div>
                  
                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E1D5]">
                    <p className="text-sm text-stone-700">"{req.message}"</p>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    {req.tier === 'Tier 3 (VIP)' && (
                      <button className="flex-1 bg-[#134027] hover:bg-teal-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors">
                        <Video className="w-4 h-4" /> Spustiť Videohovor (Jitsi)
                      </button>
                    )}
                    <button 
                      onClick={() => handleResolve(req.id)}
                      className="flex-1 bg-white hover:bg-stone-50 text-[#134027] border border-[#134027] font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Send className="w-4 h-4" /> Odpovedať textovo
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#2D3748] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#134027]" />
              Status systému
            </h3>
            
            <div className="bg-[#134027] text-white p-5 rounded-2xl shadow-sm">
              <h4 className="font-bold mb-1">Medplum + OpenVPM</h4>
              <p className="text-xs text-teal-100 mb-4">Integrácia portálu je aktívna. Pacienti majú prístup k async komunikácii podľa ich Wellness plánu.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-teal-800 pb-2">
                  <span className="text-teal-200">Aktívnych klientov:</span>
                  <span className="font-bold">42</span>
                </div>
                <div className="flex justify-between border-b border-teal-800 pb-2">
                  <span className="text-teal-200">Vyriešené dopyty (Tento mesiac):</span>
                  <span className="font-bold">18</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-teal-200">Telemedicínske tržby:</span>
                  <span className="font-bold text-[#D4AF37]">€ 280</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="max-w-5xl mx-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* TIER 1 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E1D5] shadow-sm flex flex-col">
              <div className="mb-4">
                <span className="bg-stone-100 text-stone-600 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                  Tier 1
                </span>
                <h3 className="text-xl font-bold text-[#2D3748] mt-3">Jednorazová konzultácia</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#2D3748]">€ 12</span>
                  <span className="text-stone-500 font-medium text-sm">/ dopyt</span>
                </div>
              </div>
              <p className="text-sm text-stone-600 mb-6 flex-1">
                Pre ne-klientov alebo pacientov bez predplatného. Rýchla odpoveď na konkrétny problém.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 shrink-0" />
                  <span>Asynchrónna správa (foto/video)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-stone-700">
                  <CheckCircle2 className="w-5 h-5 text-stone-400 shrink-0" />
                  <span>Odpoveď do 24-48 hodín</span>
                </li>
              </ul>
            </div>

            {/* TIER 2 */}
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#D4AF37] shadow-md flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-white text-[10px] font-bold uppercase px-4 py-1 rounded-full tracking-wider">
                Odporúčané (Gold Plán)
              </div>
              <div className="mb-4 mt-2">
                <span className="bg-[#F5F1EB] text-[#8C6D23] text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                  Tier 2
                </span>
                <h3 className="text-xl font-bold text-[#2D3748] mt-3">Gold Wellness</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#2D3748]">€ 22</span>
                  <span className="text-stone-500 font-medium text-sm">/ mesiac</span>
                </div>
              </div>
              <p className="text-sm text-stone-600 mb-6 flex-1">
                Predplatný plán prevencie s neobmedzeným prístupom k lekárovi cez portál.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-stone-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>Ročné očkovanie a 2x prehliadka</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-stone-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>Neobmedzené async správy na portáli</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-stone-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>Garantovaná odpoveď do 12h</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-stone-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>Krvný panel pre seniorov</span>
                </li>
              </ul>
            </div>

            {/* TIER 3 */}
            <div className="bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 shadow-sm flex flex-col">
              <div className="mb-4">
                <span className="bg-purple-900/50 text-purple-300 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider flex items-center gap-1 w-fit">
                  <Crown className="w-3 h-3" /> Tier 3
                </span>
                <h3 className="text-xl font-bold text-white mt-3">VIP Concierge Add-on</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">€ 15</span>
                  <span className="text-stone-400 font-medium text-sm">/ videohovor</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">Alebo +8 €/mes. k Gold plánu</p>
              </div>
              <p className="text-sm text-stone-300 mb-6 flex-1">
                Okamžitý prístup k lekárovi tvárou v tvár pre prémiových klientov.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm text-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Priamy video-call s Dr. Sýkorom (Jitsi)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Dostupnosť do 4 hodín</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-stone-200">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                  <span>Najvyššia priorita riešenia</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

