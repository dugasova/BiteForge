import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_BUILDER } from "./actions";
import { dataOfProduct } from "../../mockedData";

const initialState: {
  ingredients: { [key: string]: number };
  sequence: string[];
  totalPrice: number;
} = {
  ingredients: {},
  sequence: [],
  totalPrice: 10, // You can also set a base price here if needed
};

const getIngredientPrice = (ingredientName: string) => {
  const item = dataOfProduct.find((p) => p.name === ingredientName);
  return item ? item.price : 0;
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const price = getIngredientPrice(action.payload);
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: (state.ingredients[action.payload] || 0) + 1,
        },
        sequence: [...state.sequence, action.payload],
        totalPrice: state.totalPrice + price,
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

      const price = getIngredientPrice(action.payload);

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: currentCount - 1,
        },
        sequence: newSequence,
        totalPrice: state.totalPrice - price,
      };
    }
    case RESET_BUILDER:
      return initialState;
    default:
      return state;
  }
};

export { reducer, initialState };
