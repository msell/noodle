/**
 * Legend Kit - A collection of utilities for Legend State, Legend List, and Legend Motion
 * https://legendapp.com/kit/
 *
 * [PRO] This is a premium feature of Legend Kit
 * Requires a Legend Kit Pro subscription to use in production
 *
 * Part of the Legend Kit ecosystem
 * See LICENSE file in https://github.com/LegendApp/legend-kit for more information
 */

import { useEffectOnce } from "@legendapp/state/react";
import { onHotkeys } from "../utilities/onHotkeys";

// The React hook version of onHotkeys
export function useOnHotkeys(hotkeyCallbacks: Record<string, () => void>) {
  useEffectOnce(() => onHotkeys(hotkeyCallbacks), []);
}
