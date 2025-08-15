
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DevToolsProtection, AntiDebug } from './utils/devToolsProtection.ts';

// Initialize production security
DevToolsProtection.init();
AntiDebug.init();

// Create root and render App
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(<App />);
}
