import React from 'react';
import './Main.scss';
import Prices from '../../Prices/Prices';
import Burger from '../../Burger/Burger';
import IngredientsControl from '../../IngredientsControl/IngredientsControl';
import {BurgerContext} from '../../../context/BurgerContext';
import useBuilder from '../../../hooks/useBuilder';

export default function Main() {
  const { stateBuilder, dispatchBuilder, addIngredient, removeIngredient, resetBuilder } = useBuilder();
  const value = {
    stateBuilder,
    dispatchBuilder,
    addIngredient,
    removeIngredient,
    resetBuilder
  };
  return (
    <BurgerContext.Provider value={value}>
      <div className="main container">
        <Prices />
        <Burger />
        <IngredientsControl />
      </div>
    </BurgerContext.Provider>
  )
}   