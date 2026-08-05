import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, Send, Bot, CheckCircle2, User, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  reply: string | null;
}

export const ReviewsView: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [draftingId, setDraftingId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleDraftReply = async (id: string) => {
    setDraftingId(id);
    try {
      const res = await fetch(`/api/reviews/${id}/reply`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setDraftText(prev => ({ ...prev, [id]: data.draft }));
        showToast('AI Odpoveď Vygenerovaná', 'Skontrolujte Fear-Free tón pred odoslaním.');
      }
    } catch (err) {
      console.error(err);
    }
    setDraftingId(null);
  };

  const handleSendReply = async (id: string) => {
    setIsSending(id);
    try {
      const res = await fetch(`/api/reviews/${id}/send-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyText: draftText[id] })
      });
      const data = await res.json();
      if (data.success) {
        setReviews(reviews.map(r => r.id === id ? data.review : r));
        showToast('Odpoveď Publikovaná', 'Vaša reakcia bola odoslaná na Google My Business.');
      }
    } catch (err) {
      console.error(err);
    }
    setIsSending(null);
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-16 bg-[#F5F1EB] rounded-2xl border border-[#E8E1D5]" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-44 bg-[#F5F1EB] rounded-2xl border border-[#E8E1D5]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E8E1D5] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#134027] uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
            Reputačný Modul Google My Business
          </div>
          <h2 className="text-2xl font-bold text-[#2D3748] mt-1">
            Správa Recenzií & Konverzácií
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Sledujte spätú väzbu majiteľov a odpovedajte v upokojujúcom "Fear-Free" tóne.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#F5F1EB] p-2 rounded-xl border border-[#E8E1D5] text-xs font-bold text-[#134027]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>AI Fear-Free Engine Aktívny</span>
        </div>
      </div>

      {/* Modern Chat Thread Style List */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl shadow-xs border border-[#E8E1D5] space-y-6 relative overflow-hidden"
          >
            {/* Header: Author & Rating */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#134027]/10 text-[#134027] font-bold flex items-center justify-center text-sm border border-[#134027]/20">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#2D3748] text-sm">{review.author}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>• {new Date(review.date).toLocaleDateString('sk-SK')}</span>
                  </div>
                </div>
              </div>

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-5 h-5 opacity-80"
              />
            </div>

            {/* Chat Thread Representation */}
            <div className="space-y-4">
              {/* Client Review Bubble (Left) */}
              <div className="flex items-start gap-3 max-w-2xl">
                <div className="p-4 rounded-2xl rounded-tl-xs bg-[#FAF8F5] border border-[#E8E1D5] text-xs text-stone-800 leading-relaxed shadow-2xs">
                  "{review.text}"
                </div>
              </div>

              {/* Published Reply (Right) */}
              {review.reply ? (
                <div className="flex justify-end items-start gap-3">
                  <div className="max-w-2xl p-4 rounded-2xl rounded-tr-xs bg-[#134027]/10 border border-[#134027]/20 text-xs text-[#134027] leading-relaxed shadow-2xs space-y-2">
                    <div className="flex items-center justify-between gap-4 text-[10px] font-bold text-[#134027] uppercase border-b border-[#134027]/10 pb-1.5">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Oficiálna Odpoveď Ambulancie
                      </span>
                      <span className="text-stone-400 font-normal">Publikované na Google</span>
                    </div>
                    <p className="font-medium">{review.reply}</p>
                  </div>
                </div>
              ) : (
                /* Draft Mode / Generate Action */
                <div className="flex justify-end pt-2">
                  {!draftText[review.id] ? (
                    <button
                      onClick={() => handleDraftReply(review.id)}
                      disabled={draftingId === review.id}
                      className="flex items-center gap-2 bg-[#134027] hover:bg-teal-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {draftingId === review.id ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Bot className="w-4 h-4 text-[#D4AF37]" />
                      )}
                      {draftingId === review.id ? 'Generujem Fear-Free odpoveď...' : 'Vygenerovať AI Odpoveď'}
                    </button>
                  ) : (
                    /* Interactive Draft Chat Bubble (Right) */
                    <div className="w-full max-w-2xl p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-950 border-b border-amber-200/60 pb-2">
                        <span className="flex items-center gap-1.5">
                          <Bot className="w-4 h-4 text-[#D4AF37]" />
                          AI Návrh Odpovede (Môžete upraviť pred odoslaním)
                        </span>
                        <span className="text-[10px] text-amber-800 uppercase bg-amber-200/60 px-2 py-0.5 rounded font-extrabold">
                          Fear-Free Tón
                        </span>
                      </div>

                      <textarea
                        value={draftText[review.id]}
                        onChange={e => setDraftText(prev => ({ ...prev, [review.id]: e.target.value }))}
                        className="w-full p-3 bg-white border border-amber-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 leading-relaxed text-stone-800"
                        rows={4}
                      />

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => setDraftText(prev => { const n = { ...prev }; delete n[review.id]; return n; })}
                          className="px-4 py-2 text-xs font-bold text-stone-500 hover:text-stone-800 cursor-pointer"
                        >
                          Zrušiť
                        </button>
                        <button
                          onClick={() => handleSendReply(review.id)}
                          disabled={isSending === review.id}
                          className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {isSending === review.id ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          Schváliť & Odoslať
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
