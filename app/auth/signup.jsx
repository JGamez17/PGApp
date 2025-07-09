import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth, createUserWithEmailAndPassword } from '../../firebase';

const SignUpScreen = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isEmail, setIsEmail] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!identifier || !password) {
            return Alert.alert('Error', 'All fields are required');
        }

        setLoading(true);

        try {
            if (isEmail) {
                // Email signup
                await createUserWithEmailAndPassword(auth, identifier, password);
                Alert.alert('Success', 'Verification email sent!');
            } else {
                // Phone signup
                const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    size: 'invisible',
                });
                await signInWithPhoneNumber(auth, identifier, recaptcha);
                navigation.navigate('VerifyOTP', { phone: identifier });
            }
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAuthError = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                Alert.alert('Error', 'Email already registered');
                break;
            case 'auth/invalid-email':
                Alert.alert('Error', 'Invalid email format');
                break;
            case 'auth/invalid-phone-number':
                Alert.alert('Error', 'Invalid phone number');
                break;
            default:
                Alert.alert('Error', error.message);
        }
    };

    return (
        <View className="p-4 flex-1 justify-center">
            <Text className="text-2xl font-bold mb-6">Create Account</Text>

            {/* Email/Phone Toggle */}
            <View className="flex-row mb-4">
                <TouchableOpacity
                    className={`flex-1 py-2 ${isEmail ? 'bg-indigo-600' : 'bg-gray-200'}`}
                    onPress={() => setIsEmail(true)}
                >
                    <Text className={`text-center ${isEmail ? 'text-white' : 'text-gray-700'}`}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 py-2 ${!isEmail ? 'bg-indigo-600' : 'bg-gray-200'}`}
                    onPress={() => setIsEmail(false)}
                >
                    <Text className={`text-center ${!isEmail ? 'text-white' : 'text-gray-700'}`}>Phone</Text>
                </TouchableOpacity>
            </View>

            {/* Input Field */}
            <TextInput
                placeholder={isEmail ? "Email address" : "Phone number (with country code)"}
                value={identifier}
                onChangeText={setIdentifier}
                keyboardType={isEmail ? "email-address" : "phone-pad"}
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
                onPress={handleSignUp}
                disabled={loading}
            >
                <Text className="text-white text-center font-bold">
                    {loading ? "Processing..." : "Sign Up"}
                </Text>
            </TouchableOpacity>

            {/* Hidden recaptcha container for phone auth */}
            <View id="recaptcha-container" className="hidden" />
        </View>
    );
}

export default SignUpScreen;
