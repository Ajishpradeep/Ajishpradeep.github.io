# Ajish Pradeep Portfolio

A modern portfolio website for AI Engineer & Researcher Ajish Pradeep, featuring an interactive AI-powered terminal using Google's Gemini API via Netlify Functions.

## Features

- Modern, responsive design with Tailwind CSS
- Interactive AI-powered terminal (using Google Gemini API)
- Portfolio showcasing AI projects and research
- Contact form with Netlify Forms integration
- PWA support for offline access
- Optimized animations and transitions

## Setup Instructions

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Ajishpradeep/Ajishpradeep.github.io.git
cd Ajishpradeep.github.io
```

2. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

3. Install dependencies for the Netlify Functions:
```bash
cd netlify/functions
npm install
cd ../..
```

4. Create a `.env` file in the root directory with your Gemini API key:
```
GEMINI_API_KEY=your-api-key-here
```

5. Start the Netlify development server:
```bash
netlify dev
```

6. The site should now be running at `http://localhost:8888`

### Deployment on Netlify

1. Push your code to GitHub:
```bash
git add .
git commit -m "Setup Netlify Functions for Gemini AI"
git push
```

2. Sign up for Netlify (if you haven't already) and connect your GitHub repository.

3. Configure build settings in Netlify:
   - Build command: `cd netlify/functions && npm install` (this is already set in netlify.toml)
   - Publish directory: `.` (root directory)

4. Add environment variable in Netlify dashboard:
   - Key: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key

5. Troubleshooting deployment issues:
   - If you encounter build failures related to missing dependencies, the repository includes:
     - A root-level package.json with a build script
     - The Netlify plugin `@netlify/plugin-functions-install-core` in netlify.toml
     - A build command in netlify.toml that installs function dependencies
   - These measures should automatically resolve dependency installation issues

6. Deploy the site!

## Obtaining a Gemini API Key

1. Go to the [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Navigate to "API Keys" in the left sidebar
4. Click "Create API Key" and follow the instructions
5. Use this key for the `GEMINI_API_KEY` environment variable

## Structure

- `index.html` - Main HTML file
- `style.css` - Custom CSS styles
- `script.js` - Frontend JavaScript
- `netlify/functions/gemini-chat.js` - Serverless function for Gemini API
- `netlify/functions/package.json` - Dependencies for the serverless function
- `service-worker.js` - Service worker for PWA support
- `profile_pic.png` - Profile picture
- `Resume.pdf` - Resume file

## Customizing the AI Chat

The AI assistant's behavior is defined in the `netlify/functions/gemini-chat.js` file. You can modify the system prompt to change how the AI responds to user queries.

## License

MIT

## Contact

Ajish Pradeep - ajishpradeep@gmail.com 