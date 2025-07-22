"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Mock auth for development
const isDevelopment = true

const AuthContext = createContext({})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [needsChildProfile, setNeedsChildProfile] = useState(false)

    // Mock authentication for development
    useEffect(() => {
        console.log("AuthProvider: Initializing mock auth...")

        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setNeedsChildProfile(false)
            console.log("AuthProvider: Mock auth initialized - not authenticated")
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    // Mock login function
    const login = async (email, password) => {
        console.log("AuthProvider: Mock login attempt for:", email)
        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock successful login
        const mockUser = {
            uid: "mock-user-id",
            email: email,
            displayName: "Test Parent",
            reviewsWritten: 8,
            appsViewed: 32,
            hasChildProfile: true, // Existing user has profile
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        setNeedsChildProfile(false)
        setIsLoading(false)

        console.log("AuthProvider: Mock login successful")
        return { success: true }
    }

    // Mock signup function
    const signup = async (email, password, displayName, agreeToTerms) => {
        console.log("AuthProvider: Mock signup attempt for:", email)

        if (!agreeToTerms) {
            return { success: false, error: "You must agree to the terms of service" }
        }

        setIsLoading(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock successful signup - new user needs child profile
        const mockUser = {
            uid: "mock-user-id-" + Date.now(),
            email: email,
            displayName: displayName || "New Parent",
            reviewsWritten: 0,
            appsViewed: 0,
            hasChildProfile: false, // New user needs to create profile
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        setNeedsChildProfile(true) // New users need to create child profile
        setIsLoading(false)

        console.log("AuthProvider: Mock signup successful - needs child profile")
        return { success: true, needsChildProfile: true }
    }

    // Mock Google Sign In
    const signInWithGoogle = async () => {
        console.log("AuthProvider: Mock Google sign in attempt")
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockUser = {
            uid: "mock-google-user-id",
            email: "test@gmail.com",
            displayName: "Google User",
            photoURL: "https://via.placeholder.com/150",
            reviewsWritten: 5,
            appsViewed: 20,
            hasChildProfile: true, // Assume Google users might have existing profile
        }

        setUser(mockUser)
        setIsAuthenticated(true)
        setNeedsChildProfile(false)
        setIsLoading(false)

        console.log("AuthProvider: Mock Google sign in successful")
        return { success: true }
    }

    // Complete child profile setup
    const completeChildProfile = (profileData) => {
        console.log("AuthProvider: Child profile completed", profileData)
        setNeedsChildProfile(false)
        setUser((prev) => ({
            ...prev,
            hasChildProfile: true,
            childProfile: profileData,
        }))
    }

    // Mock password reset
    const resetPassword = async (email) => {
        console.log("AuthProvider: Mock password reset email sent to:", email)
        return { success: true }
    }

    // Mock logout
    const logout = async () => {
        console.log("AuthProvider: Mock logout")
        setUser(null)
        setIsAuthenticated(false)
        setNeedsChildProfile(false)
        return { success: true }
    }

    const value = {
        user,
        isAuthenticated,
        isLoading,
        needsChildProfile,
        login,
        signup,
        signInWithGoogle,
        resetPassword,
        logout,
        completeChildProfile,
    }

    console.log("AuthProvider: Current state", {
        isAuthenticated,
        isLoading,
        hasUser: !!user,
        needsChildProfile,
    })

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Default export for compatibility
export default AuthProvider
