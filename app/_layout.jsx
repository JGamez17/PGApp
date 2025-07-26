"use client"

import { Stack } from "expo-router"
import { useEffect } from "react"
import AuthProvider from "../contexts/AuthContext"

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
