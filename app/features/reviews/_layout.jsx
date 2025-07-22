import { Stack } from "expo-router"

export default function ReviewsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="review-tab" />
            <Stack.Screen name="create" />
            <Stack.Screen name="components" />
        </Stack>
    )
}
