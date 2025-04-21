import '~/lib/reactotron';
import '../global.css';
import 'expo-dev-client';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Icon } from '@roninoss/icons';
import { Link, Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ThemeToggle } from '~/components/ThemeToggle';
import { authState } from '~/lib/auth';
import { cn } from '~/lib/cn';
import { NAV_THEME } from '~/theme';
import { useColorScheme, useInitialAndroidBarSync } from '~/utils/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const user = authState.user.get();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      {/* WRAP YOUR APP WITH ANY ADDITIONAL PROVIDERS HERE */}
      {/* <ExampleProvider> */}

      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <NavThemeProvider value={NAV_THEME[colorScheme]}>
          <Stack screenOptions={SCREEN_OPTIONS}>
            <Stack.Screen name="index" options={INDEX_OPTIONS} />
            <Stack.Screen name="modal" options={MODAL_OPTIONS} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </NavThemeProvider>
      </KeyboardProvider>

      {/* </ExampleProvider> */}
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios_from_right', // for android
} as const;

const INDEX_OPTIONS = {
  headerShown: false,
} as const;

function SettingsIcon() {
  const { colors } = useColorScheme();
  return (
    <Link href="/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
            <Icon name="cog-outline" color={colors.foreground} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;
