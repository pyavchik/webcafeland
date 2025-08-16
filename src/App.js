import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Web Cafe Land</h1>
        <p>
          A modern React application ready for your creativity!
        </p>
        <div className="App-features">
          <div className="feature-card">
            <h3>🚀 Fast Development</h3>
            <p>Built with Create React App for rapid development</p>
          </div>
          <div className="feature-card">
            <h3>📱 Responsive Design</h3>
            <p>Mobile-first approach with modern CSS</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Modern Tools</h3>
            <p>Latest React 18 with hooks and modern JavaScript</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
