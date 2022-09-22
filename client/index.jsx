import React from 'react';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
const app = document.getElementById('app');
const root = createRoot(app);
root.render(<App tab="home"/>);