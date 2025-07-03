import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';

const enjoymentOptions = [
    "Fun games and activities",
    "Creative features (drawing, building)",
    "Learning new things",
    "Playing with friends or siblings",
    "Customizing characters or worlds",
    "Earning rewards or badges",
    "Exploring stories or adventures",
    "Solving puzzles or challenges",
    "Watching videos or listening to music",
    "Easy to use and navigate"
];

export default function EnjoymentSelector({ selections, onSelect }) {
    const [otherText, setOtherText] = useState('');

    const handleCheck = (option) => {
        const newSelections = selections.includes(option)
            ? selections.filter(item => item !== option)
            : [...selections, option];

        onSelect(newSelections);
    };

    const handleOther = () => {
        if (!otherText.trim()) return;

        const newSelections = [...selections, otherText];
        onSelect(newSelections);
        setOtherText('');
    };

    return (
        <View className="mb-6">
            <Text className="font-bold mb-3">What did your child enjoy most?</Text>

            {/* Predefined Options */}
            {enjoymentOptions.map(option => (
                <View key={option} className="flex-row items-center my-2">
                    <Checkbox
                        value={selections.includes(option)}
                        onValueChange={() => handleCheck(option)}
                        color={selections.includes(option) ? '#4f46e5' : undefined}
                    />
                    <Text className="ml-3">{option}</Text>
                </View>
            ))}

            {/* Other Option */}
            <View className="flex-row items-center my-2">
                <Checkbox
                    value={selections.some(s => !enjoymentOptions.includes(s))}
                    disabled
                />
                <View className="flex-1 ml-3">
                    <TextInput
                        placeholder="Other (please specify)"
                        value={otherText}
                        onChangeText={setOtherText}
                        onSubmitEditing={handleOther}
                        className="border-b border-gray-300 py-2"
                    />
                </View>
                <TouchableOpacity
                    onPress={handleOther}
                    disabled={!otherText.trim()}
                    className={`ml-3 px-3 py-1 rounded ${!otherText.trim() ? 'bg-gray-100' : 'bg-indigo-100'}`}
                >
                    <Text className={`${!otherText.trim() ? 'text-gray-400' : 'text-indigo-700'}`}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}