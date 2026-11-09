import { useEffect, useState } from 'react';
import './Account.scss';
import { useTranslation } from 'react-i18next';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BurgerIllustration from '@/assets/burgers/burger5.webp';
import { subscribeToOrders, saveOrder, deleteOrder } from '@/services/ordersService';
import type { Order } from '@/types/order';
import OrderCard from './OrderCard';
import Loader from '@/components/Loader/Loader';

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
      (data) => {
        setOrders(data);
        setLoading(false);
      },
      () => {
        toast.error(t('account.loadError'));
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [user?.email, t]);

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
    <div className="account-wrapper container">
      <div className="account-card">
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
            <img src={BurgerIllustration} alt="Burger" loading="lazy" />
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
                <OrderCard
                  key={order.id}
                  order={order}
                  onDelete={handleDeleteOrder}
                  onReorder={handleInstantReorder}
                />
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
