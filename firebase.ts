import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCYmC96gTkM0g_byx1k4vjVGu0u-LoOa5I",
  authDomain: "chatgptclone-1f00d.firebaseapp.com",
  projectId: "chatgptclone-1f00d",
  storageBucket: "chatgptclone-1f00d.appspot.com",
  messagingSenderId: "655397683167",
  appId: "1:655397683167:web:ffe86bcb5ff815be56ce6a",
  measurementId: "G-906L627RNM"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// const analytics = getAnalytics(app);