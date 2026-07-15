# Local AI Verification

## On-Device AI Components

VisionAI Studio performs all AI inference directly within the user's browser.

### Runs Completely On-Device

- Image Classification (TensorFlow.js + MobileNet v2)
- Optical Character Recognition (Tesseract.js)
- Image Metadata Extraction
- Dominant Color Analysis
- AI Report Generation
- Analysis History (LocalStorage)

## Internet Usage

The application requires an internet connection only during the first visit to download:

- MobileNet v2 model files
- Tesseract.js language data
- Application assets

After these assets are cached by the browser, the application can continue to function offline as a Progressive Web App (PWA).

## Data Privacy

- Images are never uploaded to a server.
- No cloud AI services are used for inference.
- User data remains on the device.
- Analysis history is stored locally using LocalStorage.

## Summary

| Component | On Device |
|-----------|:---------:|
| Image Classification | ✅ |
| OCR | ✅ |
| Report Generation | ✅ |
| History Storage | ✅ |
| Cloud AI | ❌ |
| Backend Server | ❌ |
