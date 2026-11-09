import { signUpUser, logInUser, logOutUser } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const signUp = (email: string, password: string) =>
    dispatch(signUpUser({ email, password })).unwrap();

  const logIn = (email: string, password: string) =>
    dispatch(logInUser({ email, password })).unwrap();

  const logOut = () => dispatch(logOutUser()).unwrap();

  return { user, loading, signUp, logIn, logOut };
}
