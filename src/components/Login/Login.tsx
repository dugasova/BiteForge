import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logIn } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await logIn(email, password)
      navigate('/account')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message); // Set error message
      } else {
        setError(String(error));
      }
      console.log(error)
    }
  }
  return (
    <div className='login-wrapper container'>
      <div className='login'>
        <h2>{t('login.title')}</h2>
        {!(user?.email) ? (
          <p>You are logged in as {user?.email}</p>
        ) : (
          <p>You are not logged in</p>
        )}
        {error ? <p className='error'>{error}</p> : null}
        <form className='login__form' onSubmit={handleSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='login__form__input' type="email" placeholder={t('login.email')} />
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='login__form__input' type="password" placeholder={t('login.password')} />
          <button className='login__form__button' type='submit'>{t('login.title')}</button>
          <p>{t('login.dontHaveAccount')} <span className='login__form__link' onClick={() => navigate('/signup')}>{t('login.signup')}</span></p>
        </form>
      </div>
    </div>
  )
}
