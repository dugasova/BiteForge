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


const AboutRouterLazy = lazy(()=> import('./routes/AboutRouter'));
const ContactRouterLazy = lazy(()=> import('./routes/ContactRouter'));
const ErrorRouteLazy = lazy(()=> import('./routes/ErrorRoute'));
const AccountRouterLazy = lazy(()=> import('./routes/AccountRouter'));
const LoginRouterLazy = lazy(()=> import('./routes/LoginRouter'));
const SignUpRouterLazy = lazy(()=> import('./routes/SignUpRouter'));

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