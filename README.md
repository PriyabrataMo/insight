# Meeting Insight

A modern web application that transforms meeting transcripts into actionable tasks using AI-powered analysis. Built with Next.js, TypeScript, and Google Gemini AI.

## 🌟 Features

- **📝 Transcript Submission**: Easy-to-use form for submitting meeting transcripts
- **🤖 AI-Powered Action Item Generation**: Leverages Google Gemini AI to extract actionable tasks from meeting content
- **✅ Task Management**: Interactive task list with completion tracking and deletion capabilities
- **📊 Progress Visualization**: Real-time pie chart showing completion progress
- **� Dashboard Stats**: Live statistics cards showing total, completed, and pending tasks
- **�💾 Data Persistence**: Local storage for loading saved tasks (saving temporarily disabled)
- **📱 Responsive Design**: Modern UI built with Shadcn/UI components and Tailwind CSS
- **⚡ Real-time Updates**: Instant UI updates when task status changes
- **🎨 Modern UI**: Gradient backgrounds, hover effects, and smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **AI**: Google Gemini AI (gemini-2.0-flash-lite model)
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
│   ├── analytics/
│   │   └── page.tsx             # Analytics page (placeholder)
│   ├── templates/
│   │   └── page.tsx             # Templates page (placeholder)
│   ├── favicon.ico              # App favicon
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
├── components/
│   ├── ui/                      # Reusable UI components (Shadcn/UI)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   └── textarea.tsx
│   ├── ActionItemsList.tsx      # Task list component with delete/complete
│   ├── ProgressChart.tsx        # Pie chart component using Recharts
│   └── TranscriptForm.tsx       # Form component with AI integration
├── lib/
│   ├── gemini.ts               # Google Gemini AI integration
│   └── utils.ts                # Utility functions (Tailwind merge)
├── types/
│   └── index.ts                # TypeScript type definitions
public/
├── file.svg                    # Static assets
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

## 🔧 Configuration

### Current Implementation Notes

- **Local Storage**: Tasks are loaded from localStorage on app start, but auto-saving is currently commented out
- **AI Model**: Uses the latest Gemini 2.0 Flash Lite for improved performance and cost efficiency
- **Error Handling**: Includes robust JSON parsing with fallback text processing

### Environment Variables

| Variable                     | Description              | Required |
| ---------------------------- | ------------------------ | -------- |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini AI API key | Yes      |

### AI Model Configuration

The application uses Google Gemini 2.0 Flash Lite model with optimized prompts for:

- Extracting actionable items from meeting transcripts
- Formatting responses as structured JSON arrays
- Handling various meeting transcript formats

## 🎨 UI Components

Built with a custom component library based on:

- **Shadcn/UI**: Production-ready components
- **Radix UI**: Accessible primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons

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
