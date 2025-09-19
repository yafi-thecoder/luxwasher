// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "studio-3078109361-62573",
  "appId": "1:621977729749:web:4fcf4da863e69d07e0c05c",
  "apiKey": "AIzaSyBKDVhjEneU3jvQ4xp8X4f4odte8D8oiH8",
  "authDomain": "studio-3078109361-62573.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "621977729749"
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
