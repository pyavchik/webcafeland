// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredKeys = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

  if (missingKeys.length > 0) {
    console.warn(
      `Missing Firebase configuration keys: ${missingKeys.join(', ')}`
    );
    console.warn(
      'Please check your environment variables. See env.example for reference.'
    );
  }

  return missingKeys.length === 0;
};

// Initialize Firebase
let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

try {
  if (validateFirebaseConfig()) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Initialize Analytics only in production and if measurementId is provided
    if (process.env.NODE_ENV === 'production' && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }

    console.log('✅ Firebase initialized successfully');
  } else {
    console.warn('⚠️ Firebase not initialized due to missing configuration');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
}

// Export Firebase services
export { app, auth, db, storage, analytics };

// Export configuration validation for testing
export { validateFirebaseConfig };
