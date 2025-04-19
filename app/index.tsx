import { Link, router } from 'expo-router';
import * as React from 'react';
import { Image, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlertAnchor } from '~/components/nativewindui/Alert';
import { AlertRef } from '~/components/nativewindui/Alert/types';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { authState, signOut } from '~/lib/auth';

const LOGO_SOURCE = {
  uri: 'https://nativewindui.com/_next/image?url=/_next/static/media/logo.28276aeb.png&w=2048&q=75',
};

const GOOGLE_SOURCE = {
  uri: 'https://www.pngall.com/wp-content/uploads/13/Google-Logo.png',
};

export default function WelcomeScreen() {
  const alertRef = React.useRef<AlertRef>(null);
  const user = authState.user.get();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  // If user is already logged in, show a different screen
  if (user) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-xl">Welcome back, {user.email}</Text>
          <Button className="mt-4" onPress={handleSignOut}>
            <Text>Sign out</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="ios:justify-end flex-1 justify-center gap-4 px-8 py-4">
          <View className="items-center">
            <Image
              source={LOGO_SOURCE}
              className="ios:h-12 ios:w-12 h-8 w-8"
              resizeMode="contain"
            />
          </View>
          <View className="ios:pb-5 ios:pt-2 pb-2">
            <Text className="ios:font-extrabold text-center text-3xl font-medium">Welcome to</Text>
            <Text className="ios:font-extrabold text-center text-3xl font-medium">Noodle</Text>
          </View>
          <Link href="/auth/(create-account)" asChild>
            <Button size={Platform.select({ ios: 'lg', default: 'md' })}>
              <Text>Sign up free</Text>
            </Button>
          </Link>
          <Button
            variant="secondary"
            className="ios:border-foreground/60"
            size={Platform.select({ ios: 'lg', default: 'md' })}
            onPress={() => {
              alertRef.current?.alert({
                title: 'Coming Soon',
                message: 'Google Sign In will be available soon!',
                buttons: [{ text: 'OK', style: 'cancel' }],
              });
            }}>
            <Image
              source={GOOGLE_SOURCE}
              className="absolute left-4 h-4 w-4"
              resizeMode="contain"
            />
            <Text className="ios:text-foreground">Continue with Google</Text>
          </Button>
          {Platform.OS === 'ios' && (
            <Button
              variant="secondary"
              className="ios:border-foreground/60"
              size={Platform.select({ ios: 'lg', default: 'md' })}
              onPress={() => {
                alertRef.current?.alert({
                  title: 'Coming Soon',
                  message: 'Apple Sign In will be available soon!',
                  buttons: [{ text: 'OK', style: 'cancel' }],
                });
              }}>
              <Text className="ios:text-foreground absolute left-4 text-[22px]"></Text>
              <Text className="ios:text-foreground">Continue with Apple</Text>
            </Button>
          )}
          <Link href="/auth/(login)" asChild>
            <Button variant="plain" size={Platform.select({ ios: 'lg', default: 'md' })}>
              <Text className="text-primary">Log in</Text>
            </Button>
          </Link>
        </View>
      </SafeAreaView>
      <AlertAnchor ref={alertRef} />
    </>
  );
}
