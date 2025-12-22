Developed a Chrome extension integrated with Gmail to generate context-aware email replies using Gemini AI.
Implemented tone-based response generation (Professional, Friendly) using a custom AI-driven logic.
Enabled real-time communication between a React frontend and Spring Boot backend through REST APIs for seamless response delivery.

Step 1 : Clone the Repo of both frontend(email-writer-sb) and backend (writer-sb)
Step 2 : go to extension in chrome and load the unpacked extension of email-extensions
Step 3 : pin the extension and open Gmail
Step 4 : Open the frontend and backend and run 'npm i & npm run dev'
Step 5 : Get the Gemini api key for free from https://ai.google.dev/gemini-api/docs
Step 5 : Open the backend and add configurations GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=;GEMINI_API_KEY= <YOUR-API-KEY>
Step 6 : Run the Spring boot application via terminal or start option
Step 7 : Open Gmail and click on reply button
Step 8 : CLick on AI reply in order to get response from the gemini 
Step 9 : (Optional) You can get tone based responses from the frontend local host server 
