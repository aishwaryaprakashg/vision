# Evaluation

## Testing Method

VisionAI Studio was tested using a variety of real-world images, including:

- Animals
- Vehicles
- Food
- Household Objects
- Screenshots
- Documents
- Receipts

## Image Classification

TensorFlow.js MobileNet v2 successfully classified common objects with confidence scores and returned the top five predictions for each image.

## OCR Evaluation

Tesseract.js successfully extracted text from:

- Printed documents
- Screenshots
- Receipts
- Digital text

OCR accuracy depends on image quality, lighting conditions, font clarity, and resolution.

## Offline Testing

The application was tested as a Progressive Web App (PWA).

After the initial online visit and asset caching:

- The application loaded successfully without an internet connection.
- Image classification continued to function offline.
- OCR continued to function offline using previously cached language data.

## Known Limitations

- Low-resolution images may reduce classification accuracy.
- Blurry or handwritten text can reduce OCR accuracy.
- Initial internet access is required to download AI model and OCR assets before offline use.
