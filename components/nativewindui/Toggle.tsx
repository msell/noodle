import { Switch } from 'react-native';

import { COLORS } from '~/theme/colors';
import { useColorScheme } from '~/utils/useColorScheme';

function Toggle(props: React.ComponentPropsWithoutRef<typeof Switch>) {
  const { colors } = useColorScheme();
  return (
    <Switch
      trackColor={{
        true: colors.primary,
        false: colors.grey,
      }}
      thumbColor={COLORS.white}
      {...props}
    />
  );
}

export { Toggle };
