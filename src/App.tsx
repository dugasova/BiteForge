import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import { MotionConfig } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { router } from './router';
import useAuthListener from './hooks/useAuthListener';

function AuthInit() {
  useAuthListener();
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
