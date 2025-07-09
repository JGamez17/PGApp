import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    RecaptchaVerifier,
    initializeAuth
} from "firebase/auth";

// Your Firebase config (get this from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyDDxVEQyOkOhOulWEdCZvwpOs-14vL9GPA",
    authDomain: "playguard-app.firebaseapp.com",
    projectId: "playguard-app",
    storageBucket: "playguard-app.firebasestorage.app",
    messagingSenderId: "224497719797",
    appId: "1:224497719797:web:1e68528f053044c040a8bc",
    measurementId: "G-LJFNZWXMRL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication
const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    RecaptchaVerifier
};