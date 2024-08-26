import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../app/globals.css';

import { Toaster } from './components/ui/sonner.tsx';
import QueryProvider from './query.tsx';
import { PrivateRoutes, PublicRoutes } from './routes.tsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/session",
//     element: <SessionsPage />
//   },
//   {
//     path: "/terminal",
//     element: <TerminalPage />
//   },
//   {
//     path: "/xterm/:sessionId",
//     element: <XTermPage />
//   },
//   {
//     path: "/login",
//     element: <LoginPage />
//   },
//   {
//     path: "/register",
//     element: <RegisterPage />
//   }
// ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <PublicRoutes />
      {/* <PrivateRoutes /> */}
    </QueryProvider>
    <Toaster />
  </StrictMode>,
)
