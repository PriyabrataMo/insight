# Meeting Insight

A modern web application that transforms meeting transcripts into actionable tasks using AI-powered analysis. Built with Next.js, TypeScript, and Google Gemini AI.

## 🌟 Features

- **📝 Transcript Submission**: Easy-to-use form for submitting meeting transcripts
- **🤖 AI-Powered Action Item Generation**: Leverages Google Gemini AI to extract actionable tasks from meeting content
- **✅ Task Management**: Interactive task list with completion tracking and deletion capabilities
- **📊 Progress Visualization**: Real-time pie chart showing completion progress
- **💾 Data Persistence**: Local storage to maintain tasks between sessions
- **📱 Responsive Design**: Modern UI built with Shadcn/UI components and Tailwind CSS
- **⚡ Real-time Updates**: Instant UI updates when task status changes

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **AI**: Google Gemini AI (gemini-pro model)
- **UI Components**: Shadcn/UI with Radix UI primitives
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Build Tool**: Turbopack
- **Package Manager**: pnpm
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd insight
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your Google Gemini API key to `.env.local`:

   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

2. **Set environment variables**

   In your Vercel dashboard, add:

   - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key

3. **Access your deployed app**

   Your app will be available at your Vercel URL

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Google Cloud Run

## 📖 Usage Guide

### 1. Submit a Meeting Transcript

- Paste your meeting transcript in the text area
- The transcript should contain actionable items, decisions, or tasks mentioned during the meeting
- Click "Generate Action Items" to process with AI

**Example transcript:**

```
John mentioned he will send the quarterly report by Friday. Sarah agreed to schedule a follow-up meeting with the client. The team decided to review the budget proposal and provide feedback by next Tuesday. Mike will update the project timeline and share it with stakeholders.
```

### 2. Manage Action Items

- **Mark as Complete**: Click the checkbox next to any task
- **Delete Tasks**: Click the trash icon to remove unwanted items
- **Track Progress**: View real-time statistics and progress chart

### 3. Monitor Progress

- View completion percentage in the pie chart
- See completed vs pending task counts
- Track overall project progress

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-action-items/
│   │       └── route.ts          # API endpoint for AI processing
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   └── textarea.tsx
│   ├── ActionItemsList.tsx      # Task list component
│   ├── ProgressChart.tsx        # Pie chart component
│   └── TranscriptForm.tsx       # Form component
├── lib/
│   ├── gemini.ts               # Google Gemini AI integration
│   └── utils.ts                # Utility functions
└── types/
    └── index.ts                # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

| Variable                     | Description              | Required |
| ---------------------------- | ------------------------ | -------- |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini AI API key | Yes      |

### AI Model Configuration

The application uses Google Gemini Pro model with optimized prompts for:

- Extracting actionable items from meeting transcripts
- Formatting responses as structured JSON arrays
- Handling various meeting transcript formats

## 🎨 UI Components

Built with a custom component library based on:

- **Shadcn/UI**: Production-ready components
- **Radix UI**: Accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons

## 📊 Features in Detail

### AI Processing

- **Model**: Google Gemini Pro
- **Processing**: Intelligent extraction of actionable tasks
- **Error Handling**: Robust fallback mechanisms
- **Response Format**: Structured JSON with task descriptions

### Data Management

- **Storage**: Browser localStorage for persistence
- **State Management**: React hooks for real-time updates
- **Data Structure**: TypeScript interfaces for type safety

### User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: User-friendly error messages
- **Accessibility**: Keyboard navigation and screen reader support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/your-username/meeting-insight/issues)
2. Ensure your Gemini API key is correctly configured
3. Verify your environment variables are properly set
4. Check the browser console for error messages

## 🚀 Hosted Application

**Live Demo**: [https://your-app-url.vercel.app](https://your-app-url.vercel.app)

## ✅ Completion Level

**Level: Complete** ✨

All requested features have been successfully implemented:

- ✅ Transcript submission form with multi-line text area
- ✅ AI-powered action item generation using Google Gemini
- ✅ Interactive task list with completion tracking
- ✅ Task deletion functionality
- ✅ Real-time progress visualization with pie charts
- ✅ Modern, responsive UI using Shadcn/UI and Tailwind CSS
- ✅ Data persistence with localStorage
- ✅ Production-ready deployment configuration
- ✅ Comprehensive documentation

---

Built with ❤️ using Next.js and Google Gemini AI
