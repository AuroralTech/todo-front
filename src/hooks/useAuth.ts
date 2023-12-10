'use client';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect, useCallback } from 'react';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const useAuth = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          setToken(idToken);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setToken(''); // ログアウト時にトークンをクリア
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  }, [auth]);

  return { auth, token, logout };
};
