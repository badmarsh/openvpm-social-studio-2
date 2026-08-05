import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { BrandKit, Template, Post, MediaAsset } from '../types';
import { DEFAULT_PRACTICE_ID, DEFAULT_BRAND_KIT, SEED_TEMPLATES, INITIAL_DEMO_POSTS } from './seedData';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore with custom databaseId if configured
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Local storage backup keys for offline resilience
const STORAGE_BRAND = 'openvpm_brand_kit';
const STORAGE_TEMPLATES = 'openvpm_templates';
const STORAGE_POSTS = 'openvpm_posts';

// Helper to handle local cache fallback seamlessly
function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

// -------------------------------------------------------------
// BRAND KIT CRUD
// -------------------------------------------------------------
export async function fetchBrandKit(practiceId: string = DEFAULT_PRACTICE_ID): Promise<BrandKit> {
  try {
    const ref = doc(db, 'brandKits', practiceId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data() as BrandKit;
      setLocal(STORAGE_BRAND, data);
      return data;
    } else {
      // Seed initial brand kit
      await setDoc(ref, DEFAULT_BRAND_KIT);
      setLocal(STORAGE_BRAND, DEFAULT_BRAND_KIT);
      return DEFAULT_BRAND_KIT;
    }
  } catch (err) {
    console.warn('Firestore fetchBrandKit failed, using cached/default:', err);
    return getLocal(STORAGE_BRAND, DEFAULT_BRAND_KIT);
  }
}

export async function saveBrandKit(brandKit: BrandKit): Promise<void> {
  setLocal(STORAGE_BRAND, brandKit);
  try {
    const ref = doc(db, 'brandKits', brandKit.practiceId || DEFAULT_PRACTICE_ID);
    await setDoc(ref, {
      ...brandKit,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Firestore saveBrandKit failed, saved locally:', err);
  }
}

// -------------------------------------------------------------
// TEMPLATES CRUD
// -------------------------------------------------------------
export async function fetchTemplates(): Promise<Template[]> {
  try {
    const ref = collection(db, 'templates');
    const snap = await getDocs(ref);
    if (!snap.empty) {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Template));
      setLocal(STORAGE_TEMPLATES, items);
      return items;
    } else {
      // Seed templates to Firestore
      for (const tpl of SEED_TEMPLATES) {
        await setDoc(doc(db, 'templates', tpl.id), tpl);
      }
      setLocal(STORAGE_TEMPLATES, SEED_TEMPLATES);
      return SEED_TEMPLATES;
    }
  } catch (err) {
    console.warn('Firestore fetchTemplates failed, using cached/seed:', err);
    return getLocal(STORAGE_TEMPLATES, SEED_TEMPLATES);
  }
}

// -------------------------------------------------------------
// POSTS CRUD
// -------------------------------------------------------------
export async function fetchPosts(practiceId: string = DEFAULT_PRACTICE_ID): Promise<Post[]> {
  try {
    const q = query(collection(db, 'posts'), where('practiceId', '==', practiceId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as Post));
      setLocal(STORAGE_POSTS, items);
      return items;
    } else {
      // Seed initial demo posts
      for (const post of INITIAL_DEMO_POSTS) {
        await setDoc(doc(db, 'posts', post.id), post);
      }
      setLocal(STORAGE_POSTS, INITIAL_DEMO_POSTS);
      return INITIAL_DEMO_POSTS;
    }
  } catch (err) {
    console.warn('Firestore fetchPosts failed, using cached/seed:', err);
    return getLocal(STORAGE_POSTS, INITIAL_DEMO_POSTS);
  }
}

export async function savePost(post: Post): Promise<void> {
  const current = getLocal<Post[]>(STORAGE_POSTS, INITIAL_DEMO_POSTS);
  const idx = current.findIndex(p => p.id === post.id);
  let updatedList: Post[];
  if (idx >= 0) {
    updatedList = [...current];
    updatedList[idx] = post;
  } else {
    updatedList = [post, ...current];
  }
  setLocal(STORAGE_POSTS, updatedList);

  try {
    const ref = doc(db, 'posts', post.id);
    await setDoc(ref, post);
  } catch (err) {
    console.warn('Firestore savePost failed, saved locally:', err);
  }
}

export async function updatePostStatus(
  postId: string,
  newStatus: Post['status'],
  user: string,
  note?: string
): Promise<Post | null> {
  const current = getLocal<Post[]>(STORAGE_POSTS, INITIAL_DEMO_POSTS);
  const target = current.find(p => p.id === postId);
  if (!target) return null;

  const historyItem = {
    id: `hist_${Date.now()}`,
    status: newStatus,
    timestamp: new Date().toISOString(),
    user,
    note
  };

  const updated: Post = {
    ...target,
    status: newStatus,
    history: [...(target.history || []), historyItem],
    reviewNotes: note ? [...(target.reviewNotes || []), note] : target.reviewNotes
  };

  await savePost(updated);
  return updated;
}

export async function deletePost(postId: string): Promise<void> {
  const current = getLocal<Post[]>(STORAGE_POSTS, INITIAL_DEMO_POSTS);
  const updated = current.filter(p => p.id !== postId);
  setLocal(STORAGE_POSTS, updated);

  try {
    await deleteDoc(doc(db, 'posts', postId));
  } catch (err) {
    console.warn('Firestore deletePost failed, deleted locally:', err);
  }
}

// -------------------------------------------------------------
// MEDIA ASSETS
// -------------------------------------------------------------
export async function saveMediaAsset(asset: MediaAsset): Promise<void> {
  try {
    await setDoc(doc(db, 'mediaAssets', asset.id), asset);
  } catch (e) {
    console.warn('Firestore saveMediaAsset failed:', e);
  }
}
