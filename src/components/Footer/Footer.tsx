import { Link } from 'react-router-dom';
import './Footer.scss';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content container">
        <div className="footer-brand">
          <div className="brand-logo">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8 2 4.5 4.5 4 8H20C19.5 4.5 16 2 12 2Z" />
              <path d="M4 10C4 10 7 12 12 12C17 12 20 10 20 10" />
              <path d="M4 14C4 16.2 8.5 18 12 18C15.5 18 20 16.2 20 14" />
              <path d="M4 18C4 18 6 22 12 22C18 22 20 18 20 18" />
            </svg>
            <h2>BiteForge</h2>
          </div>
          <p>{t('footer.description')}</p>
        </div>

        <div className="footer-socials">
          <h4>{t('footer.connect')}</h4>
          <div className="social-links">
            <Link to="https://instagram.com" className="social-icon instagram" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </Link>
            <Link to="https://twitter.com" className="social-icon twitter" aria-label="Twitter" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </Link>
            <Link to="https://facebook.com" className="social-icon facebook" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </Link>
            <Link to="https://github.com" className="social-icon github" aria-label="GitHub" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} BiteForge. All rights reserved.</p>
        <div className="footer-links">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}