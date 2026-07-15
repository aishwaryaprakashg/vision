# VisionAI Studio Architecture

## Overview

VisionAI Studio is a browser-based Progressive Web Application (PWA) that performs image classification and Optical Character Recognition (OCR) entirely on the user's device. No backend server or cloud inference is used, ensuring privacy and offline capability after the initial setup.

## System Architecture

```text
                User
                  │
                  ▼
      React + Vite Web Application
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
TensorFlow.js         Tesseract.js
(MobileNet v2)        (OCR Engine)
        │                   │
        └─────────┬─────────┘
                  ▼
        Image Analysis Engine
                  │
      ┌───────────┼───────────┐
      ▼           ▼           ▼
Classification   OCR      Image Metadata
                              │
                              ▼
                     Dominant Color Analysis
                              │
                              ▼
                     AI Report Generation
                              │
                              ▼
                  LocalStorage (History)
```

## Data Flow

1. User uploads an image.
2. The browser reads the image locally.
3. MobileNet v2 classifies the image.
4. Tesseract.js extracts readable text.
5. Canvas API extracts metadata and dominant colors.
6. Results are displayed in the dashboard.
7. Reports and history are stored locally.

## Offline Execution

Internet Required:
- First-time download of MobileNet model
- First-time download of Tesseract language files

Works Completely Offline:
- Image upload
- Image classification
- OCR
- Report generation
- History
- PWA interface

User Data:
- Never leaves the device

## Design Decisions

- Browser-only architecture
- No backend server
- No cloud AI inference
- Progressive Web App (PWA)
- Offline support after first load
- Privacy-first design

## Technologies

- React
- TypeScript
- Vite
- TensorFlow.js
- MobileNet v2
- Tesseract.js
- Tailwind CSS
- Framer Motion
- LocalStorage
