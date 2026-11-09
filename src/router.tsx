import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import { lazy, Suspense } from 'react';
import Home from './pages/Home/Home';
import AuthGuard from './routes/AuthGuard';

const AboutLazy = lazy(() => import('./pages/About/About'));
const ContactLazy = lazy(() => import('./pages/Contact/Contact'));
const ErrorLazy = lazy(() => import('./pages/Error/Error'));
const AccountLazy = lazy(() => import('./pages/Account/Account'));
const LoginLazy = lazy(() => import('./pages/Login/Login'));
const SignUpLazy = lazy(() => import('./pages/SignUp/SignUp'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Suspense>
        <ErrorLazy />
      </Suspense>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <AboutLazy /> },
      { path: '/contact', element: <ContactLazy /> },
      { path: '/login', element: <LoginLazy /> },
      { path: '/signup', element: <SignUpLazy /> },
      {
        path: '/account',
        element: (
          <AuthGuard>
            <AccountLazy />
          </AuthGuard>
        ),
      },
    ],
  },
]);
