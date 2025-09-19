// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "studio-3078109361-62573",
  "appId": "1:621977729749:web:4fcf4da863e69d07e0c05c",
  "storageBucket": "studio-3078109361-62573.appspot.com",
  "apiKey": "AIzaSyAo29P_9exM3S1jKZAjB1gS0D1pD0_y45k",
  "authDomain": "studio-3078109361-62573.firebaseapp.com",
  "messagingSenderId": "621977729749"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
