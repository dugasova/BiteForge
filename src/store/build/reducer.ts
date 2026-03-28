import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_BUILDER } from "./actions";
import { dataOfProduct } from "../../mockedData";

const initialState: {
  ingredients: { [key: string]: number };
  sequence: string[];
  totalPrice: number;
  totalKkal: number;
} = {
  ingredients: {},
  sequence: [],
  totalPrice: 10,
  totalKkal: 200, // Base calories for the buns
};

const getIngredientInfo = (ingredientName: string) => {
  const item = dataOfProduct.find((p) => p.name === ingredientName);
  if (!item) return { price: 0, kkal: 0 };
  
  // Safely get kkal which might be optional in the type
  const kkal = (item as { kkal?: number }).kkal || 0;
  return { price: item.price, kkal };
};

interface Action {
  type: string;
  payload: string;
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const { price, kkal } = getIngredientInfo(action.payload);
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: (state.ingredients[action.payload] || 0) + 1,
        },
        sequence: [...state.sequence, action.payload],
        totalPrice: state.totalPrice + price,
        totalKkal: (state.totalKkal || 0) + kkal,
      };
    }
    case REMOVE_INGREDIENT: {
      const currentCount = state.ingredients[action.payload] || 0;
      if (currentCount <= 0) return state;

      const newSequence = [...state.sequence];
      const lastIndex = newSequence.lastIndexOf(action.payload);
      if (lastIndex !== -1) {
        newSequence.splice(lastIndex, 1);
      }

      const { price, kkal } = getIngredientInfo(action.payload);

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: currentCount - 1,
        },
        sequence: newSequence,
        totalPrice: state.totalPrice - price,
        totalKkal: (state.totalKkal || 0) - kkal,
      };
    }
    case RESET_BUILDER:
      return initialState;
    default:
      return state;
  }
};

export { reducer, initialState };
