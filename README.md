# 🤖 Android Mastery Hub — Pre-Interview Knowledge Base

[![Android](https://img.shields.io/badge/Platform-Android%20Architecture-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/)
[![Kotlin](https://img.shields.io/badge/Language-Kotlin%20%2F%20JVM-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)](https://kotlinlang.org/)
[![JavaScript](https://img.shields.io/badge/UI-Vanilla%20JS%20%2F%20Tailwind-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#-license)
[![Netlify](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://thao-ho-study.netlify.app/)

> **Android Mastery Hub** is an interactive, zero-build technical dashboard engineered to deconstruct deep runtime internals, JVM/ART bytecode transformations, compiler optimizations, and Clean Architecture patterns for Android engineers preparing for senior technical interviews.

🌐 **Live site:** [https://thao-ho-study.netlify.app/](https://thao-ho-study.netlify.app/)

---

## ⚡ Key Highlights

- **Zero-Dependency Architecture:** Pure Vanilla JS, HTML5, and Tailwind CSS (CDN). No Webpack, Vite, or Node.js runtime required.
- **Deep-Dive Engineering:** Covers low-level mechanics (CPS, State Machines, LL-HLS, Hardware TEE DRM, ART JIT escape analysis).
- **Interactive SPA Experience:** Dual-view system (Dashboard Grid & Dedicated Reader) with instant client-side keyword search.
- **Pluggable Course System:** Modular repository pattern (`window.coursesRepository`) allowing independent lesson files without bloat.
- **Developer UX:** Native dark/light mode toggle with state persistence and typography optimized for code tracing.

---

## 📚 Curriculum & Module Overview

| Category | Course Title | Core Mechanics Deconstructed |
| :--- | :--- | :--- |
| **Concurrency** | **Coroutines & Flow Core Mechanics** | CPS transformation, `COROUTINE_SUSPENDED`, `label` bitmasking (`Integer.MIN_VALUE`), `CoroutineScheduler` work-stealing, CSP Channels. |
| **Persistence** | **Room Database & SQLite Architecture** | TypeConverters, safe migrations, Write-Ahead Logging (WAL), multithreaded access. |
| **Media & Streaming** | **HTTP Live Streaming (HLS) & Video Processing** | I-frame/GOP segmentation, `.ts` vs `.m4s`, Low-Latency HLS, SSAI, hardware DRM, Media3 ExoPlayer (ABR) & Transformer. |
| **UI & Graphics** | **Android Graphics & Image Assets** | Vector vs Raster, density buckets, Bitmap memory management, Feed/Story export specs for Facebook & Instagram. |
| **Monetization** | **Google Play Monetization** | Paid App vs In-app Products vs Subscriptions, Play Billing (`consumeAsync` / `acknowledgePurchase`), Play Console vs Google Cloud, server-side receipt validation. |
| **AI Tools** | **Claude** | Using Claude in the Android development workflow *(in progress)*. |
| **Developer Tools** | **Android Studio** | Git branch sync & cleanup (`fetch.prune`, `git fetch -p`, removing merged local branches). |

---

## 📂 Project Structure

```text
android-study-hub/
├── index.html                     # Main dashboard view & dynamic lesson reader
├── netlify.toml                   # Netlify config (zero-build static site)
├── README.md                      # Project documentation
├── css/
└── js/
    ├── app.js                     # SPA logic: dashboard, reader, search, theme
    ├── data/
    │   ├── courses-repository.js  # Registers every course shown on the dashboard
    │   └── lessons/
    │       └── room-db.js         # Room Database course module
    └── courses/
        ├── coroutines-flow.js     # Coroutines & Flow
        ├── hls-streaming.js       # HTTP Live Streaming (HLS)
        ├── graphics-assets.js     # Android Graphics & Image Assets
        ├── play-monetization.js   # Google Play Monetization
        ├── claude.js              # Claude
        └── android-studio.js      # Android Studio
```

To add a course, create a module in `js/courses/` that exports a course object, then import and add it to `js/data/courses-repository.js`.

---

## 🚀 Deploy to Netlify

The site is deployed at **[thao-ho-study.netlify.app](https://thao-ho-study.netlify.app/)**.

The site is static, so there is no build step. Config is in `netlify.toml` (`publish = "."`).

**Option A — Git (auto-deploy on push):** Netlify → *Add new site* → *Import an existing project* → choose this GitHub repo → keep Build command empty, Publish directory `.` → *Deploy*.

**Option B — CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify deploy          # preview deploy
netlify deploy --prod   # production deploy
```
