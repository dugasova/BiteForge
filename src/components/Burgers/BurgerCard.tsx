import './BurgerCard.scss';

type BurgerCardProps = {
  id: number;
  name: string;
  raiting: number;
  review: string;
  price: number;
  img: string;

}

export default function BurgerCard({ name, raiting, review, price, img }: BurgerCardProps) {
  return (
    <li className="burger-item">
      <img className="burger-item__img" src={img} alt={name} />
      <h2 className="burger-item__name">{name}</h2>
      <p className="burger-item__review">{review}</p>
      <p className="burger-item__raiting">Rating: {raiting} ⭐</p>
      <p className="burger-item__price">{price} UAH</p>
    </li>
  );
}
