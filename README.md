# Vision Chat: A Gemini-Powered Conversational AI

Vision Chat is a modern, full-featured chat application that leverages Google's Gemini API. It provides a user-friendly interface for engaging in text-based conversations, analyzing images, and asking questions about the content of uploaded text files. This project serves as a comprehensive example of building a multi-modal AI application with React and TypeScript.

## Features

- **Conversational AI**: Engage in dynamic, context-aware conversations powered by the `gemini-2.5-flash` model.
- **Vision Capability**: Upload images (e.g., JPEG, PNG) and ask complex questions about their content. The application can describe images, identify objects, and answer visual queries.
- **File Analysis (Simple RAG)**: Attach text-based files (`.txt`, `.md`, `.js`, `.py`, etc.) to provide context for your questions. The file's content is prepended to your prompt, allowing the model to answer questions based on the provided document.
- **Modern & Responsive UI**: A clean and responsive user interface built with Tailwind CSS, ensuring a great user experience on any device.
- **Asynchronous Handling**: Includes clear loading indicators and error messages for a smooth user experience while waiting for AI responses.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript
- **AI Model**: Google Gemini API (`@google/genai`)
- **Styling**: Tailwind CSS (via CDN)
- **Module Loading**: ES Modules with Import Maps (no build step required for dependencies).

## Running the Project

Follow these steps to get the Vision Chat application running on your local machine.

### 1. Clone the Repository

First, open your terminal and clone the project repository using Git:

```bash
git clone https://github.com/zaher-m/Vision-Chat-App.git
cd Vision-Chat-App
```

### 2. Configure Your API Key

This project requires a Google Gemini API key to function.

1.  Obtain your key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Open the file `services/geminiService.ts`.
3.  Locate the following line:
    ```typescript
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    ```
4.  For local development, you will need to replace `process.env.API_KEY` with your actual API key string:
    ```typescript
    // IMPORTANT: For local testing only. Do not commit your API key.
    const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY_HERE" });
    ```
    **Warning**: This method is for local testing only. Never commit your API key to a public or private repository. The original code (`process.env.API_KEY`) is designed for development environments (like Google's Project IDX) that securely inject this key at runtime.

### 3. Run the Application

Since this is a static web application with no build step, you can run it using any simple local web server.

1.  From the project's root directory, run one of the following commands in your terminal:

    If you have Python installed:

    ```bash
    python -m http.server
    ```

    If you have Node.js installed, you can use `npx`:

    ```bash
    npx serve .
    ```

2.  Open your web browser and navigate to the address provided by the server (e.g., `http://localhost:8000` or `http://localhost:3000`).
3.  The application will load, and you can begin your conversation with the AI.

## How to Use

1.  You will be greeted by the "How can I help you today?" welcome screen.
2.  **For a text-only chat**: Type your message in the input field at the bottom and press `Enter` or click the send icon.
3.  **To ask about an image or file**:
    - Click the **paperclip icon** to open the file selector.
    - Choose an image or a text file from your device.
    - A preview of the image or the name of the file will appear above the input box.
    - Type a question related to the uploaded file (e.g., "What is in this picture?" or "Summarize this document.").
    - Press `Enter` to send your message.
4.  The model's response will appear in the chat window. A pulsing dot animation indicates that the model is "thinking".
