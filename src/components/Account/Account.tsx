import { useEffect, useState } from 'react';
import './Account.scss';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BurgerIllustration from '../../assets/burgers/burger5.png';
import { subscribeToOrders, saveOrder, deleteOrder } from '../../services/ordersService';
import type { Order } from '../../types/order';
import Loader from '../Loader/Loader';

export default function Account() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logOut } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const email = user?.email;
    if (!email) return;
    const unsubscribe = subscribeToOrders(
      email,
      (data) => { setOrders(data); setLoading(false); },
      () => { toast.error(t('account.loadError')); setLoading(false); },
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch {
      toast.error(t('account.logoutError'));
    }
  };

  const handleInstantReorder = async (order: Order) => {
    if (!user?.email) return;
    try {
      const newOrder = { ...order, id: Date.now(), date: new Date().toISOString() };
      await saveOrder(user.email, newOrder);
      toast.success(t('account.reorderSuccess'));
    } catch {
      toast.error(t('account.reorderError'));
    }
  };

  const handleDeleteOrder = async (order: Order) => {
    if (!user?.email) return;
    if (!window.confirm(t('account.deleteConfirm'))) return;
    try {
      await deleteOrder(user.email, order);
      toast.success(t('account.deleteSuccess'));
    } catch {
      toast.error(t('account.deleteError'));
    }
  };

  const displayName = orders.at(-1)?.fullName ?? user?.email ?? '';

  return (
    <div className='account-wrapper container'>
      <div className='account-card'>
        <div className="account-hero">
          <div className="hero-content">
            <span className="welcome-text">{t('account.welcomeBack')}</span>
            {displayName && <h2 className="user-email">{displayName}</h2>}
            <div className="hero-actions">
              <button className="btn-secondary" onClick={() => navigate('/')}>
                {t('account.goBack')}
              </button>
              <button className="btn-logout" onClick={handleLogout}>
                {t('navigation.logout')}
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={BurgerIllustration} alt="Burger" />
          </div>
        </div>

        <div className="orders-section">
          <div className="section-header">
            <h3>{t('account.orders')}</h3>
            <span className="order-count">{orders.length}</span>
          </div>

          {loading ? (
            <Loader />
          ) : orders.length > 0 ? (
            <div className="orders-grid">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                    <div className="order-header-right">
                      {order.fastDelivery && <span className="badge-fast">{t('account.fastDelivery')}</span>}
                    </div>
                    <span className="order-price">{order.totalPrice.toFixed(2)} UAH</span>
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
                        onClick={() => handleInstantReorder(order)}
                        title={t('account.reorder')}
                      >
                        {t('account.reorder')}
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => handleDeleteOrder(order)}
                        title={t('account.delete')}
                      >
                        {t('account.delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-orders">
              <p>{t('account.noOrders')}</p>
              <button className="btn-primary" onClick={() => navigate('/')}>
                {t('account.buildFirstBurger')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
