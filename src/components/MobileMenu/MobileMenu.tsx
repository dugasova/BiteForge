import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Logo from './../../assets/logo/logo.png';
import './MobileMenu.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleLanguage = () => {
    const currentLang = i18n.language || 'en';
    const newLang = currentLang.startsWith('en') ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  }

  const routes = [
    {
      path: '/',
      title: t('navigation.home', 'Home')
    },
    {
      path: '/about',
      title: t('navigation.about', 'About')
    },
    {
      path: '/contact',
      title: t('navigation.contact', 'Contact')
    },
  ]

  return (
    <>
      <div
        className={`mobile-menu-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`mobile-menu-wrapper ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu__header">
          <div className="mobile-menu__logo">
            <img src={Logo} alt="Logo" className='header__logo' />
          </div>
          <div className="mobile-menu__actions">
            <button onClick={toggleLanguage} className='mobile-menu__lang-btn' >
              {i18n.language?.startsWith('en') ? 'UK' : 'EN'}
            </button>
            <div className="mobile-menu__close" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
        <nav className='mobile-menu'>
          <ul className='mobile-menu__list'>
            {routes.map((route) => (
              <li key={route.path} className='mobile-menu__item'>
                <NavLink
                  to={route.path}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={onClose}
                >
                  {route.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}