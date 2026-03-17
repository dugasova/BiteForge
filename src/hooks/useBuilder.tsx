import { useReducer } from 'react';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  RESET_BUILDER,
  TOGGLE_FAST_DELIVERY,
} from '../store/build/actions';
import { reducer, initialState } from './../store/build/reducer';

export default function useBuilder() {
    const [stateBuilder, dispatchBuilder] = useReducer(reducer as any, initialState);

    const addIngredient = (ingredient: string) => {
        dispatchBuilder({ type: ADD_INGREDIENT, payload: ingredient });
    };

    const removeIngredient = (ingredient: string) => {
        dispatchBuilder({ type: REMOVE_INGREDIENT, payload: ingredient });
    };

    const resetBuilder = () => {
      dispatchBuilder({ type: RESET_BUILDER });
    };

    const toggleFastDelivery = () => {
      console.log('toggleFastDelivery called;', stateBuilder.fastDelivery);
      dispatchBuilder({ type: TOGGLE_FAST_DELIVERY });
    };

    return {
      stateBuilder,
      dispatchBuilder,
      addIngredient,
      removeIngredient,
      resetBuilder,
      toggleFastDelivery,
    };
  }
