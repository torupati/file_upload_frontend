import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDv0IMyqcV4PaNVmkaGyTm3V-zs7IM7VC4",
  authDomain: "sample-firebase-ai-app-8a682.firebaseapp.com",
  projectId: "sample-firebase-ai-app-8a682",
  storageBucket: "sample-firebase-ai-app-8a682.firebasestorage.app",
  messagingSenderId: "571572509668",
  appId: "1:571572509668:web:7ca2e52c499be36aaec5f1"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
