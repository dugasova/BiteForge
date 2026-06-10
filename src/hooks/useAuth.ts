import { useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from '../store';
import { signUpUser, logInUser, logOutUser } from '../store/auth/authSlice';

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const signUp = (email: string, password: string) => dispatch(signUpUser({ email, password })).unwrap();

  const logIn = (email: string, password: string) => dispatch(logInUser({ email, password })).unwrap();

  const logOut = () => dispatch(logOutUser()).unwrap();

  return { user, loading, signUp, logIn, logOut };
}
