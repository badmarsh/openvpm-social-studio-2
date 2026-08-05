import React from 'react';
import {
  Menu,
  CheckCircle2,
  UserCheck,
  ShieldAlert,
  LayoutDashboard,
  Calendar,
  MessageSquare,
  BookOpen,
  MoreHorizontal,
  ChevronRight,
  Wifi
} from 'lucide-react';
import { UserRole, BrandKit } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  brandKit: BrandKit;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  role,
  setRole,
  brandKit,
  setMobileOpen,
  collapsed
}) => {
  // Breadcrumb mappings
  const getBreadcrumbs = () => {
    switch (currentTab) {
      case 'dashboard':
        return { section: 'Marketing', page: 'Nástenka (Dashboard)' };
      case 'calendar':
        return { section: 'Marketing', page: 'Kalendár príspevkov' };
      case 'templates':
        return { section: 'Marketing', page: 'Knižnica šablón' };
      case 'wizard':
        return { section: 'Marketing', page: 'AI Generátor' };
      case 'automations':
        return { section: 'Klientska Retencia', page: 'CRM Automaty' };
      case 'crm':
        return { section: 'Klientska Retencia', page: 'Klienti & Pacienti' };
      case 'reviews':
        return { section: 'Klientska Retencia', page: 'Google Recenzie' };
      case 'canvas':
        return { section: 'Klinické Dokumenty', page: 'AI Canvas (SOP)' };
      case 'brandkit':
        return { section: 'Nastavenia', page: 'Brand Kit' };
      default:
        return { section: 'Studio', page: 'Prehľad' };
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      {/* Top Header Bar */}
      <header
        className={`sticky top-0 z-20 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E1D5] transition-all duration-300 ${
          collapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile Hamburger & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl bg-white border border-[#E8E1D5] text-[#134027] hover:bg-stone-100 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Otvoriť menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium truncate">
              <span className="hidden sm:inline text-stone-400">{breadcrumbs.section}</span>
              <ChevronRight className="hidden sm:inline w-3.5 h-3.5 text-stone-300" />
              <span className="font-bold text-[#134027] truncate">{breadcrumbs.page}</span>
            </div>
          </div>

          {/* Right: Sync Pill & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* OpenVPM Sync Status */}
            <div className="hidden sm:flex items-center gap-2 bg-[#134027]/10 text-[#134027] px-3 py-1.5 rounded-full border border-[#134027]/20 text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <Wifi className="w-3.5 h-3.5 text-[#134027]" />
              <span className="truncate">Pripojené k OpenVPM</span>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-[#F5F1EB] p-1 rounded-full border border-[#E8E1D5] text-xs">
              <button
                onClick={() => setRole('drafter')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer min-h-[36px] ${
                  role === 'drafter'
                    ? 'bg-[#134027] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Tvorca</span>
              </button>
              <button
                onClick={() => setRole('approver')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer min-h-[36px] ${
                  role === 'approver'
                    ? 'bg-[#134027] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Schvaľovateľ</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Phone view) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E1D5] px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold min-w-[56px] min-h-[48px] justify-center cursor-pointer ${
            currentTab === 'dashboard' ? 'text-[#134027] bg-[#134027]/10' : 'text-stone-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Nástenka</span>
        </button>

        <button
          onClick={() => setCurrentTab('calendar')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold min-w-[56px] min-h-[48px] justify-center cursor-pointer ${
            currentTab === 'calendar' ? 'text-[#134027] bg-[#134027]/10' : 'text-stone-500'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Kalendár</span>
        </button>

        <button
          onClick={() => setCurrentTab('reviews')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold min-w-[56px] min-h-[48px] justify-center cursor-pointer ${
            currentTab === 'reviews' ? 'text-[#134027] bg-[#134027]/10' : 'text-stone-500'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Recenzie</span>
        </button>

        <button
          onClick={() => setCurrentTab('canvas')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold min-w-[56px] min-h-[48px] justify-center cursor-pointer ${
            currentTab === 'canvas' ? 'text-[#134027] bg-[#134027]/10' : 'text-stone-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Canvas</span>
        </button>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold min-w-[56px] min-h-[48px] justify-center text-stone-500 cursor-pointer"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span>Viac</span>
        </button>
      </nav>
    </>
  );
};
