import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store';
import {
  addIngredient as addAction,
  removeIngredient as removeAction,
  resetBuilder as resetAction,
  toggleFastDelivery as toggleAction,
} from '../store/build/buildSlice';

export default function useBuilder() {
    const dispatch = useDispatch();
    const stateBuilder = useSelector((state: RootState) => state.build);

    const addIngredient = (ingredient: string) => {
        dispatch(addAction(ingredient));
    };

    const removeIngredient = (ingredient: string) => {
        dispatch(removeAction(ingredient));
    };

    const resetBuilder = () => {
      dispatch(resetAction());
    };

    const toggleFastDelivery = () => {
      dispatch(toggleAction());
    };

    return {
      stateBuilder,
      addIngredient,
      removeIngredient,
      resetBuilder,
      toggleFastDelivery,
    };
  }
