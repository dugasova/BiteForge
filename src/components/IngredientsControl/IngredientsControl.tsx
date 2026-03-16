import React from 'react';
import './IngredientsControl.scss';
import { dataOfProduct } from '../../mockedData';
import SingleControl from './SingleControl';
import { useTranslation } from 'react-i18next';

export default function IngredientsControl() {
  const { t } = useTranslation();
  return (
    <div className='ingredients-control'>
      <h2>{t('ingredients.title')} </h2>
      <ul className='ingredients-control__list'>
        {dataOfProduct.map((item) => (
          <SingleControl key={item.name + item.price} img={item.img} name={item.name} />
        ))}
      </ul>
    </div>
  )
}
