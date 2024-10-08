import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <StrictMode>
        <App />
      </StrictMode>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
