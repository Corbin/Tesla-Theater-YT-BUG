import React from 'react';
import Login from './components/Login.jsx';
import { createRoot } from 'react-dom/client';
const app = document.getElementById('app');
const root = createRoot(app);
root.render(<Login tab="home"/>);