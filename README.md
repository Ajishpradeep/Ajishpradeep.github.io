# Ajish Pradeep Portfolio Website

This is the source code for Ajish Pradeep's personal portfolio website, showcasing his work as an AI Engineer & Researcher.

## Overview

This portfolio site is built using HTML, CSS, and vanilla JavaScript, featuring a modern component-based architecture. The site is fully responsive and optimized for all devices.

## Features

- **Component-Based Architecture**: The site is built using a component-based approach, with each section organized into separate HTML files.
- **Modular JavaScript**: JavaScript functionality is organized into modules for better maintainability.
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices.
- **Animated UI**: Smooth animations and transitions throughout the site.
- **Interactive Terminal**: A simulated terminal interface where visitors can interact and learn more about Ajish's skills and experience.
- **Progressive Web App**: Configured as a PWA for offline access and installation on devices.
- **Netlify Integration**: Includes Netlify serverless functions for the contact form.

## Technology Stack

- HTML5
- CSS3 (with TailwindCSS)
- Vanilla JavaScript (ES6+)
- SVG Animations
- Netlify Serverless Functions
- Service Workers for PWA functionality

## File Structure

```
├── assets/                # Static assets like images and SVGs
├── components/            # HTML components for different sections
├── css/                   # CSS files
│   ├── main.css           # Main stylesheet
├── js/                    # JavaScript files
│   ├── main.js            # Main JavaScript file
│   ├── modules/           # JavaScript modules
│       ├── animations.js  # Animations functionality
│       ├── filters.js     # Filter functionality
│       ├── mobileMenu.js  # Mobile menu functionality
│       ├── terminal.js    # Terminal functionality
├── netlify/               # Netlify configuration
│   ├── functions/         # Serverless functions
├── index.html             # Main HTML file
├── service-worker.js      # Service worker for PWA functionality
└── manifest.json          # PWA manifest file
```

## Setup and Development

1. Clone the repository:
   ```
   git clone https://github.com/Ajishpradeep/Ajishpradeep.github.io.git
   ```

2. Navigate to the project directory:
   ```
   cd Ajishpradeep.github.io
   ```

3. Open `index.html` in your browser or use a local server:
   ```
   python -m http.server
   ```

4. Visit `http://localhost:8000` in your browser.

## Deployment

The website is deployed using GitHub Pages and is available at [ajishpradeep.github.io](https://ajishpradeep.github.io/).

## License

Copyright (c) 2023 Ajish Pradeep. All rights reserved.

## Contact

For questions or feedback, please contact Ajish Pradeep at [ajishpradeep@gmail.com](mailto:ajishpradeep@gmail.com). 