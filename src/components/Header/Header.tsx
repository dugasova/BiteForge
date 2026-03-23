import React, { useState } from 'react';
import './Header.scss';
import Navigation from '../Navigation /Navigation';
import Logo from './../../assets/logo/logo.png'
import { useTranslation } from 'react-i18next';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const { user, logOut } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const toggleLanguage = () => {
    const currentLang = i18n.language || 'en';
    const newLang = currentLang.startsWith('en') ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  }
  return (
    <div className='header-wrapper container'>
      <header className='header'>
        <p onClick={() => navigate('/')}><img src={Logo} alt="Logo" className='header__logo' /></p>
        <div className="navigation-wrapper">
          <Navigation />
        </div>
        <div className="header__actions">
          {user?.email ? (
            <>
              <button className='header__actions__button' onClick={() => navigate('/account')}>Account</button>
              <button className='header__actions__button' onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className='header__actions__button' onClick={() => navigate('/login')}>Login</button>
              <button className='header__actions__button' onClick={() => navigate('/signup')}>Sign Up</button>
            </>
          )}
          <button onClick={toggleLanguage} className='header__actions__button'>
            {i18n.language?.startsWith('en') ? 'UK' : 'EN'}
          </button>
          <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </div>
  );
}