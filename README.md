# Captain's Eye Policy 2.0 - Mission Management & Compliance

This is a Next.js application that serves as a visual and functional mockup for a maritime fleet mission management and compliance testing platform.

## Overview

Captain's Eye is designed to streamline maritime operations by providing a robust platform for creating, assigning, and monitoring missions across a fleet of vessels. It includes a comprehensive dashboard for fleet managers and a dedicated mobile interface for ship captains and crew.

### Key Features

- **Dynamic Mission Creation**: Fleet managers can create detailed, multi-step missions with various task types (checklists, photo uploads, signatures, etc.).
- **Centralized State Management**: Uses React Context to manage a global state of missions, allowing for real-time updates across the application.
- **Fleet Dashboard**: A comprehensive overview of all missions, their statuses, and key performance indicators.
- **Analytics Suite**: Detailed analytics on fleet performance and compliance metrics.
- **Mobile-First Interface**: A dedicated interface for captains and crew to view and complete assigned missions, designed to work offline.
- **Role-Based Views**: The interface adapts to different user roles, such as Fleet Manager and Ship Captain.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) 15.5.3 (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Linting/Formatting**: ESLint

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/ohadOrbach/polici-demo.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd polici-demo/captains-eye-mockup
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To run the application in development mode, execute the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you edit the source files.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

## Deployment

This application is configured for easy deployment on the [Vercel Platform](https://vercel.com/), the creators of Next.js. Pushing to the `main` branch of the connected GitHub repository will automatically trigger a new deployment.
