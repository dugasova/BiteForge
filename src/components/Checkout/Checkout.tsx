import './Checkout.scss';
import CheckoutForm from './CheckoutForm';
import CheckoutSummary from './CheckoutSummary';
import { useCheckout } from './useCheckout';

interface CheckoutProps {
  onClose: () => void;
}

export default function Checkout({ onClose }: CheckoutProps) {
  const {
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
    totalKkal,
  } = useCheckout(onClose);

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

        <CheckoutSummary
          ingredientEntries={ingredientEntries}
          totalPrice={totalPrice}
          totalKkal={totalKkal}
          fastDelivery={fastDelivery}
          setFastDelivery={setFastDelivery}
          fastDeliveryPrice={fastDeliveryPrice}
          onSubmit={handleSubmit(onConfirmOrder)}
        />
      </div>
    </div>
  );
}
