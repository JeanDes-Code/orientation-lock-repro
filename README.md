# expo-screen-orientation: declarative orientation locking broken with expo-dev-client on iOS 16+

## Bug Description

Linked to [issue 43692](https://github.com/expo/expo/issues/43692)

Declarative screen orientation via `Stack.Screen options={{ orientation: 'landscape_right' }}` is broken when `expo-dev-client` is installed. Two interacting bugs prevent rotation:

1. **`expo-screen-orientation@55.0.9`** only checks `self` for react-native-screens VCs, missing them behind `DevLauncherViewController`
2. **`react-native-screens@4.23.0`** uses stale `windowScene.interfaceOrientation` to skip rotation, and `requestGeometryUpdate` fails silently during transitions

The `lockAsync()` imperative approach is also affected.

See [ISSUE_DRAFT.md](./ISSUE_DRAFT.md) for the full root cause analysis with native debug logs.

## Steps to Reproduce

```bash
npm install
npx expo prebuild --clean
npx expo run:ios
```

1. Connect to dev server via the Expo dev launcher
2. Tap **"Go to Landscape (Option C)"** — may or may not rotate to landscape
3. Tap **"Go Back"** — **BUG:** screen stays in landscape
4. Tap **"Go to Landscape (Option C)"** again — **BUG:** landscape also fails

## Workaround

Two patches in `patches/` fix both issues:

- `expo-screen-orientation+55.0.9.patch` — child VC traversal for DevLauncherViewController
- `react-native-screens+4.23.0.patch` — always call `requestGeometryUpdate` with fallback to `UIDevice setValue:orientation` on error

The patches are auto-applied via `postinstall`. To test **with** the fix:

```bash
npm install   # patches applied
npx expo prebuild --clean
npx expo run:ios
```

To test **without** the fix (reproduce the bug), temporarily remove the `patches/` directory before prebuild.

## Environment

- Expo SDK 55 (`expo@55.0.9`)
- `expo-dev-client@55.0.19`
- `expo-screen-orientation@55.0.9`
- `react-native@0.83.4`
- `react-native-screens@4.23.0`
- iOS 16+ (tested on iOS 26.2 simulator, iOS 18 physical device)
