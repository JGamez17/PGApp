import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';

const tipSuggestions = [
    "Set time limits for usage",
    "Enable parental controls in settings",
    "Play together initially",
    "Discuss in-app purchases rules",
    "Monitor chat interactions",
    "Review privacy settings monthly"
];

export default function TipSuggestions({ value, onChange }) {
    const [showSuggestions, setShowSuggestions] = useState(false);

    return (
        <View className="mb-4">
            <Text className="font-bold mb-3">
                Any tips for other parents?
            </Text>

            <TextInput
                placeholder="Share your advice..."
                value={value}
                onChangeText={onChange}
                multiline
                className="border border-gray-300 rounded-lg p-4 min-h-[120]"
                onFocus={() => setShowSuggestions(true)}
            />

            {showSuggestions && (
                <View className="mt-3 bg-gray-50 rounded-lg p-3">
                    <Text className="text-gray-600 mb-2">Quick suggestions:</Text>
                    <FlatList
                        data={tipSuggestions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    onChange(item);
                                    setShowSuggestions(false);
                                }}
                                className="py-2 border-b border-gray-100"
                            >
                                <Text className="text-indigo-700">{item}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity
                        onPress={() => setShowSuggestions(false)}
                        className="mt-3 self-end"
                    >
                        <Text className="text-gray-500">Close</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}