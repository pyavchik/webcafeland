# Web Cafe Land

A modern React application built with Create React App.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine (version 14 or higher).

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env
```
Then edit `.env` with your Firebase configuration.

3. Start the development server:
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

### Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication and Firestore Database
3. Copy your Firebase config to the `.env` file
4. Update Firestore security rules as needed

Example `.env` configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Features

- ⚡ React 18 with modern hooks
- 📱 Responsive design
- 🎨 Modern CSS with gradients and animations
- 🚀 Fast development with hot reloading
- 🔥 Firebase integration (Auth, Firestore, Storage)
- 🛠️ Best practices with ESLint, Prettier, Husky
- 📦 Organized component structure
- 🎯 Custom hooks for state management

## Project Structure

```
webcafeland/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button/
│   │   └── index.js
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useFirestore.js
│   │   └── useLocalStorage.js
│   ├── services/            # Firebase and API services
│   │   ├── auth.js
│   │   ├── firebase.js
│   │   ├── firestore.js
│   │   └── index.js
│   ├── utils/               # Helper functions and constants
│   │   └── constants.js
│   ├── styles/              # Global styles and variables
│   │   └── variables.css
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── .husky/                 # Git hooks
├── env.example             # Environment variables template
├── package.json
└── README.md
```

Ready to start building your React application!
