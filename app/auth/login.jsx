"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuth } from "../../contexts/AuthContexts"

export default function LoginScreen() {
    const router = useRouter()
    const { login, signInWithGoogle, resetPassword, isLoading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async () => {
        console.log("LoginScreen: Login attempt")

        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields")
            return
        }

        const result = await login(email, password)

        if (result.success) {
            console.log("LoginScreen: Login successful, navigating to tabs")
            router.replace("/(tabs)")
        } else {
            Alert.alert("Login Failed", result.error)
        }
    }

    const handleGoogleSignIn = async () => {
        console.log("LoginScreen: Google sign in attempt")

        const result = await signInWithGoogle()

        if (result.success) {
            console.log("LoginScreen: Google sign in successful, navigating to tabs")
            router.replace("/(tabs)")
        } else {
            Alert.alert("Google Sign In Failed", result.error)
        }
    }

    const handleForgotPassword = () => {
        if (!email) {
            Alert.alert("Email Required", "Please enter your email address first")
            return
        }

        Alert.alert("Reset Password", "Send password reset email to " + email + "?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Send",
                onPress: async () => {
                    const result = await resetPassword(email)
                    if (result.success) {
                        Alert.alert("Success", "Password reset email sent!")
                    } else {
                        Alert.alert("Error", result.error)
                    }
                },
            },
        ])
    }

    const handleSignup = () => {
        router.push("/auth/signup")
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Logo and Brand */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logo}>
                                <Ionicons name="shield" size={24} color="#FFFFFF" />
                            </View>
                            <Text style={styles.brandName}>Playguard</Text>
                        </View>
                    </View>

                    {/* Heading */}
                    <Text style={styles.title}>Log in as a parent</Text>

                    {/* Email Field */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email address"
                            placeholderTextColor="#9CA3AF"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!isLoading}
                        />
                    </View>

                    {/* Password Field */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, styles.passwordInput]}
                            placeholder="Password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            editable={!isLoading}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                            <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton} disabled={isLoading}>
                            <Text style={styles.forgotText}>FORGOT PASSWORD?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={[styles.loginButton, isLoading && styles.disabledButton]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text style={styles.loginButtonText}>{isLoading ? "LOGGING IN..." : "LOG IN"}</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Social Login Buttons */}
                    <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn} disabled={isLoading}>
                        <View style={styles.googleIcon}>
                            <Text style={styles.googleIconText}>G</Text>
                        </View>
                        <Text style={styles.socialButtonText}>CONTINUE WITH GOOGLE</Text>
                    </TouchableOpacity>

                    {/* Sign Up Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>{"Don't have an account? "}</Text>
                        <TouchableOpacity onPress={handleSignup} disabled={isLoading}>
                            <Text style={styles.signupLink}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    logo: {
        width: 48,
        height: 48,
        backgroundColor: "#4F7EFF",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    brandName: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1F2937",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 40,
    },
    inputContainer: {
        position: "relative",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: "#1F2937",
    },
    passwordInput: {
        paddingRight: 160,
    },
    eyeButton: {
        position: "absolute",
        right: 120,
        top: 16,
        padding: 4,
    },
    forgotButton: {
        position: "absolute",
        right: 16,
        top: 16,
        padding: 4,
    },
    forgotText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#9CA3AF",
        letterSpacing: 0.5,
    },
    loginButton: {
        backgroundColor: "#4F7EFF",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 24,
    },
    disabledButton: {
        backgroundColor: "#9CA3AF",
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
        letterSpacing: 0.5,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E7EB",
    },
    dividerText: {
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#9CA3AF",
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 16,
        gap: 12,
    },
    googleIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#4285F4",
        alignItems: "center",
        justifyContent: "center",
    },
    googleIconText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    },
    socialButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1F2937",
        letterSpacing: 0.5,
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    signupText: {
        fontSize: 16,
        color: "#6B7280",
    },
    signupLink: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4F7EFF",
        textDecorationLine: "underline",
    },
})
