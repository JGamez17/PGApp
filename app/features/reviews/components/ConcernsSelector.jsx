import { View, Text } from 'react-native';
import Checkbox from 'expo-checkbox';

const concernOptions = [
    "Ads",
    "Chat with strangers",
    "Privacy issues",
    "In-app purchases",
    "Violent content",
    "Addictive design",
    "Inappropriate themes"
];

export default function ConcernsSelector({ selections, onSelect }) {
    const handleCheck = (option) => {
        const newSelections = selections.includes(option)
            ? selections.filter(item => item !== option)
            : [...selections, option];

        onSelect(newSelections);
    };

    return (
        <View className="mb-6">
            <Text className="font-bold mb-3">Did you have any concerns?</Text>

            <View className="flex-row flex-wrap">
                {concernOptions.map(option => (
                    <View key={option} className="w-1/2 flex-row items-center my-2">
                        <Checkbox
                            value={selections.includes(option)}
                            onValueChange={() => handleCheck(option)}
                            color={selections.includes(option) ? '#4f46e5' : undefined}
                        />
                        <Text className="ml-3 text-sm">{option}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}