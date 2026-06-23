import './BurgerCard.scss';
import { useTranslation } from 'react-i18next';

type BurgerCardProps = {
  name: string;
  rating: number;
  review: string;
  price: number;
  img: string;
}

export default function BurgerCard({ name, rating, review, price, img }: BurgerCardProps) {
  const { t } = useTranslation();
  const displayRating = Array(Math.round(rating)).fill('⭐').join(' ');

  return (
    <li className="burger-item">
      <img className="burger-item__img" src={img} alt={name} loading="lazy" />
      <h2 className="burger-item__name">{name}</h2>
      <p className="burger-item__review">{t(`burgers.reviews.${review}`)}</p>
      <p className="burger-item__rating">{displayRating}</p>
      <p className="burger-item__price">{price} UAH</p>
    </li>
  );
}
