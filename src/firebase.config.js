import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "image-upload-b22f2.firebaseapp.com",
  projectId: "image-upload-b22f2",
  storageBucket: "image-upload-b22f2.appspot.com",
  messagingSenderId: "555648931738",
  appId: "1:555648931738:web:660fb618b1642b52928c23",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
