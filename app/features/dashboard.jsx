"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

export default function Dashboard() {
    const router = useRouter()

    const activityStats = [
        {
            id: "reviews",
            title: "Reviews Written",
            count: 8,
            icon: "create",
            iconBg: "#4F7EFF",
            iconText: "2",
        },
        {
            id: "apps",
            title: "Apps Viewed",
            count: 32,
            icon: "eye",
            iconBg: "#4F7EFF",
            iconText: "%",
        },
    ]

    const recentActivities = [
        {
            id: 1,
            type: "review",
            title: "Reviewed Scratch Jr",
            rating: 5,
            likes: 12,
            timestamp: "2 days ago",
            icon: "🐱",
            iconBg: "#FEF3C7",
        },
        {
            id: 2,
            type: "view",
            title: "Viewed details Khan Academy Kids",
            timestamp: "3 days ago",
            icon: "🎓",
            iconBg: "#DBEAFE",
        },
        {
            id: 3,
            type: "rating",
            title: "Rated Toca Life World",
            rating: 4,
            timestamp: "1 week ago",
            icon: "🏠",
            iconBg: "#D1FAE5",
        },
        {
            id: 4,
            type: "review",
            title: "Reviewed Minecraft Education",
            rating: 4,
            likes: 8,
            timestamp: "2 weeks ago",
            icon: "⛏️",
            iconBg: "#E0E7FF",
        },
    ]

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Ionicons key={index} name="star" size={14} color={index < rating ? "#FF8A00" : "#E5E7EB"} />
        ))
    }

    const getActivityIcon = (type) => {
        switch (type) {
            case "review":
                return "create-outline"
            case "view":
                return "eye-outline"
            case "rating":
                return "star-outline"
            default:
                return "document-outline"
        }
    }

    const handleBrowseApps = () => {
        console.log("Dashboard: Navigating to app library")
        router.push("/(tabs)/app-library")
    }

    const handleWriteReview = () => {
        // Navigate to write review screen
        console.log("Write review pressed")
    }

    const handleViewAll = () => {
        // Navigate to full activity screen
        console.log("View all pressed")
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Ionicons name="pulse" size={20} color="#4F7EFF" />
                        <Text style={styles.headerTitle}>My Activity</Text>
                    </View>
                    <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAll}>
                        <Text style={styles.viewAllText}>VIEW ALL</Text>
                        <Ionicons name="open-outline" size={16} color="#4F7EFF" />
                    </TouchableOpacity>
                </View>

                {/* Activity Stats */}
                <View style={styles.statsContainer}>
                    {activityStats.map((stat) => (
                        <View key={stat.id} style={styles.statCard}>
                            <View style={styles.statHeader}>
                                <View style={[styles.statIcon, { backgroundColor: stat.iconBg }]}>
                                    <Text style={styles.statIconText}>{stat.iconText}</Text>
                                </View>
                                <Text style={styles.statTitle}>{stat.title}</Text>
                                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                            </View>
                            <Text style={styles.statCount}>{stat.count}</Text>
                        </View>
                    ))}
                </View>

                {/* Recent Activity */}
                <View style={styles.recentSection}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>

                    <View style={styles.activityList}>
                        {recentActivities.map((activity) => (
                            <TouchableOpacity key={activity.id} style={styles.activityItem}>
                                <View style={[styles.activityIcon, { backgroundColor: activity.iconBg }]}>
                                    <Text style={styles.activityIconText}>{activity.icon}</Text>
                                </View>

                                <View style={styles.activityContent}>
                                    <View style={styles.activityHeader}>
                                        <Ionicons name={getActivityIcon(activity.type)} size={16} color="#6B7280" />
                                        <Text style={styles.activityTitle}>{activity.title}</Text>
                                        {activity.type !== "view" && <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />}
                                    </View>

                                    <View style={styles.activityMeta}>
                                        {activity.rating && <View style={styles.ratingContainer}>{renderStars(activity.rating)}</View>}

                                        {activity.likes && (
                                            <View style={styles.likesContainer}>
                                                <Ionicons name="thumbs-up" size={12} color="#10B981" />
                                                <Text style={styles.likesText}>{activity.likes}</Text>
                                            </View>
                                        )}

                                        <Text style={styles.timestamp}>{activity.timestamp}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleBrowseApps}>
                        <Ionicons name="eye-outline" size={20} color="#6B7280" />
                        <Text style={styles.actionButtonText}>BROWSE APPS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton} onPress={handleWriteReview}>
                        <Ionicons name="create-outline" size={20} color="#6B7280" />
                        <Text style={styles.actionButtonText}>WRITE REVIEW</Text>
                    </TouchableOpacity>
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
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1F2937",
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#4F7EFF",
        letterSpacing: 0.5,
    },
    statsContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 16,
    },
    statHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
    },
    statIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    statIconText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    statTitle: {
        flex: 1,
        fontSize: 14,
        color: "#6B7280",
    },
    statCount: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
    },
    recentSection: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 16,
    },
    activityList: {
        gap: 12,
        marginBottom: 24,
    },
    activityItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 12,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        gap: 12,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    activityIconText: {
        fontSize: 20,
    },
    activityContent: {
        flex: 1,
    },
    activityHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 4,
    },
    activityTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "#1F2937",
    },
    activityMeta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        gap: 2,
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    likesText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#10B981",
    },
    timestamp: {
        fontSize: 12,
        color: "#9CA3AF",
        marginLeft: "auto",
    },
    actionButtons: {
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 12,
        paddingBottom: 20,
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        gap: 8,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280",
        letterSpacing: 0.5,
    },
})
