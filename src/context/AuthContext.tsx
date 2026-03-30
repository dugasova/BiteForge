import { createContext, useContext, useEffect } from "react";
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  type User, 
  type UserCredential 
} from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, type RootState } from '../store';

interface AuthContextType {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  async function signUp(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", email), {
        savedBurger: []
      });
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred during sign up";
      dispatch(setError(message));
      throw error;
    }
  }

  async function logIn(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred during login";
      dispatch(setError(message));
      throw error;
    }
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        dispatch(setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => { unsubscribe() };
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function UserAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('UserAuth must be used within an AuthContextProvider');
  }
  return context;
}
