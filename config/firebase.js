import { initializeApp } from "firebase/app"
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDxVEQyOkOhOulWEdCZvwpOs-14vL9GPA",
    authDomain: "playguard-app.firebaseapp.com",
    projectId: "playguard-app",
    storageBucket: "playguard-app.firebasestorage.app",
    messagingSenderId: "224497719797",
    appId: "1:224497719797:web:1e68528f053044c040a8bc",
    measurementId: "G-LJFNZWXMRL"
};

let app
let auth
let db

try {
    console.log("Firebase: Initializing...")

    // Initialize Firebase
    app = initializeApp(firebaseConfig)
    console.log("Firebase: App initialized")

    // Initialize Auth
    try {
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(AsyncStorage),
        })
        console.log("Firebase: Auth initialized with persistence")
    } catch (authError) {
        console.log("Firebase: Auth already initialized, using getAuth")
        auth = getAuth(app)
    }

    // Initialize Firestore
    db = getFirestore(app)
    console.log("Firebase: All services initialized successfully")
} catch (error) {
    console.error("Firebase initialization failed:", error)

    // For development, we'll still create the objects but log the error
    console.log("Firebase: Running in development mode")

    // You can still use mock objects here if needed for development
    // but for production, make sure to configure Firebase properly
}

export { auth, db }
export default app
