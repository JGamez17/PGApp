import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// For development - use Firebase emulators or disable Firebase temporarily
const isDevelopment = true // Set to false when you have real Firebase config

let app, auth, db

if (isDevelopment) {
    // Mock Firebase config for development
    const mockConfig = {
        apiKey: "mock-api-key",
        authDomain: "localhost",
        projectId: "demo-project",
        storageBucket: "demo-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "mock-app-id",
    }

    try {
        app = initializeApp(mockConfig)
        auth = getAuth(app)
        db = getFirestore(app)

        // Use emulators for development (optional)
        // Uncomment these lines if you want to use Firebase emulators
        // connectAuthEmulator(auth, "http://localhost:9099")
        // connectFirestoreEmulator(db, 'localhost', 8080)

        console.log("Firebase initialized in development mode")
    } catch (error) {
        console.error("Firebase initialization error:", error)
    }
} else {
    // Your real Firebase config goes here
    const firebaseConfig = {
        apiKey: "your-real-api-key",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "your-sender-id",
        appId: "your-app-id",
    }

    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
}

export { auth, db }
export default app
