# Claritas - Mindful Self-Reflection App

Claritas is a beautifully designed mobile app for spiritual but non-religious self-reflection. Built with Expo, TypeScript, and Supabase, it provides a calming space for daily meditation, gratitude journaling, and emotional tracking.

## Features

### 🌅 Morning Intentions

- Set daily goals and intentions
- Track excitements and concerns
- Create personal mantras and affirmations
- Beautiful sunrise-inspired gradient UI

### 🙏 Gratitude Journal

- Daily gratitude entries with categories
- Review past entries for positivity tracking
- Elegant card-based interface with animations
- Smooth transitions and micro-interactions

### 🌊 Emotional & Physical Well-being

- Track mental and emotional states
- Monitor physical well-being and energy levels
- AI-powered mood analysis
- Interactive circular progress bars and wave animations

### 🌙 Evening Reflection

- Review the day's highlights and challenges
- Document lessons learned and insights
- Track mood and sentiment patterns
- Calming sunset-inspired design

### 🤖 AI-Powered Features

- Speech-to-text for voice journaling (OpenAI Whisper)
- Sentiment analysis and mood detection
- Thematic summaries of reflections
- Progress visualization and insights

## Tech Stack

- **Frontend**

  - Expo (Managed Workflow)
  - TypeScript
  - React Native Navigation
  - React Native Reanimated
  - TailwindCSS (twrnc)

- **Backend**

  - Supabase (PostgreSQL)
  - Supabase Auth
  - Supabase Storage

- **AI & Processing**
  - OpenAI Whisper API
  - ChatGPT API

## Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/claritas.git
   cd claritas
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a Supabase project and update the configuration:

   - Copy \`.env.example\` to \`.env\`
   - Add your Supabase URL and anon key

4. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

5. Run on your device or simulator:
   \`\`\`bash
   npm run ios # for iOS
   npm run android # for Android
   \`\`\`

## Project Structure

\`\`\`
src/
├── components/ # Reusable UI components
├── navigation/ # Navigation configuration
├── screens/ # Main app screens
├── hooks/ # Custom React hooks
├── services/ # API and external services
├── utils/ # Helper functions
├── constants/ # App constants
├── types/ # TypeScript definitions
└── theme/ # Theme configuration
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspiration from modern mindfulness apps
- Gradient patterns from [UI Gradients](https://uigradients.com)
- Icons from [Phosphor Icons](https://phosphoricons.com)
