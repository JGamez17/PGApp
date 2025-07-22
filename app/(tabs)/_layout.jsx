import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",
                    borderTopWidth: 1,
                    borderTopColor: "#F3F4F6",
                    paddingVertical: 8,
                    height: 80,
                },
                tabBarActiveTintColor: "#4F7EFF",
                tabBarInactiveTintColor: "#9CA3AF",
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                    letterSpacing: 0.5,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "HOME",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="app-library"
                options={{
                    title: "APP LIBRARY",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "grid" : "grid-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="reviews"
                options={{
                    title: "REVIEWS",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
