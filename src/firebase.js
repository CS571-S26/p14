import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAUHuDS8Ul5NcHU5OUC6E3ecEe64NLl6jw",
  authDomain: "cs571-web-project.firebaseapp.com",
  projectId: "cs571-web-project",
  storageBucket: "cs571-web-project.firebasestorage.app",
  messagingSenderId: "748474193882",
  appId: "1:748474193882:web:b3506947384b4c3dd452e3",
  measurementId: "G-GB4JBKRKGC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
getAnalytics(app);
