import './Prices.scss';
import { INGREDIENTS } from '../../data';
import SinglePrice from './SinglePrice/SinglePrice';
import { useTranslation } from 'react-i18next';

export default function Prices() {
  const { t } = useTranslation();

  return (
    <div className="prices-wrapper">
      <h2>{t('prices.title')}</h2>
      <ul className="prices">
        {INGREDIENTS.map((item) => (
          <SinglePrice key={item.name + item.price} name={item.name} price={item.price} />
        ))}
      </ul>
    </div>
  );
}
