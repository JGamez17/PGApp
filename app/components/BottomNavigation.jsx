"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const BottomNavigation = ({ onTabPress }) => {
    const [activeTab, setActiveTab] = useState("HOME")

    const tabs = [
        {
            id: "HOME",
            label: "HOME",
            icon: "home",
            iconOutline: "home-outline",
        },
        {
            id: "APP_LIBRARY",
            label: "APP LIBRARY",
            icon: "grid",
            iconOutline: "grid-outline",
        },
        {
            id: "REVIEWS",
            label: "REVIEWS",
            icon: "chatbubble",
            iconOutline: "chatbubble-outline",
        },
    ]

    const handleTabPress = (tabId) => {
        setActiveTab(tabId)
        if (onTabPress) {
            onTabPress(tabId)
        }
    }

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity key={tab.id} style={styles.tab} onPress={() => handleTabPress(tab.id)} activeOpacity={0.7}>
                    <Ionicons
                        name={activeTab === tab.id ? tab.icon : tab.iconOutline}
                        size={24}
                        color={activeTab === tab.id ? "#4F7EFF" : "#9CA3AF"}
                        style={styles.icon}
                    />
                    <Text
                        style={[
                            styles.label,
                            {
                                color: activeTab === tab.id ? "#4F7EFF" : "#9CA3AF",
                                fontWeight: activeTab === tab.id ? "600" : "500",
                            },
                        ]}
                    >
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    icon: {
        marginBottom: 4,
    },
    label: {
        fontSize: 11,
        textAlign: "center",
        letterSpacing: 0.5,
    },
})

export default BottomNavigation
