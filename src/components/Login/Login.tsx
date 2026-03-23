import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function Login() {
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
        <h2>Login</h2>
        {error ? <p className='error'>{error}</p> : null}
        <form className='login__form' onSubmit={handleSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='login__form__input' type="email" placeholder='Email' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='login__form__input' type="password" placeholder='Password' />
          <button className='login__form__button' type='submit'>Login</button>
          <p>Don't have an account? <span className='login__form__link' onClick={() => navigate('/signup')}>Sign Up</span></p>
        </form>
      </div>
    </div>
  )
}
