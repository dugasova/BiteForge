import { useState } from 'react';
import './Login.scss';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Form from '../Form/Form';
import type { FormSchema } from '../Form/Form';

export default function Login() {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, logIn } = useAuth();

  const handleLoginSubmit = async (data: FormSchema) => {
    setError('');
    setLoading(true);

    try {
      await logIn(data.email, data.password);
      toast.success(t('auth.logInSuccess'));
      navigate('/account');
    } catch {
      setError(t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-wrapper container'>
      <div className='login'>
        <h2>{t('login.title')}</h2>

        {user && (
          <p className="auth-status success">
            {t('account.welcomeBack')}, {user.email}
          </p>
        )}

        {error && <p className='error'>{error}</p>}

        <Form
          onSubmit={handleLoginSubmit}
          submitText={t('login.title')}
          isLoading={loading}
          formClassName="login__form"
          inputClassName="login__form__input"
          submitClassName="login__form__button"
        />

        <p className='login-footer'>
          {t('login.dontHaveAccount')}
          <Link to="/signup" className='login__form__link'>
            {t('login.signup')}
          </Link>
        </p>
      </div>
    </div>
  );
}
