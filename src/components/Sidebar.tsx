import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Grid,
  Wand2,
  Zap,
  Users,
  MessageSquare,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  X,
  Mic,
  Image as ImageIcon,
  Map,
  Video,
  Bot
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  pendingReviewsCount?: number;
  pendingApprovalsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  pendingReviewsCount = 1,
  pendingApprovalsCount = 0
}) => {
  const navSections = [
    {
      title: 'Marketing',
      items: [
        { id: 'dashboard', label: 'Nástenka', icon: LayoutDashboard },
        { id: 'calendar', label: 'Kalendár', icon: Calendar },
        { id: 'templates', label: 'Šablóny', icon: Grid },
        { id: 'wizard', label: 'AI Generátor', icon: Wand2 },
        { id: 'media', label: 'AI Media Creator', icon: ImageIcon },
        { id: 'competitor-analysis', label: 'Analýza Konkurencie', icon: Map }
      ]
    },
    {
      title: 'Klientska Retencia',
      items: [
        { id: 'automations', label: 'CRM Automaty', icon: Zap },
        { id: 'crm', label: 'Klienti & Pacienti', icon: Users },
        { id: 'telemedicine', label: 'Telemedicína', icon: Video },
        { id: 'chatbot', label: 'AI Chatbot', icon: Bot },
        {
          id: 'reviews',
          label: 'Google Recenzie',
          icon: MessageSquare,
          badge: pendingReviewsCount > 0 ? `${pendingReviewsCount}` : undefined
        }
      ]
    },
    {
      title: 'Klinické Dokumenty',
      items: [
        { id: 'canvas', label: 'AI Canvas (SOP)', icon: BookOpen },
        { id: 'scribe', label: 'AI Scribe (Záznamy)', icon: Mic }
      ]
    },
    {
      title: 'Nastavenia',
      items: [
        { id: 'brandkit', label: 'Brand Kit', icon: Building2 }
      ]
    }
  ];

  const handleSelectTab = (id: string) => {
    setCurrentTab(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#134027] text-white">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-[#1B5E3A]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B89628] flex items-center justify-center text-slate-900 shadow-md shrink-0 font-bold">
            <Stethoscope className="w-6 h-6 text-[#134027]" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5 truncate">
                OpenVPM <span className="text-[#D4AF37] text-[10px] uppercase bg-[#1B5E3A] px-1.5 py-0.5 rounded font-black border border-[#D4AF37]/30">Studio</span>
              </h1>
              <p className="text-[10px] text-emerald-200/70 truncate">Veterinárny Marketing & SOP</p>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-2 text-emerald-200 hover:text-white hover:bg-[#1B5E3A] rounded-xl cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        {navSections.map((sec, idx) => (
          <div key={idx} className="space-y-1.5">
            {!collapsed && (
              <div className="px-3 text-[10px] font-black uppercase tracking-wider text-[#D4AF37]/80">
                {sec.title}
              </div>
            )}
            {sec.items.map(item => {
              const Icon = item.icon;
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer group relative ${
                    active
                      ? 'bg-[#1B5E3A] text-white shadow-md border-l-4 border-[#D4AF37]'
                      : 'text-emerald-100/70 hover:bg-[#1B5E3A]/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-[#D4AF37]' : 'text-emerald-300/70'}`} />
                  
                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {!collapsed && item.badge && (
                    <span className="bg-[#D4AF37] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                      {item.badge}
                    </span>
                  )}

                  {collapsed && item.badge && (
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-2 ring-[#134027]" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Fear-Free Badge & Collapse Toggle */}
      <div className="p-4 border-t border-[#1B5E3A] space-y-3">
        {!collapsed && (
          <div className="bg-[#1B5E3A]/80 p-3 rounded-xl border border-[#D4AF37]/20 flex items-center gap-2.5 text-xs text-emerald-100">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div className="min-w-0">
              <div className="font-bold text-[11px] text-white">Fear-Free Standard</div>
              <div className="text-[10px] text-emerald-200/70 truncate">Aktivované pre ambulanciu</div>
            </div>
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex w-full items-center justify-center gap-2 py-2 text-xs font-bold text-emerald-200 hover:text-white hover:bg-[#1B5E3A] rounded-xl transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Zbaliť menu</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 shadow-xl ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
