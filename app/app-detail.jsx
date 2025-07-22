"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter, useLocalSearchParams } from "expo-router"

export default function AppDetailScreen() {
    const router = useRouter()
    const params = useLocalSearchParams()
    const [activeTab, setActiveTab] = useState("REVIEWS")

    // Mock app data - in a real app, this would come from an API or database
    const appData = {
        id: params.id || "1",
        name: params.name || "Duolingo ABC",
        developer: "Duolingo",
        icon: "🦉",
        iconBg: "#8B5CF6",
        category: "education",
        ageRange: "3-6",
        appStoreRating: 4.7,
        googlePlayRating: 4.5,
        playguardRating: 5,
        description: "Learn languages through play and memory.",
    }

    const reviews = [
        {
            id: 1,
            author: "Sarah M.",
            rating: 5,
            timestamp: "2 days ago",
            text: "Great app for my 8-year-old! She's learning Spanish and loves the interactive lessons.",
        },
        {
            id: 2,
            author: "Mike R.",
            rating: 4,
            timestamp: "1 week ago",
            text: "Good educational content, but wish there were more parental controls.",
        },
        {
            id: 3,
            author: "Jennifer K.",
            rating: 5,
            timestamp: "2 weeks ago",
            text: "My daughter loves this app! The lessons are engaging and she's actually learning. Highly recommend for young kids.",
        },
        {
            id: 4,
            author: "David L.",
            rating: 4,
            timestamp: "3 weeks ago",
            text: "Solid educational app with good content. The interface is kid-friendly and easy to navigate.",
        },
    ]

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Ionicons key={index} name="star" size={16} color={index < rating ? "#FFD700" : "#E5E7EB"} />
        ))
    }

    const renderReview = (review) => (
        <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <View style={styles.reviewStars}>{renderStars(review.rating)}</View>
                <Text style={styles.reviewAuthor}>{review.author}</Text>
                <Text style={styles.reviewTimestamp}>{review.timestamp}</Text>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
        </View>
    )

    const renderTabContent = () => {
        switch (activeTab) {
            case "OVERVIEW":
                return (
                    <View style={styles.tabContent}>
                        <Text style={styles.tabContentText}>App overview and description would go here...</Text>
                    </View>
                )
            case "SAFETY":
                return (
                    <View style={styles.tabContent}>
                        <Text style={styles.tabContentText}>Safety information and parental controls would go here...</Text>
                    </View>
                )
            case "REVIEWS":
                return (
                    <View style={styles.tabContent}>
                        <Text style={styles.reviewsTitle}>Parent Reviews</Text>
                        {reviews.map(renderReview)}
                    </View>
                )
            default:
                return null
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4F7EFF" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{appData.name}</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* App Details Header */}
                <View style={styles.detailsHeader}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.detailsBackButton}>
                        <Ionicons name="chevron-back" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text style={styles.detailsTitle}>App Details</Text>
                    <View style={styles.detailsActions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="share-outline" size={24} color="#6B7280" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="bookmark-outline" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* App Info */}
                <View style={styles.appInfo}>
                    <View style={[styles.appIcon, { backgroundColor: appData.iconBg }]}>
                        <Text style={styles.appIconText}>{appData.icon}</Text>
                    </View>
                    <View style={styles.appDetails}>
                        <Text style={styles.appName}>{appData.name}</Text>
                        <Text style={styles.appDeveloper}>{appData.developer}</Text>
                        <View style={styles.appTags}>
                            <View style={styles.categoryTag}>
                                <Text style={styles.categoryTagText}>{appData.category}</Text>
                            </View>
                            <Text style={styles.ageRange}>{appData.ageRange}</Text>
                        </View>
                    </View>
                </View>

                {/* Ratings */}
                <View style={styles.ratingsContainer}>
                    <View style={styles.ratingItem}>
                        <View style={styles.ratingHeader}>
                            <Ionicons name="star" size={20} color="#FF8A00" />
                            <Text style={styles.ratingValue}>{appData.appStoreRating}</Text>
                        </View>
                        <Text style={styles.ratingLabel}>App Store</Text>
                    </View>
                    <View style={styles.ratingItem}>
                        <View style={styles.ratingHeader}>
                            <Ionicons name="star" size={20} color="#FF8A00" />
                            <Text style={styles.ratingValue}>{appData.googlePlayRating}</Text>
                        </View>
                        <Text style={styles.ratingLabel}>Google Play</Text>
                    </View>
                    <View style={styles.ratingItem}>
                        <View style={styles.ratingHeader}>
                            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                            <Text style={styles.ratingValue}>{appData.playguardRating}</Text>
                        </View>
                        <Text style={styles.ratingLabel}>Playguard</Text>
                    </View>
                </View>

                {/* Write Review Button */}
                <TouchableOpacity style={styles.writeReviewButton}>
                    <Text style={styles.writeReviewText}>WRITE REVIEW</Text>
                </TouchableOpacity>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {["OVERVIEW", "SAFETY", "REVIEWS"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                {renderTabContent()}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        backgroundColor: "#4F7EFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    content: {
        flex: 1,
    },
    detailsHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    detailsBackButton: {
        marginRight: 16,
    },
    detailsTitle: {
        flex: 1,
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
    },
    detailsActions: {
        flexDirection: "row",
        gap: 16,
    },
    actionButton: {
        padding: 4,
    },
    appInfo: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 24,
        alignItems: "center",
    },
    appIcon: {
        width: 80,
        height: 80,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    appIconText: {
        fontSize: 40,
    },
    appDetails: {
        flex: 1,
    },
    appName: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 4,
    },
    appDeveloper: {
        fontSize: 18,
        color: "#6B7280",
        marginBottom: 12,
    },
    appTags: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    categoryTag: {
        backgroundColor: "#8B5CF6",
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    categoryTagText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    ageRange: {
        fontSize: 16,
        color: "#6B7280",
        fontWeight: "500",
    },
    ratingsContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: "space-around",
    },
    ratingItem: {
        alignItems: "center",
    },
    ratingHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 4,
    },
    ratingValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
    },
    ratingLabel: {
        fontSize: 14,
        color: "#6B7280",
    },
    writeReviewButton: {
        backgroundColor: "#4F7EFF",
        marginHorizontal: 16,
        marginVertical: 16,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    writeReviewText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    tabsContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: "center",
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: "#4F7EFF",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#9CA3AF",
    },
    activeTabText: {
        color: "#4F7EFF",
    },
    tabContent: {
        padding: 16,
    },
    tabContentText: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: "center",
        marginTop: 40,
    },
    reviewsTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 20,
    },
    reviewCard: {
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 8,
    },
    reviewStars: {
        flexDirection: "row",
        gap: 2,
    },
    reviewAuthor: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
    },
    reviewTimestamp: {
        fontSize: 14,
        color: "#6B7280",
        marginLeft: "auto",
    },
    reviewText: {
        fontSize: 16,
        color: "#4B5563",
        lineHeight: 24,
    },
})
