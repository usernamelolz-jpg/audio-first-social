# 🎙️ Audio First Social Media

A mobile-first social media app where everything is audio — posts, comments, replies. Think Twitter, but with your voice.

## Stack

- **React Native + Expo** — Cross-platform (iOS & Android)
- **TypeScript** — Type safety
- **Expo AV** — Audio recording & playback
- **React Navigation** — Navigation

## Features (MVP)

- ✅ Audio post recording
- ✅ Feed with audio posts
- ✅ Audio playback with controls
- ✅ User profiles
- ✅ Navigation structure
- 🔜 Backend integration (Supabase)
- 🔜 Audio comments
- 🔜 Follow/unfollow users
- 🔜 Likes & engagement
- 🔜 Push notifications

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Or Expo Go app on your phone

### Installation

```bash
cd audio-first-social
npm install
```

### Run the App

```bash
# Start Expo dev server
npm start

# Run on iOS (Mac only)
npm run ios

# Run on Android
npm run android

# Run on web (limited audio support)
npm run web
```

### Using Expo Go (Easiest)

1. Install Expo Go on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Run `npm start`
3. Scan the QR code with your camera (iOS) or Expo Go (Android)

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── AudioPlayer.tsx
│   └── AudioPostCard.tsx
├── screens/           # Main app screens
│   ├── FeedScreen.tsx
│   ├── RecordScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/        # Navigation setup
│   └── AppNavigator.tsx
├── types/             # TypeScript types
│   └── index.ts
└── services/          # API & backend logic (coming soon)
```

## Next Steps

1. **Backend Setup** — Integrate Supabase for:
   - User authentication
   - Audio file storage
   - Post database
   - Real-time updates

2. **Audio Comments** — Add ability to reply to posts with voice

3. **Social Features** — Follow/unfollow, likes, notifications

4. **Polish** — Better UI/UX, loading states, error handling

## Current State

Right now it's a **functioning prototype** with:
- Mock data (no real backend yet)
- Recording & playback working
- Basic navigation
- Clean UI

To make it production-ready, you'll need to add backend integration and authentication.

## License

MIT
