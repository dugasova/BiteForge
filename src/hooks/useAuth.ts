import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { type RootState, type AppDispatch } from '../store';
import { signUpUser, logInUser, logOutUser } from '../store/auth/authSlice';

export default function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const signUp = async (email: string, password: string) => {
    const result = await dispatch(signUpUser({ email, password })).unwrap();
    toast.success(t('auth.signUpSuccess'));
    return result;
  };

  const logIn = async (email: string, password: string) => {
    const result = await dispatch(logInUser({ email, password })).unwrap();
    toast.success(t('auth.logInSuccess'));
    return result;
  };

  const logOut = async () => {
    await dispatch(logOutUser()).unwrap();
    toast.info(t('auth.logOutSuccess'));
  };

  return { user, loading, error, signUp, logIn, logOut };
}
