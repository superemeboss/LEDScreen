# DigiArt LED Screen Emulator

A fullscreen web app that mimics the LED drawing screen behavior of the VTech DigiArt Creative Easel.

## Features

- Fullscreen LED dot grid for phones and tablets
- Drag-to-draw LED lighting
- Configurable horizontal and vertical LED count
- Guided tracing modes for letters, numbers, shapes, objects, and guessing
- Free Draw mode with undo and clear
- Dark or white background
- Music, volume, and brightness controls
- Android-friendly web app manifest for Add to Home screen

## Run Locally

Double-click:

```text
open-digiart-led.cmd
```

Or open the folder with a static web server and visit:

```text
http://localhost:4173/
```

## Publish On GitHub Pages

Upload these files to a GitHub repository:

```text
index.html
styles.css
script.js
manifest.webmanifest
open-digiart-led.cmd
build-android-apk.cmd
android/
README.md
```

Then enable GitHub Pages:

1. Open the repository on GitHub.
2. Go to `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and `/root`.
6. Save.

GitHub will give you a web link like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Open that link on Android Chrome. Use Chrome's menu to choose `Add to Home screen` for an app-like fullscreen launch.

## Android APK

An Android WebView wrapper project is included in the `android/` folder. Building the APK requires Android Studio or Gradle with Android build tools installed.   
