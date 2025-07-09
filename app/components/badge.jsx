import * as React from "react";
import { View, Text } from "react-native";
import cn from "./utils";

const badgeVariants = {
    default: "bg-blue-500 border-transparent",
    secondary: "bg-gray-200 border-transparent",
    destructive: "bg-red-500 border-transparent",
    outline: "border border-gray-300",
};

const textVariants = {
    default: "text-white",
    secondary: "text-gray-800",
    destructive: "text-white",
    outline: "text-gray-800",
};

const Badge = ({ className, variant = "default", children, ...props }) => {
    return (
        <View
            className={cn(
                "flex-row items-center justify-center rounded-md border px-2 py-1",
                badgeVariants[variant],
                className
            )}
            {...props}
        >
            <Text
                className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    textVariants[variant]
                )}
            >
                {children}
            </Text>
        </View>
    );
}

export default Badge;