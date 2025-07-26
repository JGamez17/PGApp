// Service for app-related operations
import { doc, updateDoc, increment, serverTimestamp, collection, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export const trackAppView = async (userId, appId, appName) => {
    try {
        // Track in user stats
        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, {
            appsViewed: increment(1),
            updatedAt: serverTimestamp(),
        })

        // Log the activity
        await addDoc(collection(db, "userActivity"), {
            userId,
            type: "app_view",
            appId,
            appName,
            timestamp: serverTimestamp(),
        })

        console.log(`App view tracked for ${appName}`)
    } catch (error) {
        console.error("Error tracking app view:", error)
    }
}

export const submitAppReview = async (userId, appId, reviewData) => {
    try {
        // Add review to reviews collection
        await addDoc(collection(db, "reviews"), {
            userId,
            appId,
            ...reviewData,
            createdAt: serverTimestamp(),
        })

        // Update user stats
        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, {
            reviewsWritten: increment(1),
            updatedAt: serverTimestamp(),
        })

        console.log("Review submitted successfully")
        return { success: true }
    } catch (error) {
        console.error("Error submitting review:", error)
        return { success: false, error: error.message }
    }
}

export default trackAppView;
