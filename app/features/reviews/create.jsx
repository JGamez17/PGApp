"use client"

import { useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter, useLocalSearchParams } from "expo-router"
import { useAuth } from "../../../contexts/AuthContext"
import { submitAppReview } from "../../../services/appService"

export default function CreateReviewScreen() {
    const router = useRouter()
    const params = useLocalSearchParams()
    const { appId, appName } = params
    const { user, isLoading: authLoading } = useAuth()

    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleStarPress = (selectedRating) => {
        setRating(selectedRating)
    }

    const handleSubmitReview = async () => {
        if (!user?.uid) {
            Alert.alert("Error", "You must be logged in to submit a review.")
            return
        }
        if (!rating || !reviewText.trim()) {
            Alert.alert("Error", "Please provide a rating and write your review.")
            return
        }
        if (!appId || !appName) {
            Alert.alert("Error", "App details are missing. Cannot submit review.")
            return
        }

        setIsLoading(true)

        const reviewData = {
            rating,
            text: reviewText.trim(),
            appId: appId,
            appName: appName,
            userId: user.uid,
            userName: user.displayName || user.email, // Use display name or email
            userAvatarText: (user.displayName || user.email || "U")[0].toUpperCase(), // First letter for avatar
        }

        console.log("Submitting review:", reviewData)

        const result = await submitAppReview(user.uid, appId, reviewData)

        if (result.success) {
            console.log("CreateReviewScreen: Review submitted successfully. Redirecting to app-detail with params:", {
                appId,
                appName,
                initialTab: "REVIEWS",
            })
            router.replace({
                pathname: "/app-detail",
                params: { id: appId, name: appName, initialTab: "REVIEWS" }, // Pass app details and initialTab
            })
        } else {
            Alert.alert("Error", result.error || "Failed to submit review. Please try again.")
        }
        setIsLoading(false)
    }

    const renderStars = (currentRating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)} disabled={isLoading}>
                <Ionicons name={index < currentRating ? "star" : "star-outline"} size={30} color="#FF8A00" />
            </TouchableOpacity>
        ))
    }

    if (authLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4F7EFF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton} disabled={isLoading}>
                        <Ionicons name="chevron-back" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Write a Review</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.appTitle}>Reviewing: {appName || "Unknown App"}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Your Rating</Text>
                        <View style={styles.starsContainer}>{renderStars(rating)}</View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Your Review</Text>
                        <TextInput
                            style={styles.reviewInput}
                            placeholder="Share your thoughts about this app..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={6}
                            value={reviewText}
                            onChangeText={setReviewText}
                            editable={!isLoading}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, (!rating || !reviewText.trim() || isLoading) && styles.disabledButton]}
                        onPress={handleSubmitReview}
                        disabled={!rating || !reviewText.trim() || isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.submitButtonText}>SUBMIT REVIEW</Text>
                        )}
                    </TouchableOpacity>
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#6B7280",
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1F2937",
    },
    content: {
        padding: 20,
    },
    appTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 24,
        textAlign: "center",
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 12,
    },
    starsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        paddingVertical: 10,
    },
    reviewInput: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: "#1F2937",
        minHeight: 120,
        textAlignVertical: "top",
    },
    submitButton: {
        backgroundColor: "#4F7EFF",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: "#E5E7EB",
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
        letterSpacing: 0.5,
    },
})
