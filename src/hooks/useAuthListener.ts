import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { auth } from '../firebase';
import { setUser, toAuthUser } from '../store';

export default function useAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser ? toAuthUser(currentUser) : null));
    });
  }, [dispatch]);
}
