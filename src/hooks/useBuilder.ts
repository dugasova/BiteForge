import {
  addIngredient as addAction,
  removeIngredient as removeAction,
  resetBuilder as resetAction,
} from '../store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function useBuilder() {
  const dispatch = useAppDispatch();
  const stateBuilder = useAppSelector((state) => state.build);

  const addIngredient = (ingredient: string) => {
    dispatch(addAction(ingredient));
  };

  const removeIngredient = (ingredient: string) => {
    dispatch(removeAction(ingredient));
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
