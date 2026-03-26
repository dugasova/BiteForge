import React from 'react';
import './Form.scss';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../Input/Input';
import { useTranslation } from 'react-i18next';

export type FormSchema = {
  email: string;
  password: string;
}

const schema = (t: (key: string) => string) => z.object({
  email: z.string().email(t('login.validation.invalidEmail') || 'Invalid email'),
  password: z.string().min(6, t('login.validation.passwordMin') || 'Password must be at least 6 characters long'),
})

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
  submitClassName
}: FormProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { isValid, errors } } = useForm<FormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(schema(t)),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`form-container ${formClassName || ''}`}>
      <div className="form-group">
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type='email'
              placeholder={t('login.email') || 'Email'}
              className={inputClassName}
            />
          )}
        />
        {errors.email && <p className='error'>{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type='password'
              placeholder={t('login.password') || "Password"}
              className={inputClassName}
            />
          )}
        />
        {errors.password && <p className='error'>{errors.password.message}</p>}
      </div>

      <button
        className={`form-submit ${submitClassName || ''}`}
        type="submit"
        disabled={!isValid || isLoading}
      >
        {submitText}
      </button>
    </form>
  )
}
