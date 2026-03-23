import React, { useState } from 'react';
import './Checkout.scss';
import { useTranslation } from 'react-i18next';
import { useBurger } from '../../context/BurgerContext';
import { UserAuth } from '../../context/AuthContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { user } = UserAuth();
  //add fast delivery by adding to totalprce 20UAH
  const [fastDelivery, setFastDelivery] = useState(false);
  const fastDeliveryPrice = 20;
  const fastDeliveryHandler = () => {
    setFastDelivery(!fastDelivery);
  }

  const { t } = useTranslation();
  const { stateBuilder } = useBurger();
  const { ingredients, totalPrice } = stateBuilder;
  const burgerId = doc(db, 'users', user?.email, `${user?.email}`);

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
        <form className="checkout-form">
          <input type="text" placeholder={t('checkout.fullName')} required />
          <input type="email" placeholder={t('checkout.email')} required />
          <input type="tel" placeholder={t('checkout.phoneNumber')} required />
          <input type="text" className="full-width" placeholder={t('checkout.deliveryAddress')} required />
        </form>
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
                {
                  ingredientEntries.map(([name, count]) => (
                    <li className='ingredient-item' key={name}>{name} x{count}</li>
                  ))
                }
              </ul>

              <div className='checkout-total'>
                <span>{t('checkout.total')}:</span>
                <span className='total-price'>{totalPrice.toFixed(2)} UAH</span>
              </div>
            </>
          )}
          <div className='checkout-fast-delivery'>
            <input type="checkbox" id="checkout-fast-delivery" checked={fastDelivery} onChange={fastDeliveryHandler} />
            <label htmlFor="checkout-fast-delivery">{t('checkout.fastDelivery')}</label>
          </div>
          <div className='checkout-total'>
            <span>{t('checkout.total')}:</span>
            <span className='total-price'>{+totalPrice.toFixed(2) + (fastDelivery ? fastDeliveryPrice : 0)} UAH</span>
          </div>
          <button className='checkout-confirm-button'>{t('checkout.confirmOrder')}</button>
        </div>
      </div>
    </div>
  )
}
