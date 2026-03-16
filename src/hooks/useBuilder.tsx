import React, { useReducer } from 'react';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_BUILDER } from '../store/build/actions';
import { reducer, initialState } from "./../store/build/reducer";

export default function useBuilder() {
    const [stateBuilder, dispatchBuilder] = useReducer(reducer, initialState);

    const addIngredient = (ingredient: string) => {
        dispatchBuilder({ type: ADD_INGREDIENT, payload: ingredient });
    };

    const removeIngredient = (ingredient: string) => {
        dispatchBuilder({ type: REMOVE_INGREDIENT, payload: ingredient });
    };

    const resetBuilder = () => {
        dispatchBuilder({ type: RESET_BUILDER });
    };

    return {
        stateBuilder,
        dispatchBuilder,
        addIngredient,
        removeIngredient,
        resetBuilder
    }
}
