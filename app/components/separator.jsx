import React from 'react';
import { View } from 'react-native';
import cn from './utils';

const Separator = ({
    className,
    orientation = "horizontal",
    ...props
}) => {
    return (
        <View
            className={cn(
                "bg-gray-200",
                orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
                className
            )}
            {...props}
        />
    );
}

export default Separator;