import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './components/Home/Home';
import Layout from './pages/Layout';
import AuthGuard from './routes/AuthGuard';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store, setUser, toAuthUser } from './store';
import { useAppDispatch } from './store/hooks';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import { MotionConfig } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const AboutLazy = lazy(() => import('./components/About/About'));
const ContactLazy = lazy(() => import('./components/Contact/Contact'));
const ErrorLazy = lazy(() => import('./components/Error/Error'));
const AccountLazy = lazy(() => import('./components/Account/Account'));
const LoginLazy = lazy(() => import('./components/Login/Login'));
const SignUpLazy = lazy(() => import('./components/SignUp/SignUp'));
const router = createBrowserRouter([
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
