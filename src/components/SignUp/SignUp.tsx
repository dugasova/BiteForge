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
  const { user, signUp } = UserAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await signUp(email, password)
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
    <div className='signup-wrapper container'>
      <div className='signup'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className='signup__form'>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='signup__form__input' type="email" placeholder='Email' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='signup__form__input' type="password" placeholder='Password' />
          <button className='signup__form__button' type='submit'>Sign Up</button>
          <p>Already have an account? <span className='signup__form__link' onClick={() => navigate('/login')}>Login</span></p>
        </form>
      </div>
    </div>
  )
}
