import './Home.scss';
import Prices from '../../components/Prices/Prices';
import Burger from '../../components/Burger/Burger';
import IngredientsControl from '../../components/IngredientsControl/IngredientsControl';

export default function Home() {
  return (
    <div className="main container">
      <Prices />
      <Burger />
      <IngredientsControl />
    </div>
  );
}
