import { Link, router } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { signOut, authState } from '~/lib/auth';

export default function HomeScreen() {
  const user = authState.user.get();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth/(login)');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-xl">Welcome, {user?.email}</Text>
        <Button className="mt-4" onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </Button>
        <Button className="mt-4" onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </Button>
        <Link href="/todos">
          <Text className="text-blue-500">Todos</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
