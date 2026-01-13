# 🎭 PURIM PARTY 2026 - Neon Countdown 🪩

A wild, chaotic, single-screen countdown webpage for a Purim party on **March 2, 2026 at 21:00 Israel time** (Asia/Jerusalem timezone).

**Style**: Israeli Purim chaos meets neon nightclub with bright gradients, glitter/confetti, masks, hamantaschen, and silly emojis 🥳🎭🍬

**Live URL**: http://localhost:5174/

---

## 🎯 Features

### Core Functionality
- **Timezone-Accurate Countdown**: Uses Luxon for proper Asia/Jerusalem timezone handling (respects DST)
- **Party Time Mode**: Switches to celebration animation when countdown hits zero
- **Single-Screen Design**: Everything fits in 100vh, no scrolling (desktop + mobile responsive)

### Gamification (3 Fun Features)
1. **Mouse Glow Trail** 🌟 - Soft neon glow follows your cursor/touch
2. **Bubble Pop Mini-Game** 🫧 - Floating bubbles drift up, click/tap to pop (+1 score)
3. **Hamantaschen Hunt** 🔺 - Bonus items appear randomly, click for +10 points + flash effect

### Visual Effects
- **Dynamic Neon Background**: Pulsing gradient + animated particles/confetti on canvas
- **Countdown Urgency**: Visuals intensify as event approaches (more particles, faster pulse)
- **Purim Mode Toggle**: When ON → MORE particles + faster animations + louder max volume
- **Smooth Animations**: Framer Motion + CSS transitions (60fps target)
- **Reduced Motion Support**: Respects `prefers-reduced-motion` accessibility setting

### Audio System
- **Background Music Player**: Start/Pause, Mute, Volume slider
- **Local Music File**: Uses `/public/music.mp3` (see instructions below)
- **User-Activated**: No autoplay (browser policy compliant)

### Social
- **Share Button**: Copies party invite + URL to clipboard

---

## 🏗️ Architecture Overview (10 Bullets)

1. **Main App Component**: Orchestrates global state (score, Purim mode, music), calculates urgency based on time remaining
2. **Timer Component**: Luxon-powered countdown for Asia/Jerusalem, switches to "PARTY TIME" at zero
3. **NeonBackground**: Canvas with animated gradient + emoji/particle effects, intensity scales with urgency + Purim mode
4. **BubblesGame**: Spawns drifting bubbles at intervals, click/tap to pop (+1 score), CSS animations + Framer Motion
5. **BonusItem (Hamantaschen)**: Randomly spawns every 8-15s, click for +10 score, auto-disappears after 5s
6. **MouseGlow**: Custom cursor trail with dual neon glow layers, follows mouse/touch events
7. **AudioControls**: HTML5 audio with play/pause, volume slider, mute, uses local placeholder file
8. **ShareButton**: Clipboard API for copying party invite text + URL
9. **Responsive Layout**: Flexbox/CSS Grid, fits all content in viewport, touch-friendly on mobile
10. **Accessibility First**: Keyboard navigation, aria labels, reduced motion media query support

---

## 📁 File Structure

```
purim-party/
├── public/
│   ├── music.mp3              # YOUR MUSIC FILE GOES HERE (see below)
│   └── MUSIC_README.txt       # Instructions for music file
├── src/
│   ├── components/
│   │   ├── Timer.tsx          # Countdown display with timezone handling
│   │   ├── NeonBackground.tsx # Canvas particle animation
│   │   ├── BubblesGame.tsx    # Floating bubble pop mechanics
│   │   ├── BonusItem.tsx      # Hamantaschen bonus spawn system
│   │   ├── MouseGlow.tsx      # Cursor trail effect
│   │   ├── AudioControls.tsx  # Music player UI
│   │   └── ShareButton.tsx    # Clipboard share functionality
│   ├── hooks/
│   │   └── useCountdown.ts    # Luxon countdown logic
│   ├── App.tsx                # Main orchestrator
│   ├── App.css                # Neon chaos styling (8KB!)
│   ├── index.css              # Global resets
│   └── main.tsx               # React entry point
├── package.json
└── vite.config.ts
```

