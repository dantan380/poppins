// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const FIREBASE_API_KEY = import.meta.env.FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "poppins-ba942.firebaseapp.com",
  projectId: "poppins-ba942",
  storageBucket: "poppins-ba942.appspot.com",
  messagingSenderId: "700275230412",
  appId: "1:700275230412:web:7f1f277e3d76c0469b2469",
  measurementId: "G-DNXDZL7RLL"
};

// Initialize Firebase
let app;

try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
}

const projFirestore = getFirestore(app);

export { projFirestore };
