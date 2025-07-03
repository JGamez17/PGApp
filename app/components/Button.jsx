import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export default function Button({
    children,
    onPress,
    variant = 'primary',
    className = '',
    compact = false,
    disabled = false,
    loading = false
}) {
    const baseClasses = "rounded-md items-center justify-center";
    const sizeClasses = compact ? "py-2 px-4" : "py-3 px-6";

    const variantClasses = {
        primary: "bg-indigo-600",
        secondary: "bg-gray-200 border border-gray-300",
        danger: "bg-red-600"
    };

    const textClasses = {
        primary: "text-white",
        secondary: "text-gray-800",
        danger: "text-white"
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'secondary' ? '#000' : '#FFF'} />
            ) : (
                <Text className={`font-medium ${textClasses[variant]}`}>
                    {children}
                </Text>
            )}
        </TouchableOpacity>
    );
}