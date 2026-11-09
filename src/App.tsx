import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './components/Home/Home';
import Layout from './pages/Layout';
import AuthGuard from './HOC/AuthGuard';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store, setUser, toAuthUser } from './store';
import { useAppDispatch } from './store/hooks';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import { MotionConfig } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const AboutRouterLazy = lazy(() => import('./routes/AboutRouter'));
const ContactRouterLazy = lazy(() => import('./routes/ContactRouter'));
const ErrorRouteLazy = lazy(() => import('./routes/ErrorRoute'));
const AccountRouterLazy = lazy(() => import('./routes/AccountRouter'));
const LoginRouterLazy = lazy(() => import('./routes/LoginRouter'));
const SignUpRouterLazy = lazy(() => import('./routes/SignUpRouter'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Suspense>
        <ErrorRouteLazy />
      </Suspense>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <AboutRouterLazy /> },
      { path: '/contact', element: <ContactRouterLazy /> },
      { path: '/login', element: <LoginRouterLazy /> },
      { path: '/signup', element: <SignUpRouterLazy /> },
      {
        path: '/account',
        element: (
          <AuthGuard>
            <AccountRouterLazy />
          </AuthGuard>
        ),
      },
    ],
  },
]);

function AuthInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser ? toAuthUser(currentUser) : null));
    });
  }, [dispatch]);

  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <AuthInit />
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </MotionConfig>
      </ThemeProvider>
    </Provider>
  );
}
