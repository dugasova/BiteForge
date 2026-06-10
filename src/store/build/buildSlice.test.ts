import { describe, it, expect } from 'vitest';
import reducer, {
  addIngredient,
  removeIngredient,
  resetBuilder,
  toggleFastDelivery,
} from './buildSlice';

const initialState = reducer(undefined, { type: '@@INIT' });

describe('buildSlice', () => {
  it('returns the initial state', () => {
    expect(initialState).toEqual({
      ingredients: {},
      sequence: [],
      totalPrice: 10,
      totalKcal: 200,
      fastDelivery: false,
    });
  });

  describe('addIngredient', () => {
    it('adds the ingredient and updates price/kcal/sequence', () => {
      const state = reducer(initialState, addIngredient('bacon'));

      expect(state.ingredients.bacon).toBe(1);
      expect(state.sequence).toEqual(['bacon']);
      expect(state.totalPrice).toBe(10 + 20); // base price + bacon (20)
      expect(state.totalKcal).toBe(200 + 100); // base kcal + bacon (100)
    });

    it('accumulates multiple additions of the same ingredient', () => {
      let state = reducer(initialState, addIngredient('bacon'));
      state = reducer(state, addIngredient('bacon'));
      state = reducer(state, addIngredient('cheese'));

      expect(state.ingredients.bacon).toBe(2);
      expect(state.ingredients.cheese).toBe(1);
      expect(state.sequence).toEqual(['bacon', 'bacon', 'cheese']);
      expect(state.totalPrice).toBe(10 + 20 * 2 + 25); // base + 2x bacon + cheese
      expect(state.totalKcal).toBe(200 + 100 * 3); // base + 3 ingredients x 100 kcal
    });

    it('treats an unknown ingredient as price/kcal 0 but still tracks it', () => {
      const state = reducer(initialState, addIngredient('unknown'));

      expect(state.ingredients.unknown).toBe(1);
      expect(state.sequence).toEqual(['unknown']);
      expect(state.totalPrice).toBe(initialState.totalPrice);
      expect(state.totalKcal).toBe(initialState.totalKcal);
    });
  });

  describe('removeIngredient', () => {
    it('removes one occurrence and updates price/kcal/sequence', () => {
      let state = reducer(initialState, addIngredient('bacon'));
      state = reducer(state, addIngredient('bacon'));

      state = reducer(state, removeIngredient('bacon'));

      expect(state.ingredients.bacon).toBe(1);
      expect(state.sequence).toEqual(['bacon']);
      expect(state.totalPrice).toBe(10 + 20);
      expect(state.totalKcal).toBe(200 + 100);
    });

    it('removes the last occurrence of an ingredient from the sequence', () => {
      let state = reducer(initialState, addIngredient('bacon'));
      state = reducer(state, addIngredient('cheese'));
      state = reducer(state, addIngredient('bacon'));

      state = reducer(state, removeIngredient('bacon'));

      expect(state.sequence).toEqual(['bacon', 'cheese']);
      expect(state.ingredients.bacon).toBe(1);
    });

    it('does nothing when the ingredient count is already 0', () => {
      const state = reducer(initialState, removeIngredient('bacon'));

      expect(state).toEqual(initialState);
    });
  });

  describe('toggleFastDelivery', () => {
    it('toggles fastDelivery on and off', () => {
      let state = reducer(initialState, toggleFastDelivery());
      expect(state.fastDelivery).toBe(true);

      state = reducer(state, toggleFastDelivery());
      expect(state.fastDelivery).toBe(false);
    });
  });

  describe('resetBuilder', () => {
    it('resets the state back to the initial values', () => {
      let state = reducer(initialState, addIngredient('bacon'));
      state = reducer(state, toggleFastDelivery());

      state = reducer(state, resetBuilder());

      expect(state).toEqual(initialState);
    });

    it('does not let a reset state mutate a previously captured state', () => {
      let state = reducer(initialState, addIngredient('bacon'));
      state = reducer(state, resetBuilder());

      // Building again after a reset should not affect the earlier captured state
      state = reducer(state, addIngredient('cheese'));

      expect(state.ingredients).toEqual({ cheese: 1 });
      expect(initialState.ingredients).toEqual({});
    });
  });
});
