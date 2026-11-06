import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { createUserDocument } from '../../services/ordersService';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

export const toAuthUser = (user: User): AuthUser => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

export const signUpUser = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await createUserDocument(email);
      return toAuthUser(result.user);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Sign up failed');
    }
  },
);

export const logInUser = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return toAuthUser(result.user);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  },
);

export const logOutUser = createAsyncThunk('auth/logOut', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logInUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
