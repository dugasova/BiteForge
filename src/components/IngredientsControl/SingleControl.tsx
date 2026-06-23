import './SingleControl.scss';
import useBuilder from '../../hooks/useBuilder';
import { motion } from 'framer-motion';

interface SingleControlProps {
  img: string;
  name: string;
}

export default function SingleControl({ img, name }: SingleControlProps) {
  const { addIngredient, removeIngredient, stateBuilder } = useBuilder();

  const quantity = (stateBuilder.ingredients as { [key: string]: number })[name] ?? 0;

  return (
    <li className='ingredient-control'>
      <img className='ingredient-control__img' src={img} alt={name} />
      <div className='controls-wrapper'>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => removeIngredient(name)}
          className='ingredient-control__button minus'
          aria-label={`Remove ${name}`}
        >
          -
        </motion.button>
        <p className="ingredient-quantity">{quantity}</p>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#f3f4f6' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => addIngredient(name)}
          className='ingredient-control__button'
          aria-label={`Add ${name}`}
        >
          +
        </motion.button>
      </div>
    </li>
  )
}
