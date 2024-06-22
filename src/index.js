import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/users-context';

import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "953367450866-o00ksqg9c2ieaf7886mdfnkrkvvje2kb.apps.googleusercontent.com"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
      <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

