import React from 'react';
import { createRoot } from 'react-dom/client';
import router from './app/router';
import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './app/ErrorBoundary';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* v7_startTransition belongs here, not in createBrowserRouter's
          options — see the comment in router.tsx for why. */}
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </ErrorBoundary>
  </React.StrictMode>
);