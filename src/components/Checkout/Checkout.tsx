import React, { useCallback, useState } from 'react';
import './Checkout.scss';
import { useTranslation } from 'react-i18next';
import { useBurger } from '../../context/BurgerContext';
import { UserAuth } from '../../context/AuthContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const { user } = UserAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [error, setError] = useState('');
  //add fast delivery by adding to totalprce 20UAH
  const [fastDelivery, setFastDelivery] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const fastDeliveryPrice = 20;
  const fastDeliveryHandler = () => {
    setFastDelivery(!fastDelivery);
  }

  const { t } = useTranslation();
  const { stateBuilder, resetBuilder } = useBurger();
  const { ingredients, totalPrice } = stateBuilder;
  const burgerId = doc(db, 'users', `${user?.email}`);
  const navigate = useNavigate();
  const showModal = useCallback((message: string) => {
    setModalMessage(message);
  }, []);

  const saveBurger = async () => {
    if (!user.email) {
      alert('Please login to save your burger');
      return;
    }
    try {
      const order = {
        fullName,
        email,
        phoneNumber,
        deliveryAddress,
        ingredients,
        totalPrice,
        fastDelivery,
        id: Date.now(),
        date: new Date().toISOString(),
      }
      await updateDoc(burgerId, {
        savedBurger: arrayUnion(order)
      });
      showModal('Burger saved successfully');
      //clear form
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setDeliveryAddress('');
      setFastDelivery(false);
      //close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
      //clear ingredients
      resetBuilder();
      navigate('/account');

    } catch (error) {
      console.log(error);
    }
  }

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
          <input type="text" placeholder={t('checkout.fullName')} required value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="email" placeholder={t('checkout.email')} required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="tel" placeholder={t('checkout.phoneNumber')} required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <input type="text" className="full-width" placeholder={t('checkout.deliveryAddress')} required value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
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
          <button onClick={saveBurger} className='checkout-confirm-button'>{t('checkout.confirmOrder')}</button>
          {modalMessage && <div className="modal-message">{modalMessage}</div>}
        </div>
      </div>
    </div>
  )
}
