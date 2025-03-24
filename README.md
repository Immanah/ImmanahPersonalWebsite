# Immanah Makitla Portfolio

A Netflix-inspired portfolio website showcasing my projects, skills, and experience with different views for recruiters, developers, and curious visitors.

## Features

- Netflix-inspired UI with profile selection
- Dynamic content based on visitor type (Recruiter, Developer, Curious)
- Responsive design for all devices
- Animated transitions using Framer Motion
- Comprehensive education, skills, project, and experience sections

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, ShadCN UI
- **Backend**: Express.js
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Build Tools**: Vite, TypeScript

## Setup for GitHub Deployment

After downloading this project, follow these steps before pushing to GitHub:

1. **Remove Replit-specific files**:
   ```bash
   rm -rf .replit .upm .cache .config .local
   rm generated-icon.png
   ```

2. **Update package.json**:
   - Change the name to "immanah-portfolio"
   - Add author, description fields
   - Remove Replit-specific dependencies:
     - @replit/vite-plugin-cartographer
     - @replit/vite-plugin-runtime-error-modal
     - @replit/vite-plugin-shadcn-theme-json
   - Add "shadcn-ui": "^0.4.1" to dependencies

3. **Create a new vite.config.ts**:
   ```typescript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import path, { dirname } from "path";
   import { fileURLToPath } from "url";

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);

   export default defineConfig({
     plugins: [
       react(),
     ],
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "client", "src"),
         "@shared": path.resolve(__dirname, "shared"),
       },
     },
     root: path.resolve(__dirname, "client"),
     build: {
       outDir: path.resolve(__dirname, "dist/public"),
       emptyOutDir: true,
     },
   });
   ```

4. **Update .gitignore**:
   ```
   # dependencies
   node_modules
   /.pnp
   .pnp.js

   # testing
   /coverage

   # production
   /dist
   /build

   # misc
   .DS_Store
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local

   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*
   ```

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to view the app (usually at http://localhost:5000)

## Deployment

### Vercel/Netlify (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel or Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## License

MIT