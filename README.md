# VisionAI Studio — Offline Visual Intelligence

> A premium, privacy-first, on-device visual intelligence studio. Upload an image and let in-browser AI classify it, extract text, and build a full analysis report — with **zero cloud calls** and **zero data leaving your browser**.

Built for the **On-Device AI Hackathon**.

---

## 🚀 Live Demo

https://vision-eta-lilac.vercel.app/

## 🎥 Demo Video

https://youtu.be/1yE1UqXfiB4?si=Hf9lMig83x3jp1FX

---

## Overview

VisionAI Studio is a production-ready, browser-based application that performs
complete image analysis **entirely on the user's device**. There is no backend,
no server, no API keys, and no cloud inference. All AI processing happens
locally using TensorFlow.js (MobileNet v2) and Tesseract.js, both of which run
inside the browser.

The app is designed to feel like a premium AI startup product — inspired by
Apple, Linear, Vercel, and Arc Browser — with a dark, glassmorphic, animated UI.

---

## Why VisionAI?

Traditional AI image analysis often relies on cloud processing, increasing latency and raising privacy concerns. VisionAI Studio performs AI inference directly inside the browser using TensorFlow.js and Tesseract.js, enabling fast, private, and offline-capable image analysis without transmitting user data.

---

## ✨ Highlights

- 🔒 100% On-Device AI
- 🌐 Offline-capable Progressive Web App
- 🧠 TensorFlow.js MobileNet v2
- 📝 Tesseract.js OCR
- 📄 AI Report Generation
- 📜 Local History
- 🎨 Premium Glassmorphism UI
- ⚡ No Backend Required

---

## Features

- **Premium landing page** — Hero, Features, How It Works, Why On-Device AI,
  Architecture, Demo Preview, Privacy Panel, FAQ, and Footer.
- **Professional dashboard** — Sidebar, top navigation, drag & drop upload,
  image preview, AI analysis, history, settings. Fully responsive.
- **On-device image classification** — MobileNet v2 via TensorFlow.js classifies
  images into 1,000+ ImageNet categories. Shows predicted label, confidence,
  top 5 ranked predictions with animated bars, processing time, and category.
- **AI Insights panel** — Plain-language explanation of each prediction plus a
  "How was this predicted?" section explaining how MobileNet compares learned
  visual features, without claiming human-like reasoning.
- **Smart OCR** — Tesseract.js extracts text only when confidence and content
  are meaningful; otherwise shows a clean "No readable text detected" empty
  state instead of garbage characters.
- **Model status card** — Live model, status, inference mode, GPU backend
  (WebGL/CPU), and approximate memory size.
- **Performance panel** — Animated bars and stat tiles for model load,
  inference, OCR, and total processing times.
- **In-browser OCR** — Tesseract.js extracts text from images (receipts,
  screenshots, documents) with copy and download buttons.
- **Image information** — Resolution, file size, image type, upload time, and a
  dominant color palette extracted via canvas pixel sampling.
- **AI report** — A structured, downloadable TXT report with prediction,
  confidence, top predictions, OCR result, image info, dominant colors,
  performance, privacy status, and a privacy footer confirming no data was
  transmitted.
- **History** — Past analyses saved in LocalStorage with thumbnail, prediction,
  confidence, timestamp, and processing time. Click any card to reopen the
  full report in a modal.
- **Privacy panel** — Animated status cards showing Internet Usage (Offline),
  Cloud AI Calls (0), Processing (100% Local), and Privacy Score (100%).
- **Architecture page** — An animated vertical pipeline diagram of the
  on-device flow with status badges.
- **Landing page** — Hero, Features, How It Works, Why VisionAI, Why On-Device
  AI, Architecture, Demo Preview, Privacy Panel, FAQ, and Footer.
- **Settings** — Theme switch (dark/light), clear history, and about section.

---

## Architecture

```
User
  ↓
Browser (FileReader → <img>)
  ↓
TensorFlow.js (WebGL backend)
  ↓
MobileNet v2  →  classification (1,000+ categories)
  ↓
Tesseract.js  →  OCR (text extraction)
  ↓
Canvas        →  dominant color palette + metadata
  ↓
Results rendered in the dashboard
  ↓
LocalStorage (history)
```

Every stage runs locally. Open your browser's DevTools → Network tab during an
analysis and you will see **zero inference requests** leave your device.

---

## Tech Stack

