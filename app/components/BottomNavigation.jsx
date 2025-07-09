import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Home, Grid3X3, MessageSquare, Headphones } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomNavigation = ({ activeTab, onTabChange }) => {
    const insets = useSafeAreaInsets();

    const navItems = [
        {
            key: 'dashboard',
            label: 'Home',
            icon: Home,
            activeColor: 'text-blue-600',
            inactiveColor: 'text-gray-500',
            bgColor: 'bg-blue-50'
        },
        {
            key: 'library',
            label: 'Library',
            icon: Grid3X3,
            activeColor: 'text-green-600',
            inactiveColor: 'text-gray-500',
            bgColor: 'bg-green-50'
        },
        {
            key: 'reviews',
            label: 'Reviews',
            icon: MessageSquare,
            activeColor: 'text-purple-600',
            inactiveColor: 'text-gray-500',
            bgColor: 'bg-purple-50'
        },
        {
            key: 'support',
            label: 'Support',
            icon: Headphones,
            activeColor: 'text-orange-600',
            inactiveColor: 'text-gray-500',
            bgColor: 'bg-orange-50'
        },
    ];

    return (
        <View
            className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
            style={{
                paddingBottom: insets.bottom,
                boxShadowColor: '#000',
                boxShadowOffset: { width: 0, height: -4 },
                boxShadowOpacity: 0.15,
                boxShadowRadius: 20,
                elevation: 10,
                minHeight: 70
            }}
        >
            <View className="flex-row">
                {navItems.map(({ key, label, icon: Icon, activeColor, inactiveColor, bgColor }) => {
                    const isActive = activeTab === key;

                    return (
                        <Pressable
                            key={key}
                            onPress={() => {
                                console.log('Clicked nav item:', key);
                                onTabChange(key);
                            }}
                            className={`flex-1 items-center justify-center py-2 px-1 active:opacity-80 ${isActive ? 'transform scale-105' : ''
                                }`}
                            style={{ minHeight: 70 }}
                            accessibilityLabel={label}
                        >
                            <View className={`items-center justify-center w-10 h-10 rounded-xl mb-1 ${isActive ? bgColor : ''
                                }`}>
                                <Icon
                                    size={24}
                                    className={`${isActive ? activeColor : inactiveColor
                                        }`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </View>
                            <Text className={`text-xs font-medium ${isActive ? activeColor : inactiveColor
                                }`}>
                                {label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

export default BottomNavigation;