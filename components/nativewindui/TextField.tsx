import * as React from 'react';
import { Platform, TextInput, TextInputProps, View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';

interface TextFieldProps extends TextInputProps {
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  label?: string;
  error?: string;
}

export const TextField = React.forwardRef<TextInput, TextFieldProps>(
  ({ className, style, leftView, rightView, label, error, ...props }, ref) => {
    return (
      <View className="w-full">
        {label && (
          <Text variant="subhead" className="pb-2 text-sm text-foreground">
            {label}
          </Text>
        )}
        <View
          className={cn(
            'flex-row items-center rounded-lg border border-input bg-transparent',
            error && 'border-destructive',
            className
          )}>
          {leftView && <View className="pl-4">{leftView}</View>}
          <TextInput
            ref={ref}
            className={cn(
              'flex-1 px-4 py-2 text-base text-foreground',
              Platform.select({
                ios: 'leading-5',
                android: 'leading-6',
              })
            )}
            placeholderTextColor="#a1a1aa"
            {...props}
          />
          {rightView && <View className="pr-4">{rightView}</View>}
        </View>
        {error && <Text className="pt-1 text-sm text-destructive">{error}</Text>}
      </View>
    );
  }
);
