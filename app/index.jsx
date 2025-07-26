"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useRouter } from "expo-router"
import { useAuth } from "../contexts/AuthContext"

export default function HomeScreen() {
    const { isAuthenticated, isLoading, user, needsChildProfile } = useAuth()
    const router = useRouter()
    const [hasRedirected, setHasRedirected] = useState(false)
    const hasChildProfile = user?.hasChildProfile

    useEffect(() => {
        console.log("HomeScreen: Auth state changed", {
            isAuthenticated,
            isLoading,
            hasUser: !!user,
            needsChildProfile,
            hasChildProfile,
        })

        if (!isLoading && !hasRedirected) {
            if (!isAuthenticated) {
                console.log("HomeScreen: Redirecting to login...")
                setHasRedirected(true)
                setTimeout(() => {
                    router.replace("/auth/login")
                }, 100)
            } else if (needsChildProfile) {
                console.log("HomeScreen: Redirecting to child profile...")
                setHasRedirected(true)
                setTimeout(() => {
                    router.replace("/child-profile")
                }, 100)
            } else {
                console.log("HomeScreen: User authenticated with child profile, showing dashboard")
            }
        }
    }, [isAuthenticated, isLoading, needsChildProfile, user, router, hasRedirected])

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4F7EFF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    // Show dashboard if authenticated and has child profile
    if (isAuthenticated && user && !needsChildProfile && hasChildProfile) {
        try {
            const Dashboard = require("../features/dashboard").default
            return <Dashboard />
        } catch (error) {
            console.error("HomeScreen: Error loading dashboard:", error)
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error loading dashboard</Text>
                    <Text style={styles.errorDetails}>{error.message}</Text>
                </View>
            )
        }
    }

    // Show message while redirecting
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#4F7EFF" />
            <Text style={styles.title}>{!isAuthenticated ? "Redirecting to login..." : "Setting up your profile..."}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        padding: 20,
    },
    title: {
        fontSize: 18,
        color: "#1F2937",
        marginTop: 16,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#6B7280",
    },
    errorText: {
        fontSize: 18,
        color: "#DC2626",
        fontWeight: "600",
        marginBottom: 8,
    },
    errorDetails: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
    },
})
