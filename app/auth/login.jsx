import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { auth, signInWithEmailAndPassword } from '@/services/firebase';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!identifier || !password) {
            return Alert.alert('Error', 'All fields are required');
        }

        setLoading(true);

        try {
            // Check if identifier is email or phone
            const isEmail = identifier.includes('@');

            if (isEmail) {
                // Email login
                const { user } = await signInWithEmailAndPassword(auth, identifier, password);
                await storeCredentials(user);
            } else {
                // Phone login
                navigation.navigate('VerifyOTP', { phone: identifier });
            }

            navigation.navigate('Dashboard');
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    const storeCredentials = async (user) => {
        await SecureStore.setItemAsync('userToken', user.accessToken);
        await SecureStore.setItemAsync('userId', user.uid);
    };

    // handleAuthError function from SignUpScreen

    return (
        <View className="p-4 flex-1 justify-center">
            <Text className="text-2xl font-bold mb-6">Login</Text>

            <TextInput
                placeholder="Email or phone number"
                value={identifier}
                onChangeText={setIdentifier}
                className="border border-gray-300 rounded-lg p-4 mb-4"
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="border border-gray-300 rounded-lg p-4 mb-6"
            />

            <TouchableOpacity
                className="bg-indigo-600 py-4 rounded-lg"
                onPress={handleLogin}
                disabled={loading}
            >
                <Text className="text-white text-center font-bold">
                    {loading ? "Logging in..." : "Login"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}