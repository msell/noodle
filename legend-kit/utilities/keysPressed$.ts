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

import { observable } from "@legendapp/state";

export const keysPressed$ = observable<Record<string, boolean>>(() => {
  const keysPressed = {};

  // Handle events to set current key states
  const onKeyDown = (e: KeyboardEvent) => {
    // Add the pressed key if not holding Alt
    if (!e.altKey) {
      keysPressed$[e.code].set(true);
      keysPressed$[e.key].set(true);
      keysPressed$[e.key.toLowerCase()].set(true);
    }
  };
  const onKeyUp = (e: KeyboardEvent) => {
    keysPressed$[e.code].delete();
    keysPressed$[e.key].delete();
    keysPressed$[e.key.toLowerCase()].delete();

    // If releasing Meta or Alt then we need to release all keys or they might get stuck on
    if (e.key === "Meta" || e.key === "Alt") {
      resetKeys();
    }
  };

  // Reset keys when window loses focus
  const resetKeys = () => {
    keysPressed$.set({});
  };

  window.addEventListener("keydown", onKeyDown, { passive: true });
  window.addEventListener("keyup", onKeyUp, { passive: true });
  // Make sure that if window loses focus, we reset the keys
  window.addEventListener("blur", resetKeys);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden || !document.hasFocus()) {
      resetKeys();
    }
  });

  return keysPressed;
});

export type KeyboardEventKeyModifier =
  | "Alt"
  | "AltGraph"
  | "CapsLock"
  | "Control"
  | "Fn"
  | "FnLock"
  | "Hyper"
  | "Meta"
  | "NumLock"
  | "ScrollLock"
  | "Shift"
  | "Super"
  | "Symbol"
  | "SymbolLock";

export type KeyboardEventKey =
  // Modifier keys
  | KeyboardEventKeyModifier
  // Whitespace keys
  | "Enter"
  | "Tab"
  | " "
  // Navigation keys
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "End"
  | "Home"
  | "PageDown"
  | "PageUp"
  // Function keys
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"
  | "F13"
  | "F14"
  | "F15"
  | "F16"
  | "F17"
  | "F18"
  | "F19"
  | "F20"
  | "Soft1"
  | "Soft2"
  | "Soft3"
  | "Soft4"
  // Multimedia keys
  | "ChannelDown"
  | "ChannelUp"
  | "MediaFastForward"
  | "MediaPause"
  | "MediaPlay"
  | "MediaPlayPause"
  | "MediaRecord"
  | "MediaRewind"
  | "MediaStop"
  | "MediaTrackNext"
  | "MediaTrackPrevious"
  // Browser control keys
  | "BrowserBack"
  | "BrowserFavorites"
  | "BrowserForward"
  | "BrowserHome"
  | "BrowserRefresh"
  | "BrowserSearch"
  | "BrowserStop"
  // Numeric keypad keys
  | "Decimal"
  | "Key11"
  | "Key12"
  | "Multiply"
  | "Add"
  | "Clear"
  | "Divide"
  | "Subtract"
  | "Separator"
  // Gamepad keys
  | "GameButton1"
  | "GameButton2"
  | "GameButton3"
  | "GameButton4"
  | "GameButton5"
  | "GameButton6"
  | "GameButton7"
  | "GameButton8"
  | "GameButton9"
  | "GameButton10"
  | "GameButton11"
  | "GameButton12"
  | "GameButton13"
  | "GameButton14"
  | "GameButton15"
  | "GameButton16"
  | "GameButtonA"
  | "GameButtonB"
  | "GameButtonC"
  | "GameButtonLeft1"
  | "GameButtonLeft2"
  | "GameButtonMode"
  | "GameButtonRight1"
  | "GameButtonRight2"
  | "GameButtonSelect"
  | "GameButtonStart"
  | "GameButtonThumbLeft"
  | "GameButtonThumbRight"
  | "GameButtonX"
  | "GameButtonY"
  | "GameButtonZ"
  // Printable keys
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | ";"
  | "="
  | ","
  | "-"
  | "."
  | "/"
  | "`"
  | "["
  | "\\"
  | "]"
  | "'"
  | "!"
  | "@"
  | "#"
  | "$"
  | "%"
  | "^"
  | "&"
  | "*"
  | "("
  | ")"
  | "_"
  | "+"
  | "{"
  | "}"
  | "|"
  | ":"
  | '"'
  | "<"
  | ">"
  | "?"
  // Additional keys
  | "Unidentified";

