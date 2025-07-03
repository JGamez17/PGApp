import { View } from 'react-native';

export default function Card({ children, className = '' }) {
    return (
        <View className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 ${className}`}>
            {children}
        </View>
    );
}