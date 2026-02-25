# Spaza Link - Client

A modern React + TypeScript + Vite application for the Spaza Link platform. This client application serves multiple user types including customers and traders with a responsive, PWA-enabled interface.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)

### Installation

1. Clone the repository and navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` with hot module replacement (HMR) enabled.

## 📁 Project Structure

```
src/
├── app/                    # Application routes and layouts
│   ├── routes.tsx         # Route definitions
│   ├── layouts/           # Page layouts (Customer, Trader, Public)
│   └── screens/           # Main screens for different user types
├── components/            # Reusable UI components
│   ├── business/          # Business-specific components
│   ├── feedback/          # Feedback & empty state components
│   └── ui/                # Base UI components (built with shadcn)
├── assets/                # Static assets
└── lib/
    └── utils.ts           # Utility functions
```

## 🎯 Key Features

- **Multiple User Types**: Different layouts and screens for customers and traders
- **Progressive Web App (PWA)**: Offline-capable application with service worker support
- **Component Library**: Pre-built UI components using Radix UI and Tailwind CSS
- **Type Safety**: Full TypeScript support with strict type checking
- **Modern Stack**: React 19, Vite 7, Tailwind CSS 4

## 📦 Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Generate PWA icons
npm run generate-pwa-icons
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **PWA Support**: Workbox + Vite PWA Plugin

## 📝 Component Organization

### UI Components (`/components/ui/`)

Base components like buttons, cards, badges, and skeleton loaders built with Tailwind CSS and Radix UI.

### Business Components (`/components/business/`)

Domain-specific components such as business cards and maps.

### Layouts (`/app/layouts/`)

Page templates for different user types (Customer, Trader, Public).

### Screens (`/app/screens/`)

Full page implementations for home screens and entry points.

## 🌐 Routing

Routes are defined in [src/app/routes.tsx](src/app/routes.tsx). The application supports different layouts based on user type:

- **Public Layout**: For unauthenticated users
- **Customer Layout**: For customer users
- **Trader Layout**: For trader users

## 🔧 ESLint Configuration

The project uses ESLint for code quality. To lint your code:

```bash
npm run lint
```

For production applications, consider enabling type-aware lint rules by updating the ESLint configuration.

## 🏗️ Building for Production

```bash
npm run build
```

This command:

1. Runs TypeScript compiler check
2. Builds with Vite
3. Outputs optimized files to the `dist/` directory

## 📱 PWA Features

This project is configured as a Progressive Web App. To regenerate PWA icons:

```bash
npm run generate-pwa-icons
```

## 🤝 Contributing

When working on this project:

1. Follow the existing folder structure
2. Use TypeScript for type safety
3. Run `npm run lint` before committing
4. Keep components reusable and well-documented

## 📄 License

See the [LICENSE](LICENSE) file for details.
