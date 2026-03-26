import React, { useCallback, useState, useEffect } from 'react';
import './Checkout.scss';
import { useTranslation } from 'react-i18next';
import { useBurger } from '../../context/BurgerContext';
import { UserAuth } from '../../context/AuthContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import type { ContactsFormValues } from './CheckoutForm';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface CheckoutProps {
  onClose: () => void;
}

const contactsSchema = (t: (key: string) => string, isUserLoggedIn: boolean) => z.object({
  fullName: z.string().min(2, t('checkout.validation.nameMin')),
  phoneNumber: z.string().regex(/^\+?[\d\s-]{10,}$/, t('checkout.validation.invalidPhone')),
  email: z.string().email(t('checkout.validation.invalidEmail')),
  password: z.string().min(isUserLoggedIn ? 0 : 6, t('checkout.validation.passwordMin')),
  deliveryAddress: z.string().min(2, t('checkout.validation.deliveryAddressMin')),
});

export default function Checkout({ onClose }: CheckoutProps) {
  const { user, signUp } = UserAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { stateBuilder, resetBuilder } = useBurger();
  const { ingredients, totalPrice } = stateBuilder;

  const [error, setError] = useState('');
  const [fastDelivery, setFastDelivery] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  
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

  // Sync email if user logs in while modal is open (unlikely but safe)
  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const showModal = useCallback((message: string) => {
    setModalMessage(message);
  }, []);

  const onConfirmOrder = async (data: ContactsFormValues) => {
    const targetEmail = user?.email || data.email;

    try {
      // 1. Sign up if guest
      if (!user) {
        if (!data.password) {
           setError('Password is required for account creation');
           return;
        }
        await signUp(targetEmail, data.password);
      }

      // 2. Save order
      const order = {
        fullName: data.fullName,
        email: targetEmail,
        phoneNumber: data.phoneNumber,
        deliveryAddress: data.deliveryAddress,
        ingredients,
        totalPrice,
        fastDelivery,
        id: Date.now(),
        date: new Date().toISOString(),
      };

      const userDocRef = doc(db, 'users', targetEmail);
      await updateDoc(userDocRef, {
        savedBurger: arrayUnion(order)
      });

      showModal('Burger saved successfully');

      setTimeout(() => {
        onClose();
        resetBuilder();
        navigate('/account');
      }, 2000);

    } catch (saveError) {
      console.error(saveError);
      if (saveError instanceof Error) {
        setError(saveError.message);
      } else {
        setError(String(saveError));
      }
    }
  };

  const ingredientEntries = Object.entries(ingredients).filter(([, count]) => count > 0);

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='checkout-wrapper' onClick={(e) => e.stopPropagation()}>
        <button className='close-button' onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2>{t('checkout.title')}</h2>
        {error && <p className="error-message">{error}</p>}

        <CheckoutForm control={control} errors={errors} user={user} />

        <div className='checkout-ingredients'>
          {ingredientEntries.length === 0 ? (
            <>
              <p className='ingredients-title'>{t('checkout.ingredients')}</p>
              <p className='empty-cart'>{t('checkout.noIngredients')}</p>
            </>
          ) : (
            <>
              <h3 className='ingredients-title'>{t('checkout.ingredients')}:</h3>
              <ul className='ingredients-list'>
                {ingredientEntries.map(([name, count]) => (
                  <li className='ingredient-item' key={name}>{name} x{count}</li>
                ))}
              </ul>
              <div className='checkout-total'>
                <span>{t('checkout.total')}:</span>
                <span className='total-price'>{totalPrice.toFixed(2)} UAH</span>
              </div>
            </>
          )}

          <div className='checkout-fast-delivery'>
            <input 
              type="checkbox" 
              id="checkout-fast-delivery" 
              checked={fastDelivery} 
              onChange={() => setFastDelivery(!fastDelivery)} 
            />
            <label htmlFor="checkout-fast-delivery">{t('checkout.fastDelivery')}</label>
          </div>

          <div className='checkout-total'>
            <span>{t('checkout.total')}:</span>
            <span className='total-price'>{+totalPrice.toFixed(2) + (fastDelivery ? fastDeliveryPrice : 0)} UAH</span>
          </div>

          <button onClick={handleSubmit(onConfirmOrder)} className='checkout-confirm-button'>
            {t('checkout.confirmOrder')}
          </button>
          
          {modalMessage && <div className="modal-message">{modalMessage}</div>}
        </div>
      </div>
    </div>
  )
}
