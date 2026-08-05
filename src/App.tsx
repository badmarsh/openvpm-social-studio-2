import React, { useState, useEffect } from 'react';
import {
  BrandKit,
  Template,
  Post,
  UserRole,
  PostStatus
} from './types';
import {
  fetchBrandKit,
  saveBrandKit as apiSaveBrandKit,
  fetchTemplates,
  fetchPosts,
  savePost as apiSavePost,
  updatePostStatus as apiUpdatePostStatus,
  deletePost as apiDeletePost
} from './lib/firebase';
import { DEFAULT_BRAND_KIT, SEED_TEMPLATES, INITIAL_DEMO_POSTS } from './lib/seedData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TemplateLibrary } from './components/TemplateLibrary';
import { GenerationWizard } from './components/GenerationWizard';
import { CalendarView } from './components/CalendarView';
import { BrandKitView } from './components/BrandKitView';
import { AutomationDashboard } from './components/AutomationDashboard';
import { ClientCRMView } from './components/ClientCRMView';
import { ReviewsView } from './components/ReviewsView';
import { AICanvasView } from './components/AICanvasView';
import { AIScribeView } from './components/AIScribeView';
import { CompetitorAnalysisView } from './components/CompetitorAnalysisView';
import { TelemedicineView } from './components/TelemedicineView';
import { ChatbotView } from './components/ChatbotView';
import { InnovationsView } from './components/InnovationsView';
import { SuppliersView } from './components/SuppliersView';
import { PostDetailModal } from './components/PostDetailModal';
import { ToastProvider, useToast } from './context/ToastContext';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [role, setRole] = useState<UserRole>('drafter');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Firestore / Cache state
  const [brandKit, setBrandKit] = useState<BrandKit>(DEFAULT_BRAND_KIT);
  const [templates, setTemplates] = useState<Template[]>(SEED_TEMPLATES);
  const [posts, setPosts] = useState<Post[]>(INITIAL_DEMO_POSTS);
  const [loading, setLoading] = useState<boolean>(true);

  // Wizard Launch State
  const [wizardTemplate, setWizardTemplate] = useState<Template | null>(null);
  const [wizardTopic, setWizardTopic] = useState<string>('');

  // Selected Post for Modal
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { showToast } = useToast();

  // Initial Data Fetching
  useEffect(() => {
    async function loadData() {
      try {
        const [bkData, tplData, postsData] = await Promise.all([
          fetchBrandKit(),
          fetchTemplates(),
          fetchPosts()
        ]);
        if (bkData) setBrandKit(bkData);
        if (tplData && tplData.length > 0) setTemplates(tplData);
        if (postsData && postsData.length > 0) setPosts(postsData);
      } catch (err) {
        console.warn('Initial load fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Launch Wizard Handler
  const handleStartWizard = (templateId?: string, initialTopic?: string) => {
    if (templateId) {
      const tpl = templates.find(t => t.id === templateId) || null;
      setWizardTemplate(tpl);
    } else {
      setWizardTemplate(null);
    }
    setWizardTopic(initialTopic || '');
    setCurrentTab('wizard');
  };

  // Save Brand Kit
  const handleSaveBrandKit = async (updated: BrandKit) => {
    setBrandKit(updated);
    await apiSaveBrandKit(updated);
    showToast('Brand Kit Uložený', 'Identita ambulancie bola aktualizovaná.');
  };

  // Save Post
  const handleSavePost = async (newPost: Post) => {
    const updated = [newPost, ...posts.filter(p => p.id !== newPost.id)];
    setPosts(updated);
    await apiSavePost(newPost);
    setCurrentTab('dashboard');
    showToast('Príspevok Uložený', `Príspevok bol uložený v stave "${newPost.status}".`);
  };

  // Reschedule Post
  const handleReschedulePost = async (postId: string, newDate: string) => {
    const target = posts.find(p => p.id === postId);
    if (!target) return;
    const updated: Post = { ...target, scheduledDate: newDate };
    const updatedList = posts.map(p => (p.id === postId ? updated : p));
    setPosts(updatedList);
    await apiSavePost(updated);
    showToast('Termín Zmenený', `Príspevok bol presunutý na ${newDate}.`);
  };

  // Update Status
  const handleUpdatePostStatus = async (
    postId: string,
    newStatus: PostStatus,
    note?: string
  ) => {
    const userName = role === 'approver' ? 'Manažér Ambulancie (Schvaľovateľ)' : 'Personál Kliniky (Tvorca)';
    const updated = await apiUpdatePostStatus(postId, newStatus, userName, note);
    if (updated) {
      setPosts(posts.map(p => (p.id === postId ? updated : p)));
      if (selectedPost?.id === postId) {
        setSelectedPost(updated);
      }
      showToast('Stav Zmenený', `Príspevok je teraz v stave "${newStatus}".`);
    }
  };

  // Delete Post
  const handleDeletePost = async (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
    if (selectedPost?.id === postId) setSelectedPost(null);
    await apiDeletePost(postId);
    showToast('Príspevok Odstránený', 'Príspevok bol vymazaný z databázy.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 border-4 border-[#134027] border-t-[#D4AF37] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#134027]">
            Pripájam sa do OpenVPM Social Studio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D3748] font-sans antialiased flex flex-col selection:bg-[#D4AF37]/30">
      {/* Responsive Collapsible Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        pendingReviewsCount={1}
      />

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        role={role}
        setRole={setRole}
        brandKit={brandKit}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
      />

      {/* Main View Container */}
      <main
        className={`flex-1 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8 max-w-7xl w-full mx-auto ${
          collapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {currentTab === 'dashboard' && (
          <Dashboard
            posts={posts}
            brandKit={brandKit}
            templates={templates}
            onStartWizard={handleStartWizard}
            onViewPost={post => setSelectedPost(post)}
            onNavigateTab={tab => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'templates' && (
          <TemplateLibrary
            templates={templates}
            onSelectTemplate={tpl => handleStartWizard(tpl.id)}
          />
        )}

        {currentTab === 'wizard' && (
          <GenerationWizard
            initialTemplate={wizardTemplate}
            initialTopic={wizardTopic}
            brandKit={brandKit}
            templates={templates}
            role={role}
            onSavePost={handleSavePost}
            onCancel={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'calendar' && (
          <CalendarView
            posts={posts}
            brandKit={brandKit}
            onViewPost={post => setSelectedPost(post)}
            onStartWizard={() => handleStartWizard()}
            onReschedulePost={handleReschedulePost}
            onAddGeneratedPosts={newPosts => setPosts(prev => [...prev, ...newPosts])}
          />
        )}

        {currentTab === 'canvas' && <AICanvasView brandKit={brandKit} role={role} />}
        {currentTab === 'scribe' && <AIScribeView />}
        {currentTab === 'competitor-analysis' && <CompetitorAnalysisView />}
        {currentTab === 'telemedicine' && <TelemedicineView />}
        {currentTab === 'chatbot' && <ChatbotView />}
        {currentTab === 'crm' && <ClientCRMView />}
        {currentTab === 'reviews' && <ReviewsView />}
        {currentTab === 'automations' && <AutomationDashboard />}
        {currentTab === 'innovations' && <InnovationsView />}
        {currentTab === 'suppliers' && <SuppliersView />}
        {currentTab === 'brandkit' && (
          <BrandKitView brandKit={brandKit} onSaveBrandKit={handleSaveBrandKit} />
        )}
      </main>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          role={role}
          onClose={() => setSelectedPost(null)}
          onUpdatePostStatus={handleUpdatePostStatus}
          onSavePostChanges={handleSavePost}
          onDeletePost={handleDeletePost}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
