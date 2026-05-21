import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type ContactsFormValues = {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  deliveryAddress: string;
};

interface CheckoutFormProps {
  control: Control<ContactsFormValues>;
  errors: FieldErrors<ContactsFormValues>;
  user: { email: string | null } | null;
}

function CheckoutForm({ control, errors, user }: CheckoutFormProps) {
  const { t } = useTranslation();

  return (
    <div className="checkout-form">
      <div className="form-group">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              placeholder={t('checkout.fullName')}
              id='fullname'
              {...field}
              className={errors.fullName ? 'error' : ''}
            />
          )}
        />
        {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
      </div>

      <div className="form-group">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              type="email"
              placeholder={t('checkout.email')}
              id='email'
              {...field}
              disabled={!!user}
              className={errors.email ? 'error' : ''}
            />
          )}
        />
        {errors.email && <span className="error-text">{errors.email.message}</span>}
      </div>

      {!user && (
        <div className="form-group">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                placeholder={t('checkout.password')}
                id='password'
                {...field}
                className={errors.password ? 'error' : ''}
              />
            )}
          />
          {errors.password && <span className="error-text">{errors.password.message}</span>}
        </div>
      )}

      <div className="form-group">
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <input
              type="tel"
              placeholder={t('checkout.phoneNumber')}
              id='phoneNumber'
              {...field}
              className={errors.phoneNumber ? 'error' : ''}
            />
          )}
        />
        {errors.phoneNumber && <span className="error-text">{errors.phoneNumber.message}</span>}
      </div>

      <div className="form-group full-width">
        <Controller
          name="deliveryAddress"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              className={`full-width ${errors.deliveryAddress ? 'error' : ''}`}
              placeholder={t('checkout.deliveryAddress')}
              id='deliveryAddress'
              {...field}
            />
          )}
        />
        {errors.deliveryAddress && <span className="error-text">{errors.deliveryAddress.message}</span>}
      </div>
    </div>
  )
}

export default CheckoutForm