import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth } from '../../firebase';
import { createUserDocument } from '../../services/ordersService';
import { toast } from 'react-toastify';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

// --- THUNKS ---

export const signUpUser = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Create user document in Firestore
      await createUserDocument(email);
      toast.success(`Welcome, ${result.user.email}! Account created.`);
      
      return {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred during sign up";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const logInUser = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Logged in successfully!`);
      return {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred during login";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      toast.info('Logged out.');
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred during logout";
      return rejectWithValue(message);
    }
  }
);

// --- SLICE ---

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Log In
      .addCase(logInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Log Out
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      });
  }
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
