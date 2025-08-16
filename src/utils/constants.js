// App-wide constants
export const APP_NAME = 'Web Cafe Land';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'webCafeLand_userPreferences',
  THEME: 'webCafeLand_theme',
  SETTINGS: 'webCafeLand_settings',
};

// Firebase collections
export const COLLECTIONS = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  SETTINGS: 'settings',
};

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE_DESKTOP: '1200px',
};

// Common regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]{10,}$/,
  URL: /^https?:\/\/.+/,
};
