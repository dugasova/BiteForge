import React from 'react'
import './SinglePrice.scss';
import { useTranslation } from 'react-i18next';

interface SinglePriceProps {
  name: string;
  price: number;
}

export default function SinglePrice({ name, price }: SinglePriceProps) {
  const { t } = useTranslation();
  return (
    <li className="single-price">
      <span className="ingredient-name">{t(`prices.${name}`)}</span>
      <span className="ingredient-price">{price} <small>UAH</small></span>
    </li>
  )
}

