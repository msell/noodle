import { ActivityIndicator as RNActivityIndicator } from 'react-native';

import { useColorScheme } from '~/utils/useColorScheme';

function ActivityIndicator(props: React.ComponentPropsWithoutRef<typeof RNActivityIndicator>) {
  const { colors } = useColorScheme();
  return <RNActivityIndicator color={colors.primary} {...props} />;
}

export { ActivityIndicator };
