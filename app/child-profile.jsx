"use client"

import { useState, useEffect } from "react"
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Alert,
    Modal,
    ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuth } from "../contexts/AuthContext"

export default function ChildProfileScreen() {
    const router = useRouter()
    const { childProfile, completeChildProfile, updateChildProfile, isLoading: authLoading } = useAuth()

    const [childName, setChildName] = useState("")
    const [birthYear, setBirthYear] = useState("")
    const [selectedInterests, setSelectedInterests] = useState([])
    const [supervisionLevel, setSupervisionLevel] = useState("")
    const [selectedDevices, setSelectedDevices] = useState([])
    const [showYearPicker, setShowYearPicker] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const currentYear = new Date().getFullYear()
    const age = birthYear ? currentYear - Number.parseInt(birthYear) : 0

    // Load existing child profile data
    useEffect(() => {
        if (childProfile) {
            console.log("ChildProfile: Loading existing profile data", childProfile)
            setChildName(childProfile.childName || "")
            setBirthYear(childProfile.birthYear || "")
            setSelectedInterests(childProfile.interests || [])
            setSupervisionLevel(childProfile.supervisionLevel || "")
            setSelectedDevices(childProfile.devices || [])
            setIsEditing(true)
        }
    }, [childProfile])

    // Generate birth year options (ages 2-17)
    const birthYearOptions = []
    for (let year = currentYear - 2; year >= currentYear - 17; year--) {
        const childAge = currentYear - year
        birthYearOptions.push({
            year: year.toString(),
            age: childAge,
            label: `${year} (${childAge} years old)`,
        })
    }

    const interests = [
        "Reading & Stories",
        "Math & Numbers",
        "Art & Creativity",
        "Science & Discovery",
        "Music & Dance",
        "Sports & Physical Activity",
        "Coding & Technology",
        "Nature & Animals",
    ]

    const devices = ["Smartphone", "Tablet/iPad", "Computer", "Smart Watch", "Gaming Console", "Smart TV"]

    const supervisionOptions = [
        {
            value: "Close supervision",
            description: "I watch and guide during app use",
        },
        {
            value: "Occasional check-ins",
            description: "I monitor periodically",
        },
        {
            value: "Independent use",
            description: "Child uses apps independently with set rules",
        },
    ]

    const toggleInterest = (interest) => {
        setSelectedInterests((prev) => {
            if (prev.includes(interest)) {
                return prev.filter((i) => i !== interest)
            } else if (prev.length < 3) {
                return [...prev, interest]
            } else {
                Alert.alert("Maximum Selection", "You can select up to 3 interests")
                return prev
            }
        })
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

    const handleSaveProfile = async () => {
        if (!isComplete) {
            Alert.alert("Incomplete Profile", "Please fill out all required fields")
            return
        }

        setIsLoading(true)

        const profileData = {
            childName: childName.trim(),
            birthYear,
            age,
            selectedInterests,
            supervisionLevel,
            selectedDevices,
        }

        console.log("ChildProfile: Saving profile data", profileData)

        try {
            let result
            if (isEditing) {
                result = await updateChildProfile(profileData)
            } else {
                result = await completeChildProfile(profileData)
            }

            if (result.success) {
                console.log("ChildProfile: Profile saved successfully")
                // Directly navigate to the dashboard without an alert
                console.log("ChildProfile: Navigating to dashboard after update")
                router.replace("/(tabs)")
            } else {
                Alert.alert("Error", result.error || "Failed to save child profile")
            }
        } catch (error) {
            console.error("ChildProfile: Error saving profile:", error)
            Alert.alert("Error", "An unexpected error occurred. Please try again.")
        } finally {
            setIsLoading(false)
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

    const YearPickerModal = () => (
        <Modal
            visible={showYearPicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowYearPicker(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Birth Year</Text>
                        <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                            <Ionicons name="close" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.yearList}>
                        {birthYearOptions.map((option) => (
                            <TouchableOpacity
                                key={option.year}
                                style={[styles.yearOption, birthYear === option.year && styles.selectedYearOption]}
                                onPress={() => {
                                    setBirthYear(option.year)
                                    setShowYearPicker(false)
                                }}
                            >
                                <Text style={[styles.yearOptionText, birthYear === option.year && styles.selectedYearOptionText]}>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )

    if (authLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4F7EFF" />
                    <Text style={styles.loadingText}>Loading profile...</Text>
                </View>
            </SafeAreaView>
        )
    }

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
                    <Text style={styles.title}>{isEditing ? "Edit Child Profile" : "Child Profile"}</Text>
                    <Text style={styles.subtitle}>
                        {isEditing
                            ? "Update your child's information to keep recommendations current."
                            : "Tell us about your child to get personalized recommendations."}
                    </Text>
                </View>

                {/* Progress */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Profile Completion</Text>
                        {/* Ensure dynamic content is a single string */}
                        <Text style={styles.progressCount}>{`${getCompletionCount()}/4`}</Text>
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
                        {childName.trim() && (
                            <View>
                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                            </View>
                        )}
                    </View>
                    <TextInput
                        style={styles.textInput}
                        value={childName}
                        onChangeText={setChildName}
                        placeholder="Enter child's name"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Birth Year */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Birth Year</Text>
                        {birthYear && (
                            <View>
                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                            </View>
                        )}
                    </View>
                    <TouchableOpacity style={styles.dropdown} onPress={() => setShowYearPicker(true)}>
                        <Text style={[styles.dropdownText, !birthYear && styles.placeholderText]}>
                            {birthYear ? `${birthYear} (${age} years old)` : "Select birth year"}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#6B7280" />
                    </TouchableOpacity>
                    {birthYear && <Text style={styles.ageText}>{`Age: ${age} years old`}</Text>}
                </View>

                {/* Child's Interests */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Child's Interests</Text>
                        {selectedInterests.length > 0 && (
                            <View>
                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                            </View>
                        )}
                    </View>
                    <Text style={styles.sectionDescription}>Select 1 to 3 interests that best describe your child.</Text>
                    {/* Ensure dynamic content is a single string */}
                    <Text style={styles.selectionCount}>
                        {`${selectedInterests.length}/3 selected${selectedInterests.length > 0 && selectedInterests.length <= 3 ? " · Good selection" : ""}`}
                    </Text>

                    <View style={styles.interestsContainer}>
                        {interests.map((interest) =>
                            renderCheckbox(interest, selectedInterests.includes(interest), () => toggleInterest(interest)),
                        )}
                    </View>
                </View>

                {/* Supervision Level */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Supervision Level</Text>
                        {supervisionLevel && <Ionicons name="checkmark-circle" size={16} color="#10B981" />}
                    </View>
                    <Text style={styles.sectionDescription}>How closely do you supervise your child's app use?</Text>

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

                    {/* Ensure dynamic content is a single string */}
                    <Text style={styles.deviceCount}>
                        {`${selectedDevices.length} ${selectedDevices.length === 1 ? "device" : "devices"} selected`}
                    </Text>
                </View>

                {/* Save Profile Button */}
                <TouchableOpacity
                    style={[styles.createButton, isComplete && styles.createButtonActive]}
                    onPress={handleSaveProfile}
                    disabled={!isComplete || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={[styles.createButtonText, isComplete && styles.createButtonTextActive]}>
                            {isEditing ? "UPDATE PROFILE" : "CREATE PROFILE"}
                        </Text>
                    )}
                </TouchableOpacity>

                {isComplete && !isLoading && (
                    <View style={styles.readyContainer}>
                        <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                        <Text style={styles.readyText}>{isEditing ? "Ready to update profile" : "Ready to create profile"}</Text>
                    </View>
                )}
            </ScrollView>

            <YearPickerModal />
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: "#6B7280",
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
    placeholderText: {
        color: "#9CA3AF",
        fontWeight: "400",
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
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "70%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
    },
    yearList: {
        maxHeight: 400,
    },
    yearOption: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F9FAFB",
    },
    selectedYearOption: {
        backgroundColor: "#EEF2FF",
    },
    yearOptionText: {
        fontSize: 16,
        color: "#1F2937",
    },
    selectedYearOptionText: {
        color: "#4F7EFF",
        fontWeight: "500",
    },
})
