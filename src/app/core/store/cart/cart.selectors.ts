// src/app/core/store/cart/cart.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart'); 
// 'cart' deve corresponder exatamente ao nome usado no StoreModule.forRoot ou forFeature.

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartTotalItems = createSelector(
  selectCartItems,
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  selectCartItems,
  (items) => items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state) => state.loading
);

export const selectCartError = createSelector(
  selectCartState,
  (state) => state.error
);
