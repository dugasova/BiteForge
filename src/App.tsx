import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home/Home';
import Layout from './pages/Layout';
import AboutRouter from './routes/AboutRouter';
import ContactRouter from './routes/ContactRouter';

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
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}   