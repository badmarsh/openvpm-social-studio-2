import React, { useState, useEffect } from 'react';
import {
  Template,
  BrandKit,
  Post,
  Platform,
  AspectRatio,
  CopyVariant,
  UserRole
} from '../types';
import {
  Wand2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Image as ImageIcon,
  Edit3,
  Calendar,
  Info,
  Type,
  Maximize2,
  FileText,
  AlertTriangle,
  Stethoscope,
  Copy,
  Check
} from 'lucide-react';

interface GenerationWizardProps {
  initialTemplate?: Template | null;
  initialTopic?: string;
  brandKit: BrandKit;
  templates: Template[];
  role: UserRole;
  onSavePost: (post: Post) => void;
  onZrušiť: () => void;
}

export const GenerationWizard: React.FC<GenerationWizardProps> = ({
  initialTemplate,
  initialTopic = '',
  brandKit,
  templates,
  role,
  onSavePost,
  onZrušiť
}) => {
  // Wizard Step State (1: Inputs, 2: Copy, 3: Visual, 4: Light Edit, 5: Review & Save)
  const [step, setStep] = useState<number>(1);

  // Selected Template
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(initialTemplate || null);

  // Inputs
  const [topicInput, setTopicInput] = useState<string>(initialTopic);
  const [extraInputs, setExtraInputs] = useState<Record<string, string>>({});
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(
    initialTemplate?.platforms || ['IG', 'FB']
  );
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  // Copy Generation State
  const [isGeneratingCopy, setIsGeneratingCopy] = useState<boolean>(false);
  const [copyVariants, setCopyVariants] = useState<CopyVariant[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [altText, setAltText] = useState<string>('');
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [editedCaption, setEditedCaption] = useState<string>('');
  const [copyModelUsed, setCopyModelUsed] = useState<string>('');
  const [copySubstitutedModel, setCopySubstitutedModel] = useState<string | undefined>();
  const [polishInstruction, setPolishInstruction] = useState<string>('');
  const [isPolishing, setIsPolishing] = useState<boolean>(false);

  // Visual Generation State
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<AspectRatio>('1:1');
  const [generationTier, setGenerationTier] = useState<'standard' | 'hifi' | 'fast'>('standard');
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [imageModelUsed, setImageModelUsed] = useState<string>('');
  const [imageSubstitutedModel, setImageSubstitutedModel] = useState<string | undefined>();

  // Light Edit Pass
  const [headlineText, setHeadlineText] = useState<string>('');
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  // Scheduling State
  const [scheduledDate, setScheduledDate] = useState<string>(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [scheduledTime, setScheduledTime] = useState<string>('10:00 AM');

  // UI status feedback
  const [copiedHashtags, setCopiedHashtags] = useState<boolean>(false);

  // Update selected template inputs
  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate);
      setSelectedPlatforms(initialTemplate.platforms);
      if (initialTemplate.aspectRatios?.[0]) {
        setSelectedAspectRatio(initialTemplate.aspectRatios[0]);
      }
    }
  }, [initialTemplate]);

  // STEP 1 -> STEP 2: Generate Copy
  const handleGenerateCopy = async () => {
    if (selectedTemplate?.requiresConsent && !hasConsent) {
      alert("Please confirm you have the client's consent before generating content.");
      return;
    }

    setIsGeneratingCopy(true);
    setStep(2);

    try {
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateName: selectedTemplate?.name || 'Freeform Clinic Post',
          category: selectedTemplate?.category || 'General',
          topicInputs: {
            topic: topicInput,
            ...extraInputs
          },
          brandKit,
          platforms: selectedPlatforms,
          promptSkeleton: selectedTemplate?.promptSkeleton || ''
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setCopyVariants(data.data.variants || []);
        setHashtags(data.data.hashtags || []);
        setAltText(data.data.altText || '');
        if (data.data.variants?.[0]?.caption) {
          setEditedCaption(data.data.variants[0].caption);
        }
        setCopyModelUsed(data.modelUsed || 'gemini-3.6-flash');
        setCopySubstitutedModel(data.substitutedModel);
      }
    } catch (err) {
      console.error('Generate copy error:', err);
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  // Polish caption with AI
  const handlePolishCaption = async () => {
    if (!polishInstruction.trim()) return;
    setIsPolishing(true);

    try {
      const res = await fetch('/api/refine-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentCaption: editedCaption,
          instructions: polishInstruction,
          brandKit
        })
      });

      const data = await res.json();
      if (data.success && data.refinedCaption) {
        setEditedCaption(data.refinedCaption);
        setPolishInstruction('');
      }
    } catch (err) {
      console.error('Polish caption error:', err);
    } finally {
      setIsPolishing(false);
    }
  };

  // STEP 2 -> STEP 3: Generate Visual
  const handleGenerateVisual = async (targetRatio?: AspectRatio) => {
    const ratioToUse = targetRatio || selectedAspectRatio;
    setIsGeneratingImage(true);
    if (step < 3) setStep(3);

    try {
      const promptToUse = `${selectedTemplate?.promptSkeleton || topicInput || 'Veterinary care & pet wellness'}. Headline: "${headlineText || topicInput || brandKit.clinicName}"`;

      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          aspectRatio: ratioToUse,
          brandKit,
          tier: generationTier,
          headlineText: headlineText || topicInput || brandKit.clinicName,
          showWatermark
        })
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
        setImageModelUsed(data.modelUsed);
        setImageSubstitutedModel(data.substitutedModel);
      }
    } catch (err) {
      console.error('Generate image error:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // SAVE POST ACTION
  const handleSaveFinalPost = (targetStatus: Post['status']) => {
    const newPostId = `post_${Date.now()}`;

    // Create variants map for platforms
    const variants: Record<string, any> = {};
    for (const p of selectedPlatforms) {
      variants[p] = {
        platform: p,
        caption: editedCaption,
        hashtags,
        mediaUrl: generatedImageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
        aspectRatio: selectedAspectRatio,
        altText
      };
    }

    const newPost: Post = {
      id: newPostId,
      practiceId: brandKit.practiceId,
      templateId: selectedTemplate?.id || null,
      status: targetStatus,
      createdBy: role === 'approver' ? 'Practice Manager / Vet' : 'Clinic Staff (Drafter)',
      createdAt: new Date().toISOString(),
      scheduledDate,
      scheduledTime,
      variants,
      hasConsent,
      reviewNotes: [],
      history: [
        {
          id: `hist_${Date.now()}`,
          status: targetStatus,
          timestamp: new Date().toISOString(),
          user: role === 'approver' ? 'Practice Manager' : 'Staff Drafter',
          note: `Post saved with status "${targetStatus}"`
        }
      ],
      overlayText: headlineText,
      hasWatermark: showWatermark
    };

    onSavePost(newPost);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E1D5] shadow-sm overflow-hidden pb-8">
      {/* Stepper Header */}
      <div className="bg-[#F5F1EB] border-b border-[#E8E1D5] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-[#3D8D95]" />
            <h2 className="text-base font-bold text-[#2D3748]">
              AI Content Studio Wizard
            </h2>
          </div>
          <button
            onClick={onZrušiť}
            className="text-xs font-semibold text-gray-500 hover:text-stone-800 cursor-pointer"
          >
            Zrušiť & Exit
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mt-4 grid grid-cols-5 gap-2">
          {[
            { num: 1, label: '1. Setup' },
            { num: 2, label: '2. AI Copy' },
            { num: 3, label: '3. Visual' },
            { num: 4, label: '4. Edit' },
            { num: 5, label: '5. Review' }
          ].map(s => (
            <div
              key={s.num}
              onClick={() => {
                if (s.num < step) setStep(s.num);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer relative ${
                step >= s.num ? 'bg-[#3D8D95]' : 'bg-[#E8E1D5]'
              }`}
              title={s.label}
            >
              <span
                className={`hidden md:inline absolute top-3 left-0 text-[10px] font-bold ${
                  step === s.num ? 'text-[#3D8D95]' : 'text-gray-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: TEMPLATE & INPUTS */}
      {step === 1 && (
        <div className="p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#2D3748]">Step 1: Choose Template & Details</h3>
            <p className="text-xs text-gray-500">
              Select a pre-designed veterinary template or start freeform.
            </p>
          </div>

          {/* Template Selector Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2D3748]">Template Selection</label>
            <select
              value={selectedTemplate?.id || 'freeform'}
              onChange={e => {
                const val = e.target.value;
                if (val === 'freeform') {
                  setSelectedTemplate(null);
                } else {
                  const tpl = templates.find(t => t.id === val);
                  if (tpl) {
                    setSelectedTemplate(tpl);
                    setSelectedPlatforms(tpl.platforms);
                  }
                }
              }}
              className="w-full p-3 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:bg-white"
            >
              <option value="freeform">✨ Freeform (No Template - Custom Prompt)</option>
              {templates
                .filter(t => !t.isStub)
                .map(t => (
                  <option key={t.id} value={t.id}>
                    [{t.category}] {t.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Topic / Context Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2D3748]">
              {selectedTemplate?.name ? `Topic for "${selectedTemplate.name}"` : 'Topic or Key Message'}
            </label>
            <input
              type="text"
              placeholder="e.g. Flea & Tick Prevention, Senior Pet Wellness, Dr. Lin's 5th Anniversary"
              value={topicInput}
              onChange={e => setTopicInput(e.target.value)}
              className="w-full p-3 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>

          {/* Additional Template Specific Inputs */}
          {selectedTemplate?.requiresQuoteInput && (
            <div className="space-y-2 bg-blue-50/70 p-4 rounded-xl border border-blue-200">
              <label className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Paste Real Client Testimonial / Review (Guardrail: Never invent a quote!)
              </label>
              <textarea
                rows={3}
                placeholder="Paste the exact testimonial provided by the client..."
                value={extraInputs.pastedQuote || ''}
                onChange={e => setExtraInputs({ ...extraInputs, pastedQuote: e.target.value })}
                className="w-full p-3 bg-white border border-blue-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Required Consent Checkbox Guardrail */}
          {selectedTemplate?.requiresConsent && (
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Vyžaduje sa súhlas klienta</h4>
                  <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5">
                    This post features a client's pet or personal story. Practice guardrails require explicit client consent before releasing or scheduling.
                  </p>
                </div>
              </div>
              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasConsent}
                  onChange={e => setHasConsent(e.target.checked)}
                  className="w-4 h-4 text-[#3D8D95] rounded border-[#E8E1D5] focus:ring-teal-500"
                />
                <span className="text-xs font-bold text-amber-950">
                  I confirm we have the client's consent to use this photo/story
                </span>
              </label>
            </div>
          )}

          {/* Platform Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2D3748]">Cieľové platformy</label>
            <div className="flex items-center gap-3">
              {(['IG', 'FB', 'GBP'] as Platform[]).map(p => {
                const isSelected = selectedPlatforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        if (selectedPlatforms.length > 1) {
                          setSelectedPlatforms(selectedPlatforms.filter(x => x !== p));
                        }
                      } else {
                        setSelectedPlatforms([...selectedPlatforms, p]);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#3D8D95] text-white border-teal-800 shadow-sm'
                        : 'bg-[#FAF8F5] text-gray-500 border-[#E8E1D5] hover:bg-[#E8E1D5]'
                    }`}
                  >
                    {p === 'IG' ? 'Instagram' : p === 'FB' ? 'Facebook' : 'Google Business'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Brand Kit Preview Bar */}
          <div className="bg-[#F5F1EB] p-4 rounded-xl border border-[#E8E1D5] space-y-2">
            <h4 className="text-xs font-bold text-[#2D3748] flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-[#3D8D95]" />
              Applied Brand Voice & Guardrails
            </h4>
            <div className="text-[11px] text-gray-500 space-y-1">
              <p>
                <strong>Tone:</strong> {brandKit.toneOfVoice}
              </p>
              <p>
                <strong>Disclaimer Attached:</strong> "{brandKit.disclaimerText}"
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end">
            <button
              onClick={handleGenerateCopy}
              className="bg-[#3D8D95] hover:bg-[#347A81] text-white font-bold px-6 py-3 rounded-xl shadow-sm text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-amber-300" />
              Generate Copy & Značky (Hashtags) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AI COPY GENERATION */}
      {step === 2 && (
        <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#F5F1EB] pb-3">
            <div>
              <h3 className="text-lg font-bold text-[#2D3748]">Step 2: AI Caption Variants & Značky (Hashtags)</h3>
              <p className="text-xs text-gray-500">
                Generated with clinical guardrails (Gemini Model: {copyModelUsed}). Select or edit your favorite.
              </p>
            </div>
            {copySubstitutedModel && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-200">
                Fallback Active: {copySubstitutedModel}
              </span>
            )}
          </div>

          {isGeneratingCopy ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#3D8D95] animate-spin mx-auto" />
              <p className="text-sm font-bold text-[#2D3748]">Writing Compliant Captions...</p>
              <p className="text-xs text-gray-400">Enforcing 7th-grade reading level and veterinary guardrails.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 3 Variants Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {copyVariants.map((v, idx) => {
                  const isSelected = selectedVariantIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedVariantIndex(idx);
                        setEditedCaption(v.caption);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-[#F0F7F7] border-[#3D8D95] ring-2 ring-[#3D8D95] shadow-sm'
                          : 'bg-white border-[#E8E1D5] hover:border-[#E8E1D5]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              v.type === 'Short'
                                ? 'bg-amber-100 text-amber-800'
                                : v.type === 'Medium'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {v.type} Variant
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#3D8D95]" />}
                        </div>
                        <p className="text-xs text-[#2D3748] leading-relaxed font-normal">
                          {v.caption}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">
                        {v.caption.length} characters
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Editable Selected Caption Box */}
              <div className="bg-[#F5F1EB] p-4 rounded-2xl border border-[#E8E1D5] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#2D3748] flex items-center gap-1.5">
                    <Edit3 className="w-4 h-4 text-[#3D8D95]" />
                    Edit Selected Caption
                  </label>
                  <span className="text-[11px] text-gray-400">
                    Drafting as: {role === 'approver' ? 'Approver' : 'Staff Drafter'}
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={editedCaption}
                  onChange={e => setEditedCaption(e.target.value)}
                  className="w-full p-3 bg-white border border-[#E8E1D5] rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500"
                />

                {/* Polish with AI Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Ask AI to refine (e.g. 'Make it slightly warmer', 'Emphasize call to book')"
                    value={polishInstruction}
                    onChange={e => setPolishInstruction(e.target.value)}
                    className="flex-1 p-2 bg-white border border-[#E8E1D5] rounded-xl text-xs"
                  />
                  <button
                    onClick={handlePolishCaption}
                    disabled={isPolishing || !polishInstruction.trim()}
                    className="bg-stone-800 hover:bg-stone-900 disabled:opacity-50 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    {isPolishing ? 'Polishing...' : 'Polish AI'}
                  </button>
                </div>
              </div>

              {/* Hashtag Set & Alternatívny text */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#E8E1D5] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2D3748]">Hashtag Set ({hashtags.length})</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(hashtags.join(' '));
                        setCopiedHashtags(true);
                        setTimeout(() => setCopiedHashtags(false), 2000);
                      }}
                      className="text-[11px] font-bold text-[#3D8D95] hover:text-[#347A81] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedHashtags ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedHashtags ? 'Skopírované!' : 'Copy Tags'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {hashtags.map((tag, i) => (
                      <span key={i} className="bg-[#FAF8F5] text-[#2D3748] text-[11px] font-semibold px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#E8E1D5] space-y-2">
                  <span className="text-xs font-bold text-[#2D3748]">Accessibility Alternatívny text</span>
                  <p className="text-xs text-gray-500 leading-relaxed bg-[#F5F1EB] p-2.5 rounded-lg border border-[#F5F1EB]">
                    {altText || 'A warm veterinary scene depicting healthy pets.'}
                  </p>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-[#F5F1EB]">
                <button
                  onClick={() => setStep(1)}
                  className="bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[#2D3748] font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Späť to Inputs
                </button>

                <button
                  onClick={() => handleGenerateVisual()}
                  className="bg-[#3D8D95] hover:bg-[#347A81] text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <ImageIcon className="w-4 h-4 text-amber-300" />
                  Proceed to Visual Generation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: VISUAL GENERATION */}
      {step === 3 && (
        <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#F5F1EB] pb-3">
            <div>
              <h3 className="text-lg font-bold text-[#2D3748]">Step 3: Generate Branded Visual</h3>
              <p className="text-xs text-gray-500">
                Generate high-impact image visuals tailored to social aspect ratios.
              </p>
            </div>
            {imageModelUsed && (
              <span className="bg-teal-100 text-[#3D8D95] text-[10px] font-bold px-2.5 py-1 rounded-md border border-teal-200">
                Model: {imageModelUsed}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pomer strán & Model Tier Controls */}
            <div className="space-y-4 md:col-span-1">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2D3748]">Pomer strán</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { ratio: '1:1', label: '1:1 Square (IG/FB)' },
                    { ratio: '4:5', label: '4:5 Portrait (IG Feed)' },
                    { ratio: '16:9', label: '16:9 Landscape (FB/GBP)' },
                    { ratio: '9:16', label: '9:16 Story/Reels' }
                  ].map(item => (
                    <button
                      key={item.ratio}
                      onClick={() => {
                        setSelectedAspectRatio(item.ratio as AspectRatio);
                        handleGenerateVisual(item.ratio as AspectRatio);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                        selectedAspectRatio === item.ratio
                          ? 'bg-[#3D8D95] text-white border-teal-800 shadow-sm'
                          : 'bg-[#F5F1EB] text-[#2D3748] border-[#E8E1D5] hover:bg-[#E8E1D5]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2D3748]">Model Tier</label>
                <div className="space-y-1.5">
                  {[
                    { id: 'standard', name: 'Standard (gemini-3.1-flash-image)' },
                    { id: 'hifi', name: 'Hi-Fi Text Graphics (gemini-3-pro-image)' },
                    { id: 'fast', name: 'Fast Preview (gemini-3.1-flash-lite)' }
                  ].map(t => (
                    <label key={t.id} className="flex items-center gap-2 cursor-pointer text-xs text-[#2D3748]">
                      <input
                        type="radio"
                        name="tier"
                        value={t.id}
                        checked={generationTier === t.id}
                        onChange={() => setGenerationTier(t.id as any)}
                        className="text-[#3D8D95] focus:ring-teal-500"
                      />
                      {t.name}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleGenerateVisual()}
                disabled={isGeneratingImage}
                className="w-full bg-stone-800 hover:bg-stone-900 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingImage ? 'animate-spin' : ''}`} />
                Regenerate Visual
              </button>
            </div>

            {/* Generated Image Display */}
            <div className="md:col-span-2 space-y-3">
              <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E1D5] overflow-hidden min-h-[320px] flex items-center justify-center relative shadow-inner">
                {isGeneratingImage ? (
                  <div className="text-center p-8 space-y-3">
                    <RefreshCw className="w-8 h-8 text-[#3D8D95] animate-spin mx-auto" />
                    <p className="text-sm font-bold text-[#2D3748]">Rendering Branded Visual...</p>
                  </div>
                ) : generatedImageUrl ? (
                  <img
                    src={generatedImageUrl}
                    alt="Generated post visual"
                    className="w-full h-auto max-h-[420px] object-contain mx-auto"
                  />
                ) : (
                  <p className="text-xs text-gray-400">Click Generate to create visual</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#F5F1EB]">
            <button
              onClick={() => setStep(2)}
              className="bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[#2D3748] font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Späť to Copy
            </button>

            <button
              onClick={() => setStep(4)}
              className="bg-[#3D8D95] hover:bg-[#347A81] text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Edit3 className="w-4 h-4 text-amber-300" />
              Light Edit Pass <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: LIGHT EDIT PASS */}
      {step === 4 && (
        <div className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-[#F5F1EB] pb-3">
            <h3 className="text-lg font-bold text-[#2D3748]">Step 4: Light Edit Pass</h3>
            <p className="text-xs text-gray-500">
              Customize text overlays, brand watermark, and fine-tune aesthetics without re-generating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Controls */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2D3748] flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-[#3D8D95]" />
                  Overlay Headline Text
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spring Care Notice 🐾"
                  value={headlineText}
                  onChange={e => setHeadlineText(e.target.value)}
                  className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-medium"
                />
              </div>

              <div className="flex items-center justify-between bg-[#F5F1EB] p-3 rounded-xl border border-[#E8E1D5]">
                <span className="text-xs font-bold text-[#2D3748]">Show Clinic Watermark Badge</span>
                <input
                  type="checkbox"
                  checked={showWatermark}
                  onChange={e => setShowWatermark(e.target.checked)}
                  className="w-4 h-4 text-[#3D8D95] rounded border-[#E8E1D5] focus:ring-teal-500 cursor-pointer"
                />
              </div>

              <button
                onClick={() => handleGenerateVisual()}
                className="w-full bg-[#3D8D95] hover:bg-[#347A81] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Apply Canvas Overlay Changes
              </button>
            </div>

            {/* Visual Canvas Preview */}
            <div className="bg-[#FAF8F5] p-2 rounded-2xl border border-[#E8E1D5] overflow-hidden shadow-sm flex items-center justify-center">
              <img
                src={generatedImageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'}
                alt="Canvas Preview"
                className="w-full h-auto max-h-[360px] object-contain rounded-xl"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-[#F5F1EB]">
            <button
              onClick={() => setStep(3)}
              className="bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[#2D3748] font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Späť to Visuals
            </button>

            <button
              onClick={() => setStep(5)}
              className="bg-[#3D8D95] hover:bg-[#347A81] text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              Final Review & Schedule <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: FINAL REVIEW & SAVE */}
      {step === 5 && (
        <div className="p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
          <div className="border-b border-[#F5F1EB] pb-3">
            <h3 className="text-lg font-bold text-[#2D3748]">Step 5: Schedule & Save Post</h3>
            <p className="text-xs text-gray-500">
              Set the publication date and submit as draft or schedule for posting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2D3748]">Scheduled Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={e => setScheduledDate(e.target.value)}
                className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2D3748]">Scheduled Time</label>
              <input
                type="text"
                value={scheduledTime}
                onChange={e => setScheduledTime(e.target.value)}
                className="w-full p-2.5 bg-[#F5F1EB] border border-[#E8E1D5] rounded-xl text-xs font-semibold"
                placeholder="10:00 AM"
              />
            </div>
          </div>

          {/* Final Summary Card */}
          <div className="bg-[#F5F1EB] p-4 rounded-2xl border border-[#E8E1D5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2D3748]">Post Summary Preview</span>
              <span className="text-[11px] font-bold text-[#3D8D95] bg-teal-100 px-2.5 py-0.5 rounded-full">
                {selectedPlatforms.join(' • ')}
              </span>
            </div>

            <p className="text-xs text-[#2D3748] italic bg-white p-3 rounded-xl border border-[#E8E1D5]">
              "{editedCaption}"
            </p>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <Info className="w-3.5 h-3.5 text-[#3D8D95]" />
              Disclaimer will automatically render on health tips for clinic compliance.
            </div>
          </div>

          {/* Save Action Buttons Based on Role */}
          <div className="pt-4 flex items-center justify-between border-t border-[#F5F1EB]">
            <button
              onClick={() => setStep(4)}
              className="bg-[#FAF8F5] hover:bg-[#E8E1D5] text-[#2D3748] font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Späť to Edit
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSaveFinalPost('draft')}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer shadow-sm"
              >
                Save as Draft
              </button>

              {role === 'drafter' ? (
                <button
                  onClick={() => handleSaveFinalPost('in_review')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer shadow-sm"
                >
                  Submit for Review
                </button>
              ) : (
                <button
                  onClick={() => handleSaveFinalPost('scheduled')}
                  className="bg-[#3D8D95] hover:bg-[#347A81] text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  Approve & Schedule
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
