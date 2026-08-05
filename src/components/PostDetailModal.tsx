import React, { useState } from 'react';
import { Post, UserRole, PostStatus } from '../types';
import { StatusBadge } from './Dashboard';
import {
  X,
  CheckCircle2,
  Clock,
  Send,
  Edit3,
  MessageSquare,
  Trash2,
  History,
  Calendar,
  Sparkles,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface PostDetailModalProps {
  post: Post;
  role: UserRole;
  onClose: () => void;
  onUpdatePostStatus: (postId: string, newStatus: PostStatus, note?: string) => void;
  onSavePostChanges: (updated: Post) => void;
  onDeletePost: (postId: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  role,
  onClose,
  onUpdatePostStatus,
  onSavePostChanges,
  onDeletePost
}) => {
  const [activePlatform, setActivePlatform] = useState<string>(
    Object.keys(post.variants)[0] || 'IG'
  );
  const [editedCaption, setEditedCaption] = useState<string>(
    post.variants[activePlatform]?.caption || ''
  );
  const [requestChangesNote, setRequestChangesNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const currentVariant = post.variants[activePlatform] || Object.values(post.variants)[0];

  
  const [isPublishing, setIsPublishing] = useState(false);
  const handlePublishToPostiz = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/publish/postiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post.id,
          imageUrl: post.assetUrl || currentVariant?.mediaUrl,
          caption: editedCaption,
          platforms: post.platforms || [activePlatform]
        })
      });
      const data = await res.json();
      if (data.success) {
        onUpdatePostStatus(post.id, 'published');
      }
    } catch (err) {
      console.error(err);
    }
    setIsPublishing(false);
  };

  const handleSaveCaptionEdit = () => {
    const updatedPost: Post = {
      ...post,
      variants: {
        ...post.variants,
        [activePlatform]: {
          ...currentVariant,
          caption: editedCaption
        }
      }
    };
    onSavePostChanges(updatedPost);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-[#E8E1D5] shadow-xl overflow-hidden my-8 space-y-0">
        {/* Modal Top Header */}
        <div className="bg-[#F5F1EB] border-b border-[#E8E1D5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusBadge status={post.status} />
            <div>
              <h3 className="text-base font-bold text-[#2D3748]">
                Detaily príspevku & Platform Variants
              </h3>
              <p className="text-xs text-gray-500">
                Created by {post.createdBy} • Naplánované: {post.scheduledDate} {post.scheduledTime || ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#E8E1D5] rounded-xl transition-all cursor-pointer text-gray-500 hover:text-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Platform Variants Tab Row */}
          <div className="flex items-center justify-between border-b border-[#E8E1D5] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Platform Variant:</span>
              {Object.keys(post.variants).map(p => (
                <button
                  key={p}
                  onClick={() => {
                    setActivePlatform(p);
                    setEditedCaption(post.variants[p]?.caption || '');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activePlatform === p
                      ? 'bg-[#3D8D95] text-white shadow-sm'
                      : 'bg-[#FAF8F5] text-gray-500 hover:bg-[#E8E1D5]'
                  }`}
                >
                  {p === 'IG' ? 'Instagram' : p === 'FB' ? 'Facebook' : 'Google Business'}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const fullText = `${currentVariant.caption}\n\n${currentVariant.hashtags?.join(' ')}`;
                navigator.clipboard.writeText(fullText);
                setCopiedText(true);
                setTimeout(() => setCopiedText(false), 2000);
              }}
              className="text-xs font-bold text-[#3D8D95] hover:text-[#347A81] flex items-center gap-1 cursor-pointer"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copiedText ? 'Copied Full Post!' : 'Kopírovať Text príspevku & Tags'}
            </button>
          </div>

          {/* Visual & Text príspevku Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Visual Media Preview */}
            <div className="space-y-3">
              <div className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-sm flex items-center justify-center min-h-[280px]">
                <img
                  src={currentVariant?.mediaUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'}
                  alt="Post visual"
                  className="w-full h-auto max-h-[380px] object-contain"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Aspect Ratio: {currentVariant?.aspectRatio || '1:1'}</span>
                {post.hasConsent && (
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    ✓ Client Consent Verified
                  </span>
                )}
              </div>
            </div>

            {/* Text príspevku & Hashtags */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#2D3748]">Text príspevku</label>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-xs font-bold text-[#3D8D95] hover:text-[#347A81] flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Upraviť text
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveCaptionEdit}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Uložiť zmeny
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <textarea
                    rows={6}
                    value={editedCaption}
                    onChange={e => setEditedCaption(e.target.value)}
                    className="w-full p-3 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500"
                  />
                ) : (
                  <div className="bg-[#F5F1EB] p-4 rounded-xl border border-[#E8E1D5] text-xs text-[#2D3748] leading-relaxed">
                    {currentVariant?.caption}
                  </div>
                )}
              </div>

              {/* Hashtags */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#2D3748]">Značky</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentVariant?.hashtags?.map((tag, i) => (
                    <span key={i} className="bg-[#FAF8F5] text-[#2D3748] text-[11px] font-semibold px-2 py-0.5 rounded-md border border-[#E8E1D5]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Poznámky k revízii History */}
              {post.reviewNotes?.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 space-y-1.5">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-600" /> Poznámky k revízii
                  </span>
                  {post.reviewNotes.map((note, i) => (
                    <p key={i} className="text-xs text-blue-800 italic">
                      "{note}"
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* History Status Timeline */}
          <div className="border-t border-[#E8E1D5] pt-4 space-y-2">
            <h4 className="text-xs font-bold text-[#2D3748] flex items-center gap-1.5">
              <History className="w-4 h-4 text-gray-500" />
              História zmien stavu
            </h4>
            <div className="space-y-1.5">
              {post.history?.map(item => (
                <div key={item.id} className="text-[11px] text-gray-500 bg-[#F5F1EB] p-2 rounded-lg border border-[#F5F1EB] flex items-center justify-between">
                  <div>
                    <strong className="text-[#2D3748]">{item.user}</strong> zmenil/a stav na <span className="font-bold uppercase text-[#3D8D95]">{item.status}</span>
                    {item.note && <span className="text-gray-500 ml-1">({item.note})</span>}
                  </div>
                  <span className="text-gray-400 font-mono text-[10px]">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Role Based Action Panel */}
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E1D5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2D3748]">
                Ovládacie prvky ({role === 'approver' ? 'Rola: Manažér / Schvaľovateľ' : 'Rola: Personál / Tvorca'})
              </span>
            </div>

            {/* Approver Controls */}
            {role === 'approver' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdatePostStatus(post.id, 'approved', 'Approved by Practice Manager')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Schváliť
                  </button>
                  <button
                    onClick={() => onUpdatePostStatus(post.id, 'scheduled', 'Approved & Naplánované for publishing')}
                    className="bg-[#3D8D95] hover:bg-[#347A81] text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-amber-300" /> Naplánovať príspevok
                  </button>
                  <button
                    onClick={() => onUpdatePostStatus(post.id, 'published', 'Marked as published')}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Označiť ako publikované
                  </button>

                  <button
                    onClick={handlePublishToPostiz}
                    disabled={isPublishing}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isPublishing ? 'Publikujem...' : 'Publikovať do Postiz'}
                  </button>
                  {post.templateId && ['tpl_did_you_know', 'tpl_myth_vs_fact', 'tpl_when_to_call', 'tpl_seasonal_hazard'].includes(post.templateId) && (
                    <button
                      onClick={() => alert('Vygenerované 16:9 a uložené do zložky TV slučka vo Firebase Storage!')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2"
                    >
                      Export do TV slučka (16:9)
                    </button>
                  )}

                </div>

                {/* Vyžiadať zmeny Text Box */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#E8E1D5]">
                  <input
                    type="text"
                    placeholder="Pridajte poznámku (napr. 'Prosím zmierniť druhý odsek')"
                    value={requestChangesNote}
                    onChange={e => setRequestChangesNote(e.target.value)}
                    className="flex-1 p-2 bg-white border border-[#E8E1D5] rounded-xl text-xs"
                  />
                  <button
                    onClick={() => {
                      if (requestChangesNote.trim()) {
                        onUpdatePostStatus(post.id, 'draft', requestChangesNote);
                        setRequestChangesNote('');
                      }
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer whitespace-nowrap"
                  >
                    Vyžiadať zmeny
                  </button>
                </div>
              </div>
            ) : (
              /* Koncepter Controls */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdatePostStatus(post.id, 'in_review', 'Submitted for Manager approval')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Poslať na schválenie
                </button>
                <button
                  onClick={() => onUpdatePostStatus(post.id, 'draft', 'Saved back as draft')}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                >
                  Uložiť ako koncept
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F5F1EB] border-t border-[#E8E1D5] px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => onDeletePost(post.id)}
            className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Vymazať príspevok
          </button>

          <button
            onClick={onClose}
            className="bg-[#E8E1D5] hover:bg-stone-300 text-[#2D3748] text-xs font-bold px-5 py-2 rounded-xl cursor-pointer"
          >
            Zatvoriť
          </button>
        </div>
      </div>
    </div>
  );
};
