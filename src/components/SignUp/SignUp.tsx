import { useState } from 'react';
import './SignUp.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import Form from '../Form/Form';
import type { FormSchema } from '../Form/Form';

export default function SignUp() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signUp } = useAuth();

  const handleSignUpSubmit = async (data: FormSchema) => {
    setError('');
    setLoading(true);

    try {
      await signUp(data.email, data.password);
      toast.success(t('auth.signUpSuccess'));
      navigate('/');
    } catch {
      setError(t('signup.error'));
    } finally {
      setLoading(false);
    }
  };

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
          <Link to="/login" className='signup__form__link'>
            {t('signup.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
