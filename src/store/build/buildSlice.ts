import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { dataOfProduct } from "../../mockedData";

interface BuildState {
  ingredients: { [key: string]: number };
  sequence: string[];
  totalPrice: number;
  totalKkal: number;
  fastDelivery: boolean;
}

const initialState: BuildState = {
  ingredients: {},
  sequence: [],
  totalPrice: 10,
  totalKkal: 200, // Base calories for the buns
  fastDelivery: false,
};

const getIngredientInfo = (ingredientName: string) => {
  const item = dataOfProduct.find((p) => p.name === ingredientName);
  if (!item) return { price: 0, kkal: 0 };
  
  const kkal = (item as { kkal?: number }).kkal || 0;
  return { price: item.price, kkal };
};

const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<string>) => {
      const ingredient = action.payload;
      const { price, kkal } = getIngredientInfo(ingredient);
      
      state.ingredients[ingredient] = (state.ingredients[ingredient] || 0) + 1;
      state.sequence.push(ingredient);
      state.totalPrice += price;
      state.totalKkal += kkal;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const ingredient = action.payload;
      const currentCount = state.ingredients[ingredient] || 0;
      
      if (currentCount <= 0) return;

      const lastIndex = state.sequence.lastIndexOf(ingredient);
      if (lastIndex !== -1) {
        state.sequence.splice(lastIndex, 1);
      }

      const { price, kkal } = getIngredientInfo(ingredient);
      state.ingredients[ingredient] = currentCount - 1;
      state.totalPrice -= price;
      state.totalKkal -= kkal;
    },
    resetBuilder: () => {
      return initialState;
    },
    toggleFastDelivery: (state) => {
      state.fastDelivery = !state.fastDelivery;
    },
  },
});

export const { addIngredient, removeIngredient, resetBuilder, toggleFastDelivery } = buildSlice.actions;
export default buildSlice.reducer;
