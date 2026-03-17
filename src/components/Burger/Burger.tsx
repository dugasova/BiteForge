import React, { useState, useContext } from 'react'
import './Burger.scss';
import TopBurger from './../../assets/ingredients/top_bun.png';
import BottomBurger from './../../assets/ingredients/bottom_bun.png';
import Checkout from '../Checkout/Checkout';
import { BurgerContext, type BurgerContextType } from '../../context/BurgerContext';
import { dataOfProduct } from '../../mockedData';
import { useTranslation } from 'react-i18next';

export default function Burger() {
  const { t } = useTranslation();
  const [checkout, setCheckout] = useState(false);
  const context = useContext(BurgerContext) as BurgerContextType | null;

  const sequence = context?.stateBuilder?.sequence || [];

  const handleCheckout = () => {
    setCheckout(true);
  }

  const closeCheckout = () => {
    setCheckout(false);
  }

  return (
    <>
      <div className='burger-wrapper'>
        <div className='burger-display'>
          <img className='burger-bun top' src={TopBurger} alt="top-burger" />

          {sequence.length === 0 ? (
            <div className='burger-message'>
              <p>{t('burger.addIngredients')}</p>
            </div>
          ) : (
            sequence.map((ingredientName: string, index: number) => {
              const itemData = dataOfProduct.find(p => p.name === ingredientName);
              if (!itemData) return null;

              return (
                <img
                  key={`${ingredientName}-${index}`}
                  className={`burger-ingredient ${ingredientName}`}
                  src={itemData.img}
                  alt={ingredientName}
                  style={{ bottom: 10 + index * 9, zIndex: index + 1 }}
                />
              );
            })
          )}

          <img className='burger-bun bottom' src={BottomBurger} alt="bottom-burger" />
        </div>
        <p className='total-price'>{t('burger.totalPrice')}: {(context?.stateBuilder?.totalPrice || 0)} UAH</p>

        <div className='burger-actions'>
          <button onClick={handleCheckout} className='checkout-button'>
            <span>{t('burger.checkout')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <button className='reset-button' onClick={context?.resetBuilder}>{t('burger.reset')}</button>
      </div>
      {checkout && <Checkout onClose={closeCheckout} />
      }
    </>
  )
}
