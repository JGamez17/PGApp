import { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Button from "app/components/Button";
import Card from "app/components/Card";
import EnjoymentSelector from './components/EnjoymentSelector';
import ConcernsSelector from './components/ConcernsSelector';
import TipsSuggestions from './components/TipsSuggestions';

// Age options from requirements
const ageOptions = [
    'Under 3', '3-5 years', '6-8 years',
    '9-11 years', '12-14 years', '15+ years'
];

export default function CreateReview() {
    const params = useLocalSearchParams();
    const { appId, appName } = params;

    // Form state
    const [formData, setFormData] = useState({
        childAge: '',
        enjoyments: [],
        concerns: [],
        recommend: null,
        tip: ''
    });

    const handleSubmit = () => {
        console.log('Submitting review for:', appName, formData);
        alert('Review submitted successfully!');
        router.back();
    };

    return (
        <ScrollView className="flex-1 bg-gray-50 p-4">
            <Card className="mb-6">
                <Text className="text-xl font-bold text-center mb-2">
                    Reviewing: {appName}
                </Text>
            </Card>

            <Card>
                {/* Child Age Selector */}
                <View className="mb-6">
                    <Text className="font-bold mb-3">How old is your child?</Text>
                    <View className="flex-row flex-wrap">
                        {ageOptions.map(age => (
                            <Button
                                key={age}
                                variant={formData.childAge === age ? 'primary' : 'secondary'}
                                onPress={() => setFormData({ ...formData, childAge: age })}
                                className="mr-2 mb-2"
                                compact
                            >
                                {age}
                            </Button>
                        ))}
                    </View>
                </View>

                {/* What Did Your Child Enjoy? */}
                <EnjoymentSelector
                    selections={formData.enjoyments}
                    onSelect={(items) => setFormData({ ...formData, enjoyments: items })}
                />

                {/* Concerns Section */}
                <ConcernsSelector
                    selections={formData.concerns}
                    onSelect={(items) => setFormData({ ...formData, concerns: items })}
                />

                {/* Recommendation */}
                <View className="mb-6">
                    <Text className="font-bold mb-3">
                        Would you recommend this app to other parents?
                    </Text>
                    <View className="flex-row">
                        <Button
                            variant={formData.recommend === true ? 'primary' : 'secondary'}
                            onPress={() => setFormData({ ...formData, recommend: true })}
                            className="mr-3"
                            compact
                        >
                            Yes
                        </Button>
                        <Button
                            variant={formData.recommend === false ? 'primary' : 'secondary'}
                            onPress={() => setFormData({ ...formData, recommend: false })}
                            compact
                        >
                            No
                        </Button>
                    </View>
                </View>

                {/* Tips Section */}
                <TipsSuggestions
                    value={formData.tip}
                    onChange={(text) => setFormData({ ...formData, tip: text })}
                />
            </Card>

            <Button
                variant="primary"
                onPress={handleSubmit}
                className="mt-6"
                disabled={!formData.childAge || formData.recommend === null}
            >
                Submit Review
            </Button>
        </ScrollView>
    );
}