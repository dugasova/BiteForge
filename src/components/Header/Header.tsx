import { useState } from 'react';
import './Header.scss';
import Navigation from '../Navigation/Navigation';
import Logo from './../../assets/logo/logo.png'
import { useTranslation } from 'react-i18next';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Button from '../Button/Button';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
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
        <Link to="/"><img src={Logo} alt="Logo" className='header__logo' /></Link>
        <div className="navigation-wrapper">
          <Navigation />
        </div>
        <div className="header__actions">
          {user?.email ? (
            <>
              <Button text={t('navigation.account')} className='header__actions__button' onClick={() => navigate('/account')} />
              <Button text={t('navigation.logout')} className='header__actions__button' onClick={handleLogout} />
            </>
          ) : (
            <>
              <Button text={t('login.title')} className='header__actions__button' onClick={() => navigate('/login')} />
              <Button text={t('signup.title')} className='header__actions__button' onClick={() => navigate('/signup')} />
            </>
          )}
          <ThemeToggle />
          <Button onClick={toggleLanguage} className='header__actions__button lang-btn'>
            {i18n.language?.startsWith('en') ? 'UK' : 'EN'}
          </Button>
          <Button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              {/* <span></span>
              <span></span>
              <span></span> */}
            </div>
          </Button>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </div>
  );
}