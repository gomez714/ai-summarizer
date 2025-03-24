# AI Article Summarizer

A powerful Chrome extension that leverages advanced AI to transform how you read and understand articles. Built with Next.js, Firebase, and OpenAI's GPT-4, this tool provides intelligent summaries and key highlights of any article you're reading.

> ⚠️ **Under Development**: This project is currently in active development. Features and functionality may change.

## Features

- **Smart Summarization**
  - Generate concise summaries using GPT-4
  - Extract key highlights and main points
  - Identify important quotes
  - Process both text input and URL-based articles

- **User Experience**
  - Clean, modern UI with Tailwind CSS
  - Real-time processing with loading states
  - Toast notifications for user feedback
  - Responsive design for all devices

- **Authentication & Storage**
  - Google Authentication integration
  - Secure Firebase storage for summaries
  - Personal history tracking
  - Cross-device sync (coming soon)

- **Article Processing**
  - URL-based article fetching with Mercury Parser
  - Text input support for custom content
  - Automatic content extraction
  - Source attribution and linking

## Tech Stack

- **Frontend**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Mantine UI components
  - React Hot Toast for notifications

- **Backend**
  - Firebase Authentication
  - Firestore Database
  - OpenAI GPT-4 API
  - Mercury Parser for article extraction

## Prerequisites

- Node.js 18+ and npm
- Firebase project with Authentication and Firestore enabled
- OpenAI API key with GPT-4 access

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

### Phase 2: Enhanced Features
- [x] History
  - [x] User's saved summaries view
  - [x] Summary management
- [x] Highlight
  - [x] Key highlights extraction
  - [ ] In-page highlighting

### Phase 3: Chrome Extension Development
- [ ] Chrome Extension API Integration
  - [ ] manifest.json setup with permissions
  - [ ] Browser action for page summarization
  - [ ] Content script for in-page highlighting
- [ ] Extension-Backend Connection
  - [ ] Firebase integration
  - [ ] Cross-device sync

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

## Acknowledgments

- OpenAI for providing the GPT-4 API
- Firebase for authentication and database services
- Mercury Parser for article content extraction
- The Next.js team for the amazing framework
