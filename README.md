# Smart Gmail AI Auto Reply Extension

Developed a Chrome extension integrated with Gmail to generate context-aware email replies using Gemini AI. Implemented tone-based response generation (Professional, Friendly) using custom AI-driven logic, and enabled real-time communication between a React frontend and a Spring Boot backend through REST APIs for seamless response delivery.

### Setup & Usage
1. Clone the repository containing all modules (Chrome extension, frontend, backend).
2. Open Chrome → go to `chrome://extensions` → enable **Developer Mode** → click **Load unpacked** → select the `email-extensions` folder → pin the extension and open Gmail.
3. Navigate to the frontend folder and run:
   ```bash
   npm install
   npm run dev

Get a free Gemini API key from https://ai.google.dev/gemini-api/docs
Configure the backend with the following environment variables:

GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
GEMINI_API_KEY=YOUR_API_KEY_HERE
