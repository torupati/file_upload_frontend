import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

function validateFirebaseConfig(config) {
  const missingKeys = Object.entries(config)
    .filter(([, value]) => value === undefined || value === null || value === '')
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing Firebase configuration values for: ${missingKeys.join(
        ', '
      )}. Check your environment variables (VITE_FIREBASE_...).`
    );
  }
}

// Validate Firebase configuration before initialization
validateFirebaseConfig(firebaseConfig);
// Firebase initialization
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
