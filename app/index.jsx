import { Pressable, View, Text, FlatList, TextInput, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Button from "app/components/Button";
import Card from "app/components/Card";
import { useState } from 'react';
import { Search, Star } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const apps = [
    { id: '1', name: 'ABC Mouse', category: 'Education' },
    { id: '2', name: 'Minecraft', category: 'Games' },
    { id: '3', name: 'Duolingo', category: 'Education' },
];

const reviews = [
    {
        id: 1,
        app: {
            name: 'Scratch Jr',
            icon: '🎨',
            category: 'Education',
            ageRange: '5-7'
        },
        reviewer: {
            name: 'Sarah M.',
            initials: 'SM',
            verified: true,
            parentOf: 'Age 6',
            reviewCount: 23
        },
        rating: 5,
        playguardRating: 4.9,
        date: '3 days ago',
        title: 'Perfect introduction to coding!',
        content: 'My 6-year-old absolutely loves this app. The interface is intuitive and the visual programming blocks make it easy for her to create her own stories and games. No ads or in-app purchases which is a huge plus. Safety features are excellent.',
        helpful: 24,
        tags: ['Educational', 'No Ads', 'Safe'],
        safetyHighlights: ['No ads', 'Offline mode', 'Privacy focused'],
        concerns: []
    },
    {
        id: 2,
        app: {
            name: 'Toca Life World',
            icon: '🏡',
            category: 'Creativity',
            ageRange: '6-12'
        },
        reviewer: {
            name: 'Mike T.',
            initials: 'MT',
            verified: true,
            parentOf: 'Ages 8, 10',
            reviewCount: 15
        },
        rating: 4,
        playguardRating: 4.7,
        date: '1 week ago',
        title: 'Great creative app with some concerns',
        content: 'Both my kids (8 and 10) enjoy creating stories and exploring the different worlds. The app encourages creativity and storytelling. However, some of the in-app purchases can be pricey. Overall positive experience.',
        helpful: 18,
        tags: ['Creative', 'Storytelling', 'In-app purchases'],
        safetyHighlights: ['Creative expression', 'No chat features'],
        concerns: ['In-app purchases', 'Can be expensive']
    },
    {
        id: 3,
        app: {
            name: 'Khan Academy Kids',
            icon: '📚',
            category: 'Education',
            ageRange: '3-8'
        },
        reviewer: {
            name: 'Jennifer L.',
            initials: 'JL',
            verified: true,
            parentOf: 'Age 7',
            reviewCount: 31
        },
        rating: 5,
        playguardRating: 4.8,
        date: '2 weeks ago',
        title: 'Outstanding educational content',
        content: 'This app is a game-changer for educational screen time. The content is well-designed, age-appropriate, and completely free. My 7-year-old has learned so much from the math and reading activities. Progress tracking helps me stay involved.',
        helpful: 42,
        tags: ['Educational', 'Free', 'Progress Tracking'],
        safetyHighlights: ['Completely free', 'No ads', 'Parent dashboard'],
        concerns: []
    },
    {
        id: 4,
        app: {
            name: 'Minecraft Education',
            icon: '🎮',
            category: 'Games',
            ageRange: '8-15'
        },
        reviewer: {
            name: 'David R.',
            initials: 'DR',
            verified: true,
            parentOf: 'Age 11',
            reviewCount: 8
        },
        rating: 4,
        playguardRating: 4.5,
        date: '3 weeks ago',
        title: 'Educational gaming at its best',
        content: 'My 11-year-old is obsessed with regular Minecraft, so this educational version is perfect. It combines the fun of building with learning concepts. The multiplayer features are well-moderated. Screen time can be an issue though.',
        helpful: 15,
        tags: ['Educational Gaming', 'Multiplayer', 'Screen Time'],
        safetyHighlights: ['Moderated multiplayer', 'Educational content'],
        concerns: ['Screen time management', 'Can be addictive']
    }
];

const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
        <Star
            key={i}
            size={16}
            fill={i < rating ? '#F59E0B' : 'transparent'}
            color={i < rating ? '#F59E0B' : '#D1D5DB'}
        />
    ));
};

const App = () => {
    return (
        <SafeAreaProvider>
            <StatusBar style="auto" />
            <MainContent />
        </SafeAreaProvider>
    );
}

