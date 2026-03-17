import React, { useContext } from 'react';
import './SingleControl.scss';
import { BurgerContext } from '../../context/BurgerContext';

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
        <button onClick={() => removeIngredient(name)} className='ingredient-control__button minus'>-</button>
        <p className="ingredient-quantity">{quantity}</p>
        <button onClick={() => addIngredient(name)} className='ingredient-control__button'>+</button>
      </div>
    </li>
  )
}
