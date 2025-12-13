# FixNow Mechanics Website

Modern, mobile-responsive website for FixNow Mechanics - a mobile mechanic service operating in Hertfordshire and surrounding areas.

## Features

- **Mobile-First Design** - Fully responsive across all devices
- **Multi-Step Quote Form** - Easy-to-use estimate request system with address validation
- **Service Area Coverage** - Detailed location pages for all covered areas
- **WhatsApp Integration** - Quick contact via WhatsApp widget
- **Modern UI** - Built with React, TypeScript, and Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- React Query

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── home/        # Home page sections
│   ├── layout/      # Layout components (Header, Footer, etc.)
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and constants
├── pages/           # Page components
└── assets/          # Images and static assets
```

## Deployment

Build the project with `npm run build` and deploy the `dist` folder to your hosting provider.

## Environment Variables

No environment variables required for basic functionality.
