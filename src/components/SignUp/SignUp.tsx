import React, { useState } from 'react';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/AuthContext'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signUp } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      await signUp(email, password)
      navigate('/')
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
  }

  return (
    <div className='signup-wrapper container'>
      {error && <p className='error'>{error}</p>}
      <div className='signup'>
        <h2>{t('signup.title')}</h2>
        <form onSubmit={handleSubmit} className='signup__form'>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='signup__form__input' type="email" placeholder={t('signup.email')} required />
          < input value={password} onChange={(e) => setPassword(e.target.value)} className='signup__form__input' type="password" placeholder={t('signup.password')} required />
          <button className='signup__form__button' type='submit'>{t('signup.title')}</button>
          <p>{t('signup.alreadyHaveAccount')} <span className='signup__form__link' onClick={() => navigate('/login')}>{t('login.title')}</span></p>
        </form>
      </div>
    </div>
  )
}
