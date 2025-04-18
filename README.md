# Ajish Pradeep - AI Engineer & Researcher Portfolio

A modern, interactive portfolio website showcasing my expertise in AI Engineering and Research. Built with React, TypeScript, and Tailwind CSS, featuring an AI-powered terminal using Google's Gemini API.

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations and transitions
- **AI-Powered Terminal**: Interactive terminal powered by Google's Gemini API
- **Portfolio Showcase**: Detailed sections for skills, experience, and projects
- **Contact Form**: Secure contact form with file upload capability
- **PWA Support**: Progressive Web App features for offline access
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API
- **Deployment**: Netlify
- **Styling**: Tailwind CSS, Custom Animations
- **Icons**: Font Awesome
- **Form Handling**: Netlify Forms

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Ajishpradeep/Ajishpradeep.github.io.git
cd Ajishpradeep.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

## 🔧 Configuration

### Gemini API Integration

1. Get your Gemini API key:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file

2. Model Selection:
   - The project uses `gemini-2.0-flash` model
   - Configured in `src/utils/gemini.ts`

### Environment Variables

Create a `.env` file with:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

## 📁 Project Structure

```
├── public/                 # Static assets
│   ├── profile_pic.png     # Profile picture
│   └── Resume.pdf          # Resume file
├── src/
│   ├── components/         # React components
│   │   ├── MainContent.tsx # Main content sections
│   │   ├── Sidebar.tsx     # Sidebar navigation
│   │   └── ...
│   ├── utils/             # Utility functions
│   │   ├── gemini.ts      # Gemini API integration
│   │   ├── terminal.ts    # Terminal functionality
│   │   └── ...
│   └── ...
└── ...
```

## 🎯 Key Sections

1. **About Me**
   - Professional introduction
   - Current focus areas
   - Availability status

2. **Core Skills**
   - Programming Languages
   - AI Frameworks
   - Cloud & Deployment
   - Specializations
   - Mathematics

3. **Experience**
   - Current Role at President Information Corp
   - Previous Experience at AIBS Software Solutions

4. **Portfolio**
   - Research Projects
   - Case Studies
   - Private Projects (NDA)

5. **Collaborations**
   - Future Data Systems
   - MobilityZ
   - Research Lab (AI & Multimedia Systems)

6. **Contact**
   - Multiple contact methods
   - Secure contact form
   - Social media links

## 🚀 Deployment

The project is configured for deployment on Netlify:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

## 🔒 Security

- API keys are stored in environment variables
- Contact form submissions are handled securely through Netlify Forms
- No sensitive information is exposed in the frontend

## 📝 Customization

### Profile Information
- Update `src/utils/portfolio.ts` for profile data
- Modify `public/profile_pic.png` for profile picture
- Update `public/Resume.pdf` for resume

### Styling
- Customize colors in `tailwind.config.js`
- Modify animations in `src/utils/animations.ts`
- Update styles in `src/App.css`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- Email: ajishpradeep@gmail.com
- LinkedIn: [Ajish Pradeep](https://www.linkedin.com/in/ajishpradeep/)
- GitHub: [Ajishpradeep](https://github.com/Ajishpradeep)
- Line: [Ajish Pradeep](https://line.me/ti/p/Ubq5KJIQTv) 