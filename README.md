# 🤖 Android Mastery Hub — Pre-Interview Knowledge Base

[![Android](https://img.shields.io/badge/Platform-Android%20Architecture-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/)
[![Kotlin](https://img.shields.io/badge/Language-Kotlin%20%2F%20JVM-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)](https://kotlinlang.org/)
[![JavaScript](https://img.shields.io/badge/UI-Vanilla%20JS%20%2F%20Tailwind-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#-license)

> **Android Mastery Hub** is an interactive, zero-build technical dashboard engineered to deconstruct deep runtime internals, JVM/ART bytecode transformations, compiler optimizations, and Clean Architecture patterns for Android engineers preparing for senior technical interviews.

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
| **Media & Streaming** | **HTTP Live Streaming (HLS) Deep Dive** | I-frame/GOP segmentation, `.ts` vs `.m4s`, Low-Latency HLS (1–3s latency), SSAI `#EXT-X-DISCONTINUITY`, Widevine CENC DRM. |
| **Local Storage** | **Room Database Deep-Dive** | KSP code generation, SQLite `TEMP TRIGGER` mechanics, `InvalidationTracker` table monitoring, query threading. |
| **UI Architecture** | **Compose Lifecycle & Recomposition** | Slot Table, Gap Buffer algorithm, Smart Recomposition, `collectAsStateWithLifecycle`, 5000ms `WhileSubscribed` buffer. |
| **Modern Navigation** | **Type-Safe Navigation 2.8+** | Kotlinx Serialization routes, custom `NavType`, eliminating string-based route collisions. |
| **Custom Graphics** | **Compose Canvas & Trigonometry** | `DrawScope` coordinates, Radian/Degree transforms, Bezier curves, and CPU-efficient custom gauges. |
| **System Internals** | **WorkManager vs Foreground Services** | Android 14+ service types, Doze Mode bypass, Expedited Jobs, Low Memory Killer (LMK) & Process Death. |
| **Testing** | **Coroutines & Flow Testing** | `Turbine` stream assertions, `TestScope` virtual time advancement, TestDispatchers. |

---

## 📂 Project Structure

```text
android-study-hub/
├── index.html                   # Main dashboard view & dynamic lesson reader
├── README.md                    # Project documentation
└── js/
    └── courses/
        ├── coroutines-flow.js   # Coroutines & Flow deep dive module
        └── hls-streaming.js     # HTTP Live Streaming (HLS) course module
