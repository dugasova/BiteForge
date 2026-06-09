import { useTranslation } from 'react-i18next';

interface CheckoutSummaryProps {
  ingredientEntries: [string, number][];
  totalPrice: number;
  totalKcal: number;
  fastDelivery: boolean;
  setFastDelivery: (value: boolean) => void;
  fastDeliveryPrice: number;
  onSubmit: () => void;
}

export default function CheckoutSummary({
  ingredientEntries,
  totalPrice,
  totalKcal,
  fastDelivery,
  setFastDelivery,
  fastDeliveryPrice,
  onSubmit
}: CheckoutSummaryProps) {
  const { t } = useTranslation();

  return (
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
              <li className='ingredient-item' key={name}>{name} x{count as number}</li>
            ))}
          </ul>
          <div className='checkout-total'>
            <span>Nutritional value:</span>
            <span className='total-kcal'>🔥 {totalKcal} kcal</span>
          </div>
          <div className='checkout-total border-bottom'>
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
        <span className='total-price'>{+(Number(totalPrice).toFixed(2)) + (fastDelivery ? fastDeliveryPrice : 0)} UAH</span>
      </div>

      <button onClick={onSubmit} className='checkout-confirm-button'>
        {t('checkout.confirmOrder')}
      </button>
    </div>
  );
}
