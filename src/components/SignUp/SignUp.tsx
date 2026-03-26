import { useState } from 'react';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/AuthContext'
import Form from '../Form/Form';
import type { FormSchema } from '../Form/Form';

export default function SignUp() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signUp } = UserAuth();

  const handleSignUpSubmit = async (data: FormSchema) => {
    setError('');
    setLoading(true);

    try {
      await signUp(data.email, data.password);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError('Something went wrong');
      } else {
        setError(t('signup.error') || 'Something went wrong');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='signup-wrapper container'>
      <div className='signup'>
        <h2>{t('signup.title')}</h2>
        {error && <p className='error'>{error}</p>}

        <Form
          onSubmit={handleSignUpSubmit}
          submitText={t('signup.title')}
          isLoading={loading}
          formClassName="signup__form"
          inputClassName="signup__form__input"
          submitClassName="signup__form__button"
        />

        <p className='signup-footer'>
          {t('signup.alreadyHaveAccount')}
          <span className='signup__form__link' onClick={() => navigate('/login')}>
            {t('login.title')}
          </span>
        </p>
      </div>
    </div>
  )
}
