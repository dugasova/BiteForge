import { useEffect, useState } from 'react';
import './Account.scss';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, onSnapshot, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import BurgerIllustration from '../../assets/burgers/burger5.png';

interface Order {
  id: number;
  date: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  totalPrice: number;
  fastDelivery: boolean;
  ingredients: { [key: string]: number };
}

export default function Account() {
  const [reorderSuccess, setReorderSuccess] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([])
  const { user, logOut } = UserAuth();
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
      setOrders(doc.data()?.savedBurger || [])
    })
    return () => unsubscribe()
  }, [user])

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };


  const handleInstantReorder = async (order: Order) => {
    if (!user?.email) return;

    try {
      const newOrder = {
        ...order,
        id: Date.now(),
        date: new Date().toISOString(),
      };

      const userDocRef = doc(db, 'users', user.email);

      await updateDoc(userDocRef, {
        savedBurger: arrayUnion(newOrder)
      });

      setReorderSuccess('Order placed successfully!');
      setTimeout(() => setReorderSuccess(null), 3000);
    } catch (err) {
      console.error('Reorder failed:', err);
      alert('Failed to reorder. Please try again.');
    }
  };

  const handleDeleteOrder = async (order: Order) => {
    if (!user?.email) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      const userDocRef = doc(db, 'users', user.email);

      await updateDoc(userDocRef, {
        savedBurger: arrayRemove(order)
      });

      setReorderSuccess('Order deleted successfully');
      setTimeout(() => setReorderSuccess(null), 3000);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete order.');
    }
  };
  const fullName = orders.map((order) => order.fullName)

  return (
    <div className='account-wrapper container'>
      <div className='account-card'>
        <div className="account-hero">
          <div className="hero-content">
            <span className="welcome-text">{t('account.welcomeBack')}</span>
            {user?.email && <h2 className="user-email">{fullName[0]}</h2>}
            <div className="hero-actions">
              <button className="btn-secondary" onClick={() => navigate('/')}>
                {t('account.goBack')}
              </button>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={BurgerIllustration} alt="Burger" />
          </div>
        </div>

        <div className="orders-section">
          {reorderSuccess && (
            <div className="reorder-success-overlay">
              <div className="success-content">
                <span className="success-icon">✨</span>
                <p>{reorderSuccess}</p>
              </div>
            </div>
          )}

          <div className="section-header">
            <h3>{t('account.orders') || 'Your Order History'}</h3>
            <span className="order-count">{orders.length} {t('account.orders').toLowerCase()}</span>
          </div>

          {orders.length > 0 ? (
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
                        title="Quick re-order now"
                      >
                        {t('account.goBack')}
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => handleDeleteOrder(order)}
                        title="Delete order"
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
  )
}
