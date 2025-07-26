"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuth } from "../../contexts/AuthContext"

export default function SignupScreen() {
    const router = useRouter()
    const { signup, signInWithGoogle, isLoading } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const [getUpdates, setGetUpdates] = useState(true)

    const handleSignup = async () => {
        console.log("SignupScreen: Signup attempt")

        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields")
            return
        }

        if (!agreeToTerms) {
            Alert.alert("Error", "You must agree to the terms of service")
            return
        }

        const result = await signup(email, password, displayName, agreeToTerms, getUpdates)

        if (result.success) {
            console.log("SignupScreen: Signup successful")
            if (result.needsChildProfile) {
                console.log("SignupScreen: Navigating to child profile")
                router.replace("/child-profile")
            } else {
                console.log("SignupScreen: Navigating to tabs")
                router.replace("/(tabs)")
            }
        } else {
            Alert.alert("Signup Failed", result.error)
        }
    }

    const handleGoogleSignIn = async () => {
        console.log("SignupScreen: Google sign in attempt")

        const result = await signInWithGoogle()

        if (result.success) {
            console.log("SignupScreen: Google sign in successful, navigating to tabs")
            router.replace("/(tabs)")
        } else {
            Alert.alert("Google Sign In Failed", result.error)
        }
    }

    const handleLogin = () => {
        router.push("/auth/login")
    }

    const CustomCheckbox = ({ checked, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.checkbox, style]}>
            {checked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
        </TouchableOpacity>
    )

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
                    <Text style={styles.title}>Get Started</Text>

                    {/* Name Field */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Name (Optional)</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor="#9CA3AF"
                                value={displayName}
                                onChangeText={setDisplayName}
                                editable={!isLoading}
                            />
                        </View>
                    </View>

                    {/* Email Field */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Email</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!isLoading}
                            />
                        </View>
                    </View>

                    {/* Password Field */}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Password</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Create a password"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                editable={!isLoading}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Terms Agreement */}
                    <View style={styles.checkboxContainer}>
                        <CustomCheckbox
                            checked={agreeToTerms}
                            onPress={() => setAgreeToTerms(!agreeToTerms)}
                            style={styles.termsCheckbox}
                        />
                        <View style={styles.termsTextContainer}>
                            <Text style={styles.termsText}>
                                I am 18 or older, and will only add my children to my account who are under 18 and are my legal
                                dependents. By creating an account, I agree to{" "}
                                <Text style={styles.linkText}>{"Playguard's Terms of Service"}</Text> and{" "}
                                <Text style={styles.linkText}>Privacy Policy</Text>.
                            </Text>
                        </View>
                    </View>

                    {/* Updates Checkbox */}
                    <View style={styles.checkboxContainer}>
                        <CustomCheckbox
                            checked={getUpdates}
                            onPress={() => setGetUpdates(!getUpdates)}
                            style={styles.updatesCheckbox}
                        />
                        <Text style={styles.updatesText}>Get updates from Playguard</Text>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={[styles.signupButton, (!agreeToTerms || !email || !password || isLoading) && styles.disabledButton]}
                        onPress={handleSignup}
                        disabled={!agreeToTerms || !email || !password || isLoading}
                    >
                        <Text style={styles.signupButtonText}>{isLoading ? "CREATING ACCOUNT..." : "SIGN UP"}</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Google Sign Up */}
                    <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn} disabled={isLoading}>
                        <View style={styles.googleIcon}>
                            <Text style={styles.googleIconText}>G</Text>
                        </View>
                        <Text style={styles.socialButtonText}>CONTINUE WITH GOOGLE</Text>
                    </TouchableOpacity>

                    {/* Login Link */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already a Playguard Parent? </Text>
                        <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
                            <Text style={styles.loginLink}>LOG IN</Text>
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
        textAlign: "center",
        marginBottom: 40,
    },
    fieldContainer: {
        marginBottom: 24,
    },
    fieldLabel: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#1F2937",
    },
    eyeIcon: {
        padding: 4,
        marginLeft: 12,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
        gap: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    termsCheckbox: {
        borderColor: "#D1D5DB",
        backgroundColor: "#FFFFFF",
    },
    updatesCheckbox: {
        borderColor: "#4F7EFF",
        backgroundColor: "#4F7EFF",
    },
    termsTextContainer: {
        flex: 1,
    },
    termsText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#4B5563",
    },
    linkText: {
        color: "#4F7EFF",
        textDecorationLine: "underline",
    },
    updatesText: {
        fontSize: 16,
        color: "#1F2937",
        fontWeight: "500",
    },
    signupButton: {
        backgroundColor: "#4F7EFF",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 24,
    },
    disabledButton: {
        backgroundColor: "#E5E7EB",
    },
    signupButtonText: {
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
        marginBottom: 24,
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
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        fontSize: 16,
        color: "#1F2937",
    },
    loginLink: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4F7EFF",
        textDecorationLine: "underline",
    },
})
