// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

let app: FirebaseApp;

// A function to initialize Firebase if it hasn't been already.
function initializeFirebaseApp() {
    if (!getApps().length) {
        // Check if the config keys are placeholders. If so, don't initialize.
        if (firebaseConfig.apiKey === "YOUR_API_KEY") {
             console.error("Firebase configuration is not set. Please update src/lib/firebase.ts with your project's configuration.");
             // Return a dummy app object in case of missing config to avoid crashes
             return {} as FirebaseApp;
        }
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    return app;
}

app = initializeFirebaseApp();


const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export { app, auth, db };
