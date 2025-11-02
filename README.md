## Health Tracker

A single-page React application for tracking medications and vital signs with user authentication and local storage persistence. Built with TypeScript, React, and Tailwind CSS.

## Overview

This application allows users to manage their medication list and log vital signs with automatic timestamp tracking. All data is persisted locally using browser localStorage and is isolated per user. The application includes automatic logout after 5 minutes of inactivity and a clean, responsive interface.

## Tech Stack

- **React 19** - UI library with functional components and hooks
- **TypeScript** - Type-safe development
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing with route protection
- **Tailwind CSS** - Utility-first CSS framework
- **Local Storage API** - Browser storage for data persistence

No state management libraries, UI component libraries, or form libraries were used. The application relies solely on React's built-in state management and custom-built components.

## Features

### Medication Management

- Add medications with name, dosage, and frequency
- View list of all medications
- Remove medications from the list
- Data persists across browser refreshes

### Vital Signs Logging

- Log blood pressure (systolic and diastolic), heart rate, and weight
- Automatic timestamp generation for each entry
- View history log sorted by newest first
- Data persists across browser refreshes

### User Authentication

- Username-based login (no password required for this demo)
- User-specific data isolation
- Automatic logout after 5 minutes of inactivity
- Protected routes that redirect unauthenticated users

### Custom UI Components

All UI components including modals, toast notifications, buttons, inputs, and other interface elements were built from scratch rather than using a UI library. This approach was chosen for two primary reasons:

1. **Security and Minimal Dependencies**: In payment applications, minimizing external packages reduces the attack surface and potential vulnerabilities. Each additional dependency introduces potential security risks that need to be continuously monitored and updated.

2. **Flexibility and Control**: Building components from scratch prevents being locked into a particular design system or UI library's constraints. This allows for complete customization and ensures the components can be tailored exactly to the application's needs without fighting against library-specific patterns or limitations.

The application uses a lightweight, custom-built component system that provides full control over styling, behavior, and functionality while maintaining a minimal dependency footprint.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository or extract the project files
2. Navigate to the project directory:
   ```bash
   cd health-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Sample Credentials

The application uses mock user data. You can log in with any of the following usernames:

- `sarah.johnson`
- `michael.chen`
- `emily.davis`

Each user has isolated data stored separately in localStorage. You can test the user-specific data isolation by logging in with different usernames and verifying that medications and vitals are kept separate.

## Project Structure

```
health-tracker/
├── public/              # Static assets
├── src/
│   ├── app/            # Route components (Next.js App Router style)
│   │   ├── login/      # Login route
│   │   ├── dashboard/  # Dashboard route
│   │   └── router.tsx  # Route configuration
│   ├── components/     # Reusable UI components
│   │   ├── auth/       # Authentication components
│   │   ├── medications/# Medication components
│   │   ├── vitals/     # Vitals components
│   │   ├── modals/     # Modal components (custom-built)
│   │   └── toast/      # Toast notification components (custom-built)
│   ├── contexts/       # React Context definitions
│   ├── providers/      # Context providers
│   ├── hooks/          # Custom React hooks
│   ├── guards/         # Route protection components
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── data/           # Mock data
│   ├── ui/             # Base UI components (custom-built)
│   └── styles/         # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Component Architecture

The application follows a component-based architecture with clear separation of concerns:

- **Route Components**: Handle routing and page-level layout (`app/login`, `app/dashboard`)
- **Feature Components**: Encapsulate business logic and UI for specific features (`components/medications`, `components/vitals`)
- **Base UI Components**: Reusable building blocks (`ui/button`, `ui/input`, etc.)
- **Context Providers**: Global state management (`providers/AuthProvider`, `providers/ToastProvider`)
- **Custom Hooks**: Encapsulate stateful logic (`hooks/useMedications`, `hooks/useVitals`)

## Local Storage Schema

Data is stored in browser localStorage with the following key structure:

### Storage Keys

- `switch-health-current-user`: Current user session data

  ```json
  {
    "username": "sarah_j",
    "lastActivity": 1234567890123
  }
  ```

- `switch-health-meds-{username}`: Medications array for specific user

  ```json
  [
    {
      "id": "1234567890-abc123",
      "name": "Lisinopril",
      "dosage": "20mg",
      "frequency": "Once daily in the morning"
    }
  ]
  ```

- `switch-health-vitals-{username}`: Vitals array for specific user
  ```json
  [
    {
      "id": "1234567890-xyz789",
      "systolic": 120,
      "diastolic": 80,
      "heartRate": 65,
      "weight": 150,
      "timestamp": "2025-01-15T10:30:00.000Z"
    }
  ]
  ```

Each user's data is stored separately using dynamic keys based on their username, ensuring complete data isolation between users.

## Key Features Implementation

### Inactivity Tracking

The application automatically logs users out after 5 minutes of inactivity. Activity is tracked through mouse movements, keyboard inputs, and scroll events. When inactivity is detected, the user is automatically logged out and redirected to the login page.

### Data Persistence

All medications and vitals are immediately saved to localStorage when added or removed. On page load, data is automatically restored from localStorage, ensuring continuity across browser sessions.

### Route Protection

The application uses route guards to protect authenticated routes. Unauthenticated users attempting to access the dashboard are redirected to the login page. Authenticated users accessing the login page are redirected to the dashboard.

### Toast Notifications

Custom-built toast notification system supports success and error messages with configurable durations. Toasts are scoped to prevent cross-contamination between different parts of the application (e.g., login toasts don't appear in dashboard and vice versa).

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- The application uses mock user data stored in `src/data/users.ts`
- All timestamps are displayed in the format: "2nd November 2025 - 19:44"
- The inactivity timeout is set to 5 minutes (300,000 milliseconds)
- All API operations (add medication, remove medication, log vitals, login, logout) are simulated with a 1.5 second delay to mimic real API calls

## Browser Compatibility

The application requires a modern browser that supports:

- ES6+ JavaScript features
- Local Storage API
- CSS Grid and Flexbox

Tested and working on Chrome, Firefox, Safari, and Edge (latest versions).
