import React, { useState, useEffect } from 'react';
import { Client } from '../types';
import { Users, Tag, Phone, Mail, ShieldCheck } from 'lucide-react';

export const ClientCRMView: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => {
        setClients(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading OpenVPM Adresár Klientov...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3748] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#3D8D95]" />
            Adresár Klientov
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Zobrazenie CRM kontaktov a štítkov z OpenVPM (iba na čítanie).
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E1D5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#E8E1D5]">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Meno klienta</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kontakt</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Jazyk</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Značky</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Wellness Plán</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E1D5]">
              {clients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-[#2D3748]">{client.name}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5"/> {client.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5"/> {client.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-semibold text-gray-700">{client.languagePreference}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5">
                      {client.tags.length === 0 && <span className="text-xs text-gray-400 italic">Žiadne</span>}
                      {client.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    {client.activeWellnessPlan ? (
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 w-max">
                        <ShieldCheck className="w-4 h-4" /> Aktívny
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 w-max">
                        Neaktívny
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
