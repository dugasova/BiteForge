import { useState, type ChangeEvent } from 'react';
import './Contact.scss';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import BurgerBg from '../../assets/burgers/burger8.png';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    toast.success(t('contact.thankYou'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-wrapper container">
      <div className="contact-bg-decoration">
        <img src={BurgerBg} alt="" className='burger-bg' />
      </div>
      <div className="contact-header">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.description')}</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <h3>{t('contact.addressLabel')}</h3>
              <p>{t('contact.address')}</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <h3>{t('contact.phoneLabel')}</h3>
              <p>{t('contact.phone')}</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🕒</span>
            <div>
              <h3>{t('contact.hoursLabel')}</h3>
              <p>{t('contact.openingHours')}</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder={t('contact.name')}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t('contact.email')}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder={t('contact.subject')}
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder={t('contact.message')}
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-submit">
            {t('contact.send')}
          </button>
        </form>
      </div>
    </div>
  );
}
