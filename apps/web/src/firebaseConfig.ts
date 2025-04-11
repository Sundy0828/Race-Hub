import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAB4mlbdokhVczQrjbkUMRT7w1CQWKrp-0",
  authDomain: "race-hub-23b63.firebaseapp.com",
  projectId: "race-hub-23b63",
  storageBucket: "race-hub-23b63.firebasestorage.app",
  messagingSenderId: "31439031251",
  appId: "1:31439031251:web:254ef2a8b3333dd6cfbd26",
  measurementId: "G-HY507PMF1H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only if supported)
const analytics: Analytics = getAnalytics(app);

export { app, analytics };
