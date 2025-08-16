import React, { useState } from 'react';
import { Button } from './components';
import useLocalStorage from './hooks/useLocalStorage';
import { APP_NAME, STORAGE_KEYS } from './utils/constants';
import './App.css';

function App() {
  const [visitCount, setVisitCount] = useLocalStorage(STORAGE_KEYS.SETTINGS, {
    visits: 0,
  });
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGetStarted = () => {
    setVisitCount(prev => ({ ...prev, visits: prev.visits + 1 }));
    setShowWelcome(false);
  };

  const handleReset = () => {
    setShowWelcome(true);
    setVisitCount({ visits: 0 });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to {APP_NAME}</h1>
        <p>A modern React application with best practices implemented!</p>

        {showWelcome ? (
          <div className="welcome-section">
            <p className="visit-counter">
              {visitCount.visits > 0 && `Visit #${visitCount.visits + 1} - `}
              Ready to explore?
            </p>
            <Button onClick={handleGetStarted} size="large" variant="primary">
              Get Started 🚀
            </Button>
          </div>
        ) : (
          <div className="demo-section">
            <h2>Component Showcase</h2>
            <div className="button-demo">
              <Button variant="primary" size="small">
                Primary Small
              </Button>
              <Button variant="secondary" size="medium">
                Secondary Medium
              </Button>
              <Button variant="success" size="large">
                Success Large
              </Button>
              <Button variant="danger" disabled>
                Disabled Danger
              </Button>
            </div>
            <Button onClick={handleReset} variant="secondary" size="medium">
              ← Back to Welcome
            </Button>
          </div>
        )}

        <div className="App-features">
          <div className="feature-card">
            <h3>🚀 Best Practices</h3>
            <p>ESLint, Prettier, Husky pre-commit hooks</p>
          </div>
          <div className="feature-card">
            <h3>📁 Organized Structure</h3>
            <p>Components, hooks, utils, and services folders</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Modern Patterns</h3>
            <p>Custom hooks, CSS variables, and reusable components</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
