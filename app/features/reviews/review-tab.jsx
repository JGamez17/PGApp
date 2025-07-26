"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ReviewTab = () => {
    const [activeFilter, setActiveFilter] = useState("ALL_REVIEWS")
    const [searchText, setSearchText] = useState("")

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
                    <Text style={styles.resultsCount}>4 reviews found</Text>
                    <TouchableOpacity>
                        <Text style={styles.sortButton}>SORT BY HELPFUL</Text>
                    </TouchableOpacity>
                </View>

                {/* App Card */}
                <TouchableOpacity style={styles.appCard}>
                    <View style={styles.appIcon}>
                        <Text style={styles.appIconText}>🐱</Text>
                    </View>
                    <View style={styles.appInfo}>
                        <View style={styles.appHeader}>
                            <Text style={styles.appName}>Scratch Jr</Text>
                            {/* Wrap Ionicons in View */}
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

                {/* Review Card */}
                <View style={styles.reviewCard}>
                    {/* User Info */}
                    <View style={styles.userHeader}>
                        <View style={styles.userInfo}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>SM</Text>
                            </View>
                            <View style={styles.userDetails}>
                                <View style={styles.userName}>
                                    <Text style={styles.userNameText}>Sarah M.</Text>
                                    {/* Wrap Ionicons in View */}
                                    <View>
                                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                    </View>
                                </View>
                                <Text style={styles.userMeta}>Parent of Age 6 • 23 reviews</Text>
                            </View>
                        </View>
                        <Text style={styles.timestamp}>3 days ago</Text>
                    </View>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <View style={styles.starsContainer}>
                            {renderStars(5)}
                            <Text style={styles.ratingText}>5.0</Text>
                        </View>
                        <View style={styles.safetyRating}>
                            <Ionicons name="shield-checkmark" size={16} color="#10B981" />
                            <Text style={styles.safetyText}>4.9</Text>
                        </View>
                    </View>

                    {/* Review Content */}
                    <Text style={styles.reviewTitle}>Perfect introduction to coding!</Text>
                    <Text style={styles.reviewText}>
                        My 6-year-old absolutely loves this app. The interface is intuitive and the visual programming blocks make
                        it easy for her to create her own stories and games. No ads or in-app purchases which is a huge plus. Safety
                        features are excellent.
                    </Text>

                    {/* Safety Highlights */}
                    <View style={styles.safetySection}>
                        <View style={styles.safetySectionHeader}>
                            {/* Wrap Ionicons in View */}
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

                    {/* Category Tags */}
                    <View style={styles.categoryTags}>
                        {renderTag("Educational", "category")}
                        {renderTag("No Ads", "category")}
                        {renderTag("Safe", "category")}
                    </View>

                    {/* Actions */}
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="thumbs-up-outline" size={16} color="#6B7280" />
                            <Text style={styles.actionText}>HELPFUL (24)</Text>
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
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1F2937",
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        gap: 6,
    },
    filterButtonText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
        letterSpacing: 0.5,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#1F2937",
    },
    filterTabs: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    filterTab: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginRight: 12,
        borderRadius: 25,
        backgroundColor: "#F3F4F6",
        gap: 8,
    },
    activeFilterTab: {
        backgroundColor: "#4F7EFF",
    },
    filterTabText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280",
    },
    activeFilterTabText: {
        color: "#FFFFFF",
    },
    countBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        backgroundColor: "#E5E7EB",
    },
    activeCountBadge: {
        backgroundColor: "#8B5CF6",
    },
    countText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
    },
    activeCountText: {
        color: "#FFFFFF",
    },
    resultsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    resultsCount: {
        fontSize: 16,
        color: "#6B7280",
    },
    sortButton: {
        fontSize: 14,
        fontWeight: "600",
        color: "#4F7EFF",
        letterSpacing: 0.5,
    },
    appCard: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 16,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
    },
    appIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    appIconText: {
        fontSize: 24,
    },
    appInfo: {
        flex: 1,
    },
    appHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    appName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
    },
    appTags: {
        flexDirection: "row",
        gap: 8,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    tagText: {
        fontSize: 12,
        fontWeight: "600",
    },
    reviewCard: {
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },
    userHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    avatarText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1E40AF",
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 2,
    },
    userNameText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
    },
    userMeta: {
        fontSize: 14,
        color: "#6B7280",
    },
    timestamp: {
        fontSize: 14,
        color: "#6B7280",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    starsContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
        marginLeft: 4,
    },
    safetyRating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    safetyText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#10B981",
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 12,
    },
    reviewText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#4B5563",
        marginBottom: 20,
    },
    safetySection: {
        marginBottom: 16,
    },
    safetySectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 8,
    },
    safetySectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#10B981",
    },
    safetyTags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    categoryTags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 20,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    actionText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
        letterSpacing: 0.5,
    },
    heartButton: {
        marginLeft: "auto",
    },
})

export default ReviewTab
