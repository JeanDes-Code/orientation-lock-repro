# expo-screen-orientation: lockAsync ignored after landscape→portrait navigation

## Bug Description

After upgrading to Expo SDK 55 (React Native 0.83.2, react-native-screens ~4.11), calling `ScreenOrientation.lockAsync(PORTRAIT_UP)` after navigating back from a landscape-locked screen is **silently ignored** on iOS. The screen stays stuck in landscape.

## Root Cause (suspected)

In `expo-screen-orientation`'s `ScreenOrientationRegistry.swift`, the iOS 16+ code path uses `requestGeometryUpdate(.iOS(interfaceOrientations:))` which is a *request* that iOS can silently ignore — and it does during/after `react-native-screens` ViewController transitions.

The pre-iOS 16 path uses the more forceful `UIDevice.current.setValue(_:forKey: "orientation")` which does not have this problem.

## Steps to Reproduce

```bash
cd orientation-lock-repro
npm install
npx expo run:ios
```

1. App opens on **Home** tab (portrait)
2. Tap **"Go to Landscape Screen"** — screen rotates to landscape
3. Tap **"Go Back"** — navigates back to Home tab
4. **BUG**: Screen stays in landscape despite `lockAsync(PORTRAIT_UP)` being called

## Expected Behavior

Screen should rotate back to portrait when returning to the Home tab.

## Actual Behavior

Screen stays stuck in landscape. Console shows the `lockAsync` call is made but has no effect.

## Environment

- Expo SDK: 55
- expo-screen-orientation: ~55.0.8
- React Native: 0.83.2
- react-native-screens: ~4.11
- iOS: 16+ (tested on iOS 18 simulator)
- Device: iPhone simulator and physical device
