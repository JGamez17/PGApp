"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

export default function AppLibraryScreen() {
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState("All Categories")
    const [searchText, setSearchText] = useState("") // New state for search text

    const apps = [
        {
            id: 1,
            name: "Duolingo ABC",
            category: "Languages",
            description: "Learn languages through play and memory.",
            rating: 8.6,
            approval: "97%",
            ageRange: "age 5-8",
            tags: ["Reading", "Spelling"],
            icon: "🦉",
            hasWatch: true,
        },
        {
            id: 2,
            name: "Khan Academy Kids",
            category: "Khan Academy",
            description: "Fun, free educational activities for kids.",
            ageRange: "age 5-8",
            tags: ["Reading"],
            icon: "👨‍🎓",
            hasWatch: true,
        },
        {
            id: 3,
            name: "Scratch Jr",
            category: "Learning to code with visual blocks.",
            appStoreRating: 4.5,
            googlePlayRating: 4.3,
            playguardRating: "8/10",
            ageRange: "Age 5-7",
            tags: ["Education"],
            downloads: "15k ↑ 941 ↓",
            approval: "98%",
            icon: "🐱",
        },
        {
            id: 4,
            name: "Toca Life World",
            category: "Toca Boca",
            description: "Create stories and build your own world.",
            appStoreRating: 4.6,
            googlePlayRating: 4.4,
            playguardRating: "8/10",
            ageRange: "Age 6-12",
            tags: ["Gaming"],
            downloads: "18k ↑ 1.1k ↓",
            approval: "96%",
            icon: "🏠",
        },
    ]

    const categories = ["All Categories", "Simulation", "Education", "Gaming"]

    const handleAppPress = (app) => {
        console.log("Navigating to app detail for:", app.name)
        router.push({
            pathname: "/app-detail",
            params: {
                id: app.id,
                name: app.name,
            },
        })
    }

    // Filter apps based on search text
    const filteredApps = apps.filter((app) => {
        const lowerCaseSearchText = searchText.toLowerCase()
        return (
            app.name.toLowerCase().includes(lowerCaseSearchText) || app.category.toLowerCase().includes(lowerCaseSearchText)
        )
    })

    const renderApp = (app) => (
        <TouchableOpacity key={app.id} style={styles.appCard} onPress={() => handleAppPress(app)}>
            <View style={styles.appHeader}>
                <View style={styles.appIconContainer}>
                    <Text style={styles.appIcon}>{app.icon}</Text>
                </View>
                <View style={styles.appInfo}>
                    <Text style={styles.appName}>{app.name}</Text>
                    <Text style={styles.appCategory}>{app.category}</Text>
                </View>
                {app.hasWatch && (
                    <TouchableOpacity style={styles.watchButton} onPress={(e) => e.stopPropagation()}>
                        <Text style={styles.watchButtonText}>WATCH</Text>
                    </TouchableOpacity>
                )}
                {/* Wrap Ionicons in View */}
                <View>
                    <TouchableOpacity onPress={(e) => e.stopPropagation()}>
                        <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            {app.description && <Text style={styles.appDescription}>{app.description}</Text>}

            <View style={styles.tagsContainer}>
                {app.tags.map((tag, index) => (
                    <View key={index} style={[styles.tag, tag === "Gaming" ? styles.gamingTag : styles.educationTag]}>
                        <Text style={[styles.tagText, tag === "Gaming" ? styles.gamingTagText : styles.educationTagText]}>
                            {tag}
                        </Text>
                    </View>
                ))}
                <View style={styles.ageTag}>
                    <Text style={styles.ageTagText}>{app.ageRange}</Text>
                </View>
            </View>

            {app.rating && (
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingItem}>
                        <Text style={styles.ratingNumber}>🔥 {app.rating}</Text>
                    </View>
                    <View style={styles.ratingItem}>
                        <Text style={styles.approvalText}>👍 {app.approval}</Text>
                    </View>
                </View>
            )}

            {app.appStoreRating && (
                <View style={styles.detailedRatings}>
                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingLabel}>⭐ {app.appStoreRating}</Text>
                        <Text style={styles.ratingLabel}>⭐ {app.googlePlayRating}</Text>
                        <Text style={styles.ratingLabel}>✅ {app.playguardRating}</Text>
                    </View>
                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingSubLabel}>App Store</Text>
                        <Text style={styles.ratingSubLabel}>Google Play</Text>
                        <Text style={styles.ratingSubLabel}>Playguard</Text>
                    </View>
                    <View style={styles.statsRow}>
                        <Text style={styles.downloads}>{app.downloads}</Text>
                        <Text style={styles.approval}>🛡️ {app.approval}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.logo}>
                        <Ionicons name="shield" size={20} color="#FFFFFF" />
                    </View>
                    <Text style={styles.headerTitle}>Playguard</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Text style={styles.profileText}>Leo ⌄</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* App Library Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>App Library</Text>
                    <TouchableOpacity style={styles.filterButton}>
                        {/* Wrap Ionicons in View */}
                        <View>
                            <Ionicons name="filter" size={16} color="#666" />
                        </View>
                        <Text style={styles.filterText}>Filter</Text>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search safe apps & games"
                        placeholderTextColor="#999"
                        value={searchText} // Bind value to searchText state
                        onChangeText={setSearchText} // Update searchText on change
                    />
                </View>

                {/* Recommendation Banner */}
                <View style={styles.recommendationBanner}>
                    <Text style={styles.recommendationIcon}>🚀</Text>
                    <View>
                        <Text style={styles.recommendationTitle}>Recommended for Age 8</Text>
                        <Text style={styles.recommendationSubtitle}>based on your child's reading level</Text>
                    </View>
                </View>

                {/* App List (now using filteredApps) */}
                {filteredApps.slice(0, 2).map(renderApp)}

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category && styles.selectedCategoryButton,
                                category === "Simulation" && styles.simulationButton,
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryButtonText,
                                    selectedCategory === category && styles.selectedCategoryButtonText,
                                    category === "Simulation" && styles.simulationButtonText,
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* All Apps Section */}
                <View style={styles.allAppsHeader}>
                    <Text style={styles.allAppsTitle}>All Apps</Text>
                    <TouchableOpacity>
                        <Text style={styles.sortText}>All ages / Popular ⌄</Text>
                    </TouchableOpacity>
                </View>

                {filteredApps.slice(2).map(renderApp)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#4F7EFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    profileButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    profileText: {
        fontSize: 16,
        color: "#4F7EFF",
        fontWeight: "500",
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
    },
    filterText: {
        marginLeft: 4,
        color: "#666",
    },
    searchContainer: {
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    recommendationBanner: {
        backgroundColor: "#4F7EFF",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    recommendationIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    recommendationTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    recommendationSubtitle: {
        color: "#fff",
        fontSize: 14,
        opacity: 0.9,
    },
    appCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    appHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    appIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    appIcon: {
        fontSize: 24,
    },
    appInfo: {
        flex: 1,
    },
    appName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    appCategory: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    watchButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#4F7EFF",
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    watchButtonText: {
        color: "#4F7EFF",
        fontSize: 12,
        fontWeight: "bold",
    },
    appDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
        lineHeight: 20,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 12,
    },
    tag: {
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 4,
    },
    educationTag: {
        backgroundColor: "#e8f5e8",
    },
    gamingTag: {
        backgroundColor: "#8B5CF6",
    },
    tagText: {
        fontSize: 12,
        fontWeight: "500",
    },
    educationTagText: {
        color: "#2d5a2d",
    },
    gamingTagText: {
        color: "#fff",
    },
    ageTag: {
        backgroundColor: "#f0f0f0",
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    ageTagText: {
        fontSize: 12,
        color: "#666",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingItem: {
        marginRight: 16,
    },
    ratingNumber: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    approvalText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#4CAF50",
    },
    detailedRatings: {
        marginTop: 8,
    },
    ratingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    ratingLabel: {
        fontSize: 14,
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
    },
    ratingSubLabel: {
        fontSize: 12,
        color: "#666",
        flex: 1,
        textAlign: "center",
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },
    downloads: {
        fontSize: 12,
        color: "#666",
    },
    approval: {
        fontSize: 12,
        color: "#4CAF50",
        fontWeight: "bold",
    },
    categoriesContainer: {
        marginVertical: 16,
    },
    categoryButton: {
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    selectedCategoryButton: {
        backgroundColor: "#4F7EFF",
    },
    simulationButton: {
        backgroundColor: "#8B5CF6",
    },
    categoryButtonText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    selectedCategoryButtonText: {
        color: "#fff",
    },
    simulationButtonText: {
        color: "#fff",
    },
    allAppsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 16,
    },
    allAppsTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    sortText: {
        fontSize: 14,
        color: "#666",
    },
})
