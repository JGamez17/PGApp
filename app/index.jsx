import { useState } from 'react';
import { View, SafeAreaView } from "react-native";

const AppLayout = () => {
    const [activeTab, setActiveTab] = useState('index');

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Main content area - takes available space */}
            <View className="flex-1 items-center justify-center">
                {/* Your main content here */}
            </View>
        </SafeAreaView>
    );
}

export default AppLayout;
