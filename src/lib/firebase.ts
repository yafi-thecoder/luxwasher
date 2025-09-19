// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;

// Check if all required environment variables are defined
const isConfigValid = 
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket &&
  firebaseConfig.messagingSenderId &&
  firebaseConfig.appId;

if (isConfigValid) {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
} else {
    console.error("Firebase configuration is missing or incomplete. Please check your environment variables.");
    // Create a dummy app to avoid crashing the app on the server side
    // or in environments where config is not available.
    if (typeof window === 'undefined') {
        app = {} as FirebaseApp;
    } else {
        // Handle client-side case where config is missing.
        // You might want to show a message to the user.
        if (!getApps().length) {
          app = initializeApp({});
        } else {
          app = getApp();
        }
    }
}


const auth = getAuth(app);
const db = isConfigValid ? initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
}) : getFirestore(app);

export { app, auth, db };
