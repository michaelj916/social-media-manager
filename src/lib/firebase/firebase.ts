import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEHF5nWram-_FzkT-aHjenOzRvL8_RBrg",
  authDomain: "social-media-manager-dc021.firebaseapp.com",
  projectId: "social-media-manager-dc021",
  storageBucket: "social-media-manager-dc021.appspot.com",
  messagingSenderId: "83284593445",
  appId: "1:83284593445:web:f27bd0e4f057472637a8cc"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
