import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNhPxpGglqC48PGlWhWRyq3OsGZ8hVYBw",
  authDomain: "rewear-caed9.firebaseapp.com",
  projectId: "rewear-caed9",
  storageBucket: "rewear-caed9.appspot.com", // fixed .app to .appspot.com
  messagingSenderId: "580551463360",
  appId: "1:580551463360:web:53c112c665df0be3b03825",
  measurementId: "G-6CQ2WCL3PQ"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics only in browser
let analytics = null;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  }).catch(() => {});
}

export { app, auth, db, storage, analytics };
