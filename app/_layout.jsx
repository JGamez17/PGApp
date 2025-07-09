import React, { useState } from 'react';
import { View } from 'react-native';
import BottomNavigation from './components/BottomNavigation';
import Dashboard from './features/dashboard';

const AppLayout = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <View className="flex-1">
            {/* Main content */}
            <View className="flex-1">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'library' && <AppLibrary />}
                {activeTab === 'reviews' && <ReviewsScreen />}
            </View>

            {/* Bottom Navigation */}
            <BottomNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </View>
    );
}

export default AppLayout;
