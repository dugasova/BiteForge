import { db } from '../firebase';
import { doc, setDoc, updateDoc, onSnapshot, arrayUnion, arrayRemove } from 'firebase/firestore';
import type { Order } from '../types/order';

const USERS_COLLECTION = 'users';
const ORDERS_FIELD = 'savedBurger';

const userDoc = (email: string) => doc(db, USERS_COLLECTION, email);

export const createUserDocument = (email: string) =>
  setDoc(userDoc(email), { [ORDERS_FIELD]: [] });

export const saveOrder = (email: string, order: Order) =>
  updateDoc(userDoc(email), { [ORDERS_FIELD]: arrayUnion(order) });

export const deleteOrder = (email: string, order: Order) =>
  updateDoc(userDoc(email), { [ORDERS_FIELD]: arrayRemove(order) });

export const subscribeToOrders = (
  email: string,
  onData: (orders: Order[]) => void,
  onError: () => void,
) =>
  onSnapshot(
    userDoc(email),
    (snapshot) => onData(snapshot.data()?.[ORDERS_FIELD] ?? []),
    onError,
  );
