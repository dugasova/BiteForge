import { createContext, useContext, useEffect } from "react";
import { auth } from '../firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setUser, 
  type RootState, 
  signUpUser, 
  logInUser, 
  logOutUser,
  type AppDispatch,
  type AuthUser
} from '../store';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<AuthUser>;
  logIn: (email: string, password: string) => Promise<AuthUser>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  async function signUp(email: string, password: string) {
    return await dispatch(signUpUser({ email, password })).unwrap();
  }

  async function logIn(email: string, password: string) {
    return await dispatch(logInUser({ email, password })).unwrap();
  }

  async function logOut() {
    await dispatch(logOutUser()).unwrap();
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
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, loading, error }}>
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
