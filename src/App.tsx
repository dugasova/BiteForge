import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home/Home';
import Layout from './pages/Layout';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './HOC/AuthGuard';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy loaded components
//Universal function for lazy loading
const lazyLoad = (path: string) => lazy(() => import(path));

const AboutRouterLazy = lazyLoad('./routes/AboutRouter');
const ContactRouterLazy = lazyLoad('./routes/ContactRouter');
const ErrorRouteLazy = lazyLoad('./routes/ErrorRoute');
const AccountRouterLazy = lazyLoad('./routes/AccountRouter');
const LoginRouterLazy = lazyLoad('./routes/LoginRouter');
const SignUpRouterLazy = lazyLoad('./routes/SignUpRouter');

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Layout />,
      children: [
        {
          path: '/', element: <Home />
        },
        {
          path: '/about', element: <AboutRouterLazy />
        },
        {
          path: '/contact', element: <ContactRouterLazy />
        },
        {
          path: '/login', element: <LoginRouterLazy />
        },
        {
          path: '/signup', element: <SignUpRouterLazy />
        },
        {
          path: '/account', element: <AuthGuard><AccountRouterLazy /></AuthGuard>
        }
      ],
      errorElement: <ErrorRouteLazy />
    }
  ])
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}