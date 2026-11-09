import type { IngredientName } from '../data';
import {
  addIngredient as addAction,
  removeIngredient as removeAction,
  resetBuilder as resetAction,
} from '../store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function useBuilder() {
  const dispatch = useAppDispatch();
  const stateBuilder = useAppSelector((state) => state.build);

  const addIngredient = (ingredientName: IngredientName) => {
    dispatch(addAction(ingredientName));
  };

  const removeIngredient = (ingredientName: IngredientName) => {
    dispatch(removeAction(ingredientName));
  };

  const resetBuilder = () => {
    dispatch(resetAction());
  };

  return {
    stateBuilder,
    addIngredient,
    removeIngredient,
    resetBuilder,
  };
}
