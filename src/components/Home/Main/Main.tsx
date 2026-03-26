import './Main.scss';
import Prices from '../../Prices/Prices';
import Burger from '../../Burger/Burger';
import IngredientsControl from '../../IngredientsControl/IngredientsControl';

export default function Main() {
  return (
    <div className="main container">
      <Prices />
      <Burger />
      <IngredientsControl />
    </div>
  )
}   