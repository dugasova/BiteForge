import './Navigation.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const { t } = useTranslation();
  const routes = [
    {
      path: '/',
      title: t('navigation.home', 'Home'),
    },
    {
      path: '/about',
      title: t('navigation.about', 'About'),
    },
    {
      path: '/contact',
      title: t('navigation.contact', 'Contact'),
    },
  ]
  return (
    <nav className='navigation'>
      <ul className='navigation__list'>
        {
          routes.map((route, index) => (
            <li key={index} className='navigation__item'>
              <NavLink to={route.path}>
                {route.title}
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}