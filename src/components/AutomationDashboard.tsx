import React, { useState, useEffect } from 'react';
import { Automation } from '../types';
import { Settings, Zap, ToggleLeft, ToggleRight, MessageSquare, Mail } from 'lucide-react';

export const AutomationDashboard: React.FC = () => {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/automations')
      .then(res => res.json())
      .then(data => {
        setAutomations(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const toggleAutomation = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/automations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setAutomations(automations.map(a => a.id === id ? updated : a));
      }
    } catch (err) {
      console.error('Failed to toggle automation', err);
    }
  };

  const fireMockWebhook = async (event: string, clientId: string, metadata?: any) => {
    try {
      await fetch('/api/webhooks/openvpm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, clientId, metadata: metadata || {} })
      });
      alert(`Fired mock webhook for ${event}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Načítavam automatizácie...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] flex items-center gap-2">
            <Zap className="w-6 h-6 text-[#3D8D95]" />
            Centrum Automatizácie
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Spravujte OpenVPM spúšťače a AI generované follow-upy.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <button onClick={() => fireMockWebhook('appointment.completed', 'c1', { serviceType: 'surgery' })} className="text-[10px] bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-200">
            Mock: Surgery Discharge (Ján)
          </button>
          <button onClick={() => fireMockWebhook('appointment.completed', 'c3', { serviceType: 'vaccination_puppy' })} className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-200">
            Mock: Puppy Vax + Upsell (Peter)
          </button>
          <button onClick={() => fireMockWebhook('appointment.no_show', 'c2')} className="text-[10px] bg-amber-100 text-amber-700 font-bold px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-200">
            Mock: No-Show (Anna)
          </button>
          <button onClick={() => fireMockWebhook('instagram.dm', 'c4', { message: 'Koľko stojí kastrácia?' })} className="text-[10px] bg-purple-100 text-purple-700 font-bold px-3 py-1.5 rounded-lg border border-purple-200 hover:bg-purple-200">
            Mock: IG DM (Cena)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map(auto => (
          <div key={auto.id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#E8E1D5] flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#2D3748] text-lg">{auto.name}</h3>
                <span className="bg-gray-100 text-gray-500 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border border-gray-200 mt-1 inline-block">
                  Spúšťač: {auto.triggerEvent}
                </span>
              </div>
              <button 
                onClick={() => toggleAutomation(auto.id, auto.isActive)}
                className={`transition-colors cursor-pointer ${auto.isActive ? 'text-emerald-500 hover:text-emerald-600' : 'text-gray-400 hover:text-gray-500'}`}
              >
                {auto.isActive ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>
            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E1D5] flex-1">
              <p className="text-xs text-gray-600 leading-relaxed font-mono">
                {auto.templatePrompt}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
              {auto.actionType === 'sms' ? <MessageSquare className="w-4 h-4 text-[#3D8D95]" /> : <Mail className="w-4 h-4 text-[#3D8D95]" />}
              Akcia: Generovať a odoslať {auto.actionType.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
