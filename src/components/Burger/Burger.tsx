import React, { useState } from 'react'
import './Burger.scss';
import TopBurger from './../../assets/ingredients/top_bun.png';
import BottomBurger from './../../assets/ingredients/bottom_bun.png';
import Checkout from '../Checkout/Checkout';

export default function Burger() {
  const [checkout, setCheckout] = useState(false);
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
          <div className='burger-message'>
            <p>Add some ingredients</p>
          </div>
          <img className='burger-bun bottom' src={BottomBurger} alt="bottom-burger" />
        </div>

        <div className='burger-actions'>
          <button onClick={handleCheckout} className='checkout-button'>
            <span>Checkout</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {checkout && <Checkout onClose={closeCheckout} />}
    </>
  )
}
