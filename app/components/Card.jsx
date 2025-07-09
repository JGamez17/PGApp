import React from 'react';
import { View, Text, Pressable } from 'react-native';
import cn from './utils'

const Card = ({ className, children, ...props }) => {
    return (
        <View
            className={cn(
                "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col",
                className
            )}
            {...props}
        >
            {children}
        </View>
    );
}

// Card Header
export function CardHeader({ className, children, ...props }) {
    return (
        <View
            className={cn(
                "flex-row items-center justify-between px-4 pt-4",
                className
            )}
            {...props}
        >
            {children}
        </View>
    );
}

// Card Title
export function CardTitle({ className, children, ...props }) {
    return (
        <Text
            className={cn(
                "text-lg font-bold text-gray-900 dark:text-white",
                className
            )}
            {...props}
        >
            {children}
        </Text>
    );
}

// Card Description
export function CardDescription({ className, children, ...props }) {
    return (
        <Text
            className={cn(
                "text-sm text-gray-500 dark:text-gray-400",
                className
            )}
            {...props}
        >
            {children}
        </Text>
    );
}

// Card Action
export function CardAction({ className, children, ...props }) {
    return (
        <Pressable
            className={cn(
                "self-start",
                className
            )}
            {...props}
        >
            {children}
        </Pressable>
    );
}

// Card Content
export function CardContent({ className, children, ...props }) {
    return (
        <View
            className={cn(
                "p-4",
                className
            )}
            {...props}
        >
            {children}
        </View>
    );
}

// Card Footer
export function CardFooter({ className, children, ...props }) {
    return (
        <View
            className={cn(
                "flex-row items-center px-4 pb-4",
                className
            )}
            {...props}
        >
            {children}
        </View>
    );
}

export default Card; 
