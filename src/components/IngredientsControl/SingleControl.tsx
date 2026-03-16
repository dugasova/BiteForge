import React from 'react';
import './SingleControl.scss';

interface SingleControlProps {
  img: string;
}

export default function SingleControl({ img }: SingleControlProps) {
  return (
    <li className='ingredient-control'>
      <img className='ingredient-control__img' src={img} alt="ingredient" />
      <div className='controls-wrapper'>
        <button className='ingredient-control__button minus'>-</button>
        <button className='ingredient-control__button'>+</button>
      </div>
    </li>
  )
}
