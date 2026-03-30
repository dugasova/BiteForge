import { configureStore } from '@reduxjs/toolkit';
import buildReducer from './build/buildSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    build: buildReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './auth/authSlice';
export * from './build/buildSlice';
