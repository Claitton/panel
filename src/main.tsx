import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../app/globals.css';
import App from './App.tsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SessionsPage from './pages/sessions/index.tsx';
import TerminalPage from './pages/terminal/index.tsx';
import QueryProvider from './query.tsx';
import XTermPage from './pages/xterm/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/session",
    element: <SessionsPage />
  },
  {
    path: "/terminal",
    element: <TerminalPage />
  },
  {
    path: "/xterm/:sessionId",
    element: <XTermPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
)
