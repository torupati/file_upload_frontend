import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { setupAuth } from './auth.js';
import { setupUpload } from './upload.js';

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyDv0IMyqcV4PaNVmkaGyTm3V-zs7IM7VC4",
  authDomain: "sample-firebase-ai-app-8a682.firebaseapp.com",
  projectId: "sample-firebase-ai-app-8a682",
  storageBucket: "sample-firebase-ai-app-8a682.firebasestorage.app",
  messagingSenderId: "571572509668",
  appId: "1:571572509668:web:7ca2e52c499be36aaec5f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);

// DOM要素
const authSection = document.getElementById('authSection');
const uploadSection = document.getElementById('uploadSection');
const userInfo = document.getElementById('userInfo');
const loginSection = document.getElementById('loginSection');
const userEmail = document.getElementById('userEmail');

// 認証状態の監視
onAuthStateChanged(auth, (user) => {
    if (user) {
        // ログイン済み
        userEmail.textContent = user.email;
        userInfo.classList.remove('hidden');
        loginSection.classList.add('hidden');
        uploadSection.classList.add('active');
    } else {
        // 未ログイン
        userInfo.classList.add('hidden');
        loginSection.classList.remove('hidden');
        uploadSection.classList.remove('active');
    }
});

// 認証とアップロード機能のセットアップ
setupAuth(auth);
setupUpload(storage, auth);

console.log('Firebase Upload Interface initialized');