export type KeyboardEventCodeModifier =
  | "AltLeft"
  | "AltRight"
  | "ControlLeft"
  | "ControlRight"
  | "OSLeft"
  | "OSRight"
  | "ShiftLeft"
  | "ShiftRight"
  | "MetaLeft"
  | "MetaRight";

export type KeyboardEventCode =
  // Modifier keys
  | KeyboardEventCodeModifier
  // Whitespace keys
  | "Enter"
  | "Tab"
  | "Space"
  // Navigation keys
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "End"
  | "Home"
  | "PageDown"
  | "PageUp"
  // Editing keys
  | "Backspace"
  | "Clear"
  | "Copy"
  | "CrSel"
  | "Cut"
  | "Delete"
  | "EraseEof"
  | "ExSel"
  | "Insert"
  | "Paste"
  | "Redo"
  | "Undo"
  // Function keys
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"
  | "F13"
  | "F14"
  | "F15"
  | "F16"
  | "F17"
  | "F18"
  | "F19"
  | "F20"
  | "Soft1"
  | "Soft2"
  | "Soft3"
  | "Soft4"
  // Multimedia keys
  | "ChannelDown"
  | "ChannelUp"
  | "MediaFastForward"
  | "MediaPause"
  | "MediaPlay"
  | "MediaPlayPause"
  | "MediaRecord"
  | "MediaRewind"
  | "MediaStop"
  | "MediaTrackNext"
  | "MediaTrackPrevious"
  // Speech recognition keys
  | "SpeechCorrectionList"
  | "SpeechInputToggle"
  // Document keys
  | "Close"
  | "New"
  | "Open"
  | "Print"
  | "Save"
  | "SpellCheck"
  | "MailForward"
  | "MailReply"
  | "MailSend"
  // Browser control keys
  | "BrowserBack"
  | "BrowserFavorites"
  | "BrowserForward"
  | "BrowserHome"
  | "BrowserRefresh"
  | "BrowserSearch"
  | "BrowserStop"
  // Numeric keypad keys
  | "Decimal"
  | "Key11"
  | "Key12"
  | "Multiply"
  | "Add"
  | "Clear"
  | "Divide"
  | "Subtract"
  | "Separator"
  // Gamepad keys
  | "GameButton1"
  | "GameButton2"
  | "GameButton3"
  | "GameButton4"
  | "GameButton5"
  | "GameButton6"
  | "GameButton7"
  | "GameButton8"
  | "GameButton9"
  | "GameButton10"
  | "GameButton11"
  | "GameButton12"
  | "GameButton13"
  | "GameButton14"
  | "GameButton15"
  | "GameButton16"
  | "GameButtonA"
  | "GameButtonB"
  | "GameButtonC"
  | "GameButtonLeft1"
  | "GameButtonLeft2"
  | "GameButtonMode"
  | "GameButtonRight1"
  | "GameButtonRight2"
  | "GameButtonSelect"
  | "GameButtonStart"
  | "GameButtonThumbLeft"
  | "GameButtonThumbRight"
  | "GameButtonX"
  | "GameButtonY"
  | "GameButtonZ"
  // Alphanumeric keys
  | `Digit${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `Key${Uppercase<string>}`
  // OEM keys
  | "Semicolon"
  | "Equal"
  | "Comma"
  | "Minus"
  | "Period"
  | "Slash"
  | "Backquote"
  | "BracketLeft"
  | "Backslash"
  | "BracketRight"
  | "Quote"
  | "IntlBackslash"
  | "IntlRo"
  | "IntlYen"
  // Additional commonly used keys
  | "CapsLock"
  | "NumLock"
  | "ScrollLock"
  | "ContextMenu"
  // Modifier keys we added, not in normal Code
  | "Meta"
  | "Alt"
  | "Control"
  | "Shift";

export type KeyboardEventCodeHotkey =
  | `${KeyboardEventCodeModifier}`
  | `${KeyboardEventCodeModifier}+${KeyboardEventCode}`
  | `${KeyboardEventCodeModifier}+${KeyboardEventCodeModifier}+${KeyboardEventCode}`;

export type KeyboardEventKeyHotkey =
  | `${KeyboardEventKeyModifier}`
  | `${KeyboardEventKeyModifier}+${KeyboardEventKey}`
  | `${KeyboardEventKeyModifier}+${KeyboardEventKeyModifier}+${KeyboardEventKey}`;
