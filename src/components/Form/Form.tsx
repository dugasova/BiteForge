import './Form.scss';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input/Input';
import { useTranslation } from 'react-i18next';
import { loginSchema, type FormSchema } from './loginSchema';

export type { FormSchema };

interface FormProps {
  onSubmit: (data: FormSchema) => void;
  submitText: string;
  isLoading?: boolean;
  formClassName?: string;
  inputClassName?: string;
  submitClassName?: string;
}

export default function Form({
  onSubmit,
  submitText,
  isLoading,
  formClassName,
  inputClassName,
  submitClassName,
}: FormProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { isValid, errors } } = useForm<FormSchema>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    resolver: zodResolver(loginSchema(t)),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`form-container${formClassName ? ` ${formClassName}` : ''}`}>
      <div className="form-group">
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <Input {...field} type='email' placeholder={t('login.email')} className={inputClassName} />
          )}
        />
        {errors.email && <p className='error'>{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <Input {...field} type='password' placeholder={t('login.password')} className={inputClassName} />
          )}
        />
        {errors.password && <p className='error'>{errors.password.message}</p>}
      </div>

      <button
        className={`form-submit${submitClassName ? ` ${submitClassName}` : ''}`}
        type="submit"
        disabled={!isValid || isLoading}
      >
        {submitText}
      </button>
    </form>
  );
}