| Concern         | Technology                          |
| --------------- | ----------------------------------- |
| Framework       | React 18 + TypeScript               |
| Build tool      | Vite                                |
| Styling         | Tailwind CSS                        |
| Animation       | Framer Motion                       |
| Icons           | Lucide React                        |
| On-device AI    | TensorFlow.js + MobileNet v2        |
| OCR             | Tesseract.js                        |
| Storage         | LocalStorage (browser)              |
| Routing         | React Router v6                     |

**No backend. No Supabase. No Firebase. No cloud APIs.**

---

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

The app runs entirely in the browser. On first load it fetches the MobileNet
model and Tesseract language data from a CDN; once cached by the browser, it
works offline.

---

## How On-Device AI Works

### Image Classification (TensorFlow.js + MobileNet)

1. The user drops an image. `FileReader` reads it into a data URL.
2. The image is loaded into an `HTMLImageElement`.
3. `@tensorflow-models/mobilenet` loads MobileNet v2 (cached after first load).
4. TensorFlow.js selects the **WebGL backend** for GPU-accelerated inference.
5. `model.classify(img, 5)` returns the top 5 predictions with probabilities.
6. A broad category (Animal, Vehicle, Food, etc.) is derived from the class name.

### OCR (Tesseract.js)

1. A Tesseract worker is created once and reused.
2. `worker.recognize(dataUrl)` extracts text from the image buffer.
3. The extracted text is displayed with copy and download options.

### Color Palette

1. The image is drawn to a small offscreen canvas (64px wide).
2. Pixels are read via `getImageData` and quantized into color buckets.
3. The most frequent buckets become the dominant palette with share percentages.

### Privacy

- No image data is ever sent over the network.
- History is stored in `localStorage` under `visionai.history.v1`.
- There is no backend, so there is nothing to breach.

---

## Folder Structure

```
src/
├── components/        # Reusable UI components
│   ├── ConfidenceBar.tsx
│   ├── CopyButton.tsx
│   ├── DashboardLayout.tsx
│   ├── GlassCard.tsx
│   ├── Logo.tsx
│   ├── Reveal.tsx
│   ├── SectionHeading.tsx
│   ├── Skeleton.tsx
│   └── StatusCards.tsx
├── hooks/             # Custom React hooks
│   ├── useAnalysis.ts
│   ├── useHistory.ts
│   └── useTheme.ts
├── pages/             # Route-level pages
│   ├── ArchitecturePage.tsx
│   ├── Dashboard.tsx
│   ├── HistoryPage.tsx
│   ├── LandingPage.tsx
│   └── SettingsPage.tsx
├── services/          # AI + storage services
│   ├── imageService.ts
│   ├── mobilenetService.ts
│   └── storage.ts
├── types/             # TypeScript interfaces
│   └── index.ts
├── utils/             # Formatting + report helpers
│   └── format.ts
├── App.tsx            # Routes + lazy loading
├── main.tsx           # Entry point
└── index.css          # Tailwind + global styles
```

---

## Screenshots

https://drive.google.com/file/d/1v-LN-z8UK2O0Uv6KDsJXlKKmWFzsxL3H/view?usp=drivesdk — Landing page hero

https://drive.google.com/file/d/12A2B5yIOlLRhiXmASAeuD4oNxeT3NKCb/view?usp=drivesdk — Dashboard with analysis

https://drive.google.com/file/d/1YK1-RpzSUefaj6X-1dlwP6oTmDQYofy8/view?usp=drivesdk — Dashboard with analysis

https://drive.google.com/file/d/1cygqdlrsp29-9XOqmLL-6AqcHD_WgrN8/view?usp=drivesdk  — Architecture diagram

https://drive.google.com/file/d/17xIvLtXo0QYJiofLJneJzOwbbkEm0sXT/view?usp=drivesdk  — Architecture diagram

---

## Future Improvements

- **More models** — Add EfficientNet, COCO-SSD object detection, and body
  segmentation via TensorFlow.js model zoo.
- **Image preprocessing** — Cropping, rotation, and brightness adjustment
  before analysis.
- **Batch analysis** — Upload multiple images and analyze them in sequence.
- **Export formats** — PDF and JSON report export in addition to TXT.
- **WebGPU backend** — Use the experimental WebGPU backend for TensorFlow.js
  where supported.
- **Confidence calibration** — Display per-category confidence distributions.

---

## Acknowledgements

This project was built using open-source technologies including React, Vite, TensorFlow.js, MobileNet v2, Tesseract.js, Tailwind CSS, Framer Motion, and Lucide React.

Special thanks to the Open Source Developers' Community (OSDC) for organizing the On-Device AI Hackathon.

---

## License

MIT License. © VisionAI Studio. Built for the On-Device AI Hackathon.
