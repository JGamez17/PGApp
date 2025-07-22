"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

export default function ChildProfileScreen() {
    const router = useRouter()
    const [childName, setChildName] = useState("Ben")
    const [birthYear, setBirthYear] = useState("2015")
    const [selectedInterests, setSelectedInterests] = useState(["Math & Numbers"])
    const [supervisionLevel, setSupervisionLevel] = useState("Close supervision")
    const [selectedDevices, setSelectedDevices] = useState(["Smartphone"])
    const [customInterest, setCustomInterest] = useState("")

    const currentYear = new Date().getFullYear()
    const age = currentYear - Number.parseInt(birthYear)

    const interests = ["Reading & Stories", "Math & Numbers", "Art & Creativity", "Science & Discovery"]

    const devices = ["Smartphone", "Tablet/iPad", "Computer", "Smart Watch"]

    const supervisionOptions = [
        {
            value: "Close supervision",
            description: "I watch and guide during app use",
        },
        {
            value: "Occasional check-ins",
            description: "I monitor periodically",
        },
    ]

    const toggleInterest = (interest) => {
        setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
    }

    const toggleDevice = (device) => {
        setSelectedDevices((prev) => (prev.includes(device) ? prev.filter((d) => d !== device) : [...prev, device]))
    }

    const getCompletionCount = () => {
        let count = 0
        if (childName.trim()) count++
        if (birthYear) count++
        if (selectedInterests.length > 0) count++
        if (supervisionLevel) count++
        return count
    }

    const isComplete = getCompletionCount() === 4

    const handleCreateProfile = () => {
        if (isComplete) {
            console.log("Creating child profile:", {
                childName,
                birthYear,
                age,
                selectedInterests,
                supervisionLevel,
                selectedDevices,
            })
            // Navigate to main app
            router.replace("/(tabs)")
        }
    }

    const renderCheckbox = (item, isSelected, onPress) => (
        <TouchableOpacity key={item} style={styles.checkboxContainer} onPress={onPress}>
            <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
            <Text style={[styles.checkboxText, isSelected && styles.checkboxTextSelected]}>{item}</Text>
        </TouchableOpacity>
    )

    const renderRadioButton = (option, isSelected, onPress) => (
        <TouchableOpacity key={option.value} style={styles.radioContainer} onPress={onPress}>
            <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                {isSelected && <View style={styles.radioButtonInner} />}
            </View>
            <View style={styles.radioTextContainer}>
                <Text style={[styles.radioText, isSelected && styles.radioTextSelected]}>{option.value}</Text>
                <Text style={styles.radioDescription}>{option.description}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Ionicons name="shield" size={20} color="#FFFFFF" />
                        </View>
                        <Text style={styles.brandName}>Playguard</Text>
                    </View>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Child Profile</Text>
                    <Text style={styles.subtitle}>Tell us about your child to get personalized recommendations.</Text>
                </View>

                {/* Progress */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Profile Completion</Text>
                        <Text style={styles.progressCount}>{getCompletionCount()}/4</Text>
                    </View>
                    {isComplete && (
                        <View style={styles.completedContainer}>
                            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                            <Text style={styles.completedText}>All required fields completed!</Text>
                        </View>
                    )}
                </View>

                {/* Child's Name */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Child's Name</Text>
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    </View>
                    <TextInput
                        style={styles.textInput}
                        value={childName}
                        onChangeText={setChildName}
                        placeholder="Enter child's name"
                    />
                </View>

                {/* Birth Year */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Birth Year</Text>
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    </View>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>
                            {birthYear} ({age} YEARS OLD)
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#6B7280" />
                    </TouchableOpacity>
                    <Text style={styles.ageText}>Age: {age} years old</Text>
                </View>

                {/* Child's Interests */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Child's Interests</Text>
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    </View>
                    <Text style={styles.sectionDescription}>Select 1 to 3 interests that best describe your child.</Text>
                    <Text style={styles.selectionCount}>1/3 selected · Good selection</Text>

                    <View style={styles.interestsContainer}>
                        {interests.map((interest) =>
                            renderCheckbox(interest, selectedInterests.includes(interest), () => toggleInterest(interest)),
                        )}
                    </View>

                    <TouchableOpacity style={styles.customInterestButton}>
                        <Text style={styles.customInterestText}>Add custom interest...</Text>
                    </TouchableOpacity>
                </View>

                {/* Supervision Level */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Supervision Level</Text>
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    </View>
                    <Text style={styles.sectionDescription}>How closely do you supervise when your child's app use?</Text>

                    <View style={styles.supervisionContainer}>
                        {supervisionOptions.map((option) =>
                            renderRadioButton(option, supervisionLevel === option.value, () => setSupervisionLevel(option.value)),
                        )}
                    </View>
                </View>

                {/* Devices Used */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Devices Used <Text style={styles.optional}>(Optional)</Text>
                    </Text>
                    <Text style={styles.sectionDescription}>Select all devices your child uses to access apps.</Text>

                    <View style={styles.devicesContainer}>
                        {devices.map((device) =>
                            renderCheckbox(device, selectedDevices.includes(device), () => toggleDevice(device)),
                        )}
                    </View>

                    <Text style={styles.deviceCount}>{selectedDevices.length} device selected</Text>
                </View>

                {/* Create Profile Button */}
                <TouchableOpacity
                    style={[styles.createButton, isComplete && styles.createButtonActive]}
                    onPress={handleCreateProfile}
                    disabled={!isComplete}
                >
                    <Text style={[styles.createButtonText, isComplete && styles.createButtonTextActive]}>CREATE PROFILE</Text>
                </TouchableOpacity>

                {isComplete && (
                    <View style={styles.readyContainer}>
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                        <Text style={styles.readyText}>Ready to create profile</Text>
                    </View>
                )}
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
        alignItems: "center",
        paddingVertical: 20,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    logo: {
        width: 32,
        height: 32,
        backgroundColor: "#4F7EFF",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    brandName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
    },
    titleContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        lineHeight: 20,
    },
    progressContainer: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    progressTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#6B7280",
    },
    progressCount: {
        fontSize: 14,
        fontWeight: "500",
        color: "#6B7280",
    },
    completedContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    completedText: {
        fontSize: 14,
        color: "#10B981",
        fontWeight: "500",
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
    },
    optional: {
        color: "#6B7280",
        fontWeight: "400",
    },
    sectionDescription: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 8,
        lineHeight: 20,
    },
    selectionCount: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 12,
    },
    textInput: {
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: "#1F2937",
    },
    dropdown: {
        backgroundColor: "#F3F4F6",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    dropdownText: {
        fontSize: 16,
        color: "#1F2937",
        fontWeight: "500",
    },
    ageText: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 4,
    },
    interestsContainer: {
        gap: 8,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        gap: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#D1D5DB",
        alignItems: "center",
        justifyContent: "center",
    },
    checkboxSelected: {
        backgroundColor: "#4F7EFF",
        borderColor: "#4F7EFF",
    },
    checkboxText: {
        fontSize: 16,
        color: "#1F2937",
    },
    checkboxTextSelected: {
        fontWeight: "500",
    },
    customInterestButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    customInterestText: {
        fontSize: 16,
        color: "#6B7280",
    },
    supervisionContainer: {
        gap: 12,
        marginTop: 8,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        gap: 12,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#D1D5DB",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    radioButtonSelected: {
        borderColor: "#4F7EFF",
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#4F7EFF",
    },
    radioTextContainer: {
        flex: 1,
    },
    radioText: {
        fontSize: 16,
        color: "#1F2937",
        marginBottom: 2,
    },
    radioTextSelected: {
        fontWeight: "500",
    },
    radioDescription: {
        fontSize: 14,
        color: "#6B7280",
        lineHeight: 18,
    },
    devicesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 8,
    },
    deviceCount: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 8,
    },
    createButton: {
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#E5E7EB",
        marginBottom: 12,
    },
    createButtonActive: {
        backgroundColor: "#4F7EFF",
    },
    createButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#9CA3AF",
        letterSpacing: 0.5,
    },
    createButtonTextActive: {
        color: "#FFFFFF",
    },
    readyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginBottom: 20,
    },
    readyText: {
        fontSize: 14,
        color: "#10B981",
        fontWeight: "500",
    },
})
