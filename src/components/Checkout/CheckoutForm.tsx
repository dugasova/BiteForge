import type { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormField from './FormField';

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
      <FormField
        name="fullName"
        id="fullname"
        type="text"
        label={t('checkout.fullName')}
        control={control}
        error={errors.fullName}
      />

      <FormField
        name="email"
        id="email"
        type="email"
        label={t('checkout.email')}
        control={control}
        error={errors.email}
        disabled={!!user}
      />

      {!user && (
        <FormField
          name="password"
          id="password"
          type="password"
          label={t('checkout.password')}
          control={control}
          error={errors.password}
        />
      )}

      <FormField
        name="phoneNumber"
        id="phoneNumber"
        type="tel"
        label={t('checkout.phoneNumber')}
        control={control}
        error={errors.phoneNumber}
      />

      <FormField
        name="deliveryAddress"
        id="deliveryAddress"
        type="text"
        label={t('checkout.deliveryAddress')}
        control={control}
        error={errors.deliveryAddress}
        fullWidth
      />
    </div>
  );
}

export default CheckoutForm;
