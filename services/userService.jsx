// Utility functions for user data management
import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase"

export const incrementUserStats = async (userId, statType) => {
    try {
        const userRef = doc(db, "users", userId)
        const updateData = {
            updatedAt: serverTimestamp(),
        }

        if (statType === "review") {
            updateData.reviewsWritten = increment(1)
        } else if (statType === "appView") {
            updateData.appsViewed = increment(1)
        }

        await updateDoc(userRef, updateData)
        console.log(`User stat ${statType} incremented for user ${userId}`)
    } catch (error) {
        console.error("Error incrementing user stats:", error)
    }
}

export const updateUserPreferences = async (userId, preferences) => {
    try {
        const userRef = doc(db, "users", userId)
        await updateDoc(userRef, {
            preferences,
            updatedAt: serverTimestamp(),
        })
        console.log("User preferences updated")
    } catch (error) {
        console.error("Error updating user preferences:", error)
    }
}
