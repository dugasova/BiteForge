import './Contact.scss';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from './contactSchema';
import BurgerBg from '../../assets/burgers/burger8.webp';

export default function Contact() {
  const { t } = useTranslation();

  const { control, handleSubmit, reset, formState: { isValid, errors } } = useForm<ContactFormValues>({
    defaultValues: { name: '', email: '', subject: '', message: '' },
    mode: 'onChange',
    resolver: zodResolver(contactSchema(t)),
  });

  const onSubmit = () => {
    toast.success(t('contact.thankYou'));
    reset();
  };

  return (
    <div className="contact-wrapper container">
      <div className="contact-bg-decoration">
        <img src={BurgerBg} alt="" className='burger-bg' loading="lazy" />
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

        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder={t('contact.name')}
                  className={errors.name ? 'error' : ''}
                />
              )}
            />
            {errors.name && <span className="error-text">{errors.name.message}</span>}
          </div>
          <div className="form-group">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder={t('contact.email')}
                  className={errors.email ? 'error' : ''}
                />
              )}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>
          <div className="form-group">
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder={t('contact.subject')}
                />
              )}
            />
          </div>
          <div className="form-group">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder={t('contact.message')}
                  rows={5}
                  className={errors.message ? 'error' : ''}
                />
              )}
            />
            {errors.message && <span className="error-text">{errors.message.message}</span>}
          </div>
          <button type="submit" className="contact-submit" disabled={!isValid}>
            {t('contact.send')}
          </button>
        </form>
      </div>
    </div>
  );
}
