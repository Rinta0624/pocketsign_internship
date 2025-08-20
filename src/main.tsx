import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // './' は「同じ階層にある」という意味
import { SessionProvider } from "./SessionProvider.jsx";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>
);