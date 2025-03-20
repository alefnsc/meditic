# MEDITIC - Medical AI Assistant

## Overview

MEDITIC is a specialized AI assistant for healthcare professionals, providing evidence-based medical information through a chat interface powered by Google's Gemini AI.

## Features

- **Medical AI Assistant**: Evidence-based medical information
- **Customizable System Prompt**: Tailor AI behavior and guidelines
- **Secure API Management**: Local storage of Google Gemini API keys
- **Professional Interface**: Clean UI for healthcare settings

## Getting Started

### Prerequisites

- Node.js (v14+)
- Google Gemini API Key

### Installation

```bash
git clone https://github.com/yourusername/meditic.git
cd meditic
npm install
npm run dev
```

Open `http://localhost:3000` and enter your API key when prompted.

## Usage

- Type medical questions in the input field
- Customize system prompt via settings panel
- Always verify AI responses with professional judgment

## Technical Stack

- Next.js
- TypeScript
- Tailwind CSS
- Google Gemini API

## Security

- API keys stored only in browser localStorage
- No patient data sent to external servers without explicit queries

## License

MIT License
