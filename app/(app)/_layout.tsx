import { Redirect, Stack } from 'expo-router';
import { authState } from '~/lib/auth';

export default function AppLayout() {
  const user = authState.user.get();

  // Redirect to welcome screen if not authenticated
  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