---

## 🚀 Quick Start

### Installation
```bash
cd purim-party
npm install
npm run dev
```

### Access
Open **http://localhost:5174/** (or the port shown in terminal)

### Build for Production
```bash
npm run build
# Outputs to /dist folder
```

---

## 🎵 Adding Your Music

**IMPORTANT**: The app uses a placeholder `/public/music.mp3` file.

### Steps:
1. Get your own music file (MP3 format recommended)
2. **DO NOT use copyrighted music without permission**
3. Place your file at `/public/music.mp3` (replace the empty placeholder)
4. Restart dev server: `npm run dev`

### Notes:
- Music starts only when user clicks "Start Music" (browser autoplay policy)
- Volume slider and mute button included
- Purim mode caps max volume at 80%

---

## 🎮 How to Play

### Bubble Pop Game
- **Bubbles float up** from bottom of screen
- **Click or tap** to pop them
- **+1 point** per bubble
- More bubbles spawn when Purim Mode is ON

### Hamantaschen Hunt
- **Triangular neon items** appear randomly
- **Click/tap quickly** before they disappear (5s timeout)
- **+10 points** per catch
- Shows **"+10! 🔺"** popup on collect

### Purim Mode
Toggle the **🎭 Purim Mode** checkbox to:
- 2x particle density
- Faster animations
- More bubbles spawn
- Higher max volume cap

---

## ♿ Accessibility

✅ **Keyboard Navigation**: All buttons focusable with Tab
✅ **Screen Reader Support**: ARIA labels on interactive elements
✅ **Reduced Motion**: Respects `prefers-reduced-motion` OS setting (disables heavy animations)
✅ **Touch-Friendly**: Large tap targets for mobile
✅ **Focus Indicators**: High-contrast cyan outlines on focus

---

## 📱 Responsive Design

- **Desktop**: Full layout with 4-column countdown grid
- **Tablet**: Adjusts to 2-column grid
- **Mobile**: Single-column stack, touch-optimized controls
- **No Scrolling**: Everything fits in viewport at all breakpoints

---

## 🎨 Color Palette (Neon Chaos)

| Color | Hex | Usage |
|-------|-----|-------|
| Magenta | `#ff00ff` | Timer days, score border |
| Cyan | `#00ffff` | Timer hours, audio buttons |
| Yellow | `#ffff00` | Timer minutes, score value, share button |
| Hot Pink | `#ff0080` | Timer seconds, Purim toggle |
| Lime | `#00ff00` | Particles |

---

## 🛠️ Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: CSS3 (animations, gradients, blur filters)
- **Animations**: Framer Motion (for component animations)
- **Timezone**: Luxon (handles Asia/Jerusalem + DST correctly)
- **Canvas**: Native HTML5 Canvas API (particles)
- **Audio**: HTML5 Audio API

### Dependencies
```json
{
  "luxon": "^3.x",
  "framer-motion": "^11.x",
  "@types/luxon": "^3.x"
}
```

---

## 🎯 Performance

- **Target**: 60fps animations
- **Canvas**: Optimized particle count (30 default, 50 in Purim mode)
- **Reduced Motion**: Disables heavy animations for accessibility
- **Bundle Size**: ~125KB gzipped (including Framer Motion)

---

## 🐛 Troubleshooting

### Music Not Playing
1. Check `/public/music.mp3` exists and is valid
2. Click "Start Music" button (autoplay blocked by browsers)
3. Check browser console for errors

### Countdown Wrong Time
- Uses **Asia/Jerusalem** timezone via Luxon
- Target: **March 2, 2026 at 21:00 (9 PM) Israel time**
- Automatically handles Daylight Saving Time

### Performance Issues
- Enable Purim Mode only on powerful devices
- Check browser DevTools Performance tab
- Reduce particle count in `NeonBackground.tsx` if needed

---

## 📝 License

MIT License - Use freely for your party!

**Note**: You are responsible for ensuring any music you use complies with copyright laws.

---

## 🎉 Credits

Built with chaos, neon, and way too much caffeine ☕

**Happy Purim! 🎭🍬**
