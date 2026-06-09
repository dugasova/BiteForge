import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { saveOrder } from '../../services/ordersService';
import type { Order } from '../../types/order';
import useBuilder from '../../hooks/useBuilder';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import type { ContactsFormValues } from './CheckoutForm';

const contactsSchema = (t: (key: string) => string, isUserLoggedIn: boolean) => z.object({
  fullName: z.string().min(2, { message: t('checkout.validation.nameMin') }),
  phoneNumber: z.string().regex(/^\+?[\d\s-]{10,}$/, { message: t('checkout.validation.invalidPhone') }),
  email: z.string().email({ message: t('checkout.validation.invalidEmail') }),
  password: z.string().min(isUserLoggedIn ? 0 : 6, { message: t('checkout.validation.passwordMin') }),
  deliveryAddress: z.string().min(2, { message: t('checkout.validation.deliveryAddressMin') }),
});

export function useCheckout(onClose: () => void) {
  const { user, signUp } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { stateBuilder, resetBuilder } = useBuilder();
  const { ingredients, totalPrice, totalKcal } = stateBuilder;

  const [error, setError] = useState('');
  const [fastDelivery, setFastDelivery] = useState(false);

  const fastDeliveryPrice = 20;

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<ContactsFormValues>({
    resolver: zodResolver(contactsSchema(t, !!user)),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: user?.email || '',
      password: '',
      deliveryAddress: '',
    },
  });

  // Sync email if user logs in while modal is open
  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user, setValue]);


  const onConfirmOrder = async (data: ContactsFormValues) => {
    const targetEmail = user?.email || data.email;

    try {
      if (!user) {
        if (!data.password) {
           setError(t('checkout.validation.passwordRequired'));
           return;
        }
        await signUp(targetEmail, data.password);
      }

      const order = {
        fullName: data.fullName,
        email: targetEmail,
        phoneNumber: data.phoneNumber,
        deliveryAddress: data.deliveryAddress,
        ingredients,
        totalPrice,
        totalKcal,
        fastDelivery,
        id: Date.now(),
        date: new Date().toISOString(),
      };

      await saveOrder(targetEmail, order as Order);
      toast.success(t('checkout.toastSuccess'));

      setTimeout(() => {
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
    fastDeliveryPrice,
    ingredientEntries,
    totalPrice,
    totalKcal,
  };
}
