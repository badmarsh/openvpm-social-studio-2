import React from 'react';

export default async function MarketingDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#1B5E3A]">Rast a Marketing: Prehľad</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">Šablóny Príspevkov</h3>
          <p className="text-sm text-gray-500">Spravujte komunikačné šablóny a knižnicu značky.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">Výkonnosť</h3>
          <p className="text-sm text-gray-500">Štatistiky Google Business Profilu a sociálnych sietí.</p>
        </div>
      </div>
    </div>
  );
}
