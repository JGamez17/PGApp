"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../config/firebase"

const AuthContext = createContext({})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [needsChildProfile, setNeedsChildProfile] = useState(false)
    const [userProfile, setUserProfile] = useState(null)
    const [childProfile, setChildProfile] = useState(null)
    const [firebaseError, setFirebaseError] = useState(null)

    // Listen for authentication state changes
    useEffect(() => {
        console.log("AuthProvider: Setting up auth listener...")

        if (!auth) {
            console.error("AuthProvider: Firebase auth is not available")
            setFirebaseError("Firebase authentication is not initialized")
            setIsLoading(false)
            return
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log("AuthProvider: Auth state changed", { hasUser: !!firebaseUser })

            try {
                if (firebaseUser) {
                    await loadUserProfile(firebaseUser)
                } else {
                    clearUserData()
                }
            } catch (error) {
                console.error("AuthProvider: Error in auth state change handler:", error)
                setFirebaseError(error.message)
            }

            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    // Load user profile and child profile from Firestore
    const loadUserProfile = async (firebaseUser) => {
        try {
            if (!db || !doc || !getDoc) {
                console.log("AuthProvider: Firestore not available, using basic user info")
                setBasicUserInfo(firebaseUser)
                return
            }

            console.log("AuthProvider: Loading user profile from Firestore...")
            const userDocRef = doc(db, "users", firebaseUser.uid)
            const userDoc = await getDoc(userDocRef)

            const userData = userDoc.exists() ? userDoc.data() : {}
            let hasChildProfileInFirestore = !!userData.hasChildProfile
            const childProfileExists = !!userData.childProfile

            // Logic to ensure hasChildProfile flag is consistent with childProfile data
            if (childProfileExists && !hasChildProfileInFirestore) {
                // Child profile exists but hasChildProfile flag is false/missing. Fix it.
                console.log("AuthProvider: Correcting hasChildProfile flag in Firestore (setting to true).")
                await updateDoc(userDocRef, {
                    hasChildProfile: true,
                    updatedAt: serverTimestamp(),
                })
                hasChildProfileInFirestore = true // Update local flag for immediate use
                userData.hasChildProfile = true // Update userData object for current session
            } else if (!childProfileExists && hasChildProfileInFirestore) {
                // Child profile does NOT exist but hasChildProfile flag is true. Fix it.
                console.log("AuthProvider: Correcting hasChildProfile flag in Firestore (setting to false).")
                await updateDoc(userDocRef, {
                    hasChildProfile: false,
                    updatedAt: serverTimestamp(),
                })
                hasChildProfileInFirestore = false // Update local flag
                userData.hasChildProfile = false // Update userData object for current session
            } else if (!userDoc.exists()) {
                // User document doesn't exist, create a basic one
                console.log("AuthProvider: No user profile found, creating basic profile")
                await createBasicUserProfile(firebaseUser)
                // createBasicUserProfile handles setting user state and needsChildProfile
                return
            }

            const userInfo = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || userData.displayName,
                photoURL: firebaseUser.photoURL,
                ...userData, // Spread the potentially updated userData
            }

            setUser(userInfo)
            setUserProfile(userData)
            setChildProfile(userData.childProfile || null)
            setIsAuthenticated(true)
            setNeedsChildProfile(!hasChildProfileInFirestore) // Use the corrected flag

            console.log("AuthProvider: User profile loaded and state set", {
                isAuthenticated: true,
                needsChildProfile: !hasChildProfileInFirestore,
                hasChildProfile: hasChildProfileInFirestore,
                childName: userData.childProfile?.childName,
            })
        } catch (error) {
            console.error("AuthProvider: Error loading user profile:", error)
            setBasicUserInfo(firebaseUser)
        }
    }

    // Set basic user info when Firestore is not available
    const setBasicUserInfo = (firebaseUser) => {
        const userInfo = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
        }

        setUser(userInfo)
        setIsAuthenticated(true)
        setNeedsChildProfile(true)
    }

    // Clear all user data
    const clearUserData = () => {
        setUser(null)
        setUserProfile(null)
        setChildProfile(null)
        setIsAuthenticated(false)
        setNeedsChildProfile(false)
    }

    // Create basic user profile in Firestore
    const createBasicUserProfile = async (firebaseUser) => {
        try {
            if (!db || !doc || !setDoc || !serverTimestamp) {
                setBasicUserInfo(firebaseUser)
                return
            }

            const userProfile = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || "New Parent",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                hasChildProfile: false,
                reviewsWritten: 0,
                appsViewed: 0,
                signupMethod: "existing_user",
            }

            await setDoc(doc(db, "users", firebaseUser.uid), userProfile)

            const userInfo = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || "New Parent",
                photoURL: firebaseUser.photoURL,
                ...userProfile,
            }

            setUser(userInfo)
            setUserProfile(userProfile)
            setIsAuthenticated(true)
            setNeedsChildProfile(true)
        } catch (error) {
            console.error("AuthProvider: Error creating basic user profile:", error)
            setBasicUserInfo(firebaseUser)
        }
    }

    // Sign up with email and password
    const signup = async (email, password, displayName, agreeToTerms) => {
        console.log("AuthProvider: Signup attempt for:", email)

        if (!agreeToTerms) {
            return { success: false, error: "You must agree to the terms of service" }
        }

        if (!auth || !createUserWithEmailAndPassword) {
            return { success: false, error: "Firebase authentication is not available" }
        }

        setIsLoading(true)

        try {
            // Create user account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const firebaseUser = userCredential.user

            // Update display name if provided
            if (displayName && updateProfile) {
                try {
                    await updateProfile(firebaseUser, { displayName })
                } catch (profileError) {
                    console.error("Error updating profile:", profileError)
                }
            }

            // Create user profile in Firestore
            if (db && doc && setDoc && serverTimestamp) {
                try {
                    const userProfile = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName || firebaseUser.displayName || "New Parent",
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                        hasChildProfile: false,
                        reviewsWritten: 0,
                        appsViewed: 0,
                        agreeToTerms: true,
                        getUpdates: true,
                        signupMethod: "email",
                    }

                    await setDoc(doc(db, "users", firebaseUser.uid), userProfile)
                    console.log("AuthProvider: User profile created in Firestore")
                } catch (firestoreError) {
                    console.error("Error creating user profile:", firestoreError)
                }
            }

            console.log("AuthProvider: Signup successful")
            setIsLoading(false)
            return { success: true, needsChildProfile: true }
        } catch (error) {
            console.error("AuthProvider: Signup error:", error)
            setIsLoading(false)

            let errorMessage = "An error occurred during signup"
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "This email is already registered"
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password should be at least 6 characters"
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email address"
            }

            return { success: false, error: errorMessage }
        }
    }

    // Sign in with email and password
    const login = async (email, password) => {
        console.log("AuthProvider: Login attempt for:", email)

        if (!auth || !signInWithEmailAndPassword) {
            return { success: false, error: "Firebase authentication is not available" }
        }

        setIsLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("AuthProvider: Login successful")
            setIsLoading(false)
            return { success: true }
        } catch (error) {
            console.error("AuthProvider: Login error:", error)
            setIsLoading(false)

            let errorMessage = "Invalid email or password"
            if (error.code === "auth/user-not-found") {
                errorMessage = "No account found with this email"
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password"
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email address"
            }

            return { success: false, error: errorMessage }
        }
    }

    // Complete child profile setup and save to Firestore
    const completeChildProfile = async (profileData) => {
        console.log("AuthProvider: Completing child profile", profileData)

        if (!user?.uid) {
            return { success: false, error: "User not authenticated" }
        }

        try {
            const childProfileData = {
                childName: profileData.childName,
                birthYear: profileData.birthYear,
                age: profileData.age,
                interests: profileData.selectedInterests,
                supervisionLevel: profileData.supervisionLevel,
                devices: profileData.selectedDevices,
                createdAt: serverTimestamp ? serverTimestamp() : new Date().toISOString(),
                updatedAt: serverTimestamp ? serverTimestamp() : new Date().toISOString(),
            }

            // Save to Firestore if available
            if (db && doc && updateDoc && serverTimestamp) {
                console.log("AuthProvider: Saving child profile to Firestore...")

                await updateDoc(doc(db, "users", user.uid), {
                    hasChildProfile: true,
                    childProfile: childProfileData,
                    updatedAt: serverTimestamp(),
                })

                console.log("AuthProvider: Child profile saved to Firestore successfully")
            } else {
                console.log("AuthProvider: Firestore not available, saving locally only")
            }

            // Update local state
            setNeedsChildProfile(false)
            setChildProfile(childProfileData)
            setUser((prev) => ({
                ...prev,
                hasChildProfile: true,
                childProfile: childProfileData,
            }))

            // Also update userProfile state to ensure consistency
            setUserProfile((prev) => ({
                ...prev,
                hasChildProfile: true,
                childProfile: childProfileData,
            }))

            console.log("AuthProvider: Child profile completed successfully")
            return { success: true }
        } catch (error) {
            console.error("AuthProvider: Error completing child profile:", error)
            return { success: false, error: "Failed to save child profile. Please try again." }
        }
    }

    // Update child profile
    const updateChildProfile = async (profileData) => {
        console.log("AuthProvider: Updating child profile", profileData)

        if (!user?.uid) {
            return { success: false, error: "User not authenticated" }
        }

        try {
            const updatedChildProfile = {
                ...childProfile,
                ...profileData,
                updatedAt: serverTimestamp ? serverTimestamp() : new Date().toISOString(),
            }

            // Save to Firestore if available
            if (db && doc && updateDoc && serverTimestamp) {
                await updateDoc(doc(db, "users", user.uid), {
                    childProfile: updatedChildProfile,
                    updatedAt: serverTimestamp(),
                })
            }

            // Update local state
            setChildProfile(updatedChildProfile)
            setUser((prev) => ({
                ...prev,
                childProfile: updatedChildProfile,
            }))

            console.log("AuthProvider: Child profile updated successfully")
            return { success: true }
        } catch (error) {
            console.error("AuthProvider: Error updating child profile:", error)
            return { success: false, error: "Failed to update child profile" }
        }
    }

    // Update user activity stats
    const updateUserStats = async (statsUpdate) => {
        if (!user?.uid) return

        try {
            // Save to Firestore if available
            if (db && doc && updateDoc && serverTimestamp) {
                await updateDoc(doc(db, "users", user.uid), {
                    ...statsUpdate,
                    updatedAt: serverTimestamp(),
                })
            }

            // Update local state
            setUser((prev) => ({ ...prev, ...statsUpdate }))
            console.log("AuthProvider: User stats updated")
        } catch (error) {
            console.error("AuthProvider: Error updating user stats:", error)
            // Update local state even if Firestore fails
            setUser((prev) => ({ ...prev, ...statsUpdate }))
        }
    }

    // Google Sign In (placeholder)
    const signInWithGoogle = async () => {
        console.log("AuthProvider: Google sign in not implemented yet")
        return { success: false, error: "Google sign in not implemented" }
    }

    // Password reset
    const resetPassword = async (email) => {
        if (!auth || !sendPasswordResetEmail) {
            return { success: false, error: "Firebase authentication is not available" }
        }

        try {
            await sendPasswordResetEmail(auth, email)
            console.log("AuthProvider: Password reset email sent to:", email)
            return { success: true }
        } catch (error) {
            console.error("AuthProvider: Password reset error:", error)
            return { success: false, error: "Failed to send password reset email" }
        }
    }

    // Logout
    const logout = async () => {
        if (!auth || !signOut) {
            return { success: false, error: "Firebase authentication is not available" }
        }

        try {
            await signOut(auth)
            console.log("AuthProvider: Logout successful")
            return { success: true }
        } catch (error) {
            console.error("AuthProvider: Logout error:", error)
            return { success: false, error: "Failed to logout" }
        }
    }

    const value = {
        user,
        userProfile,
        childProfile,
        isAuthenticated,
        isLoading,
        needsChildProfile,
        firebaseError,
        signup,
        login,
        signInWithGoogle,
        resetPassword,
        logout,
        completeChildProfile,
        updateChildProfile,
        updateUserStats,
    }

    console.log("AuthProvider: Current state", {
        isAuthenticated,
        isLoading,
        hasUser: !!user,
        needsChildProfile,
        hasChildProfile: !!childProfile,
        childName: childProfile?.childName,
        firebaseError,
        hasAuth: !!auth,
        hasDb: !!db,
    })

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
