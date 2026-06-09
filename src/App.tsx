import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './components/Home/Home';
import Layout from './pages/Layout';
import AuthGuard from './HOC/AuthGuard';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store, setUser, type AppDispatch } from './store';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
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
    errorElement: <Suspense><ErrorRouteLazy /></Suspense>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <Suspense><AboutRouterLazy /></Suspense> },
      { path: '/contact', element: <Suspense><ContactRouterLazy /></Suspense> },
      { path: '/login', element: <Suspense><LoginRouterLazy /></Suspense> },
      { path: '/signup', element: <Suspense><SignUpRouterLazy /></Suspense> },
      {
        path: '/account',
        element: <AuthGuard><Suspense><AccountRouterLazy /></Suspense></AuthGuard>,
      },
    ],
  },
]);

function AuthInit() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser ? {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      } : null));
    });
  }, [dispatch]);

  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthInit />
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </ThemeProvider>
    </Provider>
  );
}
