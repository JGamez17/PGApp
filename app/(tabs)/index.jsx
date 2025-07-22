"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useRouter } from "expo-router"
import { useAuth } from "../../contexts/AuthContexts"

export default function HomeScreen() {
    const { isAuthenticated, isLoading, user } = useAuth()
    const router = useRouter()
    const [hasRedirected, setHasRedirected] = useState(false)

    useEffect(() => {
        console.log("HomeScreen: Auth state changed", { isAuthenticated, isLoading, hasUser: !!user })

        if (!isLoading && !isAuthenticated && !hasRedirected) {
            console.log("HomeScreen: Redirecting to login...")
            setHasRedirected(true)

            // Use a small delay to ensure the router is ready
            setTimeout(() => {
                router.replace("/auth/login")
            }, 100)
        }
    }, [isAuthenticated, isLoading, router, hasRedirected])

    // Show loading spinner while checking authentication
    if (isLoading) {
        console.log("HomeScreen: Showing loading state")
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4F7EFF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    // Show dashboard if authenticated
    if (isAuthenticated && user) {
        console.log("HomeScreen: User authenticated, showing dashboard")
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
    console.log("HomeScreen: Showing redirect message")
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#4F7EFF" />
            <Text style={styles.title}>Redirecting to login...</Text>
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
