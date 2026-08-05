import React from 'react';
import { Post, BrandKit, Template } from '../types';
import {
  Wand2,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileEdit,
  ArrowRight,
  PlusCircle,
  Send,
  Eye,
  Stethoscope,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface DashboardProps {
  posts: Post[];
  brandKit: BrandKit;
  templates: Template[];
  onStartWizard: (templateId?: string, initialTopic?: string) => void;
  onViewPost: (post: Post) => void;
  onNavigateTab: (tab: string) => void;
  loading?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  posts,
  brandKit,
  templates,
  onStartWizard,
  onViewPost,
  onNavigateTab,
  loading = false
}) => {
  const { showToast } = useToast();

  // Counts by status
  const draftCount = posts.filter(p => p.status === 'draft').length;
  const reviewCount = posts.filter(p => p.status === 'in_review').length;
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const publishedCount = posts.filter(p => p.status === 'published').length;

  // Wellness Plan Goal Widget State
  const wellnessGoal = 20;
  const wellnessCurrent = 14;
  const wellnessPercent = Math.min(100, Math.round((wellnessCurrent / wellnessGoal) * 100));

  // Suggested post ideas
  const suggestedIdeas = [
    {
      id: 'idea_1',
      title: 'Jarná prevencia kliešťov & parazitov',
      category: 'Prevencia & Wellness',
      templateId: 'tpl_vaccine_reminder',
      initialTopic: 'Jarná prevencia parazitov, kliešťov a odčervenie psov a mačiek',
      description: 'Pripomeňte majiteľom, že vyššie teploty aktivujú parazity.',
      badge: 'Sezónny Hlas',
      icon: '🌿'
    },
    {
      id: 'idea_2',
      title: 'Predstavenie tímu: Vet Tech Marcus',
      category: 'Dôvera & Tím',
      templateId: 'tpl_meet_team',
      initialTopic: 'Marcus Vance, vedúci veterinárny technik - 5 rokov láskavej starostlivosti',
      description: 'Ukážte ľudskú tvár vašej veterinárnej ambulancie.',
      badge: 'Dôvera Klientov',
      icon: '🩺'
    },
    {
      id: 'idea_3',
      title: 'Seniorská kontrola pre psov (7+ rokov)',
      category: 'Prevencia & Seniori',
      templateId: 'tpl_senior_pet',
      initialTopic: 'Preventívna prehliadka pre mačky a psov od 7 rokov & kĺbová výživa',
      description: 'Bi-ročné prevencie pomáhajú odhaliť skryté ochorenia včas.',
      badge: 'Vysoký Dosah',
      icon: '🐕'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 bg-[#F5F1EB] rounded-2xl border border-[#E8E1D5]" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-[#F5F1EB] rounded-2xl border border-[#E8E1D5]" />
          ))}
        </div>
        <div className="h-64 bg-[#F5F1EB] rounded-2xl border border-[#E8E1D5]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* TOP CLINIC HERO HEADER */}
      <div className="bg-gradient-to-r from-[#134027] via-[#1B5E3A] to-[#25754A] p-6 sm:p-8 rounded-2xl text-white shadow-xl border border-[#D4AF37]/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle Background Glow Accent */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" />
            {brandKit.clinicName} • OpenVPM Studio
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Vitajte v riadiacom centre ambulancie
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Plánujte príspevky, odpovedajte na recenzie a píšte klinické SOP s plnou garanciou Fear-Free tónu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => onStartWizard()}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c5a028] text-slate-950 px-5 py-3 rounded-xl font-bold text-xs shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-slate-950" />
            <span>Rýchly AI Príspevok</span>
          </button>
          <button
            onClick={() => onNavigateTab('canvas')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-bold text-xs border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>AI Canvas SOP</span>
          </button>
        </div>
      </div>

      {/* NOTIFICATION & TARGETS WIDGET GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Weekly Wellness Goal Widget */}
        <div className="md:col-span-6 lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E8E1D5] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#134027] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              Ročné Wellness Plány (Cieľ Týždňa)
            </div>
            <span className="bg-[#134027]/10 text-[#134027] text-[11px] font-black px-2.5 py-1 rounded-full border border-[#134027]/20">
              {wellnessPercent}% Splnené
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-bold text-[#2D3748] text-lg">
                {wellnessCurrent} <span className="text-xs font-normal text-gray-500">z {wellnessGoal} aktivácií</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700">+3 oproti minulému týždňu</span>
            </div>

            {/* Custom Styled Progress Bar */}
            <div className="w-full bg-[#F5F1EB] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#E8E1D5]">
              <div
                className="bg-gradient-to-r from-[#134027] via-[#1B5E3A] to-[#D4AF37] h-full rounded-full transition-all duration-700 shadow-xs"
                style={{ width: `${wellnessPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px] text-gray-500 border-t border-stone-100">
            <span>Aktivácie cez sociálne siete & Web Portal</span>
            <button
              onClick={() => {
                showToast('Wellness Plán Aktualizovaný', 'Boli zaznamenané 2 nové aktivácie z kampane.');
              }}
              className="font-bold text-[#134027] hover:underline cursor-pointer"
            >
              Pridať aktiváciu +
            </button>
          </div>
        </div>

        {/* Action Callouts / Notification Badges Widget */}
        <div className="md:col-span-6 lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E8E1D5] shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-xs font-bold text-[#2D3748] uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              Upozornenia & Akcie
            </h3>
            <span className="text-[10px] font-bold text-stone-400">Živé dáta</span>
          </div>

          <div className="space-y-3">
            {/* Unreplied Reviews Alert */}
            <div
              onClick={() => onNavigateTab('reviews')}
              className="p-3 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/80 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-amber-950">1 nová Google recenzia</div>
                  <div className="text-[11px] text-amber-800/80">Vyžaduje "Fear-Free" odpoveď AI</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Pending Approvals Alert */}
            <div
              onClick={() => onNavigateTab('calendar')}
              className="p-3 bg-teal-50/80 hover:bg-teal-100/80 border border-teal-200/80 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#134027] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="font-bold text-xs text-[#134027]">{reviewCount} príspevky na schválenie</div>
                  <div className="text-[11px] text-teal-800/80">Čaká na potvrdenie manažéra</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#134027] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* METRICS METRICS CARDS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-xs space-y-1">
          <div className="text-stone-400 text-[11px] font-bold uppercase tracking-wider">Koncepty</div>
          <div className="text-3xl font-extrabold text-[#2D3748]">{draftCount}</div>
          <div className="text-[11px] text-[#134027] font-semibold">Pripravené na úpravu</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-xs space-y-1">
          <div className="text-stone-400 text-[11px] font-bold uppercase tracking-wider">Na revíziu</div>
          <div className="text-3xl font-extrabold text-[#D4AF37]">{reviewCount}</div>
          <div className="text-[11px] text-amber-700 font-semibold">Čaká na schválenie</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-xs space-y-1">
          <div className="text-stone-400 text-[11px] font-bold uppercase tracking-wider">Naplánované</div>
          <div className="text-3xl font-extrabold text-[#134027]">{scheduledCount}</div>
          <div className="text-[11px] text-stone-400 font-medium italic">Automatické publikovanie</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8E1D5] shadow-xs space-y-1">
          <div className="text-stone-400 text-[11px] font-bold uppercase tracking-wider">Publikované</div>
          <div className="text-3xl font-extrabold text-emerald-700">{publishedCount}</div>
          <div className="text-[11px] text-stone-400 font-medium italic">Aktívne na sieťach</div>
        </div>
      </section>

      {/* RECENT POSTS QUEUE & IDEAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Posts Queue */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E8E1D5] shadow-sm overflow-hidden space-y-0">
          <div className="px-6 py-4 border-b border-[#E8E1D5] bg-[#FAF8F5] flex items-center justify-between">
            <h3 className="font-bold text-xs text-[#2D3748] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#134027]" />
              Fronta najbližších príspevkov
            </h3>
            <button
              onClick={() => onNavigateTab('calendar')}
              className="text-xs font-bold text-[#134027] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Kompletný kalendár →
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {posts.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <p className="text-stone-500 text-xs">Váš kalendár je zatiaľ prázdny.</p>
                <button
                  onClick={() => onStartWizard()}
                  className="text-xs font-bold text-[#134027] hover:underline cursor-pointer"
                >
                  Vytvoriť prvý príspevok cez AI →
                </button>
              </div>
            ) : (
              posts.slice(0, 5).map(post => {
                const primaryVariant = post.variants.IG || post.variants.FB || Object.values(post.variants)[0];
                return (
                  <div
                    key={post.id}
                    onClick={() => onViewPost(post)}
                    className="p-4 flex items-center gap-4 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    <img
                      src={primaryVariant?.mediaUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=100&q=80'}
                      alt="Príspevok"
                      className="w-12 h-12 rounded-xl object-cover border border-[#E8E1D5] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-[#2D3748] truncate">
                        {primaryVariant?.caption || 'Bez názvu'}
                      </h4>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        {post.scheduledDate} • {post.createdBy}
                      </p>
                    </div>
                    <StatusBadge status={post.status} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recommended Topics */}
        <div className="lg:col-span-4 bg-[#F5F1EB] p-5 rounded-2xl border border-[#E8E1D5] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-[#134027] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Odporúčania pre tento týždeň
            </h3>
          </div>

          <div className="space-y-3">
            {suggestedIdeas.map(idea => (
              <div
                key={idea.id}
                onClick={() => onStartWizard(idea.templateId, idea.initialTopic)}
                className="bg-white p-3.5 rounded-xl border border-[#E8E1D5] hover:border-[#134027] shadow-xs transition-all cursor-pointer group space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-[#134027]/10 text-[#134027] px-2 py-0.5 rounded uppercase">
                    {idea.category}
                  </span>
                  <span className="text-xs">{idea.icon}</span>
                </div>
                <h4 className="font-bold text-xs text-[#2D3748] group-hover:text-[#134027] transition-colors">
                  {idea.title}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                  {idea.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StatusBadge: React.FC<{ status: Post['status'] }> = ({ status }) => {
  const styles: Record<Post['status'], string> = {
    draft: 'bg-amber-50 text-amber-800 border-amber-200',
    in_review: 'bg-blue-50 text-blue-800 border-blue-200',
    approved: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    scheduled: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    published: 'bg-[#134027] text-white border-transparent',
    archived: 'bg-gray-100 text-gray-600 border-gray-200'
  };

  const labels: Record<Post['status'], string> = {
    draft: 'Koncept',
    in_review: 'Na schválenie',
    approved: 'Schválené',
    scheduled: 'Naplánované',
    published: 'Publikované',
    archived: 'Archív'
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full uppercase tracking-wider border shadow-2xs ${styles[status] || 'bg-gray-100 text-gray-700'}`}
    >
      {labels[status] || status}
    </span>
  );
};
