# Label AI - Smart Food & Product Scanner

Label AI is a lightweight, AI-powered web application designed to help users evaluate the health and safety of packaged food items or products. Users can either capture or upload an image of a product label, and the app scans ingredients to provide a health rating and allergy check.

## Features

- **Instant Scan**: Upload or capture an image of product labels
- **Ingredient Analysis**: Uses OCR to read and process ingredient lists
- **Health Rating**: AI model analyzes ingredients and rates products from 0-100
- **Allergy Detection**: Identifies ingredients that may trigger selected allergies
- **User-Friendly Interface**: Simple and intuitive design for quick analysis

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/label-ai.git
   cd label-ai
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Update OpenAI API key
   - Open `src/services/ImageAnalysisService.js`
   - Replace `'sk-your-api-key-here'` with your actual OpenAI API key

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Technology Stack

- **Frontend**: React with Material UI
- **OCR Engine**: Tesseract.js
- **AI Analysis**: OpenAI API (mock implementation for development)

## Production Considerations

For a production deployment:

- Move OpenAI API calls to a backend service to secure your API key
- Implement proper error handling and retries for OCR and API calls
- Add data storage for product recommendations and user preferences
- Optimize image processing for better OCR results

## License

MIT

## Acknowledgments

- OpenAI for the language model API
- Tesseract.js for the OCR functionality
- Material UI for the component library
