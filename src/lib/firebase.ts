import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

try {
  const config = (firebaseConfig || {}) as Record<string, any>;
  const envApiKey = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) || '';
  const envProjectId = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_PROJECT_ID) || '';
  const envDbId = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_DATABASE_ID) || '';

  const activeApiKey = (envApiKey || config.apiKey || '').trim();
  const activeProjectId = (envProjectId || config.projectId || '').trim();
  const activeDbId = (envDbId || config.firestoreDatabaseId || '').trim();

  const hasValidApiKey =
    typeof activeApiKey === 'string' &&
    activeApiKey.length > 5 &&
    !activeApiKey.includes('YOUR_') &&
    typeof activeProjectId === 'string' &&
    activeProjectId.length > 0;

  if (hasValidApiKey) {
    const activeConfig = {
      ...config,
      apiKey: activeApiKey,
      projectId: activeProjectId,
      firestoreDatabaseId: activeDbId,
    };
    app = getApps().length === 0 ? initializeApp(activeConfig) : getApp();
    db =
      activeConfig.firestoreDatabaseId && activeConfig.firestoreDatabaseId !== '(default)'
        ? getFirestore(app, activeConfig.firestoreDatabaseId)
        : getFirestore(app);
  } else {
    console.info('[Firebase] Running in secure offline/localStorage mode without hardcoded API keys.');
  }
} catch (err) {
  console.warn('[Firebase Safe Fallback] Initialization caught:', err);
  app = null;
  db = null;
}

export { db, collection, doc, setDoc, addDoc, getDocs, onSnapshot, query, orderBy, limit, serverTimestamp };

