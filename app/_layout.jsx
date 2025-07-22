"use client"

import { Stack } from "expo-router"
import { AuthProvider } from "../contexts/AuthContexts"
import { useEffect } from "react"

export default function RootLayout() {
    useEffect(() => {
        console.log("RootLayout: Component mounted")
    }, [])

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="auth" />
                <Stack.Screen name="child-profile" />
                <Stack.Screen name="app-detail" />
            </Stack>
        </AuthProvider>
    )
}
