"use client";
import React from 'react';

export default function MarketingPlannerPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1B5E3A]">Marketingový Plánovač</h1>
        <button className="px-4 py-2 bg-[#D4AF37] text-white rounded-md font-medium shadow hover:bg-[#b5952f] transition-colors">
          Nový Príspevok
        </button>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 min-h-[500px] flex items-center justify-center">
        <p className="text-gray-400">Kalendár príspevkov na sociálne siete bude zobrazený tu.</p>
      </div>
    </div>
  );
}
