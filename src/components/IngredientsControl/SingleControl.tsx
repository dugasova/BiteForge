import { useContext } from 'react';
import './SingleControl.scss';
import { BurgerContext } from '../../context/BurgerContext';
import { motion } from 'framer-motion';

interface SingleControlProps {
  img: string;
  name: string;
}

export default function SingleControl({ img, name }: SingleControlProps) {
  const context = useContext(BurgerContext);
  const { addIngredient, removeIngredient, stateBuilder } = context || {
    addIngredient: () => {},
    removeIngredient: () => {},
    stateBuilder: { ingredients: {} as { [key: string]: number }, sequence: [], totalPrice: 0 }
  };

  const quantity = (stateBuilder?.ingredients as { [key: string]: number })?.[name] || 0;

  return (
    <li className='ingredient-control'>
      <img className='ingredient-control__img' src={img} alt={name || "ingredient"} />
      <div className='controls-wrapper'>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => removeIngredient(name)} 
          className='ingredient-control__button minus'
        >
          -
        </motion.button>
        <p className="ingredient-quantity">{quantity}</p>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addIngredient(name)} 
          className='ingredient-control__button'
        >
          +
        </motion.button>
      </div>
    </li>
  )
}
