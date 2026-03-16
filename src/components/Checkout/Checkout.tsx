import React from 'react';
import './Checkout.scss';

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='checkout-wrapper' onClick={(e) => e.stopPropagation()}>
        <button className='close-button' onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2>Your Order Summary</h2>
        <form className="checkout-form">
          <input type="text" placeholder='Full Name' required />
          <input type="email" placeholder='Email Address' required />
          <input type="tel" placeholder='Phone Number' required />
          <input type="text" className="full-width" placeholder='Delivery Address' required />
        </form>
        <div className='checkout-ingredients'>
          <h3 className='ingredients-title'>Ingredients:</h3>
          <ul className='ingredients-list'>
            {/* We can map ingredients here later! */}
            <li className='empty-cart'>No ingredients added yet.</li>
          </ul>

          <div className='checkout-total'>
            <span>Total:</span>
            <span className='total-price'>$0.00</span>
          </div>
        </div>

        <button className='checkout-confirm-button'>Confirm Order</button>
      </div>
    </div>
  )
}
