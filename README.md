# Air Debrief - AI-Powered Speech Analysis

A modern Angular application that uses speech recognition and AI to analyze pilot debriefings, providing real-time feedback on wins, mistakes, and comprehensive summaries.

## 🚀 Live Demo Link

https://air-debrief.vercel.app/home

## 🎯 Project Overview

Air Debrief is a simplistic web application designed to help cabin crew and pilots and aviation professionals analyze their debriefing sessions. The app captures speech in real-time, processes it through AI, and provides structured feedback on performance, highlighting both successes and areas for improvement.Which makes it easier for senior cabin crew members to just copy and paste the report, instead of loosing time after each flight to write a report.

## ✨ Key Features

- **Real-time Speech Recognition**: Captures and transcribes speech using the Web Speech API. I declared the SpeechRecognition type, as it was not recognised by TypeScript.
- **AI-Powered Analysis**: Integrates with Hugging Face API for crew conversation analysis
- **Structured Feedback**: Provides categorized insights (wins, mistakes, summary)
- **Simplistic UI/UX**: Clean, responsive design 
- **Timer Functionality**: Tracks session duration for better context
- **Error Handling**: Robust error management for API failures and edge cases

## 🛠️ Technical Stack

### Frontend
- **Angular 20**: Latest version with standalone components
- **TypeScript**: Type-safe development
- **SASS**: Advanced styling with variables and mixins, though not used in full potential
- **Signals**: Reactive primitives for state management
- **Angular Router**: Client-side routing with guards

### APIs & Services
- **Web Speech API**: Browser-native speech recognition
- **Hugging Face API**: AI-powered text analysis and summarization, but using the free, not so reliable models
- **Custom Backend**: Node.js/Express server for API requests

### Development Tools
- **Angular CLI**
- **Git**: Version control

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Modern browser with Web Speech API support

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/chelseasst/air-debrief
   cd air-debrief
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create environment files with your API endpoints:
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000' // Your backend URL
   }
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎤 How It Works

### Speech Recognition Flow
1. **Start Recording**: User clicks the start button to begin speech capture
2. **Real-time Transcription**: Web Speech API continuously transcribes speech
3. **Context Building**: The system waits for sufficient speech content (minimum 3 seconds)
4. **AI Analysis**: Transcribed text is sent to Hugging Face API for analysis, model works best for longer speech
5. **Structured Output**: AI returns categorized feedback (wins, mistakes, summary)

### AI Integration
The application integrates with Hugging Face's API to provide analysis:
- **Content Classification**: Identifies positive outcomes and areas for improvement
- **Context Understanding**: Analyzes speech patterns and content structure
- **Summary Generation**: Creates concise, reasonable summaries

## 📱 User Experience

### Optimal Usage Guidelines
- **Speak Clearly**: Ensure good audio quality for accurate transcription
- **Provide Context**: Speak for at least 20 seconds to give AI sufficient context
- **Structured Content**: Organize thoughts into clear wins and mistakes
- **Detailed Descriptions**: The more context provided, the better the AI analysis

### Session Flow
1. **Home Screen**: Overview and instructions
2. **Recording Phase**: Real-time speech capture with timer
3. **Processing**: AI analysis with loading animation
4. **Results**: Structured feedback display

## 🔌 API Integration

### Backend Architecture
The application uses a separate backend service located in the [air-debrief-backend](https://github.com/chelseasst/air-debrief-backend) repository that:
- Receives transcribed text from the frontend via POST requests
- Processes requests through Hugging Face API for AI analysis
- Uses regex patterns to categorize and distribute the AI response into structured objects
- Returns categorized analysis results (wins, mistakes, summary)
- Handles error cases and rate limiting

### API Endpoints
```
POST /api/analyze
Content-Type: application/json
Body: { "transcript": "speech text here" }
Response: { "analysis": { "wins": [], "mistakes": [], "summary": "" } }
```

### Backend Setup
To run the complete application, you'll need to:
1. Clone and set up the backend repository: `https://github.com/chelseasst/air-debrief-backend`
2. Configure the backend with your Hugging Face API credentials
3. Update the frontend environment configuration to point to your backend URL

**Note**: The backend is also deployed on Render for production use, providing a hosted API endpoint for the frontend application.

## 🎨 Design Features

- **Responsive Design**: Works across different devices
- **Smooth Animations**: Loading is a bit slow due to not having permissions for optimized file format
- **Error States**: Feedback for API failures and network issues

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test -- --watch
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Configuration
- **Development**: `environment.ts` - Local backend
- **Production**: `environment.prod.ts` - Production backend

## 🔒 Security Considerations

- API keys stored securely on backend
- HTTPS required for production deployment
- Input validation and sanitization
- Error handling without exposing sensitive information

## 📈 Performance Optimizations

- Optimized bundle size
- Efficient state management
- Minimal API calls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request
6. I'll be happy to see your ideas, and improvements ☺️

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Chelsea Todorova

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


---