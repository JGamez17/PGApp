"use client"

import { useState, useCallback } from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "expo-router"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../../../config/firebase"

const ReviewTab = () => {
    const [activeFilter, setActiveFilter] = useState("ALL_REVIEWS")
    const [searchText, setSearchText] = useState("")
    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState(true)

    const filterTabs = [
        { id: "ALL_REVIEWS", label: "ALL REVIEWS", count: 2847 },
        { id: "RECENT", label: "RECENT", count: 156 },
        { id: "VERIFIED", label: "VERIFIED", count: null },
    ]

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Ionicons key={index} name="star" size={16} color={index < rating ? "#FF8A00" : "#E5E7EB"} />
        ))
    }

    const renderTag = (text, style = "default") => {
        const tagStyles = {
            education: { backgroundColor: "#8B5CF6", color: "#FFFFFF" },
            age: { backgroundColor: "#F3F4F6", color: "#6B7280" },
            safety: { backgroundColor: "#DCFCE7", color: "#16A34A" },
            category: { backgroundColor: "#8B5CF6", color: "#FFFFFF" },
            default: { backgroundColor: "#F3F4F6", color: "#6B7280" },
        }

        const tagStyle = tagStyles[style] || tagStyles.default

        return (
            <View style={[styles.tag, { backgroundColor: tagStyle.backgroundColor }]}>
                <Text style={[styles.tagText, { color: tagStyle.color }]}>{text}</Text>
            </View>
        )
    }

    const fetchReviews = useCallback(async () => {
        setLoadingReviews(true)
        try {
            if (!db) {
                console.error("Firestore DB is not initialized.")
                setReviews([])
                return
            }
            const reviewsCollectionRef = collection(db, "reviews")
            const q = query(reviewsCollectionRef, orderBy("createdAt", "desc"))
            const querySnapshot = await getDocs(q)
            const fetchedReviews = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                // Convert Firestore Timestamp to a readable format if needed
                timestamp: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleDateString() : "N/A",
            }))
            setReviews(fetchedReviews)
            console.log("Fetched reviews:", fetchedReviews)
        } catch (error) {
            console.error("Error fetching reviews:", error)

        } finally {
            setLoadingReviews(false)
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchReviews()
            return () => {

            }
        }, [fetchReviews]),
    )

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#FFFFFF",
        },
        scrollView: {
            flex: 1,
            padding: 20,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
        },
        filterButton: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
        },
        filterButtonText: {
            marginLeft: 5,
            fontSize: 16,
            color: "#6B7280",
        },
        searchContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginBottom: 20,
        },
        searchIcon: {
            marginRight: 10,
        },
        searchInput: {
            flex: 1,
            fontSize: 16,
            color: "#000000",
        },
        filterTabs: {
            flexDirection: "row",
            marginBottom: 20,
        },
        filterTab: {
            marginRight: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: "#F3F4F6",
        },
        activeFilterTab: {
            backgroundColor: "#8B5CF6",
        },
        filterTabText: {
            fontSize: 16,
            color: "#6B7280",
        },
        activeFilterTabText: {
            color: "#FFFFFF",
        },
        countBadge: {
            marginLeft: 5,
            paddingHorizontal: 5,
            paddingVertical: 2,
            borderRadius: 5,
            backgroundColor: "#F3F4F6",
        },
        activeCountBadge: {
            backgroundColor: "#8B5CF6",
        },
        countText: {
            fontSize: 12,
            color: "#6B7280",
        },
        activeCountText: {
            color: "#FFFFFF",
        },
        resultsHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
        },
        resultsCount: {
            fontSize: 16,
            color: "#6B7280",
        },
        sortButton: {
            fontSize: 16,
            color: "#6B7280",
        },
        appCard: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
        },
        appIcon: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#E5E7EB",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
        },
        appIconText: {
            fontSize: 24,
            color: "#FFFFFF",
        },
        appInfo: {
            flex: 1,
        },
        appHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
        },
        appName: {
            fontSize: 18,
            fontWeight: "bold",
        },
        userHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
        },
        userInfo: {
            flexDirection: "row",
            alignItems: "center",
        },
        avatar: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#E5E7EB",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
        },
        avatarText: {
            fontSize: 16,
            color: "#FFFFFF",
        },
        userDetails: {
            flex: 1,
        },
        userName: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
        },
        userNameText: {
            fontSize: 16,
            fontWeight: "bold",
        },
        userMeta: {
            fontSize: 14,
            color: "#6B7280",
        },
        timestamp: {
            fontSize: 12,
            color: "#9CA3AF",
        },
        ratingContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
        },
        starsContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        ratingText: {
            marginLeft: 5,
            fontSize: 16,
            color: "#6B7280",
        },
        safetyRating: {
            flexDirection: "row",
            alignItems: "center",
        },
        safetyText: {
            marginLeft: 5,
            fontSize: 16,
            color: "#10B981",
        },
        reviewTitle: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 5,
        },
        reviewText: {
            fontSize: 16,
            color: "#6B7280",
            marginBottom: 10,
        },
        safetySection: {
            marginBottom: 10,
        },
        safetySectionHeader: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
        },
        safetySectionTitle: {
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 5,
        },
        safetyTags: {
            flexDirection: "row",
        },
        categoryTags: {
            flexDirection: "row",
        },
        actions: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        actionButton: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
        },
        actionText: {
            marginLeft: 5,
            fontSize: 16,
            color: "#6B7280",
        },
        heartButton: {
            backgroundColor: "#F3F4F6",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
        },
        loadingReviewsContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 50,
        },
        loadingReviewsText: {
            marginTop: 10,
            fontSize: 16,
            color: "#6B7280",
        },
        noReviewsContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 50,
            paddingHorizontal: 20,
        },
        noReviewsText: {
            fontSize: 16,
            color: "#6B7280",
            textAlign: "center",
        },
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Parent Reviews</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter" size={16} color="#6B7280" />
                        <Text style={styles.filterButtonText}>FILTER</Text>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search reviews..."
                        placeholderTextColor="#9CA3AF"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {/* Filter Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
                    {filterTabs.map((tab) => (
                        <TouchableOpacity
                            key={tab.id}
                            style={[styles.filterTab, activeFilter === tab.id && styles.activeFilterTab]}
                            onPress={() => setActiveFilter(tab.id)}
                        >
                            <Text style={[styles.filterTabText, activeFilter === tab.id && styles.activeFilterTabText]}>
                                {tab.label}
                            </Text>
                            {tab.count && (
                                <View style={[styles.countBadge, activeFilter === tab.id && styles.activeCountBadge]}>
                                    <Text style={[styles.countText, activeFilter === tab.id && styles.activeCountText]}>{tab.count}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Results Header */}
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsCount}>{reviews.length} reviews found</Text> {/* Update count */}
                    <TouchableOpacity>
                        <Text style={styles.sortButton}>SORT BY HELPFUL</Text>
                    </TouchableOpacity>
                </View>

                {/* App Card (static example, keep as is or remove if dynamic) */}
                <TouchableOpacity style={styles.appCard}>
                    <View style={styles.appIcon}>
                        <Text style={styles.appIconText}>🐱</Text>
                    </View>
                    <View style={styles.appInfo}>
                        <View style={styles.appHeader}>
                            <Text style={styles.appName}>Scratch Jr</Text>
                            <View>
                                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                            </View>
                        </View>
                        <View style={styles.appTags}>
                            {renderTag("Education", "education")}
                            {renderTag("Age 5-7", "age")}
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Dynamically rendered Review Cards */}
                {loadingReviews ? (
                    <View style={styles.loadingReviewsContainer}>
                        <ActivityIndicator size="large" color="#4F7EFF" />
                        <Text style={styles.loadingReviewsText}>Loading reviews...</Text>
                    </View>
                ) : reviews.length === 0 ? (
                    <View style={styles.noReviewsContainer}>
                        <Text style={styles.noReviewsText}>No reviews found yet. Be the first to write one!</Text>
                    </View>
                ) : (
                    reviews.map((review) => (
                        <View key={review.id} style={styles.reviewCard}>
                            {/* User Info */}
                            <View style={styles.userHeader}>
                                <View style={styles.userInfo}>
                                    <View style={styles.avatar}>
                                        <Text style={styles.avatarText}>{review.userAvatarText}</Text> {/* Use dynamic avatar text */}
                                    </View>
                                    <View style={styles.userDetails}>
                                        <View style={styles.userName}>
                                            <Text style={styles.userNameText}>{review.userName}</Text> {/* Use dynamic user name */}
                                            <View>
                                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                            </View>
                                        </View>
                                        <Text style={styles.userMeta}>
                                            Parent of Age {review.age} • {review.reviewsWritten || 0} reviews
                                        </Text>{" "}
                                        {/* Adjust meta */}
                                    </View>
                                </View>
                                <Text style={styles.timestamp}>{review.timestamp}</Text> {/* Use dynamic timestamp */}
                            </View>
                            {/* Rating */}
                            <View style={styles.ratingContainer}>
                                <View style={styles.starsContainer}>
                                    {renderStars(review.rating)}
                                    <Text style={styles.ratingText}>{review.rating}.0</Text>
                                </View>
                                {/* Safety rating (if applicable to fetched data) */}
                                <View style={styles.safetyRating}>
                                    <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                                    <Text style={styles.safetyText}>4.9</Text>
                                </View>
                            </View>
                            {/* Review Content */}
                            <Text style={styles.reviewTitle}>Review for: {review.appName}</Text> {/* Display app name */}
                            <Text style={styles.reviewText}>{review.text}</Text>
                            {/* Safety Highlights & Category Tags (if applicable to fetched data) */}
                            {/* You might need to add these fields to your review submission if you want them dynamic */}
                            <View style={styles.safetySection}>
                                <View style={styles.safetySectionHeader}>
                                    <View>
                                        <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                                    </View>
                                    <Text style={styles.safetySectionTitle}>Safety Highlights</Text>
                                </View>
                                <View style={styles.safetyTags}>
                                    {renderTag("No ads", "safety")}
                                    {renderTag("Offline mode", "safety")}
                                    {renderTag("Privacy focused", "safety")}
                                </View>
                            </View>
                            <View style={styles.categoryTags}>
                                {renderTag("Educational", "category")}
                                {renderTag("No Ads", "category")}
                                {renderTag("Safe", "category")}
                            </View>
                            {/* Actions */}
                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Ionicons name="thumbs-up-outline" size={16} color="#6B7280" />
                                    <Text style={styles.actionText}>HELPFUL (0)</Text> {/* Placeholder for likes */}
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                                    <Text style={styles.actionText}>REPLY</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.heartButton}>
                                    <Ionicons name="heart-outline" size={20} color="#6B7280" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReviewTab
