# AI Article Summarizer

A Chrome extension that uses AI to generate concise summaries of articles. Built with Next.js, Firebase, and OpenAI.

> ⚠️ **Under Development**: This project is currently in active development. Features and functionality may change.

## Features

- Google Authentication
- Article text summarization using GPT-4
- URL-based article fetching
- Save summaries to Firebase
- Clean, modern UI

## Tech Stack

- Next.js 14
- TypeScript
- Firebase (Auth & Firestore)
- OpenAI API
- Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- Firebase project
- OpenAI API key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
OPENAI_API_KEY=your_openai_api_key
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-summarizer.git
cd ai-summarizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages and API routes
├── components/       # React components
├── utils/           # Utility functions
└── firebaseConfig.ts # Firebase configuration
```

## Development Roadmap

### Phase 1: Core Features (Current)
- [x] Firebase Authentication
- [x] Article Summarization
- [x] URL-based Article Fetching
- [x] Summary Storage

### Phase 2: Chrome Extension Development
- [ ] Chrome Extension API Integration
  - [ ] manifest.json setup with permissions
  - [ ] Browser action for page summarization
  - [ ] Content script for in-page highlighting
- [ ] Extension-Backend Connection
  - [ ] Firebase integration
  - [ ] Cross-device sync

### Phase 3: Enhanced Features
- [ ] History
  - [ ] User's saved summaries view
  - [ ] Summary management
- [ ] Highlight
  - [ ] Key highlights extraction
  - [ ] In-page highlighting

### Phase 4: Premium Features
- [ ] Extended Summaries
- [ ] Multi-language Support
- [ ] Audio Summaries (Text-to-Speech)

### Phase 5: Mobile Integration
- [ ] React Native/Flutter Mobile App
- [ ] Cross-platform Sync

### Phase 6: Advanced AI Features
- [ ] Fine-tuned LLM Model
- [ ] Enhanced Semantic Understanding
  - [ ] Key Takeaways
  - [ ] Sentiment Analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
