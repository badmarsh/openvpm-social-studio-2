import React, { useState, useEffect, useCallback } from 'react';
import { CanvasDocument, CanvasTemplate, BrandKit, UserRole } from '../types';
import { 
  FileText, Sparkles, Download, CheckCircle2, Tag, BookOpen, 
  Plus, Trash2, Languages, ShieldCheck, Save, Edit3, AlignLeft, Bold, Italic
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { MermaidExtension } from '../extensions/MermaidExtension';
import { parseHTML } from 'marked';

interface AICanvasViewProps {
  brandKit: BrandKit;
  role: UserRole;
}

export const AICanvasView: React.FC<AICanvasViewProps> = ({ brandKit, role }) => {
  const [documents, setDocuments] = useState<CanvasDocument[]>([]);
  const [templates, setTemplates] = useState<CanvasTemplate[]>([]);
  const [activeDoc, setActiveDoc] = useState<CanvasDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [useBrandContext, setUseBrandContext] = useState(true);
  
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');

  const { showToast } = useToast();

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color, MermaidExtension],
    content: '',
    onUpdate: ({ editor }) => {
      // update content handled on save for now
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[500px] text-stone-800'
      }
    }
  });

  useEffect(() => {
    fetch('/api/canvas/documents')
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
        if (data.length > 0) {
          selectDoc(data[0]);
        }
        setLoading(false);
      });
      
    fetch('/api/canvas/templates')
      .then(res => res.json())
      .then(data => setTemplates(data));
  }, []);

  const selectDoc = (doc: CanvasDocument) => {
    setActiveDoc(doc);
    setTitle(doc.title);
    setTags(doc.tags);
    setStatus(doc.status);
    if (editor) {
      editor.commands.setContent(doc.content);
    }
  };

  const handleCreateNewDoc = (content = '', name = 'Nový Dokument') => {
    const newDoc: Partial<CanvasDocument> = {
      title: name,
      content: content,
      status: 'draft',
      authorId: 'u1',
      tags: []
    };
    fetch('/api/canvas/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoc)
    })
      .then(res => res.json())
      .then(saved => {
        setDocuments([saved, ...documents]);
        selectDoc(saved);
        setShowTemplateModal(false);
        showToast('Dokument vytvorený', 'Môžete začať upravovať.');
      });
  };

  const handleSaveDoc = () => {
    if (!activeDoc || !editor) return;
    setSaving(true);
    
    const updated = {
      ...activeDoc,
      title,
      tags,
      status,
      content: editor.getHTML()
    };

    fetch('/api/canvas/documents/' + activeDoc.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
      .then(res => res.json())
      .then(saved => {
        setDocuments(documents.map(d => d.id === saved.id ? saved : d));
        setActiveDoc(saved);
        showToast('Dokument uložený', 'Zmeny boli úspešne uložené.');
      })
      .finally(() => setSaving(false));
  };

  const handleDeleteDoc = (id: string) => {
    if (!confirm('Naozaj vymazať?')) return;
    fetch('/api/canvas/documents/' + id, { method: 'DELETE' })
      .then(() => {
        setDocuments(documents.filter(d => d.id !== id));
        if (activeDoc?.id === id) {
          if (documents.length > 1) {
            selectDoc(documents.find(d => d.id !== id)!);
          } else {
            setActiveDoc(null);
            if (editor) editor.commands.setContent('');
          }
        }
        showToast('Vymazané', 'Dokument bol vymazaný.');
      });
  };

  const handleAIAction = async (actionType: string) => {
    if (!editor) return;
    const selection = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to, ' ');
    if (!selectedText && actionType !== 'generate') {
      showToast('Chyba', 'Najprv označte text pre AI úpravu.');
      return;
    }

    setAiLoading(true);
    try {
      const res = await fetch('/api/canvas/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          actionType,
          selectedText,
          brandKit,
          useBrandContext
        })
      });
      const data = await res.json();
      if (data.success) {
        editor.chain().focus().insertContent(data.content).run();
        showToast('AI Úprava dokončená', 'Text bol aktualizovaný.');
      } else {
        showToast('Chyba', 'AI operácia zlyhala.');
      }
    } catch (e) {
      showToast('Chyba', 'Nepodarilo sa spojiť so serverom.');
    } finally {
      setAiLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const removeTag = (t: string) => setTags(tags.filter(x => x !== t));

  if (loading) {
    return <div className="p-8 text-center">Načítavam dokumenty...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#134027] tracking-tight">AI Canvas</h2>
          <p className="text-sm text-stone-500 font-medium mt-1">Smart Word Procesor pre Klinické Dokumenty</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowTemplateModal(true)} className="bg-[#134027] hover:bg-teal-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-xs">
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            Nový Dokument
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Document List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-xs">
            <div className="p-4 bg-[#FAF8F5] border-b border-[#E8E1D5]">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#2D3748]">Nedávne Dokumenty</h3>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {documents.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-500">Žiadne dokumenty</div>
              ) : (
                documents.map(doc => (
                  <div 
                    key={doc.id}
                    onClick={() => selectDoc(doc)}
                    className={`p-4 border-b border-[#E8E1D5] hover:bg-[#FAF8F5] cursor-pointer transition-colors ${activeDoc?.id === doc.id ? 'bg-[#FAF8F5] border-l-4 border-l-[#134027]' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <FileText className={`w-4 h-4 mt-0.5 ${activeDoc?.id === doc.id ? 'text-[#134027]' : 'text-stone-400'}`} />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-[#2D3748] truncate">{doc.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${doc.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            {doc.status}
                          </span>
                          <span className="text-[10px] text-stone-400 truncate">
                            {new Date(doc.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Center: Editor */}
        <div className="lg:col-span-6 space-y-4">
          {activeDoc ? (
            <div className="bg-white rounded-2xl border border-[#E8E1D5] shadow-xs flex flex-col h-[800px]">
              
              {/* Toolbar */}
              <div className="p-2 border-b border-[#E8E1D5] bg-[#FAF8F5] flex items-center justify-between gap-2 overflow-x-auto">
                <div className="flex items-center gap-1">
                  <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-stone-200 cursor-pointer ${editor?.isActive('bold') ? 'bg-stone-200' : ''}`}><Bold className="w-4 h-4 text-stone-700" /></button>
                  <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-stone-200 cursor-pointer ${editor?.isActive('italic') ? 'bg-stone-200' : ''}`}><Italic className="w-4 h-4 text-stone-700" /></button>
                </div>
                
                <div className="flex items-center gap-2 border-l border-stone-300 pl-2">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-2">AI Akcie</span>
                  <button onClick={() => handleAIAction('improve')} disabled={aiLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50">
                    <Sparkles className="w-3.5 h-3.5" /> Vylepšiť
                  </button>
                  <button onClick={() => handleAIAction('fear_free')} disabled={aiLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50">
                    <ShieldCheck className="w-3.5 h-3.5" /> Fear-Free
                  </button>
                  <button onClick={() => handleAIAction('summarize')} disabled={aiLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50">
                    <AlignLeft className="w-3.5 h-3.5" /> Skrátiť
                  </button>
                  <button onClick={() => handleAIAction('translate_hu')} disabled={aiLoading} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50">
                    <Languages className="w-3.5 h-3.5" /> Preložiť (HU)
                  </button>
                </div>
              </div>

              {/* Editor Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <input 
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="text-3xl font-extrabold text-stone-800 mb-6 w-full border-none focus:ring-0 p-0 bg-transparent"
                  placeholder="Názov dokumentu"
                />
                {aiLoading && <div className="text-xs text-[#134027] font-bold animate-pulse mb-4">✨ AI spracováva text...</div>}
                <EditorContent editor={editor} />
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between p-4 border-t border-[#E8E1D5] bg-[#FAF8F5]">
                <button onClick={() => handleDeleteDoc(activeDoc.id)} className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer">
                  <Trash2 className="w-4 h-4" /> Vymazať
                </button>
                <div className="flex items-center gap-4">
                  <select 
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="bg-white border border-stone-200 text-xs rounded-lg px-3 py-2"
                  >
                    <option value="draft">Koncept</option>
                    <option value="published">Publikované</option>
                  </select>
                  <button onClick={handleSaveDoc} disabled={saving} className="flex items-center gap-2 bg-[#134027] hover:bg-teal-900 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer">
                    <Save className="w-4 h-4 text-[#D4AF37]" />
                    {saving ? 'Ukladám...' : 'Uložiť zmeny'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-[#E8E1D5] text-center text-stone-500 space-y-3">
              <FileText className="w-12 h-12 text-[#134027] mx-auto opacity-40" />
              <h3 className="font-bold text-[#2D3748]">Vyberte alebo vytvorte dokument</h3>
            </div>
          )}
        </div>

        {/* Right Sidebar: Context & Metadata */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-[#2D3748] uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[#134027]" /> Metadata & Značky
            </h3>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span key={t} className="bg-[#F5F1EB] text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#E8E1D5] flex items-center gap-1">
                    #{t}
                    <button onClick={() => removeTag(t)} className="text-stone-400 hover:text-rose-600 font-bold">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1 pt-1">
                <input type="text" placeholder="Pridať značku..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addTag(); }} className="flex-1 p-1.5 bg-[#FAF8F5] border border-[#E8E1D5] rounded-lg text-xs" />
                <button onClick={addTag} className="bg-[#134027] text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-teal-900 cursor-pointer">+</button>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#E8E1D5] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2D3748] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#134027]" />
                Brand Context AI
              </span>
              <input type="checkbox" checked={useBrandContext} onChange={e => setUseBrandContext(e.target.checked)} className="w-4 h-4 text-emerald-800 rounded border-gray-300 focus:ring-emerald-700 cursor-pointer" />
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              AI automaticky do predpisu zakomponuje názov ambulancie a garanciu "Fear-Free" tónu.
            </p>
            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E1D5] text-[11px] space-y-1 text-stone-700">
              <div className="font-bold text-[#2D3748]">{brandKit.clinicName}</div>
              <div className="text-stone-500">Tón: {brandKit.toneOfVoice}</div>
            </div>
          </div>
        </div>
      </div>

      {showTemplateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-[#E8E1D5] shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E1D5]">
              <div>
                <h3 className="text-xl font-bold text-[#2D3748] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#134027]" />
                  Knižnica Predpisových Šablón
                </h3>
              </div>
              <button onClick={() => setShowTemplateModal(false)} className="text-stone-400 hover:text-stone-700 font-bold text-lg cursor-pointer">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map(tpl => (
                <div key={tpl.id} onClick={() => handleCreateNewDoc(tpl.contentSkeleton, tpl.name)} className="p-4 bg-[#FAF8F5] hover:bg-[#134027]/10 border border-[#E8E1D5] hover:border-[#134027] rounded-2xl cursor-pointer transition-all space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 uppercase">{tpl.category}</span>
                  <h4 className="font-bold text-[#2D3748] text-sm">{tpl.name}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{tpl.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setShowTemplateModal(false)} className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-[#2D3748] rounded-xl text-xs font-bold cursor-pointer">Zatvoriť</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
