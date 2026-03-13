import React from 'react';
import './Header.scss';
import Navigation from '../Navigation /Navigation';
import Logo from './../../assets/logo/logo.png'
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const currentLang = i18n.language || 'en';
    const newLang = currentLang.startsWith('en') ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  }
  return (
    <div className='header-wrapper container'>
      <header className='header'>
        <p><img src={Logo} alt="Logo" className='header__logo' /></p>
        <Navigation />
        <button onClick={toggleLanguage} className='lang-switch-button'>
          {i18n.language?.startsWith('en') ? 'UK' : 'EN'}
        </button>
      </header>
    </div>
  );
}