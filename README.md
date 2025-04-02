Immanah Makitla Portfolio
A Netflix-inspired portfolio website showcasing my projects, skills, and experience with different views for recruiters, developers, and curious visitors.

Features
Netflix-inspired UI with profile selection

Dynamic content based on visitor type (Recruiter, Developer, Curious)

Responsive design for all devices

Animated transitions using Framer Motion

Comprehensive education, skills, project, and experience sections

Tech Stack
Frontend: React, Tailwind CSS, Framer Motion, ShadCN UI

Backend: Express.js

State Management: TanStack Query

Routing: Wouter

Build Tools: Vite, TypeScript

Setup
After downloading this project, follow these steps to set up the environment:

Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
The application will be available in your browser at http://localhost:5000

Deployment
Vercel/Netlify (Recommended)
Push your code to GitHub

Connect your repository to Vercel or Netlify

Configure build settings:

Build command: npm run build

Output directory: dist

Install command: npm install

GitHub Pages
Install gh-pages:

bash
Copy
Edit
npm install --save-dev gh-pages
Add the following to package.json scripts:

json
Copy
Edit
"deploy": "gh-pages -d dist"
Deploy with:

bash
Copy
Edit
npm run build && npm run deploy
License
MIT
