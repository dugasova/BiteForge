import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home/Home';
import Layout from './pages/Layout';
import AboutRouter from './routes/AboutRouter';
import ContactRouter from './routes/ContactRouter';
import ErrorRoute from './routes/ErrorRoute';
import { AuthProvider } from './context/AuthContext';
import { BurgerProvider } from './context/BurgerProvider';
import AccountRouter from './routes/AccountRouter';
import LoginRouter from './routes/LoginRouter';
import SignUpRouter from './routes/SignUpRouter';
import ProtectedRoute from './components/ProtectedRoute';

import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Layout />,
      children: [
        {
          path: '/', element: <Home />
        },
        {
          path: '/about', element: <AboutRouter />
        },
        {
          path: '/contact', element: <ContactRouter />
        },
        {
          path: '/login', element: <LoginRouter />
        },
        {
          path: '/signup', element: <SignUpRouter />
        },
        {
          path: '/account', element: <ProtectedRoute><AccountRouter /></ProtectedRoute>
        }
      ],
      errorElement: <ErrorRoute />
    }
  ])
  return (
    <ThemeProvider>
      <AuthProvider>
        <BurgerProvider>
          <RouterProvider router={router} />
        </BurgerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}   