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

import { KeyboardEventCodeHotkey, keysPressed$ } from "./keysPressed$";

// For typed hotkeys use this with the extra types:
// export function onHotkeys(hotkeyCallbacks: Partial<Record<KeyboardEventCodeHotkey, () => void>>) {

export function onHotkeys(
  hotkeyCallbacks: Partial<Record<KeyboardEventCodeHotkey, () => void>>,
) {
  const hotkeyMap = new Map<string[], () => void>();

  // Process each combination and its callback
  for (const [hotkey, callback] of Object.entries(hotkeyCallbacks)) {
    const keys = hotkey.toLowerCase().split("+");
    hotkeyMap.set(keys, callback!);
  }

  const checkHotkeys = () => {
    for (const [keys, callback] of hotkeyMap) {
      // If every key in the hotkey is pressed, call the callback
      const allKeysPressed = keys.every((key) => keysPressed$[key].get());
      if (allKeysPressed) {
        callback();
      }
    }
  };

  return keysPressed$.onChange(checkHotkeys);
}
