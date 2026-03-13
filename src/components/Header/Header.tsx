import React, { useState } from 'react';
import './Header.scss';
import Navigation from '../Navigation /Navigation';
import Logo from './../../assets/logo/logo.png'
import { useTranslation } from 'react-i18next';
import MobileMenu from '../MobileMenu/MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleLanguage = () => {
    const currentLang = i18n.language || 'en';
    const newLang = currentLang.startsWith('en') ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  }
  return (
    <div className='header-wrapper container'>
      <header className='header'>
        <p><img src={Logo} alt="Logo" className='header__logo' /></p>
        <div className="navigation-wrapper">
          <Navigation />
        </div>
        <div className="header__actions">
          <button onClick={toggleLanguage} className='lang-switch-button'>
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