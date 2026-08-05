export type UserRole = 'drafter' | 'approver';

export type PostStatus = 'draft' | 'in_review' | 'approved' | 'scheduled' | 'published' | 'archived';

export type Platform = 'IG' | 'FB' | 'GBP' | 'TikTok' | 'Reels';

export type AspectRatio = '1:1' | '4:5' | '16:9' | '9:16';

export type MediaType = 'image' | 'video' | 'none';

export type FontStyle = 'playful' | 'professional' | 'warm';

export type Category =
  | 'Preventive Care & Wellness'
  | 'Educational'
  | 'Practice & Team'
  | 'Client & Patient Engagement'
  | 'Promotions & Announcements'
  | 'Community & Events'
  | 'Reels / Video-first';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
}

export interface BrandKit {
  practiceId: string;
  clinicName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontStyle: FontStyle;
  toneOfVoice: string;
  services: string[];
  teamMembers: TeamMember[];
  address: string;
  phone: string;
  website: string;
  disclaimerText: string;
  updatedAt?: string;
}

export interface Template {
  id: string;
  category: Category;
  name: string;
  description: string;
  platforms: Platform[];
  aspectRatios: AspectRatio[];
  mediaType: MediaType;
  promptSkeleton: string;
  exampleCaption: string;
  requiresConsent?: boolean;
  requiresQuoteInput?: boolean;
  isStub?: boolean; // For Reels/video coming soon
  imageUrl?: string;
}

export interface PostVariant {
  platform: Platform;
  caption: string;
  hashtags: string[];
  mediaUrl: string;
  aspectRatio: AspectRatio;
  altText?: string;
}

export interface HistoryItem {
  id: string;
  status: PostStatus;
  timestamp: string;
  user: string;
  note?: string;
}

export interface Post {
  id: string;
  practiceId: string;
  templateId: string | null;
  status: PostStatus;
  createdBy: string;
  createdAt: string;
  scheduledDate: string; // ISO date string YYYY-MM-DD
  scheduledTime?: string; // e.g. "10:00 AM"
  variants: Record<string, PostVariant>; // key is Platform e.g. 'IG'
  reviewNotes: string[];
  history: HistoryItem[];
  hasConsent?: boolean;
  topicInputs?: Record<string, string>;
  overlayText?: string;
  hasWatermark?: boolean;
}

export interface MediaAsset {
  id: string;
  postId: string;
  type: 'image' | 'video';
  url: string;
  generatedBy: string;
  prompt: string;
  createdAt: string;
}

export interface CopyGenerationRequest {
  templateName: string;
  category: string;
  topicInputs: Record<string, string>;
  brandKit: BrandKit;
  platforms: Platform[];
  promptSkeleton?: string;
}

export interface CopyVariant {
  type: 'Short' | 'Medium' | 'Playful';
  caption: string;
}

export interface CopyGenerationResponse {
  variants: CopyVariant[];
  hashtags: string[];
  altText: string;
  modelUsed: string;
  substitutedModel?: string;
}

export interface ImageGenerationRequest {
  prompt: string;
  aspectRatio: AspectRatio;
  brandKit: BrandKit;
  tier?: 'standard' | 'hifi' | 'fast';
  headlineText?: string;
  showWatermark?: boolean;
}

export interface ImageGenerationResponse {
  imageUrl: string;
  modelUsed: string;
  substitutedModel?: string;
}

export interface Client {
  id: string;
  practiceId: string;
  name: string;
  phone: string;
  email: string;
  languagePreference: 'SK' | 'HU';
  tags: string[];
  activeWellnessPlan: boolean;
}

export interface Automation {
  id: string;
  practiceId: string;
  triggerEvent: string;
  name: string;
  isActive: boolean;
  actionType: 'sms' | 'email';
  templatePrompt: string;
}

export interface CommunicationsLog {
  id: string;
  practiceId: string;
  clientId: string;
  automationId: string;
  status: 'sent' | 'failed';
  timestamp: string;
  channel: 'sms' | 'email';
  messageContent: string;
}

export type CanvasDocStatus = 'draft' | 'published' | 'archived';

export type CanvasTemplateCategory = 'SOP' | 'Strategy' | 'HR' | 'Client_Handout';

export interface CanvasDocument {
  id: string;
  practiceId: string;
  title: string;
  content: string; // HTML / Markdown blocks
  status: CanvasDocStatus;
  authorId: string;
  authorName?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CanvasTemplate {
  id: string;
  name: string;
  description: string;
  category: CanvasTemplateCategory;
  contentSkeleton: string;
}

