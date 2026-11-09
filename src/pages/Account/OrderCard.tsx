import { useTranslation } from 'react-i18next';
import type { Order } from '@/types/order';
import { CURRENCY } from '@/data';

interface OrderCardProps {
  order: Order;
  onReorder: (order: Order) => void;
  onDelete: (order: Order) => void;
}

function OrderCard({ order, onReorder, onDelete }: OrderCardProps) {
  const { t } = useTranslation();
  return (
    <div className="order-item">
      <div className="order-header">
        <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
        <div className="order-header-right">
          {order.fastDelivery && <span className="badge-fast">{t('account.fastDelivery')}</span>}
        </div>
        <span className="order-price">
          {order.totalPrice.toFixed(2)} {CURRENCY}
        </span>
      </div>
      <div className="order-details">
        <p className="detail-title">{t('checkout.ingredients')}:</p>
        <div className="ingredients-pills">
          {Object.entries(order.ingredients).map(([name, count]) => (
            <div key={name} className="pill">
              {name} <span className="pill-count">x{count}</span>
            </div>
          ))}
        </div>
        <div className="order-actions">
          <button
            className="btn-reorder"
            onClick={() => onReorder(order)}
            title={t('account.reorder')}
          >
            {t('account.reorder')}
          </button>
          <button className="btn-edit" onClick={() => onDelete(order)} title={t('account.delete')}>
            {t('account.delete')}
          </button>
        </div>
      </div>
    </div>
  );
}
export default OrderCard;
