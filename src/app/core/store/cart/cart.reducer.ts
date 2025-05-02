// src/app/core/store/cart/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { ICartItem } from '../../models/models.cartItem'; // Ajuste se necessário

export interface CartState {
  items: ICartItem[];
  loading: boolean; 
  error: any;
}

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,

  // Adicionar item
  on(CartActions.addItem, (state, { item }) => {
    const existingItemIndex = state.items.findIndex(i => i.activityId === item.activityId);
    let updatedItems: ICartItem[];

    if (existingItemIndex > -1) {
      // Se o item já existe, atualiza a quantidade
      updatedItems = state.items.map((i, index) =>
        index === existingItemIndex
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      // Adiciona item novo
      updatedItems = [...state.items, item];
    }
    return { ...state, items: updatedItems };
  }),

  // Remover item
  on(CartActions.removeItem, (state, { activityId }) => ({
    ...state,
    items: state.items.filter(item => item.activityId !== activityId),
  })),

  // Atualizar quantidade de item
  on(CartActions.updateItemQuantity, (state, { activityId, quantity }) => ({
    ...state,
    items: state.items
      .map(item =>
        item.activityId === activityId
          ? { ...item, quantity }
          : item
      )
      .filter(item => item.quantity > 0) // Remove se a quantidade for <= 0
  })),

  // Limpar carrinho
  on(CartActions.clearCart, (state) => ({
    ...state,
    items: []
  }))
);
