import { Redirect, Stack } from 'expo-router';

import { authState } from '~/lib/auth';

export default function AppLayout() {
  const user = authState.user.get();
  const isLoading = authState.isLoading.get();

  if (isLoading) {
    return null;
  }

  // Redirect to welcome screen if not authenticated
  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="todos" options={{ title: 'Todos' }} />
    </Stack>
  );
}
