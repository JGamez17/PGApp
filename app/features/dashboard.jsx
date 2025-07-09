import React from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import Card from '../components/Card';
import { CardContent, CardHeader, CardTitle } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/badge';
import Separator from '../components/separator';
import {
    TrendingUp,
    Shield,
    Star,
    Users,
    ArrowRight,
    CheckCircle,
    BookOpen,
    Library,
    Eye,
    ThumbsUp,
    Edit3,
    Activity,
    ExternalLink
} from 'lucide-react-native';

const myRecentActivity = [
    {
        id: 1,
        app: { name: 'Scratch Jr', icon: '🎨' },
        type: 'review',
        action: 'Reviewed',
        rating: 5,
        helpful: 12,
        date: '2 days ago'
    },
    {
        id: 2,
        app: { name: 'Khan Academy Kids', icon: '📚' },
        type: 'helpful',
        action: 'Marked Helpful',
        rating: 4,
        helpful: 5,
        date: '4 days ago'
    }
];

const Dashboard = ({
    onNavigate,
    userPreferences = { ages: [8], interests: ['reading', 'games'] }
}) => {
    const childAge = userPreferences.ages[0] || 8;
    const childInterests = userPreferences.interests || [];

    const trendingApps = [
        {
            id: 1,
            name: 'Scratch Jr',
            category: 'Education',
            age: '5-7',
            rating: 4.8,
            playguardRating: 4.9,
            icon: '🎨',
            description: 'Coding for kids',
            safetyScore: 98
        },
        {
            id: 2,
            name: 'Toca Life World',
            category: 'Creative',
            age: '6-12',
            rating: 4.6,
            playguardRating: 4.7,
            icon: '🏡',
            description: 'Creative play',
            safetyScore: 95
        },
        {
            id: 3,
            name: 'Khan Academy Kids',
            category: 'Education',
            age: '3-8',
            rating: 4.7,
            playguardRating: 4.8,
            icon: '📚',
            description: 'Learning adventures',
            safetyScore: 99
        }
    ];

    const myStats = [
        {
            label: 'Reviews Written',
            value: '8',
            icon: Edit3,
            color: 'bg-blue-500',
            clickable: true,
            onClick: () => onNavigate('my-reviews')
        },
        {
            label: 'Apps Viewed',
            value: '32',
            icon: Eye,
            color: 'bg-blue-400',
            clickable: true,
            onClick: () => onNavigate('library')
        },
        {
            label: 'Helpful Votes',
            value: '156',
            icon: ThumbsUp,
            color: 'bg-green-500',
            clickable: true,
            onClick: () => onNavigate('my-reviews')
        },
        {
            label: 'Average Rating',
            value: '4.2',
            icon: Star,
            color: 'bg-yellow-500',
            clickable: true,
            onClick: () => onNavigate('my-reviews')
        }
    ];

    const quickStats = [
        { label: 'Apps Reviewed', value: '1,250+', icon: Shield, color: 'bg-blue-500' },
        { label: 'Parent Reviews', value: '25K+', icon: Users, color: 'bg-green-500' },
        { label: 'Safety Score', value: '98%', icon: CheckCircle, color: 'bg-blue-400' },
        { label: 'Age-Appropriate', value: '95%', icon: Star, color: 'bg-yellow-500' }
    ];

    const getActivityIcon = (type) => {
        switch (type) {
            case 'review':
                return <Edit3 size={14} className="text-blue-500" />;
            case 'view':
                return <Eye size={14} className="text-blue-400" />;
            case 'rating':
                return <Star size={14} className="text-yellow-500" />;
            default:
                return <Activity size={14} className="text-gray-400" />;
        }
    };

    const handleActivityClick = (activity) => {
        switch (activity.type) {
            case 'review':
            case 'view':
            case 'rating':
                onNavigate('app-details', activity.app);
                break;
            default:
                onNavigate('library');
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={12}
                className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
            />
        ));
    };

    return (
        <ScrollView className="flex-1 bg-white p-4">
            {/* Welcome Section */}
            <View className="bg-blue-600 p-6 rounded-3xl mb-6">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-white text-xl font-bold mb-1">Welcome back!</Text>
                        <Text className="text-white opacity-90">
                            Safe apps for your {childAge}-year-old
                        </Text>
                    </View>
                    <View className="w-12 h-12 bg-blue-800 rounded-full items-center justify-center">
                        <Shield size={24} color="white" />
                    </View>
                </View>
            </View>

            <View className="space-y-6">
                {/* App Library CTA */}
                <Pressable
                    onPress={() => onNavigate('library')}
                    className="bg-purple-600 rounded-xl boxShadow-lg overflow-hidden"
                >
                    <CardContent className="p-6">
                        <View className="flex-row justify-between items-center">
                            <View className="flex-1">
                                <View className="flex-row items-center gap-2 mb-2">
                                    <Library size={24} color="white" />
                                    <Text className="text-white font-semibold text-lg">Discover Safe Apps</Text>
                                </View>
                                <Text className="text-white opacity-90 mb-4">
                                    Explore {childInterests.length > 0 ? childInterests.join(' & ') : 'educational'} apps perfect for age {childAge}
                                </Text>
                                <Button
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        onNavigate('library');
                                    }}
                                    className="bg-purple-800"
                                    textClass="text-white"
                                >
                                    Browse App Library
                                    <ArrowRight size={16} color="white" className="ml-2" />
                                </Button>
                            </View>
                            <Text className="text-4xl opacity-20 ml-4">📱</Text>
                        </View>
                    </CardContent>
                </Pressable>

                {/* Quick Stats */}
                <View className="flex-row flex-wrap justify-between">
                    {quickStats.map((stat, index) => (
                        <View key={index} className="w-[48%] mb-3">
                            <Card className="bg-white boxShadow-sm">
                                <CardContent className="p-4">
                                    <View className="flex-row justify-between items-center">
                                        <View>
                                            <Text className="text-gray-500 text-sm mb-1">{stat.label}</Text>
                                            <Text className="text-lg font-semibold">{stat.value}</Text>
                                        </View>
                                        <View className={`w-10 h-10 rounded-full items-center justify-center ${stat.color}`}>
                                            <stat.icon size={20} color="white" />
                                        </View>
                                    </View>
                                </CardContent>
                            </Card>
                        </View>
                    ))}
                </View>

                {/* My Activity Section */}
                <Card className="bg-white boxShadow-sm">
                    <CardHeader className="pb-3">
                        <View className="flex-row justify-between items-center">
                            <CardTitle className="flex-row items-center gap-2">
                                <Activity size={20} className="text-blue-500" />
                                <Text className="font-bold text-lg">My Activity</Text>
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onPress={() => onNavigate('reviews')}
                                className="text-blue-500"
                            >
                                <Text>View All</Text>
                                <ExternalLink size={14} className="ml-1" />
                            </Button>
                        </View>
                    </CardHeader>
                    <CardContent>
                        {/* Activity Stats */}
                        <View className="flex-row flex-wrap justify-between mb-4">
                            {myStats.map((stat, index) => (
                                <Pressable
                                    key={index}
                                    className={`w-[48%] p-3 bg-gray-100 rounded-lg mb-3 ${stat.clickable ? 'active:bg-gray-200' : ''}`}
                                    onPress={stat.clickable ? stat.onClick : undefined}
                                >
                                    <View className="flex-row items-center gap-2 mb-1">
                                        <View className={`w-6 h-6 rounded-full items-center justify-center ${stat.color}`}>
                                            <stat.icon size={12} color="white" />
                                        </View>
                                        <Text className="text-gray-500 text-sm">{stat.label}</Text>
                                        {stat.clickable && (
                                            <ArrowRight size={12} className="text-gray-500 ml-auto" />
                                        )}
                                    </View>
                                    <Text className="font-semibold">{stat.value}</Text>
                                </Pressable>
                            ))}
                        </View>

                        <Separator className="my-4" />

                        {/* Recent Activity */}
                        <View className="space-y-3">
                            <Text className="font-medium text-lg mb-3">Recent Activity</Text>
                            {myRecentActivity.map((activity) => (
                                <Pressable
                                    key={activity.id}
                                    className="flex-row items-center gap-3 p-3 bg-gray-100 rounded-lg active:bg-gray-200"
                                    onPress={() => handleActivityClick(activity)}
                                >
                                    <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
                                        <Text className="text-lg">{activity.app.icon}</Text>
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row items-center gap-2 mb-1">
                                            {getActivityIcon(activity.type)}
                                            <Text className="text-base">
                                                {activity.action} <Text className="font-medium">{activity.app.name}</Text>
                                            </Text>
                                            <ArrowRight size={14} className="text-gray-500 ml-auto" />
                                        </View>
                                        <View className="flex-row items-center gap-2">
                                            {activity.rating && (
                                                <View className="flex-row items-center gap-1">
                                                    {renderStars(activity.rating)}
                                                </View>
                                            )}
                                            {activity.helpful && (
                                                <View className="flex-row items-center gap-1">
                                                    <ThumbsUp size={12} className="text-green-500" />
                                                    <Text className="text-green-500 text-sm">{activity.helpful}</Text>
                                                </View>
                                            )}
                                            <Text className="text-gray-500 text-sm">{activity.date}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            ))}
                        </View>

                        {/* Quick Activity Actions */}
                        <View className="mt-4 pt-4 border-t border-gray-200">
                            <View className="flex-row justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onPress={() => onNavigate('library')}
                                    className="flex-row items-center gap-2"
                                >
                                    <Eye size={14} />
                                    <Text>Browse Apps</Text>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onPress={() => onNavigate('my-reviews')}
                                    className="flex-row items-center gap-2"
                                >
                                    <Edit3 size={14} />
                                    <Text>Write Review</Text>
                                </Button>
                            </View>
                        </View>
                    </CardContent>
                </Card>

                {/* Safety Overview */}
                <Card className="bg-white boxShadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex-row items-center gap-2">
                            <Shield size={20} className="text-blue-500" />
                            <Text className="font-bold text-lg">Safety Overview</Text>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <View className="space-y-2">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-base">Overall Safety Score</Text>
                                <Text className="text-green-600 font-medium">98%</Text>
                            </View>
                            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <View className="h-full bg-green-500" style={{ width: '98%' }} />
                            </View>
                        </View>

                        <View className="flex-row flex-wrap gap-4 pt-2">
                            <View className="w-[45%] flex-row items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <Text className="text-gray-500 text-sm">Safe Content</Text>
                            </View>
                            <View className="w-[45%] flex-row items-center gap-2">
                                <Shield size={16} className="text-blue-500" />
                                <Text className="text-gray-500 text-sm">Privacy Protected</Text>
                            </View>
                            <View className="w-[45%] flex-row items-center gap-2">
                                <Users size={16} className="text-blue-400" />
                                <Text className="text-gray-500 text-sm">Parent Approved</Text>
                            </View>
                            <View className="w-[45%] flex-row items-center gap-2">
                                <Star size={16} className="text-yellow-500" />
                                <Text className="text-gray-500 text-sm">Age Appropriate</Text>
                            </View>
                        </View>
                    </CardContent>
                </Card>

                {/* Trending Apps */}
                <Card className="bg-white boxShadow-sm">
                    <CardHeader className="pb-3">
                        <View className="flex-row justify-between items-center">
                            <CardTitle className="flex-row items-center gap-2">
                                <TrendingUp size={20} className="text-blue-500" />
                                <Text className="font-bold text-lg">Trending for Age {childAge}</Text>
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onPress={() => onNavigate('library')}
                                className="text-blue-500"
                            >
                                <Text>View All</Text>
                            </Button>
                        </View>
                    </CardHeader>
                    <CardContent>
                        <View className="space-y-3">
                            {trendingApps.map((app) => (
                                <Pressable
                                    key={app.id}
                                    className="flex-row items-center gap-3 p-3 bg-gray-100 rounded-xl border border-gray-300 active:bg-gray-200"
                                    onPress={() => onNavigate('library', app)}
                                >
                                    <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center">
                                        <Text className="text-xl">{app.icon}</Text>
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row items-center gap-2 mb-1">
                                            <Text className="font-medium text-base">{app.name}</Text>
                                            <Badge variant="secondary" className="text-xs">
                                                {app.category}
                                            </Badge>
                                        </View>
                                        <Text className="text-gray-600 text-sm">{app.description}</Text>
                                        <View className="flex-row items-center gap-3 mt-1">
                                            <View className="flex-row items-center gap-1">
                                                <Star size={12} className="text-yellow-500" />
                                                <Text className="text-gray-600 text-sm">{app.rating}</Text>
                                            </View>
                                            <View className="flex-row items-center gap-1">
                                                <Shield size={12} className="text-green-500" />
                                                <Text className="text-green-500 text-sm">{app.safetyScore}%</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <ArrowRight size={16} className="text-gray-500" />
                                </Pressable>
                            ))}
                        </View>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <View className="flex-row justify-between">
                    <Pressable
                        className="w-[48%] bg-white boxShadow-sm rounded-lg active:bg-gray-50"
                        onPress={() => onNavigate('reviews')}
                    >
                        <CardContent className="p-4 items-center">
                            <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mx-auto mb-3">
                                <Star size={20} className="text-blue-500" />
                            </View>
                            <Text className="font-medium text-base mb-1">Parent Reviews</Text>
                            <Text className="text-gray-500 text-sm text-center">Read real parent experiences</Text>
                        </CardContent>
                    </Pressable>

                    <Pressable
                        className="w-[48%] bg-white boxShadow-sm rounded-lg active:bg-gray-50"
                        onPress={() => onNavigate('support')}
                    >
                        <CardContent className="p-4 items-center">
                            <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mx-auto mb-3">
                                <BookOpen size={20} className="text-blue-400" />
                            </View>
                            <Text className="font-medium text-base mb-1">Support Hub</Text>
                            <Text className="text-gray-500 text-sm text-center">Guides and resources</Text>
                        </CardContent>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

export default Dashboard;