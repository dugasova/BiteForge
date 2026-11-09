import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { saveOrder } from '@/services/ordersService';
import type { Order } from '@/types/order';
import useBuilder from '@/hooks/useBuilder';
import useAuth from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import type { ContactsFormValues } from './CheckoutForm';

export const FAST_DELIVERY_PRICE = 20;

export const getOrderTotal = (totalPrice: number, fastDelivery: boolean): number => {
  return fastDelivery ? totalPrice + FAST_DELIVERY_PRICE : totalPrice;
};

export const contactsSchema = (t: (key: string) => string, isUserLoggedIn: boolean) =>
  z.object({
    fullName: z.string().min(2, { message: t('checkout.validation.nameMin') }),
    phoneNumber: z
      .string()
      .regex(/^\+?[\d\s-]{10,}$/, { message: t('checkout.validation.invalidPhone') }),
    email: z.string().email({ message: t('checkout.validation.invalidEmail') }),
    password: z
      .string()
      .min(isUserLoggedIn ? 0 : 6, { message: t('checkout.validation.passwordMin') }),
    deliveryAddress: z.string().min(2, { message: t('checkout.validation.deliveryAddressMin') }),
  });

export function useCheckout(onClose: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user, signUp } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { stateBuilder, resetBuilder } = useBuilder();
  const { ingredients, totalPrice, totalKcal } = stateBuilder;

  const [error, setError] = useState('');
  const [fastDelivery, setFastDelivery] = useState(false);
  const orderTotal = getOrderTotal(totalPrice, fastDelivery);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ContactsFormValues>({
    resolver: zodResolver(contactsSchema(t, !!user)),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: user?.email || '',
      password: '',
      deliveryAddress: '',
    },
  });

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user, setValue]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const onConfirmOrder = async (data: ContactsFormValues) => {
    const targetEmail = user?.email || data.email;

    try {
      if (!user) {
        await signUp(targetEmail, data.password);
      }

      const order: Order = {
        fullName: data.fullName,
        email: targetEmail,
        phoneNumber: data.phoneNumber,
        deliveryAddress: data.deliveryAddress,
        ingredients,
        totalPrice: orderTotal,
        totalKcal,
        fastDelivery,
        id: Date.now(),
        date: new Date().toISOString(),
      };

      await saveOrder(targetEmail, order);
      toast.success(t('checkout.toastSuccess'));

      timerRef.current = setTimeout(() => {
        onClose();
        resetBuilder();
        navigate('/account');
      }, 2000);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : String(saveError));
    }
  };

  const ingredientEntries = Object.entries(ingredients).filter(([, count]) => count > 0);

  return {
    t,
    control,
    errors,
    user,
    handleSubmit,
    onConfirmOrder,
    error,
    fastDelivery,
    setFastDelivery,
    ingredientEntries,
    orderTotal,
    totalPrice,
    totalKcal,
  };
}
