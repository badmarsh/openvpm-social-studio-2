import React from 'react';

export default async function AutomationsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#1B5E3A]">CRM Automatizácie</h1>
      <p className="text-gray-600">Spravujte spúšťače pre pripomienky, recenzie a narodeninové správy.</p>
      <div className="mt-8 bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b bg-gray-50 font-medium text-gray-700">Aktívne Pravidlá</div>
        <div className="p-6">
           <p className="text-sm text-gray-500">Tu bude DataTable s prehľadom n8n / interných workflow pravidiel.</p>
        </div>
      </div>
    </div>
  );
}
