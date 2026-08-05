"use client";
import React from 'react';

export default function DocumentsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#1B5E3A]">AI Canvas a SOP</h1>
      <p className="text-gray-600">Spravujte strategické dokumenty, komunikačné manuály a klientske persony kliniky.</p>
      <div className="border border-gray-200 rounded-xl min-h-[400px] p-6 bg-[#FAF8F5]">
        <p className="text-sm text-gray-400 italic text-center mt-10">Tu bude integrovaný Tiptap / Lexical editor s AI funkcionalitou (Vyhľadávanie, Doplňovanie, RAG).</p>
      </div>
    </div>
  );
}
