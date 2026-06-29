# FlutterQuest AI — Installable App

A complete, installable learning game that teaches **Flutter, Machine Learning, Deep Learning, Reinforcement Learning, NLP, LLMs, RAG, Computer Vision and MLOps** through gamified, bite-sized coding challenges.

This is a **Progressive Web App (PWA)** — it installs on Android and iOS like a native app, works offline, and saves the player's progress on their device. It can be published to the **Google Play Store** by wrapping it as an Android app (instructions below).

---

## What's in this folder

```
flutterquest-ai/
├── index.html          ← the app (UI + all screens)
├── app.js              ← game logic, curriculum, persistence, install
├── service-worker.js   ← offline support + caching
├── manifest.json       ← PWA manifest (name, icons, theme)
├── icons/              ← app icons in every required size
│   ├── icon-48 … icon-512.png
│   ├── icon-maskable-192 / 512.png   (Android adaptive icons)
│   ├── apple-touch-icon.png          (iOS home-screen icon)
│   └── favicon.png
└── README.md           ← this file
```

---

## Try it right now (locally)

You need a local web server (the service worker won't run from `file://`):

```bash
cd flutterquest-ai
python3 -m http.server 8080
```

Then open **http://localhost:8080** on your computer or phone (same Wi-Fi, use your machine's IP).
On a phone you'll see an **Install** prompt — tap it to add it to your home screen.

---

## Step 1 — Put it online (free hosting)

A PWA must be served over **HTTPS** to be installable. Pick any of these — all have free tiers:

**Netlify (drag-and-drop, easiest)**
1. Go to https://app.netlify.com/drop
2. Drag the whole `flutterquest-ai` folder onto the page.
3. You get a live HTTPS URL in seconds (e.g. `https://flutterquest-ai.netlify.app`).

**Vercel**
```bash
npm i -g vercel
cd flutterquest-ai
vercel
```

**GitHub Pages**
1. Create a repo, push these files.
2. Settings → Pages → deploy from `main` branch, root folder.
3. Your URL: `https://<username>.github.io/<repo>/`

**Firebase Hosting**
```bash
npm i -g firebase-tools
firebase init hosting   # set public dir to this folder
firebase deploy
```

Once live, open the URL on your phone → browser menu → **Add to Home Screen / Install app**. It now runs full-screen with no browser bars, and works offline.

---

## Step 2 — Publish to the Google Play Store

Google lets you ship a PWA as a real Android app using a **Trusted Web Activity (TWA)**. The easiest tool is **Bubblewrap** (official, by Google).

### Prerequisites
- A live HTTPS URL from Step 1
- Node.js installed
- A Google Play Developer account ($25 one-time fee) — https://play.google.com/console
- Java JDK 17+ (Bubblewrap installs Android tooling for you)

### Build the Android app bundle

```bash
npm i -g @bubblewrap/cli

# point it at your live manifest
bubblewrap init --manifest https://YOUR-URL/manifest.json
```

Answer the prompts (app name "FlutterQuest AI", package id e.g. `com.yourname.flutterquest`, etc.). Then:

```bash
bubblewrap build
```

This produces:
- `app-release-signed.aab` ← **upload this to Play Store**
- `app-release-signed.apk` ← for testing on a device

### Verify ownership (Digital Asset Links)
Bubblewrap prints an `assetlinks.json`. Host it at:
```
https://YOUR-URL/.well-known/assetlinks.json
```
This proves your site and app belong together and removes the browser address bar inside the app.

### Upload to Play Console
1. https://play.google.com/console → **Create app**
2. Fill store listing (use the description below + screenshots).
3. **Production → Create release** → upload the `.aab`.
4. Complete content rating, privacy policy, and data-safety form.
5. Submit for review (usually a few days).

---

## Ready-to-use Play Store listing copy

**App name:** FlutterQuest AI — Learn Flutter & AI

**Short description (80 chars):**
Master Flutter, ML, Deep Learning, LLMs & RAG through fun coding challenges.

**Full description:**
> FlutterQuest AI turns learning to code into a game. Work through 15 tracks and 90+ bite-sized challenges covering Flutter, Machine Learning, Deep Learning, Reinforcement Learning, NLP, Large Language Models, RAG, Computer Vision and MLOps.
>
> Every challenge gives you the theory, a real "deep dive" with the actual math and intuition, a fill-in-the-blank code snippet, and a clear explanation — so you learn deeply, not just memorise.
>
> • 15 learning tracks from beginner to frontier AI
> • Earn XP, level up, and keep a daily streak
> • Earn hearts by completing tasks and streaks
> • Works offline — learn anywhere
> • No ads, your progress saved on your device
>
> Whether you're building your first Flutter app or diving into Transformers and RLHF, FlutterQuest AI helps you level up.

**Category:** Education
**Icons:** use `icons/icon-512.png` (high-res icon). Generate a 1024×512 feature graphic from the neon logo if desired.

---

## Optional — connect a live AI tutor

Right now the in-app "AI tutor" explanation is built in and works fully **offline**. If you want a live, conversational tutor powered by a real model, add a tiny backend:

1. Create a server endpoint (e.g. a serverless function) that holds your API key and calls your LLM provider.
2. In `app.js`, replace the body of `showHint()` with a `fetch()` to that endpoint, passing the challenge text.

Keep the API key on the server — never in the client. The offline explanations remain a perfect fallback when there's no connection.

---

## Notes
- Progress is stored with `localStorage` on the device. "Reset all progress" lives in the profile screen.
- The app is self-contained: only external dependency is Google Fonts, which the service worker caches for offline use.
- To change colors, edit the CSS variables at the top of `index.html` (`--neon`, `--neon2`, etc.).
- To add lessons, append objects to the `LESSONS` array in `app.js` — the home screen and tracks update automatically.

Built to help people learn. Ship it and teach the world. 🚀