function MainContent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('reviews'); // 'apps' or 'reviews'

    // Filter reviews based on search query
    const filteredReviews = reviews.filter(review =>
        review.app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.reviewer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter apps based on search query
    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-gray-50">
            {/* Search Bar */}
            <View className="p-4 bg-white boxShadow-sm">
                <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
                    <Search size={20} color="#9CA3AF" />
                    <TextInput
                        className="flex-1 ml-2 text-base"
                        placeholder="Search apps or reviews..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Tabs */}
            <View className="flex-row border-b border-gray-200 bg-white">
                <Pressable
                    className={`flex-1 py-3 items-center ${activeTab === 'apps' ? 'border-b-2 border-primary' : ''}`}
                    onPress={() => setActiveTab('apps')}
                >
                    <Text className={`font-medium ${activeTab === 'apps' ? 'text-primary' : 'text-gray-500'}`}>
                        Recommended Apps
                    </Text>
                </Pressable>
                <Pressable
                    className={`flex-1 py-3 items-center ${activeTab === 'reviews' ? 'border-b-2 border-primary' : ''}`}
                    onPress={() => setActiveTab('reviews')}
                >
                    <Text className={`font-medium ${activeTab === 'reviews' ? 'text-primary' : 'text-gray-500'}`}>
                        Recent Reviews
                    </Text>
                </Pressable>
            </View>

            {/* Content Area */}
            <ScrollView className="flex-1 p-4">
                {activeTab === 'apps' ? (
                    // Apps List
                    <>
                        <Text className="text-xl font-bold mb-4">Recommended Apps</Text>
                        <FlatList
                            data={filteredApps}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Card className="mb-4">
                                    <Text className="font-bold text-lg">{item.name}</Text>
                                    <Text className="text-gray-600">{item.category}</Text>

                                    <Link
                                        href={{
                                            pathname: "/features/reviews/create",
                                            params: { appId: item.id, appName: item.name }
                                        }}
                                        asChild
                                    >
                                        <Button className="mt-3">Write Review</Button>
                                    </Link>
                                </Card>
                            )}
                        />
                    </>
                ) : (
                    // Reviews List
                    <>
                        <Text className="text-xl font-bold mb-4">Recent Reviews</Text>
                        {filteredReviews.length === 0 ? (
                            <Text className="text-gray-500 text-center py-8">
                                No reviews found matching your search
                            </Text>
                        ) : (
                            <FlatList
                                data={filteredReviews}
                                scrollEnabled={false}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <Card className="mb-6 p-4">
                                        {/* App Info */}
                                        <View className="flex-row items-center mb-4">
                                            <Text className="text-3xl mr-3">{item.app.icon}</Text>
                                            <View>
                                                <Text className="font-bold text-lg">{item.app.name}</Text>
                                                <Text className="text-gray-500">{item.app.category} • {item.app.ageRange}</Text>
                                            </View>
                                        </View>

                                        {/* Review Header */}
                                        <View className="flex-row justify-between mb-3">
                                            <View className="flex-row items-center">
                                                <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-2">
                                                    <Text className="font-medium text-primary">
                                                        {item.reviewer.initials}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text className="font-medium">{item.reviewer.name}</Text>
                                                    <Text className="text-gray-500 text-sm">
                                                        Parent of {item.reviewer.parentOf} • {item.date}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View className="items-end">
                                                <View className="flex-row">{renderStars(item.rating)}</View>
                                                <Text className="text-gray-500 text-sm">PlayGuard: {item.playguardRating}</Text>
                                            </View>
                                        </View>

                                        {/* Review Content */}
                                        <Text className="font-bold text-lg mb-1">{item.title}</Text>
                                        <Text className="text-gray-700 mb-3">{item.content}</Text>

                                        {/* Tags */}
                                        <View className="flex-row flex-wrap gap-2 mb-3">
                                            {item.tags.map((tag, index) => (
                                                <View key={index} className="bg-blue-100 px-2 py-1 rounded-full">
                                                    <Text className="text-blue-700 text-xs">{tag}</Text>
                                                </View>
                                            ))}
                                        </View>

                                        {/* Highlights and Concerns */}
                                        {item.safetyHighlights.length > 0 && (
                                            <View className="bg-green-50 p-3 rounded-lg mb-3">
                                                <Text className="font-medium text-green-700 mb-1">Safety Highlights</Text>
                                                {item.safetyHighlights.map((highlight, index) => (
                                                    <View key={index} className="flex-row items-center">
                                                        <View className="w-1 h-1 bg-green-700 rounded-full mr-2" />
                                                        <Text className="text-green-700">{highlight}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}

                                        {item.concerns.length > 0 && (
                                            <View className="bg-yellow-50 p-3 rounded-lg mb-3">
                                                <Text className="font-medium text-yellow-700 mb-1">Potential Concerns</Text>
                                                {item.concerns.map((concern, index) => (
                                                    <View key={index} className="flex-row items-center">
                                                        <View className="w-1 h-1 bg-yellow-700 rounded-full mr-2" />
                                                        <Text className="text-yellow-700">{concern}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}

                                        {/* Footer */}
                                        <View className="flex-row justify-between items-center mt-2">
                                            <Text className="text-gray-500">
                                                {item.helpful} people found this helpful
                                            </Text>

                                            <Link
                                                href={{
                                                    pathname: "/features/reviews/detail",
                                                    params: { reviewId: item.id }
                                                }}
                                                asChild
                                            >
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </View>
                                    </Card>
                                )}
                            />
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

export default App;